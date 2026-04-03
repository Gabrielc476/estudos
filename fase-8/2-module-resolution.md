---
fase: 8
tema: "Module Resolution"
dificuldade: intermediário
domínio: 70
tags: [modules, resolution, node, bundler, tsconfig, flashcards]
revisado: 2026-03-31
---
# Module Resolution (Como o TS acha seus arquivos)

*"Eu escrevi `import { fs } from 'fs'`. Como diachos o compilador sabe onde encontrar essa pasta fisicamente no HD?"*

Essa busca é ditada pela configuração `"moduleResolution"` lá no seu `tsconfig.json`.

### Estratégias famosas:
1. **`node` (Node10 / Legado Clássico)**: Essa foi a estratégia dominante nos ultimos 10 anos. Procura pelas coisas subindo pastas `node_modules` procurando os repositórios sem a extensão (Ex: ele assume que import './file' é './file.js' ou '.file.ts').
2. **`node16` / `nodenext` (A Nova Geração / ESM Nativo no Backend)**: O ecossistema JS implodiu os módulos velhos de node. Agora se você importa um script relativo no TS moderno Node16 pra web, **é completamente OBRIGATÓRIO escrever a extensão `.js` na ponta do import**. 
   ```typescript
   // Mesmo o arquivo do seu PC sendo "matematica.ts", você obrigatoriamente fará:
   import { soma } from "./matematica.js"; // Se estiver no Node16
   ```
3. **`bundler` (A Solução Perfeita para Front-end / TS 5.0+)**: Se você está programando React, Vite, NextJS... você não roda arquivos soltos no Node. Você roda num Bundler. Para isso a configuração `bundler` foi criada no TS 5.0. Ela respeita o ESM moderno mas **não te obriga** a carregar as extensões bizarras `.js` importando os componentes. 

> *Via de Regra Atual*: Configurando projetos fullstack? Setar `{ "moduleResolution": "Bundler" }` na flag te poupa de 99% das dores de cabeça lidando com importações.

---
## Flashcards
Qual a função da configuração `moduleResolution`? :: Ditar a estratégia que o compilador usa para localizar arquivos físicos no disco a partir de um comando import.
Diferença crucial na estratégia `node16`? :: É obrigatório incluir a extensão do arquivo (geralmente `.js`) no caminho do import relativo.
Quando usar `moduleResolution: "bundler"`? :: Em projetos front-end (Vite, NextJS) que usam ferramentas externas para o empacotamento final.

## Conexões
- Pré-requisito: [[1-modulos|Módulos no TypeScript]]
- Config: [[6-tsconfig|tsconfig em Profundidade]]
- `bundler` resolution: [[2-frontend-bundlers|Frontend e Bundlers]] (Fase 11)
- Extensões .mts/.cts: [[1-nodejs-typescript|Node.js com TS]] (Fase 11)
