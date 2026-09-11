import type { Category, Product } from "./types";

export const categories: Category[] = [
 {
 slug: "ferramentas-eletricas",
 name: "Ferramentas Elétricas",
 tagline: "Potência para produção",
 description: "Furadeiras, esmerilhadeiras, serras e parafusadeiras de alto torque.",
 },
 {
 slug: "ferramentas-manuais",
 name: "Ferramentas Manuais",
 tagline: "Precisão no detalhe",
 description: "Chaves, alicates, martelos e kits para o dia a dia da obra.",
 },
 {
 slug: "epi-seguranca",
 name: "EPI e Segurança",
 tagline: "Proteção certificada",
 description: "Capacetes, luvas, óculos e proteção auditiva com certificação.",
 },
];

export const products: Product[] = [
 {
 id: "p_001",
 sku: "VLT-FUR-850",
 slug: "furadeira-de-impacto-voltare-pro-850w",
 name: "Furadeira de Impacto VOLTARE Pro850W",
 brand: "VOLTARE",
 categorySlug: "ferramentas-eletricas",
 shortDescription: "Mandril de1/2\" e2.980 rpm para concreto e alvenaria.",
 description:
 "A Furadeira de Impacto VOLTARE Pro850W entrega torque constante em concreto, alvenaria e madeira. Corpo em nylon reforçado com fibra de vidro, punho auxiliar de360° e sistema de ventilação que mantém a temperatura estável em uso contínuo.",
 priceCents:44990,
 compareAtCents:54990,
 stock:42,
 rating:4.8,
 reviewCount:327,
 badge: "mais-vendido",
 specs: [
 { label: "Potência", value: "850 W" },
 { label: "Rotação", value: "0 –2.980 rpm" },
 { label: "Mandril", value: '1/2" (13 mm)' },
 { label: "Tensão", value: "220 V" },
 { label: "Peso", value: "2,1 kg" },
 ],
 },
 {
 id: "p_002",
 sku: "VLT-ESM-1200",
 slug: "esmerilhadeira-angular-voltare-1200w",
 name: "Esmerilhadeira Angular VOLTARE1200W",
 brand: "VOLTARE",
 categorySlug: "ferramentas-eletricas",
 shortDescription: "Disco de4.1/2\" com proteção contra rearme acidental.",
 description:
 "Motor de1.200 W com rotação de11.000 rpm para corte e desbaste em metal. Empunhadura lateral antivibração e proteção ajustável sem chave.",
 priceCents:38990,
 stock:30,
 rating:4.7,
 reviewCount:189,
 specs: [
 { label: "Potência", value: "1.200 W" },
 { label: "Rotação", value: "11.000 rpm" },
 { label: "Disco", value: '4.1/2"' },
 { label: "Tensão", value: "220 V" },
 ],
 },
 {
 id: "p_003",
 sku: "VLT-PAR-20V",
 slug: "parafusadeira-voltare-20v-brushless",
 name: "Parafusadeira VOLTARE20V Brushless",
 brand: "VOLTARE",
 categorySlug: "ferramentas-eletricas",
 shortDescription: "Motor brushless,2 baterias2.0 Ah e maleta.",
 description:
 "Kit completo com motor brushless de alta eficiência,21 posições de torque e luz LED integrada. Acompanha2 baterias de2.0 Ah, carregador rápido e maleta rígida.",
 priceCents:67990,
 compareAtCents:79990,
 stock:18,
 rating:4.9,
 reviewCount:412,
 badge: "oferta",
 specs: [
 { label: "Torque", value: "60 Nm" },
 { label: "Bateria", value: "2x20 V /2.0 Ah" },
 { label: "Mandril", value: '1/2"' },
 { label: "Inclui", value: "Maleta + carregador" },
 ],
 },
 {
 id: "p_004",
 sku: "VLT-SER-CIR",
 slug: "serra-circular-voltare-1400w",
 name: "Serra Circular VOLTARE1400W",
 brand: "VOLTARE",
 categorySlug: "ferramentas-eletricas",
 shortDescription: "Lâmina de7.1/4\" com guia paralela e base em alumínio.",
 description:
 "Corte preciso em madeira com base em alumínio fundido, ajuste de profundidade e inclinação até45°. Acompanha guia paralela e chave de troca de lâmina.",
 priceCents:52990,
 stock:12,
 rating:4.6,
 reviewCount:96,
 specs: [
 { label: "Potência", value: "1.400 W" },
 { label: "Lâmina", value: '7.1/4"' },
 { label: "Inclinação", value: "0 –45°" },
 { label: "Tensão", value: "220 V" },
 ],
 },
 {
 id: "p_005",
 sku: "VLT-KIT-CHA",
 slug: "jogo-de-chaves-combinadas-voltare-12-pecas",
 name: "Jogo de Chaves Combinadas VOLTARE12 peças",
 brand: "VOLTARE",
 categorySlug: "ferramentas-manuais",
 shortDescription: "Aço cromo-vanádio com acabamento fosco anticorrosão.",
 description:
 "12 chaves combinadas de8 a19 mm em aço cromo-vanádio forjado. Acabamento fosco que reduz deslizamento e resiste à corrosão. Organizador de parede incluso.",
 priceCents:18990,
 compareAtCents:22990,
 stock:60,
 rating:4.8,
 reviewCount:254,
 badge: "mais-vendido",
 specs: [
 { label: "Material", value: "Cromo-vanádio" },
 { label: "Medidas", value: "8 a19 mm" },
 { label: "Peças", value: "12" },
 ],
 },
 {
 id: "p_006",
 sku: "VLT-ALI-UNI",
 slug: "alicate-universal-voltare-8-polegadas",
 name: "Alicate Universal VOLTARE8\"",
 brand: "VOLTARE",
 categorySlug: "ferramentas-manuais",
 shortDescription: "Cabo isolado1000 V e corte temperado.",
 description:
 "Alicate universal com cabo ergonômico isolado até1000 V e fio temperado para corte de arame. Articulação precisa com baixo folga.",
 priceCents:7990,
 stock:120,
 rating:4.7,
 reviewCount:143,
 specs: [
 { label: "Comprimento", value: '8" (200 mm)' },
 { label: "Isolação", value: "1000 V" },
 { label: "Material", value: "Aço cromo-vanádio" },
 ],
 },
 {
 id: "p_007",
 sku: "VLT-TRE-5M",
 slug: "trena-a-laser-voltare-5m",
 name: "Trena a Laser VOLTARE5m",
 brand: "VOLTARE",
 categorySlug: "ferramentas-manuais",
 shortDescription: "Medição a laser com precisão de ±2 mm.",
 description:
 "Mede distâncias de até5 m com precisão de ±2 mm. Display retroiluminado, cálculo de área e volume e trava de medição.",
 priceCents:12990,
 stock:75,
 rating:4.5,
 reviewCount:88,
 badge: "novo",
 specs: [
 { label: "Alcance", value: "5 m" },
 { label: "Precisão", value: "±2 mm" },
 { label: "Funções", value: "Área, volume, Pitágoras" },
 ],
 },
 {
 id: "p_008",
 sku: "VLT-MAR-01",
 slug: "martelo-de-unha-voltare-27mm",
 name: "Martelo de Unha VOLTARE27mm",
 brand: "VOLTARE",
 categorySlug: "ferramentas-manuais",
 shortDescription: "Cabeça forjada e cabo em fibra de vidro.",
 description:
 "Cabeça de aço forjado com tratamento térmico e cabo em fibra de vidro que absorve impacto. Empunhadura emborrachada antiderrapante.",
 priceCents:6990,
 stock:90,
 rating:4.6,
 reviewCount:61,
 specs: [
 { label: "Peso", value: "600 g" },
 { label: "Cabeça", value: "Aço forjado" },
 { label: "Cabo", value: "Fibra de vidro" },
 ],
 },
 {
 id: "p_009",
 sku: "VLT-EPI-CAP",
 slug: "capacete-de-seguranca-voltare-aba-frontal",
 name: "Capacete de Segurança VOLTARE Aba Frontal",
 brand: "VOLTARE SAFETY",
 categorySlug: "epi-seguranca",
 shortDescription: "Certificado CA, com catraca de ajuste.",
 description:
 "Capacete classe B com suspensão de6 pontos e catraca de ajuste rápido. Resistente a impacto e à penetração, com certificação CA.",
 priceCents:8990,
 stock:140,
 rating:4.8,
 reviewCount:202,
 badge: "mais-vendido",
 specs: [
 { label: "Classe", value: "B" },
 { label: "Ajuste", value: "Catraca" },
 { label: "Certificação", value: "CA" },
 ],
 },
 {
 id: "p_010",
 sku: "VLT-EPI-LUV",
 slug: "luva-de-seguranca-voltare-couro-vaqueta",
 name: "Luva de Segurança VOLTARE Couro Vaqueta",
 brand: "VOLTARE SAFETY",
 categorySlug: "epi-seguranca",
 shortDescription: "Reforço na palma e punho elástico.",
 description:
 "Luva em couro vaqueta com reforço na palma para uso em solda leve e manuseio de materiaisásperos. Punho elástico e costura reforçada.",
 priceCents:4990,
 compareAtCents:6490,
 stock:200,
 rating:4.6,
 reviewCount:117,
 badge: "oferta",
 specs: [
 { label: "Material", value: "Couro vaqueta" },
 { label: "Tamanhos", value: "M, G, GG" },
 { label: "Certificação", value: "CA" },
 ],
 },
 {
 id: "p_011",
 sku: "VLT-EPI-OCU",
 slug: "oculos-de-protecao-voltare-antiembacante",
 name: "Óculos de Proteção VOLTARE Antiembaçante",
 brand: "VOLTARE SAFETY",
 categorySlug: "epi-seguranca",
 shortDescription: "Lente policarbonato com tratamento antiembaçante.",
 description:
 "Óculos de proteção com lente em policarbonato e tratamento antiembaçante e antirrisco. Hastes ajustáveis e proteção lateral.",
 priceCents:3990,
 stock:180,
 rating:4.5,
 reviewCount:74,
 specs: [
 { label: "Lente", value: "Policarbonato" },
 { label: "Tratamento", value: "Antiembaçante" },
 { label: "Certificação", value: "CA" },
 ],
 },
 {
 id: "p_012",
 sku: "VLT-EPI-ABF",
 slug: "abafador-de-ruido-voltare-25db",
 name: "Abafador de Ruído VOLTARE25dB",
 brand: "VOLTARE SAFETY",
 categorySlug: "epi-seguranca",
 shortDescription: "Redução de25 dB com arco ajustável.",
 description:
 "Protetor auditivo tipo concha com atenuação de25 dB. Arco ajustável e almofadas macias para uso prolongado.",
 priceCents:9990,
 stock:95,
 rating:4.7,
 reviewCount:132,
 badge: "novo",
 specs: [
 { label: "Atenuação", value: "25 dB" },
 { label: "Tipo", value: "Concha" },
 { label: "Certificação", value: "CA" },
 ],
 },
];

export function getProductBySlug(slug: string): Product | undefined {
 return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
 return categories.find((c) => c.slug === slug);
}

export function productsByCategory(slug: string): Product[] {
 return products.filter((p) => p.categorySlug === slug);
}
