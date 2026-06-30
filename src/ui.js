const SAMPLE_QUESTIONS = [
  'Bu kanepe hangi renk?',
  'Depolama alanı var mı?',
  'Kaç kişilik?',
  'Oturma odası için uygun mu?',
  'Satın almadan önce neyi kontrol etmeliyim?',
];

const STYLES = `
  :host {
    all: initial;
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  .launcher {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 2147483646;
    border: none;
    border-radius: 999px;
    padding: 14px 18px;
    background: #0f6b4f;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(15, 107, 79, 0.35);
  }

  .panel {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 2147483647;
    width: min(380px, calc(100vw - 24px));
    height: min(560px, calc(100vh - 24px));
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border: 1px solid #e6ebe8;
    border-radius: 18px;
    box-shadow: 0 18px 50px rgba(17, 24, 39, 0.18);
    overflow: hidden;
  }

  .hidden { display: none !important; }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 16px 16px 12px;
    border-bottom: 1px solid #edf2ef;
    background: linear-gradient(180deg, #f8fbf9 0%, #ffffff 100%);
  }

  .title-wrap h2 {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    color: #102a22;
  }

  .title-wrap p {
    margin: 4px 0 0;
    font-size: 12px;
    color: #5d6f67;
  }

  .icon-btn {
    border: none;
    background: #eef5f1;
    color: #274439;
    width: 32px;
    height: 32px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
  }

  .body {
    flex: 1;
    overflow: auto;
    padding: 16px;
    background: #fbfdfc;
  }

  .state-card {
    border: 1px dashed #d7e3dd;
    background: #ffffff;
    border-radius: 14px;
    padding: 18px;
    color: #31443b;
    font-size: 14px;
    line-height: 1.5;
  }

  .state-card strong {
    display: block;
    margin-bottom: 8px;
    color: #102a22;
  }

  .progress {
    margin-top: 12px;
    height: 8px;
    background: #e8f0ec;
    border-radius: 999px;
    overflow: hidden;
  }

  .progress > span {
    display: block;
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, #0f6b4f, #18a07a);
    transition: width 0.2s ease;
  }

  .messages {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .message {
    max-width: 88%;
    padding: 10px 12px;
    border-radius: 14px;
    font-size: 14px;
    line-height: 1.45;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .message.user {
    align-self: flex-end;
    background: #0f6b4f;
    color: #fff;
    border-bottom-right-radius: 4px;
  }

  .message.assistant {
    align-self: flex-start;
    background: #ffffff;
    color: #1f2d28;
    border: 1px solid #e3ebe6;
    border-bottom-left-radius: 4px;
  }

  .message.error {
    align-self: stretch;
    background: #fff4f4;
    color: #8a1f1f;
    border: 1px solid #f2d4d4;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 14px;
  }

  .chip {
    border: 1px solid #d7e5de;
    background: #ffffff;
    color: #204438;
    border-radius: 999px;
    padding: 8px 12px;
    font-size: 12px;
    cursor: pointer;
  }

  .chip:hover { background: #f3faf6; }

  .composer {
    display: flex;
    gap: 8px;
    padding: 12px;
    border-top: 1px solid #edf2ef;
    background: #ffffff;
  }

  .composer input {
    flex: 1;
    border: 1px solid #d9e5df;
    border-radius: 12px;
    padding: 12px 14px;
    font-size: 14px;
    outline: none;
  }

  .composer input:focus {
    border-color: #0f6b4f;
    box-shadow: 0 0 0 3px rgba(15, 107, 79, 0.12);
  }

  .composer button {
    border: none;
    border-radius: 12px;
    padding: 0 14px;
    background: #0f6b4f;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
  }

  .composer button:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export class AssistantWidget {
  #host;
  #shadow;
  #launcher;
  #panel;
  #body;
  #messages;
  #input;
  #sendBtn;
  #stateCard;
  #progressBar;
  #chips;
  #onAsk;
  #isOpen = false;
  #isBusy = false;

  constructor({ onAsk } = {}) {
    this.#onAsk = onAsk;
    this.#mount();
  }

  #mount() {
    this.#host = document.createElement('div');
    this.#host.id = 'gengageai-assistant-root';
    this.#shadow = this.#host.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = STYLES;
    this.#shadow.appendChild(style);

    this.#launcher = document.createElement('button');
    this.#launcher.className = 'launcher';
    this.#launcher.type = 'button';
    this.#launcher.textContent = 'Ürün Asistanı';
    this.#launcher.addEventListener('click', () => this.open());

    this.#panel = document.createElement('section');
    this.#panel.className = 'panel hidden';
    this.#panel.innerHTML = `
      <header class="header">
        <div class="title-wrap">
          <h2>Ürün Asistanı</h2>
          <p>Yerel AI · Gemini Nano</p>
        </div>
        <button class="icon-btn" type="button" data-close aria-label="Kapat">×</button>
      </header>
      <div class="body">
        <div class="state-card" data-state-card>
          <strong>Hazırlanıyor</strong>
          <span data-state-text>Ürün bilgileri okunuyor…</span>
          <div class="progress hidden" data-progress>
            <span data-progress-bar></span>
          </div>
        </div>
        <div class="messages hidden" data-messages></div>
        <div class="chips hidden" data-chips></div>
      </div>
      <form class="composer" data-composer>
        <input type="text" placeholder="Ürün hakkında soru sorun" autocomplete="off" disabled />
        <button type="submit" disabled>Gönder</button>
      </form>
    `;

    this.#shadow.appendChild(this.#launcher);
    this.#shadow.appendChild(this.#panel);

    this.#body = this.#shadow.querySelector('.body');
    this.#messages = this.#shadow.querySelector('[data-messages]');
    this.#stateCard = this.#shadow.querySelector('[data-state-card]');
    this.#progressBar = this.#shadow.querySelector('[data-progress-bar]');
    this.#chips = this.#shadow.querySelector('[data-chips]');
    this.#input = this.#shadow.querySelector('input');
    this.#sendBtn = this.#shadow.querySelector('button[type="submit"]');

    this.#shadow.querySelector('[data-close]').addEventListener('click', () => this.close());
    this.#shadow.querySelector('[data-composer]').addEventListener('submit', (event) => {
      event.preventDefault();
      this.#submitQuestion();
    });

    document.documentElement.appendChild(this.#host);
  }

  open() {
    this.#isOpen = true;
    this.#launcher.classList.add('hidden');
    this.#panel.classList.remove('hidden');
  }

  close() {
    this.#isOpen = false;
    this.#panel.classList.add('hidden');
    this.#launcher.classList.remove('hidden');
  }

  setLoading(message = 'Ürün bilgileri okunuyor…') {
    this.open();
    this.#showState('Yükleniyor', message);
    this.#setComposerEnabled(false);
  }

  setDownloading(percent, message = 'Yerel AI modeli indiriliyor…') {
    this.open();
    this.#showState('Model indiriliyor', `${message} %${percent}`);
    const progress = this.#shadow.querySelector('[data-progress]');
    progress.classList.remove('hidden');
    this.#progressBar.style.width = `${percent}%`;
    this.#setComposerEnabled(false);
  }

  setReady(productTitle) {
    this.#stateCard.classList.add('hidden');
    this.#messages.classList.remove('hidden');
    this.#chips.classList.remove('hidden');
    this.#shadow.querySelector('[data-progress]')?.classList.add('hidden');

    this.#chips.innerHTML = '';
    SAMPLE_QUESTIONS.forEach((question) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip';
      chip.textContent = question;
      chip.addEventListener('click', () => this.#submitQuestion(question));
      this.#chips.appendChild(chip);
    });

    if (productTitle) {
      this.addAssistantMessage(`Merhaba! "${productTitle}" hakkında sorularınızı yanıtlayabilirim.`);
    }

    this.#setComposerEnabled(true);
  }

  setUnsupported(message) {
    this.open();
    this.#showState('Yerel AI kullanılamıyor', message);
    this.#setComposerEnabled(false);
  }

  setError(message) {
    this.open();
    this.#showState('Bir sorun oluştu', message);
    this.#setComposerEnabled(false);
  }

  addUserMessage(text) {
    this.#messages.classList.remove('hidden');
    this.#stateCard.classList.add('hidden');
    this.#messages.appendChild(this.#createMessage('user', text));
    this.#scrollToBottom();
  }

  addAssistantMessage(text) {
    this.#messages.appendChild(this.#createMessage('assistant', text));
    this.#scrollToBottom();
  }

  updateAssistantMessage(node, text) {
    node.textContent = text;
    this.#scrollToBottom();
  }

  addErrorMessage(text) {
    this.#messages.appendChild(this.#createMessage('error', text));
    this.#scrollToBottom();
  }

  #createMessage(role, text) {
    const node = document.createElement('div');
    node.className = `message ${role}`;
    node.textContent = text;
    return node;
  }

  #showState(title, message) {
    this.#stateCard.classList.remove('hidden');
    this.#messages.classList.add('hidden');
    this.#chips.classList.add('hidden');
    this.#stateCard.querySelector('strong').textContent = title;
    this.#stateCard.querySelector('[data-state-text]').textContent = message;
  }

  #setComposerEnabled(enabled) {
    this.#input.disabled = !enabled || this.#isBusy;
    this.#sendBtn.disabled = !enabled || this.#isBusy;
  }

  async #submitQuestion(prefilled) {
    const question = normalizeText(prefilled || this.#input.value);
    if (!question || this.#isBusy || !this.#onAsk) return;

    this.#input.value = '';
    this.#isBusy = true;
    this.#setComposerEnabled(false);
    this.addUserMessage(question);

    const assistantNode = this.#createMessage('assistant', '…');
    this.#messages.appendChild(assistantNode);

    try {
      const answer = await this.#onAsk(question, {
        onChunk: (partial) => this.updateAssistantMessage(assistantNode, partial),
      });
      if (!assistantNode.textContent || assistantNode.textContent === '…') {
        this.updateAssistantMessage(assistantNode, answer);
      }
    } catch (error) {
      assistantNode.remove();
      this.addErrorMessage(error?.message || 'Cevap üretilemedi.');
    } finally {
      this.#isBusy = false;
      this.#setComposerEnabled(true);
      this.#input.focus();
    }
  }

  #scrollToBottom() {
    this.#body.scrollTop = this.#body.scrollHeight;
  }

  destroy() {
    this.#host?.remove();
  }
}

function normalizeText(value) {
  return (value || '').replace(/\s+/g, ' ').trim();
}
