---
fase: 8
tema: "DefinitelyTyped"
dificuldade: intermediário
domínio: 70
tags: [definitely-typed, @types, npm, community, flashcards]
revisado: 2026-03-31
---
# DefinitelyTyped (`@types/nomedopacote`)

No mundo real, quando trabalhamos na vida real as vezes rodamos o terminal para baixar um pacote como o `Express` (Um servidor backend), o `Lodash` ou o `Axios`, e importamos em nosso TypeScript.

Algumas bibliotecas Modernas (como O Axios ou Prisma) já vêm escritas puramente em `typescript` (Eles mandam pra sua pasta `node_modules` aquele pacotinho mágico de declaraçõe `.d.ts` nativo feito pelos próprios deuses desenvolvedores da ferramenta atrelado pra ti).

## As Bibliotecas Antigas/JS Puro
Porém o `express` foi escrito há mais de uma década só com Javascript. Quando você importa ele:
```bash
npm i express
```
```typescript
import express from 'express'; // ❌ ERRO: "Could not find a declaration file for module 'express'."
```
O VSCODE chora. Você tenta digitar coisas como `const app = express()`, ele apita tudo como `ANY` perigosamente.

## A Solução Comunitária (O Repositório Monstro)
Centenas de engenheiros sêniores criaram o repositório massivo do GitHub chamado [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped). Diariamente, milhares de devs doam seu suor lendo os arquivos `.js` gigantescos da internet (JQuery, React, Express, etc) e **escrevendo puramente na mão os declaration files (.d.ts)** daqueles repositórios inteiros.

E depois eles enviam e publicam a tipagem pro NPM centralizado usando a flag `@types/`. Então pra silenciar o Typescript e receber o Autocomplete Divino perfeitamento de uma biblioteca que antes era suja de `JS`, você instala *o pacote da lib*, junto do *pacote dos tipos separados dessa lib (como subdependência de Dev apenas pra compilação)!*

```bash
npm i express
npm i -D @types/express
npm i -D @types/node     # (Tipos base globais para Processos internos do Windows/Node, Filesystem)
npm i -D @types/react 
```

---
## Flashcards
O que é o repositório DefinitelyTyped? :: Um projeto comunitário massivo que armazena definições de tipos para bibliotecas JavaScript que não possuem tipagem nativa.
Como instalar tipos para uma biblioteca via npm? :: Usando o prefixo `@types/` seguido do nome do pacote (ex: `npm i -D @types/express`).
Diferença entre tipagem nativa e DefinitelyTyped? :: Nativa vem dentro do pacote original; DefinitelyTyped exige a instalação de um pacote separado de desenvolvimento.

## Conexões
- Pré-requisito: [[3-declaration-files|Declaration Files]]
- `@types/node`: [[iniciando-um-projeto|Iniciando um Projeto]] (Fase 1)
- `@types/express`: Augmentado em [[4-declare-ambient|Module Augmentation]] (Fase 10)
- `@types/react`: [[5-typescript-react|TypeScript com React]] (Fase 11)
