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

## Deploy (önerilen: Cloudflare Workers)

Bu proje statik bir `bundle.js` sunar. **Workers static assets** ile deploy etmek en sorunsuz yol.

```bash
npm install
npm run deploy
```

Bu komut `npm run build` + `wrangler deploy` çalıştırır.

### Cloudflare Dashboard (Git → Worker)

**Settings → Build** alanlarını şöyle ayarlayın:

| Alan | Değer |
|------|--------|
| Build command | `npm run build` |
| **Deploy command** | `npx wrangler deploy` |

**veya** tek satırda (build command boş):

| Alan | Değer |
|------|--------|
| Build command | *(boş)* |
| **Deploy command** | `npm run deploy` |

Hata `dist does not exist` → deploy öncesi build çalışmıyor demektir. `npx wrangler deploy` tek başına yetmez.

Bundle URL:

`https://gengageai-demo.a-aydar2014.workers.dev/bundle.js`

Doğrulama: URL'yi tarayıcıda açın, ilk satır `(function` ile başlamalı.

### Cloudflare Pages (opsiyonel)

Pages kullanacaksanız:

| Alan | Değer |
|------|--------|
| Framework preset | **None** |
| Build command | `npm run build` |
| Build output directory | **`dist`** |
| Deploy command | **boş** |

Bazı ağlarda `*.pages.dev` zaman aşımı verebilir; bu yüzden Workers tercih edilir.

## Console Snippet

Koçtaş PDP'de Console'a yapıştırın (`snippet.js`):

```javascript
(function () {
  const BUNDLE_URL = 'https://gengageai-demo.a-aydar2014.workers.dev/bundle.js';
  if (window.__GENGAGEAI_ASSISTANT__?.initialized) {
    window.__GENGAGEAI_ASSISTANT__.widget?.open();
    return;
  }
  document.getElementById('gengageai-assistant-loader')?.remove();
  const script = document.createElement('script');
  script.id = 'gengageai-assistant-loader';
  script.src = BUNDLE_URL;
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
