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

`dev.html` mock PDP ile local test sağlar.

## Build

```bash
npm run build
```

Çıktı: `dist/bundle.js` (+ `dist/index.html`, `dist/_headers`)

## Deploy (Cloudflare Pages)

Cloudflare Dashboard → **Settings → Build**:

| Alan | Değer |
|------|--------|
| Framework preset | **None** |
| Build command | `npm run build` |
| Build output directory | **`dist`** |
| **Deploy command** | **boş** |

**Önemli:** Output `dist` olmazsa `/bundle.js` HTML döner ve asistan çalışmaz.

Deploy sonrası doğrulama — tarayıcıda açın:

`https://gengageai-demo.pages.dev/bundle.js`

İlk satır `(function` ile başlamalı. HTML görürseniz build output yanlıştır.

Bundle URL: `https://gengageai-demo.pages.dev/bundle.js`

## Console Snippet

Koçtaş PDP'de Console'a yapıştırın (`snippet.js`):

```javascript
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
    script.onload = () => resolve('GengageAI: bundle yüklendi');
    script.onerror = () => reject(new Error('Bundle yüklenemedi: ' + BUNDLE_URL));
    document.head.appendChild(script);
  });
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
