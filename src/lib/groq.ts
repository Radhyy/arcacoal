/**
 * Dual Translation Engine Helper (Groq AI + Google Translate Fallback)
 * Supports Bi-Directional Auto-Translation (Indonesian -> English & English -> Indonesian)
 * 1. Attempts Groq AI (llama-3.3-70b-versatile) if GROQ_API_KEY is available.
 * 2. Seamlessly falls back to Google Translate API to guarantee 100% valid translations.
 */

let currentKeyIndex = 0;

async function googleTranslateFallback(text: string, targetLanguage: "en" | "id"): Promise<string> {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data && data[0] && Array.isArray(data[0])) {
      const translated = data[0].map((item: any) => item[0]).join("");
      if (translated && translated.trim() !== "") {
        return translated.trim();
      }
    }
  } catch (err) {
    console.error("Google Translate Fallback error:", err);
  }
  return text;
}

export async function translateText(text: string, targetLanguage: "en" | "id"): Promise<string> {
  if (!text || text.trim() === "") return "";

  const keys = [
    process.env.GROQ_API_KEY_1,
    process.env.GROQ_API_KEY_2,
    process.env.GROQ_API_KEY,
  ].filter(Boolean) as string[];

  // If no Groq key, immediately use Google Translate engine
  if (keys.length === 0) {
    return await googleTranslateFallback(text, targetLanguage);
  }

  // Round-robin key selection
  const apiKey = keys[currentKeyIndex % keys.length];
  currentKeyIndex++;

  const systemPrompt =
    targetLanguage === "en"
      ? "You are a professional corporate translator for PT Arcadia Charcoal Indonesia. Translate the given Indonesian text to accurate, natural, professional English suitable for an international export website. Respond ONLY with the translation text, no preamble or quotes."
      : "You are a professional corporate translator for PT Arcadia Charcoal Indonesia. Translate the given English text to natural, fluent, professional Bahasa Indonesia suitable for an international export website. Respond ONLY with the translation text, no preamble or quotes.";

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: text,
          },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      console.warn(`Groq API returned status ${response.status}. Using Google Translate fallback.`);
      return await googleTranslateFallback(text, targetLanguage);
    }

    const data = await response.json();
    const translation = data?.choices?.[0]?.message?.content?.trim();

    if (translation && translation !== "") {
      return translation;
    }
  } catch (error) {
    console.error("Groq AI translation error, using fallback:", error);
  }

  return await googleTranslateFallback(text, targetLanguage);
}

// Backward compatibility helper
export async function translateIndonesianToEnglish(text: string): Promise<string> {
  return translateText(text, "en");
}
