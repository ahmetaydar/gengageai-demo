import { formatFactsForPrompt } from './extractor.js';

const LANGUAGE_OPTIONS = {
  expectedInputs: [{ type: 'text', languages: ['en'] }],
  expectedOutputs: [{ type: 'text', languages: ['en'] }],
};

const SYSTEM_PROMPT = `You are a product assistant on a Turkish e-commerce product page.
Answer ONLY using the product facts provided below.
Rules:
- Never invent specifications, colors, dimensions, or features.
- If the answer is not clearly supported by the facts, say: "Bu bilgi ürün sayfasında yer almıyor."
- Prefer concise, helpful Turkish answers (1-3 short sentences).
- For buying advice, mention only facts that appear on the page.
- Do not mention that you are an AI model.`;

export function isPromptApiSupported() {
  return typeof LanguageModel !== 'undefined';
}

export async function checkAvailability() {
  if (!isPromptApiSupported()) {
    return { status: 'unsupported', message: 'Ürün asistanı bu tarayıcıda desteklenmiyor. Güncel Chrome masaüstü sürümünü deneyin.' };
  }

  try {
    const status = await LanguageModel.availability(LANGUAGE_OPTIONS);

    if (status === 'unavailable') {
      return {
        status: 'unavailable',
        message:
          'Ürün asistanı şu an cihazınızda kullanılamıyor. Chrome güncellemesini ve yeterli depolama alanını kontrol edin.',
      };
    }

    return { status, message: null };
  } catch (error) {
    return {
      status: 'error',
      message: error?.message || 'Asistan şu an kullanılamıyor.',
    };
  }
}

export class LocalProductAssistant {
  #session = null;
  #factsText = '';

  async prepare(facts, { onDownloadProgress } = {}) {
    const availability = await checkAvailability();

    if (availability.status === 'unsupported' || availability.status === 'unavailable') {
      const err = new Error(availability.message);
      err.code = availability.status;
      throw err;
    }

    this.#factsText = formatFactsForPrompt(facts);

    this.#session = await LanguageModel.create({
      ...LANGUAGE_OPTIONS,
      initialPrompts: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Here are the only facts you may use:\n\n${this.#factsText}`,
        },
        {
          role: 'assistant',
          content: 'Anladım. Yalnızca bu ürün bilgilerine dayanarak Türkçe cevap vereceğim.',
        },
      ],
      monitor(monitor) {
        if (!onDownloadProgress) return;
        monitor.addEventListener('downloadprogress', (event) => {
          onDownloadProgress(Math.round((event.loaded || 0) * 100));
        });
      },
    });

    return this.#session;
  }

  async ask(question, { signal, onChunk } = {}) {
    if (!this.#session) {
      throw new Error('Asistan henüz hazır değil.');
    }

    const prompt = `Kullanıcı sorusu: ${question}\n\nYalnızca verilen ürün bilgilerine dayanarak Türkçe cevap ver.`;

    if (onChunk && typeof this.#session.promptStreaming === 'function') {
      const stream = this.#session.promptStreaming(prompt, { signal });
      let full = '';

      for await (const chunk of stream) {
        full += chunk;
        onChunk(full);
      }

      return full.trim();
    }

    const answer = await this.#session.prompt(prompt, { signal });
    return answer.trim();
  }

  destroy() {
    this.#session?.destroy?.();
    this.#session = null;
  }
}
