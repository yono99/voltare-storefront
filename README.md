# VOLTARE Storefront

Loja virtual (customer-facing) de ferramentas elétricas, ferramentas manuais e EPI.
Next.js15 (App Router) + React19 + Tailwind, com identidade visual vermelho/preto
inspirada no estilo automotivo italiano.

## Rodando localmente

```bash
npm install
cp .env.example .env.local # opcional enquanto não houver banco
npm run dev # http://localhost:3000
```

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run typecheck` | Checagem de tipos (`tsc --noEmit`) |
| `npm run lint` | ESLint via Next |

## Estrutura

```
src/
 app/
 page.tsx Home (hero, categorias, destaques)
 produtos/ Catálogo + busca/filtros
 produtos/[slug]/ Detalhe do produto
 categoria/[slug]/ Catálogo por categoria
 carrinho/ Carrinho
 checkout/ Checkout em3 passos
 entrar/ cadastro/ Autenticação do cliente
 conta/ Área do cliente
 api/auth/* register, login, logout, me
 api/orders/ Criação de pedido
 components/ Header, footer, cards, formulários
 lib/ Tipos, dados, carrinho, auth, formatação

database/migrations/001_init.sql Schema compartilhado (categorias, produtos,
 clientes, carrinhos, pedidos)
```

## Autenticação

O cliente autentica separadamente do dashboard de equipe. Sessões usam JWT
assinado (`jose`) em cookie `httpOnly`. O armazenamento em memória em
`src/lib/auth.ts` é um stub de desenvolvimento: troque pelas tabelas
`customers` / `customer_sessions` do Postgres compartilhado quando
`DATABASE_URL` estiver configurada.

## Banco de dados

O schema em `database/migrations/001_init.sql` mantém as tabelas de produto e
categoria compatíveis com o catálogo, e cria as tabelas de cliente/pedido do
storefront. A tabela de funcionários (`users`) pertence ao outro repositório e
não é tocada aqui.

## Identidade visual

- Vermelho primário `#E10600` (`brand`), tons escuros `ink`.
- Tipografia Inter, alto contraste, cantos discretos.
- Componentes utilitários em `globals.css`: `.btn-primary`, `.btn-ghost`,
 `.field`, `.label`, `.card`, `.chip`.
