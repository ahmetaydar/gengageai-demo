import { extractProductFacts, generateSampleQuestions } from './extractor.js';
import { LocalProductAssistant, checkAvailability } from './assistant.js';
import { AssistantWidget } from './ui.js';

const GLOBAL_KEY = '__GENGAGEAI_ASSISTANT__';

function getProductKey() {
  const match = window.location.pathname.match(/\/p\/(\d+)/i);
  return match ? match[1] : window.location.href;
}

async function loadProduct(app) {
  const { widget, assistant } = app;

  widget.resetConversation();
  widget.setPreparing('Bir saniye, ürünü inceliyorum…');

  const facts = await extractProductFacts(document);

  widget.setPreparing('Asistan hazırlanıyor…');
  assistant.destroy();
  await assistant.prepare(facts, {
    onDownloadProgress: (percent) => widget.setPreparing('Asistan hazırlanıyor…', percent),
  });

  app.productKey = getProductKey();
  widget.setReady({ sampleQuestions: generateSampleQuestions(facts) });
}

function watchProductChanges(app) {
  let lastKey = app.productKey;

  const check = () => {
    const currentKey = getProductKey();
    if (currentKey === lastKey) return;
    lastKey = currentKey;
    loadProduct(app).catch((error) => {
      app.widget.setError(
        error?.message || 'Yeni ürün yüklenemedi. Sayfayı yenileyip tekrar deneyin.'
      );
    });
  };

  window.addEventListener('popstate', check);

  ['pushState', 'replaceState'].forEach((method) => {
    const original = history[method].bind(history);
    history[method] = (...args) => {
      const result = original(...args);
      check();
      return result;
    };
  });

  window.setInterval(check, 1500);
}

async function bootstrap() {
  const existing = window[GLOBAL_KEY];

  if (existing?.initialized) {
    if (getProductKey() !== existing.productKey) {
      await loadProduct(existing);
    } else {
      existing.widget?.open();
    }
    return;
  }

  const assistantEngine = new LocalProductAssistant();
  const widget = new AssistantWidget({
    onAsk: (question, handlers) => assistantEngine.ask(question, handlers),
  });

  const app = {
    initialized: true,
    widget,
    assistant: assistantEngine,
    productKey: null,
  };

  window[GLOBAL_KEY] = app;

  widget.setPreparing('Bir saniye, ürünü inceliyorum…');

  try {
    const availability = await checkAvailability();
    if (availability.status === 'unsupported' || availability.status === 'unavailable') {
      widget.setUnsupported(availability.message);
      return;
    }

    await loadProduct(app);
    watchProductChanges(app);
  } catch (error) {
    const code = error?.code;
    if (code === 'unsupported' || code === 'unavailable') {
      widget.setUnsupported(error.message);
      return;
    }

    widget.setError(
      error?.message ||
        'Asistan şu an başlatılamadı. Sayfayı yenileyip tekrar deneyebilirsiniz.'
    );
  }
}

bootstrap().catch((error) => {
  console.error('[GengageAI]', error);
  window[GLOBAL_KEY]?.widget?.setError?.(
    error?.message || 'Asistan başlatılamadı.'
  );
});
