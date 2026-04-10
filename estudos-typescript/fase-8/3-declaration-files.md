---
fase: 8
tema: "Declaration Files"
dificuldade: intermediário
domínio: 70
tags: [d.ts, declaration-files, declare, types, flashcards]
revisado: 2026-03-31
---
# Declaration Files (`.d.ts`)

Quando nós transpilamos (`tsc`) os nossos códigos `src/index.ts`, o resultado é um bruto arquivo sem tipos: `dist/index.js`.
Se outra pessoa fizer o download do nosso pacote pelo npm pra rodar num projeto TS estrito... ELA NÃO TERÁ NENHUM TIPO! Todas as suas Interfaces seriam perdidas porque o `js` não tem nada escrito para suportá-las.

Como resolver? Criando os famigerados **Declaration Files**. Arquivos com a extensão `.d.ts`. Eles contêm pura e estritamente TODAS as assinaturas e interfaces da sua lib e absolutamente ZERO LÓGICA (.js puro) implementativa.

## A Keyword mágica: `declare`

Quando você vê num arquivo `.d.ts` as diretrizes:
```typescript
// Pense no `declare` como um aviso jurando que essa coisa realmente existe na memória ou no script. Uma promessa. Ele confia. E fornece autocomplete puro em cima dessa promessa.
declare const GOOGLE_MAPS_API_KEY: string;

// Declarar módulos inteiros que não tinham TS (ex: um modulo obscuro .js arcaico chamado "jokenpo") para silenciar os erros gerais de falta de types.
declare module "jokenpo" {
    export function jogar(dado: number): string;
}
```

O legal é que você NÃO deve escrever isso na mão (na maioria das vezes). O próprio compilador o faz por você!
Ao ativar `"declaration": true` lá nas configs do `tsconfig`, toda vez que você der transpilação (`tsc`), ele além de cuspir o `.js` pro computador rodar, cospe de presente o exato e detalhista arquivo `.d.ts` remapeado com as tuas assinaturas TS globais prontas para qualquer IDE engulir de tabela e prover autocomplete autônomo sem enxergar nunca a lógica!

---
## Flashcards
O que são arquivos `.d.ts`? :: Arquivos que contêm apenas as assinaturas e definições de tipos, sem nenhuma lógica implementável de JavaScript.
Para que serve a keyword `declare`? :: Para avisar ao compilador que uma variável ou módulo já existe no ambiente global, silenciando erros.
Como gerar arquivos de declaração automaticamente? :: Ativando a flag `"declaration": true` no `tsconfig.json`.

## Conexões
- Tipos de terceiros: [[4-definitely-typed|DefinitelyTyped @types]]
- `declare` avançado: [[4-declare-ambient|Ambient Declarations]] (Fase 10)
- Gerado pelo `tsc`: [[configuracao-tsconfig|flag declaration]] (Fase 1)
- Usado em: [[7-monorepos|Monorepos]] (Fase 11)
