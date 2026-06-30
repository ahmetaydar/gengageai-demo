var Z=m=>{throw TypeError(m)};var F=(m,g,l)=>g.has(m)||Z("Cannot "+l);var i=(m,g,l)=>(F(m,g,"read from private field"),l?l.call(m):g.get(m)),y=(m,g,l)=>g.has(m)?Z("Cannot add the same private member more than once"):g instanceof WeakSet?g.add(m):g.set(m,l),h=(m,g,l,B)=>(F(m,g,"write to private field"),B?B.call(m,l):g.set(m,l),l),p=(m,g,l)=>(F(m,g,"access private method"),l);(function(){"use strict";var k,N,A,u,w,S,T,b,E,O,L,M,v,P,K,C,c,tt,H,R,q,Q,I;const m=["daha fazla göster","daha fazlasını gör","tümünü göster","devamını oku"],g=[/^sepete ekle$/i,/^adet$/i,/^mağaza/i,/^taksit/i,/^giriş yap/i];function l(e){return(e||"").replace(/\s+/g," ").trim()}function B(e){return!e||e.length<2?!0:g.some(t=>t.test(e))}async function et(e=document){const n=[...e.querySelectorAll('button, a, [role="button"], span')].filter(s=>{const a=l(s.textContent).toLowerCase();return m.some(r=>a.includes(r))});for(const s of n.slice(0,6))try{s.click(),await new Promise(a=>setTimeout(a,120))}catch{}}function st(e){const t={};return e.querySelectorAll("tr").forEach(s=>{const a=[...s.querySelectorAll("th, td")];if(a.length>=2){const d=l(a[0].textContent),f=l(a.slice(1).map(x=>x.textContent).join(" "));d&&f&&!B(d)&&(t[d]=f);return}const r=s.querySelector("th"),o=s.querySelector("td");if(r&&o){const d=l(r.textContent),f=l(o.textContent);d&&f&&!B(d)&&(t[d]=f)}}),t}function nt(e){const t={};return e.querySelectorAll("dt").forEach(n=>{const s=n.nextElementSibling;if(!s||s.tagName!=="DD")return;const a=l(n.textContent),r=l(s.textContent);a&&r&&(t[a]=r)}),t}function X(e,t){Object.entries(t).forEach(([n,s])=>{e[n]||(e[n]=s)})}function it(e){const t=[e.querySelector("h1"),e.querySelector('[data-testid="product-name"]'),e.querySelector(".product-name"),e.querySelector(".prd-name")].filter(Boolean);for(const n of t){const s=l(n.textContent);if(s.length>3)return s}return l(document.title.split("|")[0])}function at(e){var a;const t=/(\d{1,3}(?:[.\s]\d{3})*(?:,\d{2})?)\s*TL/i,n=['[data-testid="price"]',".price",".product-price",".prd-price",'[class*="price"]'];for(const r of n){const o=e.querySelectorAll(r);for(const d of o){const f=l(d.textContent).match(t);if(f)return`${f[1]} TL`}}const s=l(((a=e.body)==null?void 0:a.textContent)||"").match(t);return s?`${s[1]} TL`:null}function rt(e){var a;const n=(((a=e.body)==null?void 0:a.textContent)||"").match(/ürün kodu\s*:?\s*(\d+)/i);if(n)return n[1];const s=window.location.pathname.match(/\/p\/(\d+)/i);return s?s[1]:null}function ot(e){const t={};return e.querySelectorAll("table").forEach(n=>{X(t,st(n))}),e.querySelectorAll("dl").forEach(n=>{X(t,nt(n))}),e.querySelectorAll('[class*="spec"], [class*="attribute"], [class*="feature"]').forEach(n=>{const s=n.querySelector("span, strong, b, label, dt, th"),a=n.querySelector("span:last-child, dd, td, p");if(!s||!a||s===a)return;const r=l(s.textContent),o=l(a.textContent);r&&o&&r!==o&&(t[r]=o)}),t}function J(e,t){const n=e.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"], strong, b');for(const s of n){const a=l(s.textContent).toLowerCase();if(!t.some(x=>a.includes(x)))continue;const r=s.closest("section, article, div, li")||s.parentElement;if(!r)continue;const o=r.cloneNode(!0);o.querySelectorAll("button, script, style, nav").forEach(x=>x.remove());const f=l(o.textContent).replace(new RegExp(s.textContent,"i"),"").trim();if(f.length>40)return f.slice(0,2500)}return null}function lt(e){return J(e,["ürün açıklaması","ürün özellikleri","açıklama"])||J(e,["product description"])}function ct(e){var a;const t=[],n=((a=e.body)==null?void 0:a.textContent)||"";return[/demonte olarak gönderilmektedir/i,/kurulum müşteriye aittir/i,/ücretsiz kargo/i,/garanti/i].forEach(r=>{const o=n.match(r);o&&t.push(l(o[0]))}),[...new Set(t)]}function dt(e){const t=[];e.querySelectorAll('[class*="question"], [class*="answer"], [class*="soru"], [class*="cevap"], li, article, div').forEach(r=>{var x,Y,G,$;const o=l(r.textContent);if(!/soru\s*:/i.test(o)||o.length>700)return;const d=(Y=(x=o.match(/soru\s*:\s*(.+?)(?:cevap\s*:|$)/i))==null?void 0:x[1])==null?void 0:Y.trim(),f=($=(G=o.match(/cevap\s*:\s*(.+)$/i))==null?void 0:G[1])==null?void 0:$.trim();d&&f&&t.push({question:d,answer:f})});const s=[],a=new Set;return t.forEach(r=>{const o=`${r.question}::${r.answer}`;a.has(o)||(a.add(o),s.push(r))}),s.slice(0,8)}function ut(e){var n,s;const t=[...e.querySelectorAll('script[type="application/ld+json"]')];for(const a of t)try{const r=JSON.parse(a.textContent),d=(Array.isArray(r)?r:[r]).find(f=>{const x=f["@type"];return x==="Product"||Array.isArray(x)&&x.includes("Product")});if(!d)continue;return{title:d.name,description:d.description,sku:d.sku,brand:(n=d.brand)==null?void 0:n.name,price:(s=d.offers)!=null&&s.price?`${d.offers.price} ${d.offers.priceCurrency||"TRY"}`:null}}catch{}return null}async function ht(e=document){await et(e);const t=ut(e),n=ot(e),s={sourceUrl:window.location.href,title:it(e)||(t==null?void 0:t.title)||"Bilinmeyen ürün",productCode:rt(e)||(t==null?void 0:t.sku)||null,price:at(e)||(t==null?void 0:t.price)||null,brand:(t==null?void 0:t.brand)||null,attributes:n,description:lt(e)||(t==null?void 0:t.description)||null,highlights:ct(e),qa:dt(e),extractedAt:new Date().toISOString()};if(!(Object.keys(s.attributes).length>0||!!s.description||s.qa.length>0))throw new Error("Bu sayfada görünür ürün bilgisi bulunamadı. Lütfen bir ürün detay sayfasında deneyin.");return s}function pt(e){const t=[`Ürün: ${e.title}`,e.productCode?`Ürün Kodu: ${e.productCode}`:null,e.price?`Fiyat: ${e.price}`:null,e.brand?`Marka: ${e.brand}`:null,"","Özellikler:"].filter(Boolean);return Object.entries(e.attributes).forEach(([n,s])=>{t.push(`- ${n}: ${s}`)}),e.description&&t.push("","Açıklama:",e.description),e.highlights.length&&t.push("","Önemli notlar:",...e.highlights.map(n=>`- ${n}`)),e.qa.length&&(t.push("","Soru & Cevap:"),e.qa.forEach(({question:n,answer:s})=>{t.push(`- Soru: ${n}`),t.push(`  Cevap: ${s}`)})),t.join(`
`)}function z(e,...t){for(const[n,s]of Object.entries(e)){const a=n.toLowerCase();if(t.some(r=>a.includes(r)))return s}return null}function ft(e){var W;const t=[],n=(e.title||"").toLowerCase(),s=e.attributes||{},a=z(s,"renk","color"),r=z(s,"kapasite","kişilik","kisi"),o=z(s,"genişlik","genislik","en"),d=z(s,"yükseklik","yukseklik","boy"),f=z(s,"malzeme","kumaş","kumas"),x=z(s,"çekmeceli","cekmeceli","depolama","hacim"),Y=z(s,"katlanır","katlanir","yataklı","yatakli");a&&t.push("Hangi renkte?"),r&&t.push("Kaç kişilik?"),(x||/dolap|gardrop|komodin|kanepe|koltuk/i.test(n))&&t.push("Depolama alanı var mı?"),(o||d)&&t.push("Ölçüleri nedir?"),f&&t.push("Hangi malzemeden yapılmış?"),(Y||/çekyat|yataklı|yatakli|bazalı|bazali/i.test(n))&&t.push("Yatak özelliği var mı?"),(((W=e.highlights)==null?void 0:W.some(Ct=>/demonte|kurulum/i.test(Ct)))||/demonte|kurulum/i.test(e.description||""))&&t.push("Montaj gerekir mi?"),/kanepe|koltuk|çekyat|oturma/i.test(n)?t.push("Oturma odası için uygun mu?"):/buzdolabı|buzdolabi|çamaşır|camasir|fırın|firin/i.test(n)?t.push("Enerji tüketimi nedir?"):/boya|fırça|firça/i.test(n)&&t.push("Hangi yüzeylerde kullanılır?"),t.push("Satın almadan önce neyi kontrol etmeliyim?");const $=[...new Set(t)];return $.length<4&&$.unshift("Bu ürünün temel özellikleri neler?"),$.slice(0,5)}const j={expectedInputs:[{type:"text",languages:["en"]}],expectedOutputs:[{type:"text",languages:["en"]}]},mt=`You are a product assistant on a Turkish e-commerce product page.
Answer ONLY using the product facts provided below.
Rules:
- Never invent specifications, colors, dimensions, or features.
- If the answer is not clearly supported by the facts, say: "Bu bilgi ürün sayfasında yer almıyor."
- Prefer concise, helpful Turkish answers (1-3 short sentences).
- For buying advice, mention only facts that appear on the page.
- Do not mention that you are an AI model.`;function yt(){return typeof LanguageModel<"u"}async function V(){if(!yt())return{status:"unsupported",message:"Ürün asistanı bu tarayıcıda desteklenmiyor. Güncel Chrome masaüstü sürümünü deneyin."};try{const e=await LanguageModel.availability(j);return e==="unavailable"?{status:"unavailable",message:"Ürün asistanı şu an cihazınızda kullanılamıyor. Chrome güncellemesini ve yeterli depolama alanını kontrol edin."}:{status:e,message:null}}catch(e){return{status:"error",message:(e==null?void 0:e.message)||"Asistan şu an kullanılamıyor."}}}class gt{constructor(){y(this,k,null);y(this,N,"")}async prepare(t,{onDownloadProgress:n}={}){const s=await V();if(s.status==="unsupported"||s.status==="unavailable"){const a=new Error(s.message);throw a.code=s.status,a}return h(this,N,pt(t)),h(this,k,await LanguageModel.create({...j,initialPrompts:[{role:"system",content:mt},{role:"user",content:`Here are the only facts you may use:

${i(this,N)}`},{role:"assistant",content:"Anladım. Yalnızca bu ürün bilgilerine dayanarak Türkçe cevap vereceğim."}],monitor(a){n&&a.addEventListener("downloadprogress",r=>{n(Math.round((r.loaded||0)*100))})}})),i(this,k)}async ask(t,{signal:n,onChunk:s}={}){if(!i(this,k))throw new Error("Asistan henüz hazır değil.");const a=`Kullanıcı sorusu: ${t}

Yalnızca verilen ürün bilgilerine dayanarak Türkçe cevap ver.`;if(s&&typeof i(this,k).promptStreaming=="function"){const o=i(this,k).promptStreaming(a,{signal:n});let d="";for await(const f of o)d+=f,s(d);return d.trim()}return(await i(this,k).prompt(a,{signal:n})).trim()}destroy(){var t,n;(n=(t=i(this,k))==null?void 0:t.destroy)==null||n.call(t),h(this,k,null)}}k=new WeakMap,N=new WeakMap;const bt=["Bu ürünün temel özellikleri neler?","Ölçüleri nedir?","Satın almadan önce neyi kontrol etmeliyim?"],xt=`
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
    margin-top: 14px;
    height: 4px;
    background: #e8f0ec;
    border-radius: 999px;
    overflow: hidden;
  }

  .progress.indeterminate > span {
    width: 40% !important;
    animation: shimmer 1.2s ease-in-out infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(350%); }
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
`;class kt{constructor({onAsk:t}={}){y(this,c);y(this,A);y(this,u);y(this,w);y(this,S);y(this,T);y(this,b);y(this,E);y(this,O);y(this,L);y(this,M);y(this,v);y(this,P);y(this,K,!1);y(this,C,!1);h(this,P,t),p(this,c,tt).call(this)}open(){h(this,K,!0),i(this,w).classList.add("hidden"),i(this,S).classList.remove("hidden")}close(){h(this,K,!1),i(this,S).classList.add("hidden"),i(this,w).classList.remove("hidden")}setPreparing(t="Bir saniye…",n){this.open(),i(this,L).classList.remove("hidden"),i(this,b).classList.add("hidden"),i(this,v).classList.add("hidden"),i(this,u).querySelector("[data-state-title]").textContent="",i(this,u).querySelector("[data-state-text]").textContent=t;const s=i(this,u).querySelector("[data-progress]");s.classList.remove("hidden"),typeof n=="number"?(s.classList.remove("indeterminate"),i(this,M).style.width=`${n}%`):(s.classList.add("indeterminate"),i(this,M).style.width="40%"),p(this,c,q).call(this,!1)}setLoading(t){this.setPreparing(t)}setReady({sampleQuestions:t=bt}={}){var n;(n=i(this,u).querySelector("[data-progress]"))==null||n.classList.add("hidden"),i(this,L).classList.add("hidden"),i(this,b).classList.remove("hidden"),i(this,v).classList.remove("hidden"),i(this,b).innerHTML="",i(this,v).innerHTML="",t.forEach(s=>{const a=document.createElement("button");a.type="button",a.className="chip",a.textContent=s,a.addEventListener("click",()=>p(this,c,Q).call(this,s)),i(this,v).appendChild(a)}),this.addAssistantMessage("Merhaba! Bu ürün hakkında merak ettiklerinizi sorabilirsiniz."),p(this,c,q).call(this,!0)}resetConversation(){i(this,b).innerHTML="",i(this,v).innerHTML="",i(this,b).classList.add("hidden"),i(this,v).classList.add("hidden"),h(this,C,!1),p(this,c,q).call(this,!1)}setUnsupported(t){var n;this.open(),p(this,c,R).call(this,"Şu an kullanılamıyor",t),(n=i(this,u).querySelector("[data-progress]"))==null||n.classList.add("hidden"),p(this,c,q).call(this,!1)}setError(t){var n;this.open(),p(this,c,R).call(this,"Bir sorun oluştu",t),(n=i(this,u).querySelector("[data-progress]"))==null||n.classList.add("hidden"),p(this,c,q).call(this,!1)}addUserMessage(t){i(this,b).classList.remove("hidden"),i(this,L).classList.add("hidden"),i(this,b).appendChild(p(this,c,H).call(this,"user",t)),p(this,c,I).call(this)}addAssistantMessage(t){i(this,b).appendChild(p(this,c,H).call(this,"assistant",t)),p(this,c,I).call(this)}updateAssistantMessage(t,n){t.textContent=n,p(this,c,I).call(this)}addErrorMessage(t){i(this,b).appendChild(p(this,c,H).call(this,"error",t)),p(this,c,I).call(this)}destroy(){var t;(t=i(this,A))==null||t.remove()}}A=new WeakMap,u=new WeakMap,w=new WeakMap,S=new WeakMap,T=new WeakMap,b=new WeakMap,E=new WeakMap,O=new WeakMap,L=new WeakMap,M=new WeakMap,v=new WeakMap,P=new WeakMap,K=new WeakMap,C=new WeakMap,c=new WeakSet,tt=function(){h(this,A,document.createElement("div")),i(this,A).id="gengageai-assistant-root",h(this,u,i(this,A).attachShadow({mode:"open"}));const t=document.createElement("style");t.textContent=xt,i(this,u).appendChild(t),h(this,w,document.createElement("button")),i(this,w).className="launcher",i(this,w).type="button",i(this,w).textContent="Yardım",i(this,w).addEventListener("click",()=>this.open()),h(this,S,document.createElement("section")),i(this,S).className="panel hidden",i(this,S).innerHTML=`
      <header class="header">
        <div class="title-wrap">
          <h2>Ürün Asistanı</h2>
          <p>Size yardımcı olalım</p>
        </div>
        <button class="icon-btn" type="button" data-close aria-label="Kapat">×</button>
      </header>
      <div class="body">
        <div class="state-card" data-state-card>
          <strong data-state-title>Hazırlanıyor</strong>
          <span data-state-text>Bir saniye…</span>
          <div class="progress indeterminate" data-progress>
            <span data-progress-bar></span>
          </div>
        </div>
        <div class="messages hidden" data-messages></div>
        <div class="chips hidden" data-chips></div>
      </div>
      <form class="composer" data-composer>
        <input type="text" placeholder="Örn. hangi renk, kaç kişilik?" autocomplete="off" disabled />
        <button type="submit" disabled>Gönder</button>
      </form>
    `,i(this,u).appendChild(i(this,w)),i(this,u).appendChild(i(this,S)),h(this,T,i(this,u).querySelector(".body")),h(this,b,i(this,u).querySelector("[data-messages]")),h(this,L,i(this,u).querySelector("[data-state-card]")),h(this,M,i(this,u).querySelector("[data-progress-bar]")),h(this,v,i(this,u).querySelector("[data-chips]")),h(this,E,i(this,u).querySelector("input")),h(this,O,i(this,u).querySelector('button[type="submit"]')),i(this,u).querySelector("[data-close]").addEventListener("click",()=>this.close()),i(this,u).querySelector("[data-composer]").addEventListener("submit",n=>{n.preventDefault(),p(this,c,Q).call(this)}),document.documentElement.appendChild(i(this,A))},H=function(t,n){const s=document.createElement("div");return s.className=`message ${t}`,s.textContent=n,s},R=function(t,n){i(this,L).classList.remove("hidden"),i(this,b).classList.add("hidden"),i(this,v).classList.add("hidden"),i(this,u).querySelector("[data-state-title]").textContent=t,i(this,u).querySelector("[data-state-text]").textContent=n},q=function(t){i(this,E).disabled=!t||i(this,C),i(this,O).disabled=!t||i(this,C)},Q=async function(t){const n=wt(t||i(this,E).value);if(!n||i(this,C)||!i(this,P))return;i(this,E).value="",h(this,C,!0),p(this,c,q).call(this,!1),this.addUserMessage(n);const s=p(this,c,H).call(this,"assistant","…");i(this,b).appendChild(s);try{const a=await i(this,P).call(this,n,{onChunk:r=>this.updateAssistantMessage(s,r)});(!s.textContent||s.textContent==="…")&&this.updateAssistantMessage(s,a)}catch(a){s.remove(),this.addErrorMessage((a==null?void 0:a.message)||"Şu an yanıt veremiyorum. Lütfen tekrar deneyin.")}finally{h(this,C,!1),p(this,c,q).call(this,!0),i(this,E).focus()}},I=function(){i(this,T).scrollTop=i(this,T).scrollHeight};function wt(e){return(e||"").replace(/\s+/g," ").trim()}const _="__GENGAGEAI_ASSISTANT__";function D(){const e=window.location.pathname.match(/\/p\/(\d+)/i);return e?e[1]:window.location.href}async function U(e){const{widget:t,assistant:n}=e;t.resetConversation(),t.setPreparing("Bir saniye, ürünü inceliyorum…");const s=await ht(document);t.setPreparing("Asistan hazırlanıyor…"),n.destroy(),await n.prepare(s,{onDownloadProgress:a=>t.setPreparing("Asistan hazırlanıyor…",a)}),e.productKey=D(),t.setReady({sampleQuestions:ft(s)})}function vt(e){let t=e.productKey;const n=()=>{const s=D();s!==t&&(t=s,U(e).catch(a=>{e.widget.setError((a==null?void 0:a.message)||"Yeni ürün yüklenemedi. Sayfayı yenileyip tekrar deneyin.")}))};window.addEventListener("popstate",n),["pushState","replaceState"].forEach(s=>{const a=history[s].bind(history);history[s]=(...r)=>{const o=a(...r);return n(),o}}),window.setInterval(n,1500)}async function St(){var a;const e=window[_];if(e!=null&&e.initialized){D()!==e.productKey?await U(e):(a=e.widget)==null||a.open();return}const t=new gt,n=new kt({onAsk:(r,o)=>t.ask(r,o)}),s={initialized:!0,widget:n,assistant:t,productKey:null};window[_]=s,n.setPreparing("Bir saniye, ürünü inceliyorum…");try{const r=await V();if(r.status==="unsupported"||r.status==="unavailable"){n.setUnsupported(r.message);return}await U(s),vt(s)}catch(r){const o=r==null?void 0:r.code;if(o==="unsupported"||o==="unavailable"){n.setUnsupported(r.message);return}n.setError((r==null?void 0:r.message)||"Asistan şu an başlatılamadı. Sayfayı yenileyip tekrar deneyebilirsiniz.")}}St().catch(e=>{var t,n,s;console.error("[GengageAI]",e),(s=(n=(t=window[_])==null?void 0:t.widget)==null?void 0:n.setError)==null||s.call(n,(e==null?void 0:e.message)||"Asistan başlatılamadı.")})})();
