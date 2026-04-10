---
fase: 8
tema: "Módulos"
dificuldade: intermediário
domínio: 70
tags: [modules, esm, import, export, type-imports, flashcards]
revisado: 2026-03-31
---
# Módulos no TypeScript (ESM e Type Imports)

Assim como no JavaScript moderno (ES6+), o TypeScript adota integralmente o sistema de **Módulos ECMAScript (ESM)**. Um arquivo só se torna um módulo (isolado do escopo global) se tiver pelo menos um `import` ou `export`.

```typescript
// math.ts
export const soma = (a: number, b: number) => a + b;
export interface Calculadora { processador: string }

// app.ts
import { soma, Calculadora } from "./math";
```

## Importações Apenas de Tipo (`import type`)

Ao importar coisas no TS, algumas são "Código Executável" (variáveis, classes, funções) e outras são "Tipos" (interfaces, type aliases). Como os Tipos *não existem* no JavaScript final compilado, o compilador precisa ter certeza absoluta de que pode apagar aquela importação no resultado final.

Para evitar problemas em bundlers (como Vite, Webpack, esbuild), usamos a marcação **explícita de tipo**:

```typescript
// Força o compilador a "varrer" (deletar) essa importação no código .js final. 
import type { CalculadorConfig, StatusMetodo } from "./math";

// Ou a sintaxe mista inline (TS 4.5+):
import { soma, type CalculadoraConfig } from "./math";
```

## O Strict Mode do TS 5.0+: `verbatimModuleSyntax`

No TypeScript mais atual, foi introduzida uma regra restrita no `tsconfig.json` chamada `"verbatimModuleSyntax": true`. Quando ativada, o compilador te **obriga ferozmente** a usar `import type` para tudo o que for apenas uma tipagem, garantindo que o seu bundler final não importe acidentalmente arquivos inteiros ou cause bugs por arrastar interfaces vazias pra dentro do JS.

Se você importar um `Type` sem colocar a palavra `type` na frente usando essa flag, o TS te dá erro sublinhando em vermelho!

---
## Flashcards
O que torna um arquivo um "Módulo" no TS? :: A presença de pelo menos um comando `import` ou `export` no arquivo.
Para que serve o `import type`? :: Garante que a importação seja usada apenas para tipagem e seja totalmente removida no código JS transpilado.
O que a flag `verbatimModuleSyntax` faz? :: Obriga o uso explícito de `import type` para evitar que interfaces ou tipos causem bugs de importação em runtime.

## Conexões
- Resolução: [[2-module-resolution|Module Resolution]]
- `import type`: Removido na compilação → [[3-declaration-files|Declaration Files]]
- `verbatimModuleSyntax`: Flag moderna no [[6-tsconfig|tsconfig]]
- Aplicação: [[1-nodejs-typescript|Node.js com TS]] (Fase 11)
