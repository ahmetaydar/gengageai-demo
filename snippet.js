/**
 * Paste this into the browser Console on a Koçtaş PDP.
 * Replace YOUR_DEPLOY_URL with your hosted bundle URL after deploy.
 */
(function () {
  if (window.__GENGAGEAI_ASSISTANT__?.initialized) {
    window.__GENGAGEAI_ASSISTANT__.widget?.open();
    return;
  }

  if (document.getElementById('gengageai-assistant-loader')) {
    return;
  }

  const script = document.createElement('script');
  script.id = 'gengageai-assistant-loader';
  script.src = 'https://gengageai-demo.a-aydar2014.workers.dev/bundle.js';
  script.async = true;
  script.onerror = function () {
    console.error('[GengageAI] Bundle yüklenemedi. Deploy URL\'sini kontrol edin.');
  };
  document.head.appendChild(script);
})();
