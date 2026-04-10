---
fase: 11
tema: "Arquitetura Monorepo"
dificuldade: avançado
domínio: 70
tags: [monorepos, architecture, workspaces, project-references, flashcards]
revisado: 2026-03-31
---
# Monorepos com TypeScript

Um Monorepo é um único repositório Git que contém **múltiplos projetos/pacotes** (ex: front-end, back-end, libs compartilhadas). Empresas como Google, Meta e Vercel usam monorepos massivos. O TypeScript tem ferramentas nativas para lidar com essa escala.

## O Problema sem Configuração

Imagine a estrutura:
```
meu-monorepo/
├── packages/
│   ├── api/        (Back-end Express)
│   ├── web/        (Front-end React)
│   └── shared/     (Tipos e utils compartilhados)
```

Sem configuração, o `api/` não sabe que o `shared/` existe. Se você importar `import { Usuario } from "../shared"`, o compilador cospe erros e a IDE não dá autocomplete.

## Solução 1: Workspaces (npm/pnpm/yarn)

Os gerenciadores de pacotes modernos criam links simbólicos entre seus pacotes internos:

```json
// package.json (raiz)
{
  "workspaces": ["packages/*"]
}
```

```json
// packages/api/package.json
{
  "dependencies": {
    "@meu/shared": "workspace:*"
  }
}
```

Agora `import { Usuario } from "@meu/shared"` funciona como se fosse um pacote npm normal, mas apontando pra pasta local.

## Solução 2: Project References do TypeScript

O `tsconfig.json` tem um campo nativo chamado `references` que permite ao compilador entender que um pacote **depende** de outro e deve ser compilado na ordem certa:

```json
// packages/api/tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist"
  },
  "references": [
    { "path": "../shared" }
  ]
}
```

```json
// packages/shared/tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "outDir": "./dist"
  }
}
```

### A flag `composite`
Quando `composite: true` está ativada:
- O TS **obriga** você a ter `declaration: true` (gera os `.d.ts`).
- Habilita o **build incremental** (só recompila o que mudou).
- Permite usar o comando mágico: `tsc --build` que compila todos os pacotes na ordem correta de dependência.

```bash
# Compila tudo respeitando a ordem de dependências:
npx tsc --build

# Limpa os caches de build:
npx tsc --build --clean
```

## Solução 3: Path Aliases Compartilhados

No `tsconfig.json` raiz, configure `paths` para criar atalhos de importação:

```json
// tsconfig.json (raiz do monorepo)
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@shared/*": ["packages/shared/src/*"],
      "@api/*": ["packages/api/src/*"]
    }
  }
}
```

> **Atenção**: `paths` só funciona no compilador TS e na IDE. Em runtime (Node.js), você precisa de `tsconfig-paths` ou que o seu bundler (Vite/Webpack) resolva os aliases.

## Ferramentas do Ecossistema

- **Turborepo** (Vercel): Orquestra builds com cache inteligente. Sabe que se o `shared` não mudou, não precisa rebuildar.
- **Nx** (Nrwl): Similar ao Turborepo, com mais features de geração de código e análise de dependências.
- **pnpm workspaces**: O gerenciador de pacotes mais eficiente pra monorepos (usa hard links em vez de copiar `node_modules`).

Monorepos são o padrão de projetos profissionais de grande escala. Dominar Project References e Workspaces é o que separa o dev que "sabe TypeScript" do dev que **arquiteta projetos TypeScript**.

---
## Flashcards
O que é um Monorepo? :: É um único repositório Git que abriga múltiplos projetos (Front, Back, Libs) que podem interagir entre si.
Para que servem os "Project References" do TS? :: Para permitir que o compilador entenda as dependências entre pacotes internos e build apenas o necessário na ordem correta.
Qual a função da flag `composite: true`? :: Habilita builds incrementais rápidos e obriga a geração de arquivos de declaração para pacotes que fazem parte de um conjunto referenciado.

## Conexões
- `composite` e `references`: [[6-tsconfig|tsconfig Profundo]] (Fase 8)
- `declaration: true`: [[3-declaration-files|Declaration Files]] (Fase 8)
- Path aliases: [[configuracao-tsconfig|paths e baseUrl]] (Fase 1)
- Build incremental: [[1-performance-type-checker|Performance]] (Fase 10)
