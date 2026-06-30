var J=p=>{throw TypeError(p)};var Y=(p,g,c)=>g.has(p)||J("Cannot "+c);var a=(p,g,c)=>(Y(p,g,"read from private field"),c?c.call(p):g.get(p)),y=(p,g,c)=>g.has(p)?J("Cannot add the same private member more than once"):g instanceof WeakSet?g.add(p):g.set(p,c),m=(p,g,c,M)=>(Y(p,g,"write to private field"),M?M.call(p,c):g.set(p,c),c),h=(p,g,c)=>(Y(p,g,"access private method"),c);(function(){"use strict";var w,P,C,u,k,v,L,b,A,$,E,z,T,S,d,Q,B,_,q,V,N;const p=["daha fazla göster","daha fazlasını gör","tümünü göster","devamını oku"],g=[/^sepete ekle$/i,/^adet$/i,/^mağaza/i,/^taksit/i,/^giriş yap/i];function c(e){return(e||"").replace(/\s+/g," ").trim()}function M(e){return!e||e.length<2?!0:g.some(t=>t.test(e))}async function W(e=document){const s=[...e.querySelectorAll('button, a, [role="button"], span')].filter(n=>{const i=c(n.textContent).toLowerCase();return p.some(r=>i.includes(r))});for(const n of s.slice(0,6))try{n.click(),await new Promise(i=>setTimeout(i,120))}catch{}}function Z(e){const t={};return e.querySelectorAll("tr").forEach(n=>{const i=[...n.querySelectorAll("th, td")];if(i.length>=2){const l=c(i[0].textContent),f=c(i.slice(1).map(x=>x.textContent).join(" "));l&&f&&!M(l)&&(t[l]=f);return}const r=n.querySelector("th"),o=n.querySelector("td");if(r&&o){const l=c(r.textContent),f=c(o.textContent);l&&f&&!M(l)&&(t[l]=f)}}),t}function j(e){const t={};return e.querySelectorAll("dt").forEach(s=>{const n=s.nextElementSibling;if(!n||n.tagName!=="DD")return;const i=c(s.textContent),r=c(n.textContent);i&&r&&(t[i]=r)}),t}function G(e,t){Object.entries(t).forEach(([s,n])=>{e[s]||(e[s]=n)})}function tt(e){const t=[e.querySelector("h1"),e.querySelector('[data-testid="product-name"]'),e.querySelector(".product-name"),e.querySelector(".prd-name")].filter(Boolean);for(const s of t){const n=c(s.textContent);if(n.length>3)return n}return c(document.title.split("|")[0])}function et(e){var i;const t=/(\d{1,3}(?:[.\s]\d{3})*(?:,\d{2})?)\s*TL/i,s=['[data-testid="price"]',".price",".product-price",".prd-price",'[class*="price"]'];for(const r of s){const o=e.querySelectorAll(r);for(const l of o){const f=c(l.textContent).match(t);if(f)return`${f[1]} TL`}}const n=c(((i=e.body)==null?void 0:i.textContent)||"").match(t);return n?`${n[1]} TL`:null}function st(e){var i;const s=(((i=e.body)==null?void 0:i.textContent)||"").match(/ürün kodu\s*:?\s*(\d+)/i);if(s)return s[1];const n=window.location.pathname.match(/\/p\/(\d+)/i);return n?n[1]:null}function nt(e){const t={};return e.querySelectorAll("table").forEach(s=>{G(t,Z(s))}),e.querySelectorAll("dl").forEach(s=>{G(t,j(s))}),e.querySelectorAll('[class*="spec"], [class*="attribute"], [class*="feature"]').forEach(s=>{const n=s.querySelector("span, strong, b, label, dt, th"),i=s.querySelector("span:last-child, dd, td, p");if(!n||!i||n===i)return;const r=c(n.textContent),o=c(i.textContent);r&&o&&r!==o&&(t[r]=o)}),t}function R(e,t){const s=e.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"], strong, b');for(const n of s){const i=c(n.textContent).toLowerCase();if(!t.some(x=>i.includes(x)))continue;const r=n.closest("section, article, div, li")||n.parentElement;if(!r)continue;const o=r.cloneNode(!0);o.querySelectorAll("button, script, style, nav").forEach(x=>x.remove());const f=c(o.textContent).replace(new RegExp(n.textContent,"i"),"").trim();if(f.length>40)return f.slice(0,2500)}return null}function at(e){return R(e,["ürün açıklaması","ürün özellikleri","açıklama"])||R(e,["product description"])}function it(e){var i;const t=[],s=((i=e.body)==null?void 0:i.textContent)||"";return[/demonte olarak gönderilmektedir/i,/kurulum müşteriye aittir/i,/ücretsiz kargo/i,/garanti/i].forEach(r=>{const o=s.match(r);o&&t.push(c(o[0]))}),[...new Set(t)]}function rt(e){const t=[];e.querySelectorAll('[class*="question"], [class*="answer"], [class*="soru"], [class*="cevap"], li, article, div').forEach(r=>{var x,U,F,X;const o=c(r.textContent);if(!/soru\s*:/i.test(o)||o.length>700)return;const l=(U=(x=o.match(/soru\s*:\s*(.+?)(?:cevap\s*:|$)/i))==null?void 0:x[1])==null?void 0:U.trim(),f=(X=(F=o.match(/cevap\s*:\s*(.+)$/i))==null?void 0:F[1])==null?void 0:X.trim();l&&f&&t.push({question:l,answer:f})});const n=[],i=new Set;return t.forEach(r=>{const o=`${r.question}::${r.answer}`;i.has(o)||(i.add(o),n.push(r))}),n.slice(0,8)}function ot(e){var s,n;const t=[...e.querySelectorAll('script[type="application/ld+json"]')];for(const i of t)try{const r=JSON.parse(i.textContent),l=(Array.isArray(r)?r:[r]).find(f=>{const x=f["@type"];return x==="Product"||Array.isArray(x)&&x.includes("Product")});if(!l)continue;return{title:l.name,description:l.description,sku:l.sku,brand:(s=l.brand)==null?void 0:s.name,price:(n=l.offers)!=null&&n.price?`${l.offers.price} ${l.offers.priceCurrency||"TRY"}`:null}}catch{}return null}async function ct(e=document){await W(e);const t=ot(e),s=nt(e),n={sourceUrl:window.location.href,title:tt(e)||(t==null?void 0:t.title)||"Bilinmeyen ürün",productCode:st(e)||(t==null?void 0:t.sku)||null,price:et(e)||(t==null?void 0:t.price)||null,brand:(t==null?void 0:t.brand)||null,attributes:s,description:at(e)||(t==null?void 0:t.description)||null,highlights:it(e),qa:rt(e),extractedAt:new Date().toISOString()};if(!(Object.keys(n.attributes).length>0||!!n.description||n.qa.length>0))throw new Error("Bu sayfada görünür ürün bilgisi bulunamadı. Lütfen bir ürün detay sayfasında deneyin.");return n}function dt(e){const t=[`Ürün: ${e.title}`,e.productCode?`Ürün Kodu: ${e.productCode}`:null,e.price?`Fiyat: ${e.price}`:null,e.brand?`Marka: ${e.brand}`:null,"","Özellikler:"].filter(Boolean);return Object.entries(e.attributes).forEach(([s,n])=>{t.push(`- ${s}: ${n}`)}),e.description&&t.push("","Açıklama:",e.description),e.highlights.length&&t.push("","Önemli notlar:",...e.highlights.map(s=>`- ${s}`)),e.qa.length&&(t.push("","Soru & Cevap:"),e.qa.forEach(({question:s,answer:n})=>{t.push(`- Soru: ${s}`),t.push(`  Cevap: ${n}`)})),t.join(`
`)}const D={expectedInputs:[{type:"text",languages:["en"]}],expectedOutputs:[{type:"text",languages:["en"]}]},lt=`You are a product assistant on a Turkish e-commerce product page.
Answer ONLY using the product facts provided below.
Rules:
- Never invent specifications, colors, dimensions, or features.
- If the answer is not clearly supported by the facts, say: "Bu bilgi ürün sayfasında yer almıyor."
- Prefer concise, helpful Turkish answers (1-3 short sentences).
- For buying advice, mention only facts that appear on the page.
- Do not mention that you are an AI model.`;function ut(){return typeof LanguageModel<"u"}async function H(){if(!ut())return{status:"unsupported",message:"Ürün asistanı bu tarayıcıda desteklenmiyor. Güncel Chrome masaüstü sürümünü deneyin."};try{const e=await LanguageModel.availability(D);return e==="unavailable"?{status:"unavailable",message:"Ürün asistanı şu an cihazınızda kullanılamıyor. Chrome güncellemesini ve yeterli depolama alanını kontrol edin."}:{status:e,message:null}}catch(e){return{status:"error",message:(e==null?void 0:e.message)||"Asistan şu an kullanılamıyor."}}}class ht{constructor(){y(this,w,null);y(this,P,"")}async prepare(t,{onDownloadProgress:s}={}){const n=await H();if(n.status==="unsupported"||n.status==="unavailable"){const i=new Error(n.message);throw i.code=n.status,i}return m(this,P,dt(t)),m(this,w,await LanguageModel.create({...D,initialPrompts:[{role:"system",content:lt},{role:"user",content:`Here are the only facts you may use:

${a(this,P)}`},{role:"assistant",content:"Anladım. Yalnızca bu ürün bilgilerine dayanarak Türkçe cevap vereceğim."}],monitor(i){s&&i.addEventListener("downloadprogress",r=>{s(Math.round((r.loaded||0)*100))})}})),a(this,w)}async ask(t,{signal:s,onChunk:n}={}){if(!a(this,w))throw new Error("Asistan henüz hazır değil.");const i=`Kullanıcı sorusu: ${t}

Yalnızca verilen ürün bilgilerine dayanarak Türkçe cevap ver.`;if(n&&typeof a(this,w).promptStreaming=="function"){const o=a(this,w).promptStreaming(i,{signal:s});let l="";for await(const f of o)l+=f,n(l);return l.trim()}return(await a(this,w).prompt(i,{signal:s})).trim()}destroy(){var t,s;(s=(t=a(this,w))==null?void 0:t.destroy)==null||s.call(t),m(this,w,null)}}w=new WeakMap,P=new WeakMap;const pt=`
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
`;class ft{constructor({onAsk:t}={}){y(this,d);y(this,C);y(this,u);y(this,k);y(this,v);y(this,L);y(this,b);y(this,A);y(this,$);y(this,E);y(this,z);y(this,T);y(this,S,!1);m(this,T,t),h(this,d,Q).call(this)}open(){a(this,k).classList.add("hidden"),a(this,v).classList.remove("hidden")}close(){a(this,v).classList.add("hidden"),a(this,k).classList.remove("hidden")}setPreparing(t="Bir saniye…",s){this.open(),a(this,E).classList.remove("hidden"),a(this,b).classList.add("hidden"),a(this,u).querySelector("[data-state-title]").textContent="",a(this,u).querySelector("[data-state-text]").textContent=t;const n=a(this,u).querySelector("[data-progress]");n.classList.remove("hidden"),typeof s=="number"?(n.classList.remove("indeterminate"),a(this,z).style.width=`${s}%`):(n.classList.add("indeterminate"),a(this,z).style.width="40%"),h(this,d,q).call(this,!1)}setReady(){var t;(t=a(this,u).querySelector("[data-progress]"))==null||t.classList.add("hidden"),a(this,E).classList.add("hidden"),a(this,b).classList.remove("hidden"),a(this,b).innerHTML="",this.addAssistantMessage("Merhaba! Bu ürün hakkında merak ettiklerinizi sorabilirsiniz."),h(this,d,q).call(this,!0)}resetConversation(){a(this,b).innerHTML="",a(this,b).classList.add("hidden"),m(this,S,!1),h(this,d,q).call(this,!1)}setUnsupported(t){var s;this.open(),h(this,d,_).call(this,"Şu an kullanılamıyor",t),(s=a(this,u).querySelector("[data-progress]"))==null||s.classList.add("hidden"),h(this,d,q).call(this,!1)}setError(t){var s;this.open(),h(this,d,_).call(this,"Bir sorun oluştu",t),(s=a(this,u).querySelector("[data-progress]"))==null||s.classList.add("hidden"),h(this,d,q).call(this,!1)}addUserMessage(t){a(this,b).classList.remove("hidden"),a(this,E).classList.add("hidden"),a(this,b).appendChild(h(this,d,B).call(this,"user",t)),h(this,d,N).call(this)}addAssistantMessage(t){a(this,b).appendChild(h(this,d,B).call(this,"assistant",t)),h(this,d,N).call(this)}updateAssistantMessage(t,s){t.textContent=s,h(this,d,N).call(this)}addErrorMessage(t){a(this,b).appendChild(h(this,d,B).call(this,"error",t)),h(this,d,N).call(this)}destroy(){var t;(t=a(this,C))==null||t.remove()}}C=new WeakMap,u=new WeakMap,k=new WeakMap,v=new WeakMap,L=new WeakMap,b=new WeakMap,A=new WeakMap,$=new WeakMap,E=new WeakMap,z=new WeakMap,T=new WeakMap,S=new WeakMap,d=new WeakSet,Q=function(){m(this,C,document.createElement("div")),a(this,C).id="gengageai-assistant-root",m(this,u,a(this,C).attachShadow({mode:"open"}));const t=document.createElement("style");t.textContent=pt,a(this,u).appendChild(t),m(this,k,document.createElement("button")),a(this,k).className="launcher",a(this,k).type="button",a(this,k).textContent="Yardım",a(this,k).addEventListener("click",()=>this.open()),m(this,v,document.createElement("section")),a(this,v).className="panel hidden",a(this,v).innerHTML=`
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
      </div>
      <form class="composer" data-composer>
        <input type="text" placeholder="Örn. hangi renk, kaç kişilik?" autocomplete="off" disabled />
        <button type="submit" disabled>Gönder</button>
      </form>
    `,a(this,u).appendChild(a(this,k)),a(this,u).appendChild(a(this,v)),m(this,L,a(this,u).querySelector(".body")),m(this,b,a(this,u).querySelector("[data-messages]")),m(this,E,a(this,u).querySelector("[data-state-card]")),m(this,z,a(this,u).querySelector("[data-progress-bar]")),m(this,A,a(this,u).querySelector("input")),m(this,$,a(this,u).querySelector('button[type="submit"]')),a(this,u).querySelector("[data-close]").addEventListener("click",()=>this.close()),a(this,u).querySelector("[data-composer]").addEventListener("submit",s=>{s.preventDefault(),h(this,d,V).call(this)}),document.documentElement.appendChild(a(this,C))},B=function(t,s){const n=document.createElement("div");return n.className=`message ${t}`,n.textContent=s,n},_=function(t,s){a(this,E).classList.remove("hidden"),a(this,b).classList.add("hidden"),a(this,u).querySelector("[data-state-title]").textContent=t,a(this,u).querySelector("[data-state-text]").textContent=s},q=function(t){a(this,A).disabled=!t||a(this,S),a(this,$).disabled=!t||a(this,S)},V=async function(t){const s=mt(t||a(this,A).value);if(!s||a(this,S)||!a(this,T))return;a(this,A).value="",m(this,S,!0),h(this,d,q).call(this,!1),this.addUserMessage(s);const n=h(this,d,B).call(this,"assistant","…");a(this,b).appendChild(n);try{const i=await a(this,T).call(this,s,{onChunk:r=>this.updateAssistantMessage(n,r)});(!n.textContent||n.textContent==="…")&&this.updateAssistantMessage(n,i)}catch(i){n.remove(),this.addErrorMessage((i==null?void 0:i.message)||"Şu an yanıt veremiyorum. Lütfen tekrar deneyin.")}finally{m(this,S,!1),h(this,d,q).call(this,!0),a(this,A).focus()}},N=function(){a(this,L).scrollTop=a(this,L).scrollHeight};function mt(e){return(e||"").replace(/\s+/g," ").trim()}const I="__GENGAGEAI_ASSISTANT__",gt="2";function O(){const e=window.location.pathname.match(/\/p\/(\d+)/i);return e?e[1]:window.location.href}async function K(e){const{widget:t,assistant:s}=e;t.resetConversation(),t.setPreparing("Bir saniye, ürünü inceliyorum…");const n=await ct(document);t.setPreparing("Asistan hazırlanıyor…"),s.destroy(),await s.prepare(n,{onDownloadProgress:i=>t.setPreparing("Asistan hazırlanıyor…",i)}),e.productKey=O(),t.setReady()}function yt(e){let t=e.productKey;const s=()=>{const n=O();n!==t&&(t=n,K(e).catch(i=>{e.widget.setError((i==null?void 0:i.message)||"Yeni ürün yüklenemedi. Sayfayı yenileyip tekrar deneyin.")}))};window.addEventListener("popstate",s),["pushState","replaceState"].forEach(n=>{const i=history[n].bind(history);history[n]=(...r)=>{const o=i(...r);return s(),o}}),window.setInterval(s,1500)}async function bt(){var i;const e=window[I];if(e!=null&&e.initialized){O()!==e.productKey?await K(e):(i=e.widget)==null||i.open();return}const t=new ht,s=new ft({onAsk:(r,o)=>t.ask(r,o)}),n={initialized:!0,version:gt,widget:s,assistant:t,productKey:null};window[I]=n,s.setPreparing("Bir saniye, ürünü inceliyorum…");try{const r=await H();if(r.status==="unsupported"||r.status==="unavailable"){s.setUnsupported(r.message);return}await K(n),yt(n)}catch(r){const o=r==null?void 0:r.code;if(o==="unsupported"||o==="unavailable"){s.setUnsupported(r.message);return}s.setError((r==null?void 0:r.message)||"Asistan şu an başlatılamadı. Sayfayı yenileyip tekrar deneyebilirsiniz.")}}bt().catch(e=>{var t,s,n;console.error("[GengageAI]",e),(n=(s=(t=window[I])==null?void 0:t.widget)==null?void 0:s.setError)==null||n.call(s,(e==null?void 0:e.message)||"Asistan başlatılamadı.")})})();
