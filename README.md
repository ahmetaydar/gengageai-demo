# GengageAI Demo – Koçtaş PDP Ürün Asistanı

Koçtaş ürün detay sayfasına yapıştırılabilen, **yalnızca yerel Gemini Nano (Chrome Prompt API)** kullanan hafif bir ürün asistanı.

## Özellikler

- Görünür PDP içeriğinden ürün bilgisi çıkarma
- Cloud LLM yok — cevaplar cihazda üretilir
- Loading / hazır / unsupported / error state'leri
- Shadow DOM ile sayfadan izole UI

## Geliştirme

```bash
npm install
npm run dev
```

`dev.html` mock PDP ile local test sağlar.

## Build & Deploy (Cloudflare Workers)

```bash
npm run deploy
```

Wrangler `deploy/` klasörünü yayınlar. Git CI kullanıyorsanız:

| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |

Kod değişikliğinden sonra push öncesi:

```bash
npm run build
git add deploy/bundle.js
git push
```

Bundle URL: `https://gengageai-demo.a-aydar2014.workers.dev/bundle.js`

## Console Snippet

Koçtaş PDP → F12 Console → `snippet.js` içeriğini yapıştırın.

## Chrome / Gemini Nano

- Chrome masaüstü (Windows, macOS 13+, Linux)
- `chrome://flags/#prompt-api-for-gemini-nano` → Enabled
- İlk kullanımda model indirmesi gerekebilir

## Proje yapısı

```
src/
  extractor.js   # PDP fact extraction
  assistant.js   # Prompt API / Gemini Nano
  ui.js          # Chat widget
  main.js        # Bootstrap
deploy/
  bundle.js      # Worker'a deploy edilen bundle
  _headers       # CORS headers
snippet.js       # Console paste snippet
wrangler.jsonc   # Cloudflare Workers config
```
