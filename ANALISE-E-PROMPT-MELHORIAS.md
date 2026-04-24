# InstaSolutions — Análise de Site + Prompt para Claude Code

**Preparado para:** Winner (General Manager)
**Data:** 23/Abr/2026
**Repositório:** `/Users/winnervinicius/Desktop/instasolutions-site-main`
**Stack detectada:** React 18 + TypeScript 5 + Vite 5 + Tailwind 3 + Framer Motion + React Router v6 + Lucide React + React Helmet
**Deploy:** Vercel (SPA rewrites em `vercel.json`)
**Domínio:** https://frotainstasolutions.com.br

---

## PARTE 1 — DIAGNÓSTICO TÉCNICO E DE NEGÓCIO

### 1.1 O que o site vende hoje (entendimento do produto)

InstaSolutions é uma **plataforma SaaS B2B de gestão de frotas** que une três módulos (Manutenção, Abastecimento, Rastreamento) a uma **rede credenciada de 500+ oficinas e postos**. Modelo híbrido: software + marketplace de serviços intermediados. Clientes-alvo: transportadoras, locadoras, órgãos públicos, empresas com 1 a 500+ veículos. Matriz em Barueri (SP), filiais em Campo Grande (MS), Fortaleza (CE) e Port Saint Lucie (FL, EUA). Fundada em 16/09/2022.

### 1.2 Identidade visual atual (tokens reais extraídos do código)

| Token | Valor | Uso |
|---|---|---|
| `azulTech` | `#005BED` | CTA, links, ícones de destaque, gradientes |
| `azulCorp` | `#251C59` | Títulos, accent escuro, footer, theme-color |
| `bgPill` | `#F3F6FF` | Backgrounds suaves, pills de navegação |
| `borderPill` | `#D6E2FF` | Bordas de pills e cards |
| Fonte | `system-ui` stack (sem fonte própria) | Todo o site |
| Radius | `rounded-xl` (12px) / `rounded-2xl` (16px) / `rounded-3xl` (24px) | Botões / imagens / containers |
| Signature | `clip-path: polygon(8% 0, 100% 0, 100% 75%, 92% 100%, 0 100%, 0 25%)` | Botões `GeoButton` — cantos angulados |

A paleta azul tech + azul corporate é adequada e deve ser preservada. O que precisa mudar é **como** ela é aplicada (hierarquia, contraste, consistência).

### 1.3 Arquitetura de código — o grande problema estrutural

**Tudo está dentro de `src/App.tsx` com ~2.840 linhas.** Lá moram: o `LanguageProvider`, o objeto `translations` com 190+ chaves em PT/EN, todos os componentes de UI (`Card`, `GeoButton`, `Input`, `NavPill`, `NavDropdown`, carrossel, banners), e as 14 páginas (HomePage, SolucoesPage, RedePage, SobrePage, QuemSomosPage, ContatoPage, ObrigadoPage, ParceirosCredenciarPage, ParceirosFornecedoresPage, ParceirosFinanceiroPage, ClientesQueroSerPage, ClientesAcessoPage, ClientesFinanceiroPage, PoliticaPrivacidadePage).

Isso é **o primeiro problema a resolver**. Sem isso, qualquer melhoria incremental vira sofrimento.

### 1.4 Rotas existentes (14)

```
/                              HomePage
/solucoes                      SolucoesPage (tabs Manutenção/Abastecimento/Rastreamento)
/rede                          RedePage
/sobre                         SobrePage
/quem-somos                    QuemSomosPage
/contato                       ContatoPage
/obrigado                      ObrigadoPage
/parceiros/credenciar          ParceirosCredenciarPage (form grande)
/parceiros/fornecedores        ParceirosFornecedoresPage (acesso sistema)
/parceiros/financeiro          ParceirosFinanceiroPage ("em construção")
/clientes/queroser             ClientesQueroSerPage (form de lead)
/clientes/acesso               ClientesAcessoPage (acesso sistema)
/clientes/financeiro           ClientesFinanceiroPage ("em construção")
/politica-de-privacidade       PoliticaPrivacidadePage (LGPD completa)
```

Falta rota `*` para 404.

### 1.5 O que está BEM feito (preservar)

- React 18 + TS strict + Vite + SWC — stack moderna e rápida.
- Roteamento SPA funcional com `react-router-dom` v6 e `vercel.json` com rewrites.
- `react-helmet` em todas as páginas (title, description, canonical OK por página).
- JSON-LD `Organization` no `index.html` (base para expandir).
- Sistema i18n PT/EN caseiro via Context + objeto `translations` — leve, sem dependência extra, 190+ chaves cobrindo nav, copy, forms, footer.
- Formulários integrados a **FormSubmit.co** para `comercial@instasolutions.com.br` (funcional, mas frágil — ver problemas).
- Conteúdo de **Política de Privacidade** completo e aderente à LGPD (um ativo sério).
- Banco de imagens grande: 42 PNGs cobrindo home, módulos, rede, sobre, acessos.
- Tailwind bem configurado (sem abuso de `!important`, sem CSS-in-JS paralelo).
- Framer Motion usado com parcimônia (`fadeUp` apenas) — performance preservada.

### 1.6 Problemas reais (críticos → baixos)

#### CRÍTICOS

1. **Monolito `App.tsx` de 2.840 linhas** — qualquer mudança é arriscada, merge conflicts certos, impossível testar componentes isolados.
2. **Sem menu mobile (hamburger)**. A navbar atual é uma barra horizontal de pills com dropdown por hover. Em < 860px ela quebra, e hover não existe em touch — o usuário móvel fica sem acesso aos submenus de Parceiros e Clientes.
3. **Duplicação de assets.** Existe `public/imagens/` **e** `imagens/` (raiz) com os mesmos 42 PNGs. Bundle inchado e confusão de import.
4. **Formulários longos sem validação de qualidade.**
   - `ParceirosCredenciarPage` e `ClientesQueroSerPage` têm 13+ campos cada.
   - Validação apenas HTML5 nativa (`required`).
   - Sem máscaras em CNPJ, telefone, CEP.
   - Sem feedback inline (erros aparecem só no submit, via `alert()`).
   - Honeypot anti-spam inexistente (`_captcha=false` e FormSubmit sem captcha = alvo fácil).
   - Sem loading state nos botões — usuário clica duas vezes e envia duplicado.
5. **SEO incompleto nos Helmets.**
   - Faltam `og:image`, `og:url`, `og:type`, `twitter:card`, `twitter:image` em todas as páginas.
   - `index.html` não tem `og:*` nenhum.
   - Sem `sitemap.xml`, sem `robots.txt`.
   - JSON-LD só `Organization` — falta `LocalBusiness` (com endereço Alphaville e telefone), `BreadcrumbList` por página, `FAQPage` (seção FAQ nem existe), `Product` para os 3 módulos.
6. **Sem página 404.** Rota desconhecida leva a tela em branco.
7. **Sem analytics nem pixel.** Zero visibilidade de tráfego, conversão de formulário, jornada. Essencial antes de qualquer campanha paga.
8. **Carrosséis ingênuos.** Todas as imagens ficam no DOM simultaneamente, alternando só `opacity`. Em produção (4-5 imagens por carrossel × 3 carrosséis na página /solucoes) isso consome banda sem necessidade. Sem controles prev/next, sem pausar no hover, sem swipe mobile, sem `aria-live`.
9. **Imagens não otimizadas.** 42 PNGs sem WebP/AVIF, sem `srcset`, sem `loading="lazy"`, sem `decoding="async"`, sem `fetchpriority`. Hero carrega 4 imagens full-PNG imediatamente.
10. **Copy de hero genérica.** "Plataforma corporativa para gestão de frotas com módulos integrados" descreve **o quê**, não **o porquê**. Falta promessa concreta (ex.: "Reduza até 18% no custo por quilômetro rodado em 90 dias").
11. **Zero social proof visível.** Site fala em "20+ clientes em 6 estados, 500+ oficinas", mas não mostra logos de clientes, depoimentos, números de casos (km rodados, OS processadas, economia gerada).
12. **Acessibilidade frágil.**
    - Botões `GeoButton` usam `clip-path` — o outline de foco de teclado fica cortado.
    - Carrosséis sem `aria-roledescription="carousel"` nem controles navegáveis por teclado.
    - Labels dos inputs existem, mas não há `aria-describedby` para mensagens de erro.
    - Dropdown abre por `onMouseEnter`/`onMouseLeave` — inutilizável em teclado (sem `onFocus`/`onBlur` correspondentes) e em mobile.
13. **Formulários dependem 100% de FormSubmit.co** com `_captcha=false` e sem rate limit próprio. Fácil de spammar. Risco de DMARC/SPF na caixa de `comercial@` se o volume crescer.

#### MÉDIOS

14. Sem code-splitting por rota (`React.lazy` + `Suspense`). Primeiro carregamento traz todas as 14 páginas de uma vez.
15. Sem `.env` — emails, URLs de sistema e chaves de serviço estão hardcoded em strings no `App.tsx`.
16. Sem Error Boundary global. Um erro em qualquer componente quebra a página inteira.
17. Uso de `alert()` para feedback de formulário — UX pobre e bloqueia a thread.
18. `bgPill` + `azulTech`: verificar contraste. `#005BED` sobre `#F3F6FF` dá ~4.9:1 — passa AA em texto grande, mas falha para texto pequeno.
19. Fonte apenas `system-ui` — visual "default", sem personalidade de marca. Para SaaS B2B corporativo, vale Inter/Geist/Manrope.
20. Footer com ícones sociais clip-path que **não linkam para nada** (visual de botão, comportamento de nada).
21. Página `/parceiros/financeiro` e `/clientes/financeiro` mostram "Em construção" — quebra a experiência. Ou esconde da nav, ou constrói o MVP.
22. Páginas `/sobre` e `/quem-somos` têm **overlap grande de conteúdo**. Decidir se vira uma só ou se cada uma ganha papel distinto (ex.: `/sobre` = produto/tecnologia, `/quem-somos` = história/pessoas).
23. `SolucoesPage` usa tabs com state local — ao navegar direto para `/solucoes#abastecimento` não abre a tab certa. Deveria sincronizar com URL (query param ou hash).
24. Sem breadcrumbs em nenhuma página interna.
25. Sem banner de cookies — exigido LGPD + bom para GDPR quando crescer pra fora do BR.

#### BAIXOS / POLISH

26. `GeoButton` com clip-path angulado está **datado** (tendência 2019-2021). Marcas sérias de SaaS hoje usam cantos `rounded-xl`/`rounded-2xl` sem recortes.
27. Inconsistência de `py-12` / `py-16` / `py-20` entre seções — falta scale definida.
28. Alguns nomes de arquivo têm **caracteres especiais** (`logo_rodapé.png`, `Manutenção.png`, `sobre_operaçãoinstasolutions-1.png`). Funciona, mas quebra em alguns servidores/cdns e dificulta CI. Renomear para kebab-case sem acento.
29. Sem dark mode (opcional, mas útil para dashboards corporativos — o produto em si provavelmente vai ter).
30. Títulos `h1` de várias páginas quase iguais — oportunidade de melhorar SEO por página com keywords distintas.

---

## PARTE 2 — PROMPT PRONTO PARA CLAUDE CODE

Copie **tudo** dentro do bloco abaixo e cole no Claude Code com o repositório `instasolutions-site-main` aberto. O prompt foi escrito para ser executado em uma grande sessão; no final dele há uma nota indicando como fatiar em três se preferir rodar em etapas.

---

### ▼ INÍCIO DO PROMPT ▼

```
# MISSÃO
Você é engenheiro front-end sênior + designer de produto trabalhando no site
institucional da InstaSolutions (SaaS B2B de gestão de frotas, HQ Barueri/SP,
filiais Campo Grande/MS, Fortaleza/CE e Port Saint Lucie/FL-EUA).

Stack atual (PRESERVAR): React 18 + TypeScript strict + Vite 5 + Tailwind 3 +
React Router v6 + React Helmet + Framer Motion + Lucide React.

Problema-raiz: todo o app está em UM arquivo `src/App.tsx` (~2840 linhas).
Todo o resto dos problemas depende de resolver isso primeiro.

Execute TODAS as tarefas abaixo em um branch `feat/site-2026-refresh`,
commits pequenos e semânticos (conventional commits). Ao final, rode
`npm run build`, reporte tamanho do bundle e Lighthouse (mobile + desktop).

# REGRAS DURAS
- NÃO troque a stack. Nada de Next.js, Remix, Astro, Zustand, Redux.
- NÃO mude a paleta de marca: azulTech #005BED, azulCorp #251C59,
  bgPill #F3F6FF, borderPill #D6E2FF.
- Tipografia: adicionar Inter (via Google Fonts, preconnect + display=swap)
  como fonte primária, mantendo fallback system-ui.
- Toda copy nova ENTRA no objeto `translations` em PT e EN. Nenhum texto
  hardcoded em componente.
- Acessibilidade AA: contraste ≥ 4.5:1, focus visível, respeitar
  prefers-reduced-motion, navegação por teclado em carrosséis e dropdowns.
- Mobile-first. Testar em 360, 768, 1024, 1440.
- Lighthouse alvo: Performance ≥ 90, Acessibilidade ≥ 95, Best Practices ≥ 95,
  SEO ≥ 95 (mobile).

# TAREFAS (execute nesta ordem)

## FASE 1 — REFATORAÇÃO ESTRUTURAL (prioridade máxima)

### 1.1 Estrutura de pastas alvo
Crie a árvore:
```
src/
├── main.tsx
├── App.tsx                         // Apenas Router + LanguageProvider + Layout
├── pages/
│   ├── HomePage.tsx
│   ├── SolucoesPage.tsx
│   ├── RedePage.tsx
│   ├── SobrePage.tsx
│   ├── QuemSomosPage.tsx
│   ├── ContatoPage.tsx
│   ├── ObrigadoPage.tsx
│   ├── NotFoundPage.tsx            // NOVA — rota *
│   ├── parceiros/
│   │   ├── CredenciarPage.tsx
│   │   ├── FornecedoresPage.tsx
│   │   └── FinanceiroPage.tsx
│   ├── clientes/
│   │   ├── QueroSerPage.tsx
│   │   ├── AcessoPage.tsx
│   │   └── FinanceiroPage.tsx
│   └── PoliticaPrivacidadePage.tsx
├── components/
│   ├── layout/
│   │   ├── Layout.tsx              // Header + Outlet + Footer + CookieBanner
│   │   ├── Header.tsx              // Desktop nav + mobile hamburger
│   │   ├── MobileMenu.tsx          // NOVO — drawer + overlay
│   │   ├── Footer.tsx
│   │   ├── CookieBanner.tsx        // NOVO — LGPD
│   │   └── Breadcrumbs.tsx         // NOVO
│   ├── navigation/
│   │   ├── NavPill.tsx
│   │   └── NavDropdown.tsx         // Refatorado: hover + focus + click mobile
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── SocialProofStrip.tsx    // NOVO — logos de clientes (placeholders)
│   │   ├── StatsBand.tsx           // NOVO — contadores animados
│   │   ├── TestimonialsCarousel.tsx// NOVO
│   │   ├── FAQSection.tsx          // NOVO
│   │   └── AppDownloadBanner.tsx
│   └── ui/
│       ├── Button.tsx              // Substitui GeoButton (sem clip-path)
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Textarea.tsx
│       ├── Checkbox.tsx
│       ├── Badge.tsx
│       ├── Toast.tsx               // NOVO — substitui alert()
│       ├── Spinner.tsx             // NOVO
│       ├── Carousel.tsx            // NOVO — acessível, teclado, swipe
│       └── SEOHead.tsx             // NOVO — wrapper do react-helmet
├── hooks/
│   ├── useLanguage.ts
│   ├── useToast.ts
│   ├── useLockBodyScroll.ts        // para mobile menu/modais
│   ├── useMediaQuery.ts
│   └── useIntersection.ts          // fade-up + contadores
├── lib/
│   ├── translations.ts             // Move o objeto I18N para cá
│   ├── constants.ts                // COLORS, APP_URLS, CONTACT_INFO
│   ├── formUtils.ts                // máscaras CNPJ/CPF/telefone/CEP
│   ├── validators.ts               // validações puras (emails, CNPJ)
│   └── seo.ts                      // gerador de JSON-LD
├── contexts/
│   └── LanguageContext.tsx
├── types/
│   └── index.ts
└── index.css
```

### 1.2 Regra de refatoração
- Nenhum componente novo > 250 linhas.
- `App.tsx` final deve ter **no máximo 80 linhas** (Router + Provider + Layout).
- Remover **completamente** o objeto `translations` do App.tsx e mover
  para `lib/translations.ts`, exportando `type TranslationKey` tipada.
- `useLanguage()` volta com `t: (key: TranslationKey) => string` tipado.
- Qualquer copy nova obriga adicionar chave em PT e EN.

### 1.3 Code splitting por rota
Use `React.lazy` + `Suspense` com fallback `<Spinner fullPage />` para todas
as páginas, exceto `HomePage` (eager).

### 1.4 Limpeza de assets
- Apagar a pasta `/imagens` da raiz (duplicada de `/public/imagens`).
- Renomear arquivos com acento e espaço para kebab-case:
  `Manutenção.png` → `manutencao.png`, `logo_rodapé.png` → `logo-rodape.png`,
  `sobre_operaçãoinstasolutions-1.png` → `sobre-operacao-1.png`, etc.
- Atualizar todos os imports afetados.

## FASE 2 — HEADER, FOOTER, NAVEGAÇÃO

### 2.1 Header novo
- Logo à esquerda.
- Nav desktop (≥ 1024px): pills horizontais com Solucoes / Rede / Sobre /
  Quem Somos / Contato + dropdown "Parceiros" e "Clientes".
- Nav tablet (768-1023px): comprime para ícones + labels curtos.
- Nav mobile (< 768px): apenas logo + hamburger + CTA primário compacto.
- Telefone clicável e horário visíveis em ≥ 1280px: "📞 (11) 3336-6941 ·
  Seg-Sex 8h-18h".
- Indicador de seção ativa via `NavLink` + classe `.is-active`
  (underline animado azulTech).
- Switch PT/EN com `aria-pressed`.

### 2.2 Mobile menu (drawer)
- Hamburger anima para "X".
- Drawer desliza de cima, overlay `bg-black/60`.
- Fecha em: clique em link, ESC, clique no overlay, swipe up.
- Tranca scroll do body enquanto aberto (`useLockBodyScroll`).
- `aria-expanded`, `aria-controls`, `aria-label` corretos.

### 2.3 Footer completo (4 colunas em ≥ 1024px, empilha em mobile)
| Col 1 | Col 2 | Col 3 | Col 4 |
|---|---|---|---|
| Logo + pitch 1 linha + CNPJ + endereço matriz + telefone + emails | **Produto**: Soluções, Rede, Preços (TODO) | **Empresa**: Sobre, Quem Somos, Blog (TODO), Carreiras (TODO) | **Legal & Contato**: Política de Privacidade, Termos (criar placeholder), Contato, LGPD |

Subfooter:
- Copyright dinâmico.
- Ícones sociais com `href` real (LinkedIn, Instagram, YouTube) — deixar
  TODO onde não houver URL.
- Selos: "LGPD Compliant", "ISO 27001 in progress" (marcar TODO se não tiver).

### 2.4 Cookie banner (LGPD)
Componente `CookieBanner` fixo no rodapé da primeira visita, com botões
"Aceitar", "Rejeitar" e "Preferências" (abrir modal stub). Armazenar consent
em `localStorage` como `{ analytics: bool, timestamp: ISOString }`. Só
disparar analytics se `analytics === true`.

## FASE 3 — HOME REDESIGN

### 3.1 Hero novo
- H1: chave `hero.h1` atualizar para copy de VALOR + NÚMERO:
  PT: "Reduza até 18% do custo operacional da sua frota em 90 dias."
  EN: "Cut up to 18% of your fleet's operating cost in 90 days."
  (marcar `// TODO: validar número com Winner` em comentário)
- Sub (existente ajustada): PT "Manutenção, abastecimento e rastreamento em
  uma plataforma única, conectada a uma rede de 500+ oficinas e postos
  homologados em todo o Brasil." / EN equivalente.
- 3 CTAs hierarquizados:
  1. Primário: "Solicitar demonstração" → `/contato`
  2. Secundário: "Ver soluções" → `/solucoes`
  3. Terciário (texto-link): "Já sou cliente · Acessar sistema" →
     `/clientes/acesso`
- Trust strip abaixo: linha com "LGPD · Integração ELD/ERP · Cobertura
  nacional + USA · 500+ oficinas homologadas", ícones Lucide em cinza claro.

### 3.2 StatsBand (nova, entre hero e módulos)
Grid 4 colunas (2×2 em mobile) com contadores animados (IntersectionObserver
+ requestAnimationFrame):
- "+500 oficinas"
- "+20 clientes corporativos"
- "6 estados atendidos"
- "+30 integrações via API"
Cada stat com ícone Lucide, respeitar `prefers-reduced-motion`
(mostrar número final direto).

### 3.3 SocialProofStrip
Grid com 8 placeholders de logos de clientes em escala de cinza + opacity
.55, hover para 1. Arquivos em `/public/imagens/clientes/logo-cliente-1.svg`
até `logo-cliente-8.svg` — gere SVGs simples com texto "CLIENT 1"..."8" e
deixe `<!-- TODO: Winner substituir por logos reais -->` como comentário.

### 3.4 TestimonialsCarousel (home, antes do "Quem somos")
3 depoimentos placeholder realistas (marcar TODO), auto-rotate 8s,
pause-on-hover, controles prev/next + dots, swipe mobile, `aria-live="polite"`.
Exemplo:
- "Em 4 meses com a InstaSolutions cortamos 23% do custo com manutenção
  corretiva. O app do motorista e o dashboard gerencial eliminaram planilha."
  — Renata Oliveira, Diretora de Operações, Transportadora XYZ (placeholder).
Traduzir PT + EN.

### 3.5 FAQSection (home + também usar em /solucoes)
6 perguntas em `<details>/<summary>` com CSS animado, **sem JS**. Adicionar
`FAQPage` JSON-LD correspondente via `SEOHead`.
Perguntas:
1. Como funciona a rede credenciada de oficinas?
2. Vocês atendem órgãos públicos / licitação?
3. A plataforma integra com o nosso ERP?
4. Quanto tempo leva o onboarding?
5. Vocês atendem frotas fora do Brasil?
6. Qual o modelo de cobrança?

## FASE 4 — PÁGINA /solucoes

- Tabs sincronizadas com URL hash: `/solucoes#manutencao`,
  `#abastecimento`, `#rastreamento` abrem a tab correspondente e
  atualizam ao clicar.
- Cada aba: título + subtítulo curto + grid 2×8 dos 16 recursos (em vez
  de lista <li> gigante — usar pequenos cards com ícone Lucide + label).
- Carrossel do módulo redesenhado com `Carousel.tsx` novo (controles
  acessíveis).
- AppDownloadBanner só na aba Abastecimento (já existe — migrar para
  `components/sections/AppDownloadBanner.tsx` com props).
- JSON-LD `Product` para cada módulo (nome, descrição, brand, areaServed).

## FASE 5 — FORMULÁRIOS

### 5.1 Stack
Adicionar `react-hook-form` (v7) e `zod` + `@hookform/resolvers/zod`.
Criar schemas em `lib/validators.ts`:
- `credenciarSchema` (variantes postos vs linha automotiva)
- `queroSerClienteSchema`
- `contatoSchema`

Máscaras via `lib/formUtils.ts`:
- `maskCNPJ`, `maskCPF`, `maskPhoneBR`, `maskCEP`.
- Validar CNPJ com dígito verificador real.

### 5.2 UX de formulário
- Validação inline ao `onBlur` de cada campo.
- Mensagens de erro associadas por `aria-describedby`.
- Submit desabilita botão + mostra `Spinner` inline + muda label para
  "Enviando...".
- Honeypot: campo hidden `website` (se preenchido, aborta silenciosamente).
- Rate-limit client: bloquear submit em menos de 3s de diferença.
- Substituir **todos** os `alert()` por `Toast` (sucesso/erro) do
  `useToast()`.
- Após sucesso: `navigate('/obrigado')` OU, nos casos de credenciar
  (postos/linha), mostrar o estado de sucesso inline existente com a
  imagem `enviar_formulario.png` e auto-redirect após 6s.

### 5.3 Página /contato
- Layout 2 colunas (form 60% / info 40%).
- Adicionar mapa estático (link Google Maps embed) com endereço da matriz.
- Telefone, WhatsApp (link `wa.me/5511...`), emails clicáveis.
- Manter envio via FormSubmit mas adicionar campo hidden `_honey` e
  `_autoresponse` (PT/EN conforme `language`).

## FASE 6 — SEO, STRUCTURED DATA, ANALYTICS

### 6.1 SEOHead component
`<SEOHead title description canonical ogImage? ogType? jsonLd? noindex?>`
que envolve `react-helmet` e gera:
- `<meta og:*>` (title, description, url, image, type, site_name)
- `<meta twitter:card="summary_large_image">` + twitter:image
- `<link rel="canonical">`
- `<script type="application/ld+json">` quando `jsonLd` recebido

### 6.2 JSON-LD em lib/seo.ts
Funções puras:
- `organizationSchema()` (já existe, enriquecer com `sameAs`, `address`
  completo, `contactPoint.telephone`, `foundingDate: "2022-09-16"`).
- `localBusinessSchema()` — NOVO — com endereço Alphaville, telefone,
  `openingHours`, `geo` (coordenadas de Barueri/SP: -23.5106, -46.8761),
  `priceRange: "$$"`, `areaServed: ["BR","US-FL"]`.
- `breadcrumbSchema(items)`.
- `productSchema({name, description, brand, image})`.
- `faqSchema(items)`.

### 6.3 sitemap.xml e robots.txt
Criar `public/sitemap.xml` estático com as 14 URLs + lastmod.
Criar `public/robots.txt` com:
```
User-agent: *
Allow: /
Disallow: /obrigado
Disallow: /politica-de-privacidade
Sitemap: https://frotainstasolutions.com.br/sitemap.xml
```

### 6.4 index.html
Adicionar no `<head>`:
- `<link rel="canonical" href="https://frotainstasolutions.com.br/">`
- `<meta name="robots" content="index,follow,max-image-preview:large">`
- `<meta property="og:site_name" content="InstaSolutions">`
- `<meta property="og:image" content="https://frotainstasolutions.com.br/imagens/og-default.jpg">`
  (criar `og-default.jpg` 1200×630 com logo + claim — TODO se não houver
  arte, gerar SVG→JPG simples com azulCorp de fundo e logo_topo.png
  centralizada).
- Preconnect Google Fonts + Inter.
- `<meta name="theme-color" content="#251C59">` (já existe, manter).

### 6.5 Analytics
Adicionar Google Analytics 4 via `gtag.js` **apenas após consent**
do CookieBanner. ID em `import.meta.env.VITE_GA_ID` (criar `.env.example`).
Também instalar Vercel Analytics (`@vercel/analytics/react`) — é leve e
não precisa de consent (apenas performance).

## FASE 7 — ACESSIBILIDADE E PERFORMANCE

### 7.1 Acessibilidade
- Substituir `GeoButton` por `Button` sem `clip-path` (mantendo visual
  azulTech sólido + azulCorp outline + gradient para CTA grande). Foco
  keyboard: `ring-2 ring-azulTech/60 ring-offset-2`.
- Todos os carrosséis: `role="region"`, `aria-roledescription="carousel"`,
  `aria-live="polite"` quando auto-rotate, botões prev/next com
  `aria-label`, pause on focus/hover.
- Auditar com `@axe-core/cli` após build: objetivo 0 violations críticas.
- Respeitar `prefers-reduced-motion` em todas as animações (Framer, contadores,
  carrosséis auto-rotate pausam).
- Skip-link "Pular para conteúdo" visível ao focar.

### 7.2 Performance
- Code splitting por rota (já feito na Fase 1).
- `loading="lazy"` + `decoding="async"` em todas as imagens abaixo do fold.
- Hero com `fetchpriority="high"`.
- Gerar WebP/AVIF para todas as imagens de `/public/imagens/` via script
  `scripts/optimize-images.mjs` (use `sharp`; sem sharp disponível, deixe
  TODO documentado no README).
- Servir via `<picture>` com srcset WebP + PNG fallback.
- Fonte Inter com `display=swap` e `preload` das 2 weights usadas (400, 600).
- Remover `framer-motion` de páginas que só usam `fadeUp` simples e
  substituir por CSS `@keyframes` + IntersectionObserver (reduz ~40KB do
  bundle). Manter Framer só onde precisar de gestures.

## FASE 8 — ERROS, OBSERVABILIDADE, DX

### 8.1 Error Boundary
`src/components/ErrorBoundary.tsx` envolvendo `<Outlet />` no Layout.
Página de fallback amigável em PT/EN com botão "Voltar à home" e
`window.location.reload`.

### 8.2 NotFoundPage
Rota `*` com copy humana ("Não encontramos essa página"), ilustração
(usar uma das imagens existentes) e links para principais destinos.

### 8.3 ESLint + Prettier
Configurar `eslint` (flat config v9) com `@typescript-eslint`,
`eslint-plugin-react`, `eslint-plugin-react-hooks`,
`eslint-plugin-jsx-a11y`. Prettier 3 com `.prettierrc` (singleQuote: true,
printWidth: 100, tabWidth: 2). Script `"lint": "eslint . --ext .ts,.tsx"`
no package.json.

### 8.4 Variáveis de ambiente
Criar `.env.example`:
```
VITE_GA_ID=
VITE_FORMSUBMIT_EMAIL=comercial@instasolutions.com.br
VITE_APP_URL_GERAL=https://app.frotainstasolutions.com.br/
VITE_APP_URL_COMBUSTIVEL=https://front.instasolutionscomb.com.br/login
VITE_WHATSAPP=5511333669410
```
Mover todas as constantes hardcoded para `lib/constants.ts` lendo de
`import.meta.env`.

## FASE 9 — CONTEÚDO E COPY

### 9.1 Unificar /sobre e /quem-somos
- `/sobre` = página de PRODUTO + TECNOLOGIA + DIFERENCIAL (foco corporativo).
- `/quem-somos` = página de PESSOAS + HISTÓRIA + CULTURA + TIMELINE.
- Eliminar frases duplicadas entre as duas.

### 9.2 Títulos e metas únicos por rota
Cada `SEOHead` com title e description diferentes e keywords relevantes:
- Home: "Gestão de Frotas Integrada | InstaSolutions"
- Soluções: "Manutenção, Abastecimento e Rastreamento de Frotas | InstaSolutions"
- Rede: "Rede Nacional de Oficinas e Postos Credenciados | InstaSolutions"
- Sobre: "Tecnologia e Plataforma para Frotas Corporativas | InstaSolutions"
- Quem Somos: "Nossa História — Fundada em 2022 | InstaSolutions"
- Contato: "Fale Conosco e Solicite uma Demo | InstaSolutions"
- Credenciar Parceiros: "Seja um Parceiro InstaSolutions | Oficinas e Postos"
- Quero ser Cliente: "Solicite uma Proposta para sua Frota | InstaSolutions"

### 9.3 Placeholders de conteúdo
Marcar com `// TODO: Winner` tudo que precisa input humano:
- Logos reais de clientes (8).
- 3 depoimentos reais.
- Número "18% em 90 dias" do hero (validar com métricas reais).
- Foto da equipe/escritório (Quem Somos).
- URLs reais de LinkedIn, Instagram, YouTube.
- Imagem OG padrão 1200×630.
- Blog/Carreiras (quando existirem).

## FASE 10 — DOCUMENTAÇÃO FINAL

### 10.1 README.md
Atualizar com:
- Stack e requisitos (Node 20+).
- Scripts (`dev`, `build`, `preview`, `lint`).
- Estrutura de pastas.
- Variáveis `.env` necessárias.
- Como adicionar uma nova página (passo a passo).
- Como adicionar uma nova chave i18n.
- Checklist de TODOs deixados no código (gere com
  `grep -rn "TODO" src/ public/`).

### 10.2 CHANGELOG.md
Criar com entrada "2026-04-23 — v2.0 Site Refresh" listando em alto nível
as 10 fases executadas.

### 10.3 Lighthouse report
Rodar `npx lighthouse https://localhost:4173 --view --preset=desktop` e
`--form-factor=mobile`. Anexar resultados no PR como comentário.

# ENTREGÁVEL FINAL

No final da execução, produza uma mensagem estruturada contendo:
1. `git log --oneline` do branch `feat/site-2026-refresh`.
2. Lista de arquivos criados/movidos/deletados (resumo).
3. Tamanho do bundle antes x depois (kb gzipped).
4. Lighthouse scores (mobile: Perf/A11y/BP/SEO).
5. Lista completa dos TODOs deixados no código, agrupados por categoria
   (Conteúdo / URLs / Assets / Métricas).
6. Próximos passos sugeridos (fora do escopo desta rodada): blog MDX,
   landing pages dedicadas por vertical (transportadoras / órgãos públicos
   / locadoras), integração com HubSpot/RD, chat (Intercom/Crisp),
   sistema de CMS para copy (Sanity/Payload), A/B testing (Vercel Edge
   Config), PWA.

# RESTRIÇÕES FINAIS
- NÃO suba secrets. Tudo em `.env` e `.env` fica no `.gitignore`.
- NÃO modifique o domínio do FormSubmit sem autorização explícita.
- Se algo estiver ambíguo, prefira a opção mais conservadora e deixe
  `// TODO:` com explicação.
- Se o esforço de uma fase ficar maior que o esperado, abra um PR parcial
  por fase concluída em vez de acumular tudo em um PR gigante.
```

### ▲ FIM DO PROMPT ▲

---

## PARTE 3 — NOTAS DE USO

- **Rodar em 3 sessões se preferir.** Fatiamento natural:
  - **Sessão A** → Fases 1 e 2 (refatoração + header/footer/mobile menu). É o alicerce; sem isso, nada do resto faz sentido. Provavelmente 60-90 min de wall clock.
  - **Sessão B** → Fases 3, 4 e 5 (Home redesign, /solucoes com tabs-URL, formulários com RHF+Zod).
  - **Sessão C** → Fases 6 a 10 (SEO/schemas, acessibilidade/perf, error boundary, conteúdo/copy, docs).
- **TODOs esperados ao final:** logos reais de clientes (8), 3 depoimentos reais, número "18% em 90 dias" validado, foto de equipe, URLs de LinkedIn/Instagram/YouTube, imagem OG 1200×630, endpoint de newsletter, telefone do parágrafo "seg-sex 8-18" do header, SKU/prices se quiser schema Product com `offers`.
- **Antes de mergear:** teste manual em Chrome + Safari + Firefox, em iPhone SE (375px) e iPad, rode `npx @axe-core/cli http://localhost:4173` e confira que erros críticos de acessibilidade são zero.
- **Pós-merge:**
  1. Subir `sitemap.xml` no Google Search Console e no Bing Webmaster.
  2. Configurar GA4 (property + data stream) e colar o ID em `VITE_GA_ID`.
  3. Criar property no Vercel Analytics (grátis no plano hobby).
  4. Monitorar Core Web Vitals por 7 dias antes de considerar o refresh fechado.
- **Próxima rodada (fora deste prompt):** blog técnico em MDX (`/blog`) com 6 posts iniciais focados em keywords como "gestão de frota terceirizada", "integração ELD", "licitação frota pública 14.133"; landing pages por vertical (`/frotas-publicas`, `/transportadoras`, `/locadoras`); integração com HubSpot ou RD Station para captura de leads do formulário; chat widget (Crisp ou Intercom); A/B testing no hero via Vercel Edge Config.
