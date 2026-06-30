/**
 * Koçtaş PDP → F12 Console → yapıştır → Enter
 * Bundle host: Cloudflare Workers (static assets)
 */
(function () {
  const BUNDLE_URL = 'https://gengageai-demo.a-aydar2014.workers.dev/bundle.js';

  if (window.__GENGAGEAI_ASSISTANT__?.initialized) {
    window.__GENGAGEAI_ASSISTANT__.widget?.open();
    console.log('[GengageAI] Asistan zaten yüklü.');
    return;
  }

  document.getElementById('gengageai-assistant-loader')?.remove();

  const script = document.createElement('script');
  script.id = 'gengageai-assistant-loader';
  script.src = BUNDLE_URL;
  script.async = true;
  script.onload = () => console.log('[GengageAI] Bundle yüklendi.');
  script.onerror = () =>
    console.error('[GengageAI] Bundle yüklenemedi:', BUNDLE_URL);
  document.head.appendChild(script);
})();
