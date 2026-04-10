---
fase: 11
tema: "Node.js com TypeScript"
dificuldade: avançado
domínio: 70
tags: [nodejs, backend, esm, tsx, bypass, flashcards]
revisado: 2026-03-31
---
# Configurando TypeScript no Node.js Backend

Historicamente o Node.js roda Javascript puro (`.js`). Lançar TypeScript no servidor exige uma cadeia de orquestração. Hoje, o ecossistema moderna adotou o **ESM** (`type: "module"` no `package.json`).

## 1. Ferramentas de Desenvolvimento Rápido (Execution em Runtime Falsa)
No ambiente de DEV, você não precisa dar `tsc` a cada vírgula. Nós rodamos ferramentas que injetam um "Load Transformer" no v8 pra ler e compilar na mosca o TypeScript direto pra sua IDE:
- **ts-node**: (Legado/Lento, mas estável).
- **tsx** (TypeScript Execute): Extremamente mais moderno, turbinado pelo esbuild em C++, muito mais veloz pra desenvolvimento (Foi o que usamos nos seus Desafios `npx tsx src/index.ts`).
- **tsup** ou **Bun/Deno**: Bun e Deno, os concorrentes do Node, já rodam TypeScript NATIVAMENTE sem precisar configurar nada disso.

## 2. A Compilação Produtiva (O Papel do `tsc`)
Em Produção (Deploy na Amazon, Heroku, Docker), rodar `tsx` é jogar RAM e CPU fora. Tem que buildar.

```bash
# Na verdade isso apenas joga JS puro pra pasta 'dist/'!
npx tsc 
```
Então seu start script de produção vira: `node dist/index.js`. 
Mas lembre-se da aula sobre Módulos (Fase 8): Se você estiver num projeto com `"type": "module"`, as importações das suas pastas **OBRIGATORIAMENTE** terão que ser com a extensão `.js` na cara do Import TypeScript!
```typescript
// Mesmo editando 'utils.ts', digite a extensão '.js' para o Compiler não surtar na geração da release:
import { logaritmo } from "./utils.js"; 
```

## 3. Extensões Nativas ESM (`.mts` e `.cts`)
Se você quer misturar dependencias legadas e modernas numa mesma árvore complexa de código Node sem setar o package global inteiro, o Typescript oferece extensões agressivas:
- Extensão `.mts` (Module TypeScript) 👉 Compila e Força ESM moderno.
- Extensão `.cts` (CommonJS TypeScript) 👉 Força a estrutura e importações antigas `require()` baseadas no Node10/CommomJS.

---
## Flashcards
Melhor ferramenta atual para rodar TS em Node (Dev)? :: `tsx`, pois é extremamente rápido (baseado em esbuild) e suporta ESM nativo sem dor de cabeça.
Cuidados ao buildar Node em ESM (type "module")? :: O TS exige que você use a extensão `.js` nos seus caminhos de importação relativos dentro dos arquivos `.ts`.
O que são as extensões `.mts` e `.cts`? :: `.mts` força o arquivo a ser tratado como um módulo ESM; `.cts` força o arquivo a ser tratado como CommonJS (antigo require).

## Conexões
- `tsx` e `ts-node`: [[iniciando-um-projeto|Setup Inicial]] (Fase 1)
- ESM vs CJS: [[2-module-resolution|Module Resolution]] (Fase 8)
- Extensões .mts/.cts: [[1-modulos|Módulos ESM]] (Fase 8)
- Build de produção: [[6-tsconfig|tsconfig]] (Fase 8)
