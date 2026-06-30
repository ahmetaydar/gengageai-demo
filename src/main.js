import { extractProductFacts } from './extractor.js';
import { LocalProductAssistant, checkAvailability } from './assistant.js';
import { AssistantWidget } from './ui.js';

const GLOBAL_KEY = '__GENGAGEAI_ASSISTANT__';

async function bootstrap() {
  if (window[GLOBAL_KEY]?.initialized) {
    window[GLOBAL_KEY].widget?.open();
    return;
  }

  const assistantEngine = new LocalProductAssistant();
  const widget = new AssistantWidget({
    onAsk: (question, handlers) => assistantEngine.ask(question, handlers),
  });

  window[GLOBAL_KEY] = {
    initialized: true,
    widget,
    assistant: assistantEngine,
  };

  widget.setLoading('Ürün bilgileri okunuyor…');

  try {
    const availability = await checkAvailability();
    if (availability.status === 'unsupported' || availability.status === 'unavailable') {
      widget.setUnsupported(availability.message);
      return;
    }

    const facts = await extractProductFacts(document);

    widget.setLoading('Yerel AI hazırlanıyor…');
    await assistantEngine.prepare(facts, {
      onDownloadProgress: (percent) => widget.setDownloading(percent),
    });

    widget.setReady(facts.title);
  } catch (error) {
    const code = error?.code;
    if (code === 'unsupported' || code === 'unavailable') {
      widget.setUnsupported(error.message);
      return;
    }

    widget.setError(
      error?.message ||
        'Asistan başlatılamadı. Sayfayı yenileyip tekrar deneyin.'
    );
  }
}

bootstrap();
