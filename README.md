# GengageAI Demo – Koçtaş PDP Ürün Asistanı

Koçtaş ürün detay sayfasına yapıştırılabilen, **yalnızca yerel Gemini Nano (Chrome Prompt API)** kullanan hafif bir ürün asistanı.

## Özellikler

- Görünür PDP içeriğinden ürün fact extraction
- Cloud LLM çağrısı yok (ürün cevapları tamamen cihazda)
- Loading / model indirme / hazır / unsupported / error state'leri
- Shadow DOM ile merchant sayfasından izole UI

## Geliştirme

```bash
npm install
npm run dev
```

`index.html` mock PDP ile local test sağlar.

## Build

```bash
npm run build
```

Çıktı: `dist/bundle.js`

## Deploy (Cloudflare Pages örneği)

1. Repoyu GitHub'a push edin
2. Cloudflare Pages → Connect repository
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Deploy sonrası URL örneği: `https://gengageai-demo.pages.dev/bundle.js`

## Console Snippet

`snippet.js` içindeki `YOUR_DEPLOY_URL` değerini deploy URL'nizle değiştirin, sonra Koçtaş PDP'de Console'a yapıştırın:

```javascript
(function () {
  if (window.__GENGAGEAI_ASSISTANT__?.initialized) {
    window.__GENGAGEAI_ASSISTANT__.widget?.open();
    return;
  }
  if (document.getElementById('gengageai-assistant-loader')) return;
  const script = document.createElement('script');
  script.id = 'gengageai-assistant-loader';
  script.src = 'https://YOUR-DEPLOY-URL/bundle.js';
  script.async = true;
  document.head.appendChild(script);
})();
```

## Chrome / Gemini Nano gereksinimleri

- Chrome masaüstü (Windows, macOS 13+, Linux)
- `chrome://flags/#prompt-api-for-gemini-nano` → Enabled
- Model indirmesi için yeterli disk/RAM
- Durum kontrolü: `chrome://on-device-internals`

## Örnek sorular

- Bu kanepe hangi renk?
- Depolama alanı var mı?
- Kaç kişilik?
- Oturma odası için uygun mu?
- Satın almadan önce neyi kontrol etmeliyim?

## Proje yapısı

```
src/
  extractor.js   # PDP fact extraction
  assistant.js   # Prompt API / Gemini Nano
  ui.js          # Chat widget
  main.js        # Bootstrap
dist/
  bundle.js      # Deploy edilecek tek dosya
snippet.js       # Console paste snippet
```

## Video notları

Demoda şunları gösterin:

1. Console snippet paste
2. Ürün sorularına grounded cevaplar
3. Gemini Nano olmayan tarayıcıda unsupported mesajı
4. Hangi kararları siz verdiniz (extraction, prompt, UI state'leri)
