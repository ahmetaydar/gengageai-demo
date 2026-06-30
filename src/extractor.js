const EXPAND_LABELS = [
  'daha fazla göster',
  'daha fazlasını gör',
  'tümünü göster',
  'devamını oku',
];

const NOISE_PATTERNS = [
  /^sepete ekle$/i,
  /^adet$/i,
  /^mağaza/i,
  /^taksit/i,
  /^giriş yap/i,
];

function normalizeText(value) {
  return (value || '').replace(/\s+/g, ' ').trim();
}

function isNoise(text) {
  if (!text || text.length < 2) return true;
  return NOISE_PATTERNS.some((pattern) => pattern.test(text));
}

/**
 * Clicks visible "show more" controls so hidden PDP content becomes extractable.
 */
export async function expandHiddenContent(root = document) {
  const buttons = [...root.querySelectorAll('button, a, [role="button"], span')];
  const targets = buttons.filter((el) => {
    const label = normalizeText(el.textContent).toLowerCase();
    return EXPAND_LABELS.some((needle) => label.includes(needle));
  });

  for (const target of targets.slice(0, 6)) {
    try {
      target.click();
      await new Promise((resolve) => setTimeout(resolve, 120));
    } catch {
      // Ignore elements that cannot be clicked.
    }
  }
}

function parseKeyValueTable(table) {
  const rows = {};
  const trs = table.querySelectorAll('tr');

  trs.forEach((tr) => {
    const cells = [...tr.querySelectorAll('th, td')];
    if (cells.length >= 2) {
      const key = normalizeText(cells[0].textContent);
      const value = normalizeText(cells.slice(1).map((c) => c.textContent).join(' '));
      if (key && value && !isNoise(key)) rows[key] = value;
      return;
    }

    const th = tr.querySelector('th');
    const td = tr.querySelector('td');
    if (th && td) {
      const key = normalizeText(th.textContent);
      const value = normalizeText(td.textContent);
      if (key && value && !isNoise(key)) rows[key] = value;
    }
  });

  return rows;
}

function parseDefinitionList(dl) {
  const rows = {};
  dl.querySelectorAll('dt').forEach((dt) => {
    const dd = dt.nextElementSibling;
    if (!dd || dd.tagName !== 'DD') return;
    const key = normalizeText(dt.textContent);
    const value = normalizeText(dd.textContent);
    if (key && value) rows[key] = value;
  });
  return rows;
}

function mergeAttributes(target, source) {
  Object.entries(source).forEach(([key, value]) => {
    if (!target[key]) target[key] = value;
  });
}

function extractTitle(root) {
  const candidates = [
    root.querySelector('h1'),
    root.querySelector('[data-testid="product-name"]'),
    root.querySelector('.product-name'),
    root.querySelector('.prd-name'),
  ].filter(Boolean);

  for (const node of candidates) {
    const text = normalizeText(node.textContent);
    if (text.length > 3) return text;
  }

  return normalizeText(document.title.split('|')[0]);
}

function extractPrice(root) {
  const priceRegex = /(\d{1,3}(?:[.\s]\d{3})*(?:,\d{2})?)\s*TL/i;
  const selectors = [
    '[data-testid="price"]',
    '.price',
    '.product-price',
    '.prd-price',
    '[class*="price"]',
  ];

  for (const selector of selectors) {
    const nodes = root.querySelectorAll(selector);
    for (const node of nodes) {
      const match = normalizeText(node.textContent).match(priceRegex);
      if (match) return `${match[1]} TL`;
    }
  }

  const bodyMatch = normalizeText(root.body?.textContent || '').match(priceRegex);
  return bodyMatch ? `${bodyMatch[1]} TL` : null;
}

function extractProductCode(root) {
  const bodyText = root.body?.textContent || '';
  const labeled = bodyText.match(/ürün kodu\s*:?\s*(\d+)/i);
  if (labeled) return labeled[1];

  const urlMatch = window.location.pathname.match(/\/p\/(\d+)/i);
  return urlMatch ? urlMatch[1] : null;
}

function extractAttributes(root) {
  const attributes = {};

  root.querySelectorAll('table').forEach((table) => {
    mergeAttributes(attributes, parseKeyValueTable(table));
  });

  root.querySelectorAll('dl').forEach((dl) => {
    mergeAttributes(attributes, parseDefinitionList(dl));
  });

  // Koçtaş often renders specs as label/value pairs in div grids.
  root.querySelectorAll('[class*="spec"], [class*="attribute"], [class*="feature"]').forEach((block) => {
    const label = block.querySelector('span, strong, b, label, dt, th');
    const value = block.querySelector('span:last-child, dd, td, p');
    if (!label || !value || label === value) return;
    const key = normalizeText(label.textContent);
    const val = normalizeText(value.textContent);
    if (key && val && key !== val) attributes[key] = val;
  });

  return attributes;
}

function findSectionText(root, headingNeedles) {
  const headings = root.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"], strong, b');

  for (const heading of headings) {
    const label = normalizeText(heading.textContent).toLowerCase();
    if (!headingNeedles.some((needle) => label.includes(needle))) continue;

    const section =
      heading.closest('section, article, div, li') ||
      heading.parentElement;

    if (!section) continue;

    const clone = section.cloneNode(true);
    clone.querySelectorAll('button, script, style, nav').forEach((n) => n.remove());

    const text = normalizeText(clone.textContent);
    const cleaned = text.replace(new RegExp(heading.textContent, 'i'), '').trim();
    if (cleaned.length > 40) return cleaned.slice(0, 2500);
  }

  return null;
}

function extractDescription(root) {
  return (
    findSectionText(root, ['ürün açıklaması', 'ürün özellikleri', 'açıklama']) ||
    findSectionText(root, ['product description'])
  );
}

function extractHighlights(root) {
  const highlights = [];
  const bodyText = root.body?.textContent || '';

  const patterns = [
    /demonte olarak gönderilmektedir/i,
    /kurulum müşteriye aittir/i,
    /ücretsiz kargo/i,
    /garanti/i,
  ];

  patterns.forEach((pattern) => {
    const match = bodyText.match(pattern);
    if (match) highlights.push(normalizeText(match[0]));
  });

  return [...new Set(highlights)];
}

function extractQa(root) {
  const qa = [];
  const blocks = root.querySelectorAll(
    '[class*="question"], [class*="answer"], [class*="soru"], [class*="cevap"], li, article, div'
  );

  blocks.forEach((block) => {
    const text = normalizeText(block.textContent);
    if (!/soru\s*:/i.test(text) || text.length > 700) return;

    const question = text.match(/soru\s*:\s*(.+?)(?:cevap\s*:|$)/i)?.[1]?.trim();
    const answer = text.match(/cevap\s*:\s*(.+)$/i)?.[1]?.trim();

    if (question && answer) {
      qa.push({ question, answer });
    }
  });

  const unique = [];
  const seen = new Set();
  qa.forEach((item) => {
    const key = `${item.question}::${item.answer}`;
    if (seen.has(key)) return;
    seen.add(key);
    unique.push(item);
  });

  return unique.slice(0, 8);
}

function extractFromJsonLd(root) {
  const scripts = [...root.querySelectorAll('script[type="application/ld+json"]')];
  for (const script of scripts) {
    try {
      const data = JSON.parse(script.textContent);
      const nodes = Array.isArray(data) ? data : [data];
      const product = nodes.find((node) => {
        const type = node['@type'];
        return type === 'Product' || (Array.isArray(type) && type.includes('Product'));
      });
      if (!product) continue;

      return {
        title: product.name,
        description: product.description,
        sku: product.sku,
        brand: product.brand?.name,
        price: product.offers?.price
          ? `${product.offers.price} ${product.offers.priceCurrency || 'TRY'}`
          : null,
      };
    } catch {
      // Ignore invalid JSON-LD blocks.
    }
  }
  return null;
}

/**
 * Extracts visible product facts from the current PDP.
 */
export async function extractProductFacts(root = document) {
  await expandHiddenContent(root);

  const jsonLd = extractFromJsonLd(root);
  const attributes = extractAttributes(root);

  const facts = {
    sourceUrl: window.location.href,
    title: extractTitle(root) || jsonLd?.title || 'Bilinmeyen ürün',
    productCode: extractProductCode(root) || jsonLd?.sku || null,
    price: extractPrice(root) || jsonLd?.price || null,
    brand: jsonLd?.brand || null,
    attributes,
    description: extractDescription(root) || jsonLd?.description || null,
    highlights: extractHighlights(root),
    qa: extractQa(root),
    extractedAt: new Date().toISOString(),
  };

  const hasContent =
    Object.keys(facts.attributes).length > 0 ||
    Boolean(facts.description) ||
    facts.qa.length > 0;

  if (!hasContent) {
    throw new Error(
      'Bu sayfada görünür ürün bilgisi bulunamadı. Lütfen bir ürün detay sayfasında deneyin.'
    );
  }

  return facts;
}

export function formatFactsForPrompt(facts) {
  const lines = [
    `Ürün: ${facts.title}`,
    facts.productCode ? `Ürün Kodu: ${facts.productCode}` : null,
    facts.price ? `Fiyat: ${facts.price}` : null,
    facts.brand ? `Marka: ${facts.brand}` : null,
    '',
    'Özellikler:',
  ].filter(Boolean);

  Object.entries(facts.attributes).forEach(([key, value]) => {
    lines.push(`- ${key}: ${value}`);
  });

  if (facts.description) {
    lines.push('', 'Açıklama:', facts.description);
  }

  if (facts.highlights.length) {
    lines.push('', 'Önemli notlar:', ...facts.highlights.map((h) => `- ${h}`));
  }

  if (facts.qa.length) {
    lines.push('', 'Soru & Cevap:');
    facts.qa.forEach(({ question, answer }) => {
      lines.push(`- Soru: ${question}`);
      lines.push(`  Cevap: ${answer}`);
    });
  }

  return lines.join('\n');
}

function findAttribute(attributes, ...needles) {
  for (const [key, value] of Object.entries(attributes)) {
    const normalizedKey = key.toLowerCase();
    if (needles.some((needle) => normalizedKey.includes(needle))) {
      return value;
    }
  }
  return null;
}

/**
 * Builds contextual quick-question chips from the current product facts.
 */
export function generateSampleQuestions(facts) {
  const questions = [];
  const title = (facts.title || '').toLowerCase();
  const attrs = facts.attributes || {};

  const color = findAttribute(attrs, 'renk', 'color');
  const capacity = findAttribute(attrs, 'kapasite', 'kişilik', 'kisi');
  const width = findAttribute(attrs, 'genişlik', 'genislik', 'en');
  const height = findAttribute(attrs, 'yükseklik', 'yukseklik', 'boy');
  const material = findAttribute(attrs, 'malzeme', 'kumaş', 'kumas');
  const storage = findAttribute(attrs, 'çekmeceli', 'cekmeceli', 'depolama', 'hacim');
  const foldable = findAttribute(attrs, 'katlanır', 'katlanir', 'yataklı', 'yatakli');

  if (color) {
    questions.push('Hangi renkte?');
  }

  if (capacity) {
    questions.push('Kaç kişilik?');
  }

  if (storage || /dolap|gardrop|komodin|kanepe|koltuk/i.test(title)) {
    questions.push('Depolama alanı var mı?');
  }

  if (width || height) {
    questions.push('Ölçüleri nedir?');
  }

  if (material) {
    questions.push('Hangi malzemeden yapılmış?');
  }

  if (foldable || /çekyat|yataklı|yatakli|bazalı|bazali/i.test(title)) {
    questions.push('Yatak özelliği var mı?');
  }

  const hasAssemblyNote =
    facts.highlights?.some((note) => /demonte|kurulum/i.test(note)) ||
    /demonte|kurulum/i.test(facts.description || '');

  if (hasAssemblyNote) {
    questions.push('Montaj gerekir mi?');
  }

  if (/kanepe|koltuk|çekyat|oturma/i.test(title)) {
    questions.push('Oturma odası için uygun mu?');
  } else if (/buzdolabı|buzdolabi|çamaşır|camasir|fırın|firin/i.test(title)) {
    questions.push('Enerji tüketimi nedir?');
  } else if (/boya|fırça|firça/i.test(title)) {
    questions.push('Hangi yüzeylerde kullanılır?');
  }

  questions.push('Satın almadan önce neyi kontrol etmeliyim?');

  const unique = [...new Set(questions)];
  if (unique.length < 4) {
    unique.unshift('Bu ürünün temel özellikleri neler?');
  }

  return unique.slice(0, 5);
}
