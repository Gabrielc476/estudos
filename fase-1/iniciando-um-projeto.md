---
fase: 1
tema: Iniciando um Projeto
dificuldade: iniciante
domínio: 100
tags:
  - setup
  - node
  - npm
  - tsx
  - flashcards
revisado: 2026-03-31
---
# Como Iniciar um Projeto TypeScript do Zero

Este guia mostra o passo a passo para criar um projeto TypeScript funcional, desde a primeira pasta até o primeiro `console.log` tipado rodando no terminal.

---

## Pré-requisitos

Antes de tudo, você precisa ter instalado:

- **Node.js** (v18 ou superior) → [nodejs.org](https://nodejs.org/)
- **npm** (já vem com o Node.js)

Verifique no terminal:

```bash
node --version   # Ex: v20.11.0
npm --version    # Ex: 10.2.4
```

---

## Passo 1 — Criar a pasta do projeto

```bash
mkdir meu-projeto
cd meu-projeto
```

---

## Passo 2 — Inicializar o `package.json`

O `package.json` é o manifesto do projeto Node.js. Ele guarda metadados, scripts e dependências.

```bash
npm init -y
```

O `-y` aceita todas as perguntas com valores padrão. Isso gera algo como:

```json
{
  "name": "meu-projeto",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

---

## Passo 3 — Instalar o TypeScript como dependência de desenvolvimento

```bash
npm install -D typescript
```

> **Por que `-D` (devDependency)?**  
> O TypeScript é uma ferramenta de **compilação**. Em produção, o que roda é JavaScript puro — o TypeScript não é necessário no servidor/browser final. Por isso, ele é uma dependência de desenvolvimento.

Isso instala o compilador `tsc` localmente no projeto (dentro de `node_modules/.bin/tsc`).

Verifique:

```bash
npx tsc --version   # Ex: Version 5.7.3
```

> **`npx`** executa binários instalados localmente no projeto sem precisar instalar globalmente.

---

## Passo 4 — Criar o `tsconfig.json`

```bash
npx tsc --init
```

Isso gera um `tsconfig.json` com todas as opções comentadas. Para um projeto limpo e moderno, **substitua** o conteúdo por:

```jsonc
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "noEmitOnError": true,
    "resolveJsonModule": true,
    "isolatedModules": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

> Cada uma dessas opções foi explicada em detalhe no arquivo anterior (`configuracao-tsconfig.md`).

---

## Passo 5 — Criar a estrutura de pastas

```bash
mkdir src
```

Crie o arquivo principal `src/index.ts`:

```typescript
// src/index.ts

interface Usuario {
    nome: string;
    idade: number;
    email: string;
}

function saudar(usuario: Usuario): string {
    return `Olá, ${usuario.nome}! Você tem ${usuario.idade} anos.`;
}

const gabriel: Usuario = {
    nome: "Gabriel",
    idade: 25,
    email: "gabriel@email.com"
};

console.log(saudar(gabriel));

// Tente descomentar a linha abaixo — o TypeScript vai dar erro:
// console.log(saudar({ nome: "Teste" }));
// ❌ Erro: faltam as propriedades 'idade' e 'email'
```

Estrutura até aqui:

```
meu-projeto/
├── node_modules/
├── src/
│   └── index.ts         ← Seu código TypeScript
├── package.json
└── tsconfig.json
```

---

## Passo 6 — Compilar e Executar

### Opção A: Compilar com `tsc` e rodar com `node` (o básico)

```bash
# 1. Compilar: gera os arquivos .js na pasta dist/
npx tsc

# 2. Executar o JavaScript gerado:
node dist/index.js
```

Saída:
```
Olá, Gabriel! Você tem 25 anos.
```

Após a compilação, a pasta `dist/` é criada automaticamente:

```
meu-projeto/
├── dist/                ← Gerado pelo tsc
│   ├── index.js         ← JavaScript sem tipos
│   └── index.js.map     ← Source map para debug
├── src/
│   └── index.ts
├── package.json
└── tsconfig.json
```

### Opção B: Usar `tsx` para rodar direto (recomendado para desenvolvimento)

`tsx` executa TypeScript direto, sem gerar arquivos `.js`. Perfeito para desenvolvimento:

```bash
# Instalar tsx como dependência de desenvolvimento
npm install -D tsx

# Rodar direto:
npx tsx src/index.ts
```

> `tsx` usa `esbuild` internamente — é extremamente rápido. Ele transpila em memória, sem criar a pasta `dist/`.

### Opção C: Usar `ts-node` (alternativa clássica)

```bash
npm install -D ts-node

npx ts-node src/index.ts
```

> `ts-node` é mais lento que `tsx` porque faz checagem de tipos antes de rodar. Para desenvolvimento rápido, prefira `tsx`.

---

## Passo 7 — Configurar Scripts no `package.json`

Adicione scripts úteis ao seu `package.json`:

```json
{
  "name": "meu-projeto",
  "version": "1.0.0",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "^5.7.3",
    "tsx": "^4.19.0"
  }
}
```

| Script | O que faz |
|--------|-----------|
| `npm run dev` | Roda o TypeScript com **hot reload** — reexecuta toda vez que você salvar um arquivo |
| `npm run build` | Compila todo o projeto para JavaScript na pasta `dist/` |
| `npm start` | Executa o JavaScript compilado (produção) |
| `npm run typecheck` | Verifica tipos **sem gerar arquivos** — útil em CI/CD |

### O `--noEmit` do typecheck

O `tsc --noEmit` roda o compilador apenas para **checar erros de tipo**, sem gerar nenhum `.js`. É o que pipelines de CI usam para garantir que o código está correto antes de fazer deploy.

---

## Passo 8 — Instalar tipos para Node.js

Se você estiver usando APIs do Node.js (como `fs`, `path`, `process`), precisa instalar os tipos:

```bash
npm install -D @types/node
```

Sem isso, o TypeScript não sabe os tipos das APIs nativas do Node:

```typescript
import fs from "fs";
//         ^^^^
// ❌ Sem @types/node: Cannot find module 'fs'

// ✅ Com @types/node: funciona perfeitamente, com autocomplete completo
```

> **`@types/node`** vem do repositório **DefinitelyTyped** — um repositório comunitário gigante com tipagens para milhares de pacotes JavaScript que não foram escritos em TypeScript.

---

## Passo 9 — Configurar o `.gitignore`

Se você usa Git, crie um `.gitignore`:

```gitignore
# Dependências
node_modules/

# Saída compilada — é gerada pelo build, não deve ir pro repositório
dist/

# Cache do TypeScript (compilação incremental)
*.tsbuildinfo
```

> **Por que ignorar `dist/`?** Porque qualquer pessoa que clonar o projeto pode gerar o `dist/` rodando `npm run build`. Versionar código gerado é redundante e causa conflitos de merge.

---

## Fluxo de Trabalho Resumido

Depois de tudo configurado, seu fluxo de desenvolvimento diário é:

```
1. Abrir o terminal no projeto

2. npm run dev               ← Inicia o desenvolvimento com hot reload
   (tsx watch src/index.ts)     Cada vez que salvar, reexecuta

3. Escrever código em src/   ← O editor mostra erros em tempo real

4. npm run build             ← Quando quiser gerar o JS final
   (tsc)                        Compila tudo para dist/

5. npm start                 ← Rodar em "produção"
   (node dist/index.js)
```

---

## Estrutura Final do Projeto

```
meu-projeto/
├── node_modules/            ← Dependências (ignorado pelo Git)
├── dist/                    ← JS compilado (ignorado pelo Git)
│   ├── index.js
│   └── index.js.map
├── src/                     ← SEU CÓDIGO — é aqui que você trabalha
│   └── index.ts
├── .gitignore
├── package.json
├── tsconfig.json
└── package-lock.json        ← Lock das versões exatas (versionado)
```

---

## Resumo dos Comandos

| Etapa | Comando |
|-------|---------|
| Criar projeto | `mkdir meu-projeto && cd meu-projeto` |
| Iniciar package.json | `npm init -y` |
| Instalar TypeScript | `npm install -D typescript` |
| Criar tsconfig.json | `npx tsc --init` |
| Instalar tsx (dev) | `npm install -D tsx` |
| Instalar tipos do Node | `npm install -D @types/node` |
| Rodar em dev | `npx tsx watch src/index.ts` |
| Compilar | `npx tsc` |
| Checar tipos | `npx tsc --noEmit` |
| Rodar JS compilado | `node dist/index.js` |

---

## Próximo Passo

Com o projeto rodando, você está pronto para começar a explorar o sistema de tipos do TypeScript na prática: **anotações de tipo básicas** — como tipar variáveis, parâmetros e retornos de funções.

---
## Flashcards
Qual a função do comando `npx tsc --init`? :: Ele cria o arquivo de configuração inicial `tsconfig.json` no diretório do projeto.
Para que serve a ferramenta `tsx` no desenvolvimento? :: Ela permite executar arquivos TypeScript diretamente no Node.js sem a necessidade de um passo de compilação manual visível.
Qual o comando para converter arquivos TS em JS para produção? :: O comando `npx tsc`, que lê o `tsconfig.json` e gera os arquivos na pasta de saída (geralmente `dist`).

## Conexões
- Anterior: [[configuracao-tsconfig|Configuração do tsconfig.json]]
- Resumo: [[resumo-fase1|Resumo da Fase 1]]
- `tsx` e `ts-node`: Aprofundados em [[1-nodejs-typescript|Node.js com TS]] (Fase 11)
- `@types/node`: Explicado em [[4-definitely-typed|DefinitelyTyped]] (Fase 8)
