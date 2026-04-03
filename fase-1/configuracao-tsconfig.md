---
fase: 1
tema: Configuração do tsconfig
dificuldade: iniciante
domínio: 90
tags:
  - tsconfig
  - setup
  - compiler
  - flashcards
revisado: 2026-03-31
---
# Configuração do Ambiente: O `tsconfig.json`

## O que é o `tsconfig.json`?

O `tsconfig.json` é o **arquivo de configuração central** de qualquer projeto TypeScript. Ele diz ao compilador `tsc` **como** ele deve se comportar: quais arquivos compilar, para qual versão do JavaScript gerar, quão rigorosa deve ser a checagem de tipos, onde colocar os arquivos de saída, e muito mais.

Quando você roda `tsc` na raiz de um projeto, ele automaticamente procura por um `tsconfig.json` no diretório atual (e sobe pelos diretórios pais caso não encontre).

---

## Como criar um `tsconfig.json`

Você pode criar manualmente ou usar o comando:

```bash
npx tsc --init
```

Isso gera um `tsconfig.json` com todas as opções comentadas, o que é útil como referência, mas assustador no início. Vamos construir um do zero, entendendo cada linha.

---

## Estrutura Geral

O `tsconfig.json` é um arquivo JSON com algumas seções principais:

```
tsconfig.json
├── compilerOptions    → Como o compilador se comporta
├── include            → Quais arquivos/pastas o TS deve processar
├── exclude            → Quais arquivos/pastas o TS deve ignorar
├── files              → Lista exata de arquivos para compilar (raro de usar)
├── extends            → Herdar configuração de outro tsconfig
└── references         → Referências a sub-projetos (monorepos)
```

As duas mais importantes (e que você vai usar em 100% dos projetos) são `compilerOptions` e `include`.

---

## Exemplo Completo Comentado

Abaixo está um `tsconfig.json` realista para um projeto Node.js moderno. Cada linha tem um comentário explicando **o que faz** e **por que importa**:

```jsonc
{
  // ═══════════════════════════════════════════════════════════
  // compilerOptions — O CORAÇÃO da configuração
  // Controla COMO o TypeScript compila e verifica seu código
  // ═══════════════════════════════════════════════════════════
  "compilerOptions": {

    // ─────────────────────────────────────────────────────────
    // 🎯 TARGET — Para qual versão do JavaScript gerar
    // ─────────────────────────────────────────────────────────

    // Define a versão do ECMAScript do JavaScript GERADO.
    // "ES2022" significa que o JS de saída pode usar recursos até o ES2022
    // (como top-level await, class fields, etc).
    //
    // Se você colocar "ES5", o TypeScript vai CONVERTER arrow functions
    // em functions normais, let/const em var, etc — downleveling.
    //
    // Regra prática:
    //   - Para Node.js 18+: use "ES2022"
    //   - Para Node.js 20+: use "ES2023" ou "ESNext"
    //   - Para browsers modernos: use "ES2020" ou "ES2022"
    //   - Para suportar IE11 (legado): use "ES5"
    "target": "ES2022",

    // ─────────────────────────────────────────────────────────
    // 📦 MODULE — Sistema de módulos do JavaScript gerado
    // ─────────────────────────────────────────────────────────

    // Controla qual sistema de módulos o JS de saída vai usar.
    //
    // "NodeNext" é o recomendado para Node.js moderno — ele respeita
    // o campo "type" do package.json para decidir se gera ESM ou CJS:
    //   - Se package.json tem "type": "module" → gera ESM (import/export)
    //   - Se não tem → gera CJS (require/module.exports)
    //
    // Outras opções comuns:
    //   "CommonJS"  → Sempre gera require() — Node.js legado
    //   "ESNext"    → Sempre gera import/export — para bundlers (Vite, Webpack)
    //   "ES2022"    → ESM até ES2022
    "module": "NodeNext",

    // ─────────────────────────────────────────────────────────
    // 🔍 MODULE RESOLUTION — Como o TS encontra os módulos importados
    // ─────────────────────────────────────────────────────────

    // Quando você escreve `import { foo } from "./bar"`, o TS precisa
    // saber COMO localizar o arquivo "bar". Essa opção define o algoritmo.
    //
    // "NodeNext" segue as regras do Node.js moderno:
    //   - Respeita o campo "exports" do package.json
    //   - Exige extensão em imports relativos (.js, não .ts!)
    //   - Diferencia ESM de CJS
    //
    // Outras opções:
    //   "node"     → Algoritmo clássico do Node (CJS-style, mais permissivo)
    //   "bundler"  → Para projetos com Vite/Webpack (não exige extensões)
    "moduleResolution": "NodeNext",

    // ─────────────────────────────────────────────────────────
    // 📂 DIRETÓRIOS — Onde fica o código fonte e onde vai a saída
    // ─────────────────────────────────────────────────────────

    // Diretório raiz dos seus arquivos .ts de entrada.
    // O TS usa isso para calcular a estrutura de pastas na saída.
    // Se seus fontes estão em src/, coloque "src" aqui.
    "rootDir": "src",

    // Diretório onde os arquivos .js compilados serão gerados.
    // Com rootDir: "src" e outDir: "dist":
    //   src/index.ts        → dist/index.js
    //   src/utils/helper.ts → dist/utils/helper.js
    "outDir": "dist",

    // ─────────────────────────────────────────────────────────
    // 🛡️ STRICT MODE — O modo rigoroso (SEMPRE use true)
    // ─────────────────────────────────────────────────────────

    // "strict": true é um atalho que ATIVA todas essas flags de uma vez:
    //
    //   strictNullChecks        → null e undefined são tipos separados,
    //                             não podem ser atribuídos a qualquer variável
    //   strictFunctionTypes     → Checagem rigorosa dos tipos de parâmetros
    //                             de funções (contravariância correta)
    //   strictBindCallApply     → Checa tipos em .bind(), .call(), .apply()
    //   noImplicitAny           → Erro se o TS não conseguir inferir o tipo
    //                             e ele ficar como 'any' implícito
    //   noImplicitThis          → Erro se 'this' tiver tipo implícito 'any'
    //   alwaysStrict            → Adiciona "use strict" em todo arquivo gerado
    //   strictPropertyInitialization → Propriedades de classe devem ser
    //                                  inicializadas no constructor
    //   useUnknownInCatchVariables   → Variável no catch é 'unknown', não 'any'
    //
    // NUNCA comece um projeto novo com strict: false.
    // É infinitamente mais difícil ativar strict depois do que começar com ele.
    "strict": true,

    // ─────────────────────────────────────────────────────────
    // 🔒 CHECAGENS ADICIONAIS — Além do strict
    // ─────────────────────────────────────────────────────────

    // Erro quando uma variável local é declarada mas nunca lida.
    // Previne "código morto" — variáveis esquecidas no meio do código.
    "noUnusedLocals": true,

    // Erro quando um parâmetro de função nunca é usado.
    // Se precisar ignorar um parâmetro, prefixe com _ (ex: _req)
    "noUnusedParameters": true,

    // Erro se algum caminho em uma função não retorna valor.
    // Evita funções que às vezes retornam undefined sem querer.
    //
    // function dividir(a: number, b: number): number {
    //   if (b !== 0) return a / b;
    //   // ❌ Erro! Este caminho não retorna nada.
    // }
    "noImplicitReturns": true,

    // Erro em fallthrough de switch/case (quando falta break/return).
    // Previne bugs clássicos de switch:
    //
    // switch(x) {
    //   case 1:
    //     console.log("um");
    //     // ❌ Erro! Faltou break — vai cair no case 2
    //   case 2:
    //     console.log("dois");
    // }
    "noFallthroughCasesInSwitch": true,

    // Garante que imports usem casing consistente com o sistema de arquivos.
    // No Windows, "File.ts" e "file.ts" são o mesmo arquivo, mas no
    // Linux/Mac NÃO são. Essa flag evita bugs ao fazer deploy.
    "forceConsistentCasingInFileNames": true,

    // ─────────────────────────────────────────────────────────
    // 🗺️ SOURCE MAPS E DECLARAÇÕES
    // ─────────────────────────────────────────────────────────

    // Gera arquivos .js.map que mapeiam o JS de volta para o .ts original.
    // Essencial para debugging — sem isso, ao debugar, você vê o JS gerado
    // em vez do seu código TypeScript original.
    "sourceMap": true,

    // Gera arquivos .d.ts (declaration files) junto com os .js.
    // Esses arquivos contêm APENAS os tipos (sem implementação) e são
    // necessários se você está criando uma biblioteca que outros vão usar.
    //
    // src/utils.ts (seu código):
    //   export function soma(a: number, b: number): number { return a + b; }
    //
    // dist/utils.d.ts (gerado):
    //   export declare function soma(a: number, b: number): number;
    //
    // dist/utils.js (gerado):
    //   export function soma(a, b) { return a + b; }
    "declaration": true,

    // ─────────────────────────────────────────────────────────
    // ⚡ INTEROPERABILIDADE E CONVENIÊNCIAS
    // ─────────────────────────────────────────────────────────

    // Permite importar módulos CommonJS como se fossem ESM.
    // Sem isso: import * as express from "express"  ← verboso
    // Com isso: import express from "express"        ← limpo
    //
    // Isso funciona porque o TS injeta um helper que trata
    // module.exports como um default export.
    "esModuleInterop": true,

    // Permite importar arquivos .json como módulos:
    //   import config from "./config.json";
    //   console.log(config.porta); // ← com autocomplete!
    // O TS infere os tipos automaticamente a partir do conteúdo do JSON.
    "resolveJsonModule": true,

    // ─────────────────────────────────────────────────────────
    // 🧹 SAÍDA LIMPA
    // ─────────────────────────────────────────────────────────

    // Remove comentários do JavaScript gerado.
    // Útil para produção — diminui o tamanho dos arquivos de saída.
    "removeComments": true,

    // Não gera arquivos .js se houver erros de tipo.
    // Comportamento padrão: o TS gera JS MESMO com erros de tipo.
    // Isso pode ser confuso — você acha que está tudo certo porque
    // o arquivo .js foi gerado, mas na verdade tem erros.
    "noEmitOnError": true,

    // Habilita compilação incremental — o TS salva informações sobre
    // a última compilação em um arquivo .tsbuildinfo, e na próxima vez
    // só recompila os arquivos que mudaram. Muito mais rápido.
    "incremental": true,

    // ─────────────────────────────────────────────────────────
    // 🧪 RECURSOS EXTRAS
    // ─────────────────────────────────────────────────────────

    // Sem isso, cada arquivo .ts é tratado como um script global —
    // variáveis de um arquivo podem vazar para outro.
    // Esta flag força que cada arquivo seja tratado como um módulo isolado,
    // mesmo se ele não tem import/export.
    //
    // Na prática, se você usa import/export em todo lugar (como deveria),
    // essa flag não muda nada. Mas é uma rede de segurança.
    "isolatedModules": true,

    // Permite transpilação arquivo por arquivo, sem depender de
    // informações de outros arquivos. Necessário para ferramentas
    // como Babel, esbuild e SWC que transpilam cada arquivo isoladamente.
    // Já é implicado por isolatedModules em versões recentes.

    // Pula a checagem de tipos dos arquivos .d.ts das bibliotecas
    // em node_modules. Acelera MUITO a compilação (10x ou mais).
    // Desvantagem: se um .d.ts de uma lib tiver erro, você não vai ver.
    // Na prática, vale sempre ativar — libs bem mantidas não têm erros.
    "skipLibCheck": true
  },

  // ═══════════════════════════════════════════════════════════
  // include — QUAIS ARQUIVOS o TypeScript deve processar
  // ═══════════════════════════════════════════════════════════
  //
  // Aceita glob patterns:
  //   "src"         → Todos os arquivos .ts/.tsx dentro de src (recursivo)
  //   "src/**/*.ts" → Mesmo efeito, mais explícito
  //   "**/*.ts"     → Todos os .ts do projeto inteiro
  //
  // Se você não especificar include, o TS processa TODOS os .ts
  // do diretório onde o tsconfig.json está (e subdiretórios).
  "include": ["src"],

  // ═══════════════════════════════════════════════════════════
  // exclude — Quais arquivos/pastas IGNORAR
  // ═══════════════════════════════════════════════════════════
  //
  // Por padrão, node_modules, bower_components e pastas como
  // outDir já são excluídas automaticamente.
  // Aqui você adiciona exclusões extras.
  "exclude": [
    "node_modules",  // Já é excluído por padrão, mas é bom ser explícito
    "dist",          // Não recompilar a saída anterior
    "**/*.spec.ts",  // Excluir arquivos de teste da compilação principal
    "**/*.test.ts"   // (testes normalmente têm seu próprio tsconfig)
  ]
}
```

---

## Estrutura do Projeto com esse tsconfig

Esse `tsconfig.json` espera uma estrutura assim:

```
meu-projeto/
├── tsconfig.json        ← Configuração do TS
├── package.json         ← Dependências e scripts
├── src/                 ← Código fonte TypeScript
│   ├── index.ts
│   ├── utils/
│   │   └── helper.ts
│   └── models/
│       └── user.ts
└── dist/                ← Saída gerada (JS compilado) — NÃO edite aqui
    ├── index.js
    ├── index.js.map
    ├── index.d.ts
    └── utils/
        └── helper.js
```

---

## O campo `extends` — Herdando configuração

Você pode criar um tsconfig base e estendê-lo. Isso é muito comum em monorepos:

```jsonc
// tsconfig.base.json — configuração compartilhada
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "sourceMap": true,
    "skipLibCheck": true
  }
}
```

```jsonc
// tsconfig.json — estende o base e adiciona/sobrescreve
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

Tudo que está no base é herdado. Você só precisa declarar o que é diferente.

---

## Configs Prontas por Ambiente

A comunidade mantém configs base populares no pacote `@tsconfig/bases`:

```bash
npm install -D @tsconfig/node20
```

```jsonc
// tsconfig.json
{
  "extends": "@tsconfig/node20/tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

Isso já vem com `target`, `module`, `moduleResolution` e `lib` configurados corretamente para Node.js 20. Existem configs para `node18`, `node22`, `vite-react`, `next`, etc.

---

## Resumo das Opções Mais Importantes

| Opção                | O que faz                                                    | Valor recomendado          |
|----------------------|--------------------------------------------------------------|----------------------------|
| `target`             | Versão do JS de saída                                        | `ES2022` ou `ESNext`       |
| `module`             | Sistema de módulos da saída                                  | `NodeNext` ou `ESNext`     |
| `moduleResolution`   | Como o TS localiza módulos importados                        | `NodeNext` ou `bundler`    |
| `rootDir`            | Raiz dos arquivos fonte                                      | `src`                      |
| `outDir`             | Onde vai o JS compilado                                      | `dist`                     |
| `strict`             | Ativa todas as checagens rigorosas                           | **Sempre `true`**          |
| `esModuleInterop`    | Imports limpos de módulos CJS                                | `true`                     |
| `skipLibCheck`       | Pula checagem de .d.ts de libs (mais rápido)                 | `true`                     |
| `sourceMap`          | Gera mapas para debug                                        | `true`                     |
| `noEmitOnError`      | Não gera JS se há erros                                      | `true`                     |
| `isolatedModules`    | Cada arquivo é um módulo isolado                             | `true`                     |

---

## Próximo Passo

Com o `tsconfig.json` configurado, você tem o ambiente pronto. O próximo passo é começar a tipar: aprender as **anotações de tipo básicas** — como tipar variáveis, parâmetros de funções e retornos.

---
## Flashcards
O que a flag `strict: true` faz no `tsconfig.json`? :: Ela abilita todas as verificações rigorosas de tipo do compilador simultaneamente.
Para que serve a opção `outDir`? :: Define em qual diretório o TypeScript deve colocar os arquivos `.js` gerados após a compilação.
O que acontece se a flag `noImplicitAny` estiver desativada? :: O TypeScript permitirá que variáveis sem tipo definido assumam o tipo `any` sem gerar erros, diminuindo a segurança do código.

## Conexões
- Anterior: [[o-que-e-typescript|O que é TypeScript?]]
- Próximo: [[iniciando-um-projeto|Iniciando um Projeto]]
- Aprofundamento: [[6-tsconfig|tsconfig em Profundidade]] (Fase 8)
- `strict`: Detalhado em [[1-performance-type-checker|Performance]] (Fase 10)
- `references`: Explicado em [[7-monorepos|Monorepos]] (Fase 11)
