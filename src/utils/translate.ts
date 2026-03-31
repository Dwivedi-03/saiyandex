export const translateText = async (text: string, target = "en") => {
    try {
        const response = await fetch("https://libretranslate.de/translate", {
            method: "POST",
            body: JSON.stringify({
                q: text,
                source: "auto",  // detects Spanish automatically
                target,
                format: "text",
            }),
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        return data.translatedText;
    } catch (err) {
        console.error("Translation error:", err);
        return text; // fallback to original
    }
};

// Free translation via MyMemory (no API key required).
// Caches results in memory for the lifetime of the app session.

// const cache = new Map<string, string>();

// async function translateChunk(text: string): Promise<string> {
//     if (!text.trim()) return text;
//     const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=es|en`;
//     try {
//         const res = await fetch(url);
//         if (!res.ok) return text;
//         const json = await res.json() as { responseData?: { translatedText?: string } };
//         return json?.responseData?.translatedText ?? text;
//     } catch {
//         return text; // fallback: show original
//     }
// }

// /** Split long text into chunks ≤ 490 chars at word boundaries. */
// function splitIntoChunks(text: string, maxLen = 490): string[] {
//     const chunks: string[] = [];
//     let remaining = text.trim();
//     while (remaining.length > maxLen) {
//         let cutAt = remaining.lastIndexOf(' ', maxLen);
//         if (cutAt === -1) cutAt = maxLen;
//         chunks.push(remaining.slice(0, cutAt).trim());
//         remaining = remaining.slice(cutAt).trim();
//     }
//     if (remaining) chunks.push(remaining);
//     return chunks;
// }

// /**
//  * Translate Spanish text to English.
//  * Returns translated string. Falls back silently to original on error.
//  */
// export async function translateText(text: string): Promise<string> {
//     if (!text) return text;
//     if (cache.has(text)) return cache.get(text)!;

//     const chunks = splitIntoChunks(text);
//     const translated = (await Promise.all(chunks.map(translateChunk))).join(' ');
//     cache.set(text, translated);
//     return translated;
// }
