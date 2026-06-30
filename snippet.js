/**
 * Koçtaş PDP → F12 Console → yapıştır → Enter
 * Not: undefined dönmesi normal değil; aşağıdaki sürüm Promise döner.
 */
(function gengageaiLoad() {
  const BUNDLE_URL = 'https://gengageai-demo.pages.dev/bundle.js';

  if (window.__GENGAGEAI_ASSISTANT__?.initialized) {
    window.__GENGAGEAI_ASSISTANT__.widget?.open();
    return 'GengageAI: asistan zaten yüklü';
  }

  const stale = document.getElementById('gengageai-assistant-loader');
  if (stale) stale.remove();

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = 'gengageai-assistant-loader';
    script.src = BUNDLE_URL;
    script.async = true;
    script.onload = () => resolve('GengageAI: bundle yüklendi, asistan başlıyor…');
    script.onerror = () =>
      reject(
        new Error(
          'Bundle yüklenemedi. Tarayıcıda şu adresi açın: ' + BUNDLE_URL
        )
      );
    document.head.appendChild(script);
  });
})();
