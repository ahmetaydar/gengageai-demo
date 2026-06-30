/**
 * Koçtaş PDP → F12 Console → yapıştır → Enter
 */
(function () {
  const BUNDLE_URL = 'https://gengageai-demo.a-aydar2014.workers.dev/bundle.js';
  const VERSION = '2';

  function teardown() {
    window.__GENGAGEAI_ASSISTANT__?.assistant?.destroy?.();
    window.__GENGAGEAI_ASSISTANT__?.widget?.destroy?.();
    delete window.__GENGAGEAI_ASSISTANT__;
    document.getElementById('gengageai-assistant-loader')?.remove();
    document.getElementById('gengageai-assistant-root')?.remove();
  }

  // Eski sürüm bellekte kaldıysa temizle (yeni bundle yüklensin)
  if (window.__GENGAGEAI_ASSISTANT__?.version !== VERSION) {
    teardown();
  } else if (window.__GENGAGEAI_ASSISTANT__?.initialized) {
    window.__GENGAGEAI_ASSISTANT__.widget?.open();
    console.log('[GengageAI] Asistan zaten güncel.');
    return;
  }

  const script = document.createElement('script');
  script.id = 'gengageai-assistant-loader';
  script.src = `${BUNDLE_URL}?v=${VERSION}`;
  script.async = true;
  script.onload = () => console.log('[GengageAI] Bundle yüklendi (v' + VERSION + ').');
  script.onerror = () => console.error('[GengageAI] Bundle yüklenemedi:', BUNDLE_URL);
  document.head.appendChild(script);
})();
