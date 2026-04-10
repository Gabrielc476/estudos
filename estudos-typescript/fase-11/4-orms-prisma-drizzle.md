---
fase: 11
tema: "ORMs Tipados (Prisma e Drizzle)"
dificuldade: avançado
domínio: 70
tags: [orm, database, prisma, drizzle, type-safety, flashcards]
revisado: 2026-03-31
---
# O Typescript Invadindo Bancos de Dados: ORMs (Prisma e Drizzle)

No passado sombrio (TypeORM, Sequelize, Mongoose de base), quando você criava um modelo do Banco de Dados Relacional, precisava codar todo o schema nas migrations de inicialização SQL sujo e depois se descabelar em uma aba separada duplicada codando "Interfaces Typescript" pra espelhar na mão para dar AutoComplete do "findMany". Frequentemente um dos arquivos entrava em assíncronicidade fatal se o Dev esquecesse de mudar ambos e a produção quebrava.

No ecossistema de infraestura de 2024 o Typescript tomou conta do pilar ORM com "Source Of Truths" Únicas!

## Prisma ORM (Abordagem de Linguagem Própria Transpilada)
O Prisma criou a sua própria linguagem limpa. O arquivo `.prisma`.
Você dita lá de forma neutra o seu banco real:
```prisma
model Post {
  id        String   @id @default(uuid())
  title     String
  autor     String?
  likesGlobais Int   @default(0)
}
```
Na hora que você usa a Toolchain e manda executar `npx prisma generate`, a engine do Prisma (feita em Rust) invade invisivelmente toda a malha secreta de Declaration Types profunda do seu projeto no `/node_modules/@prisma/client` e **cria, implementa e escreve no Background as Interfaces Completíssimas Automáticas com Utility Types pra você já plugados nos Builders DBs**.

Não precisa nem usar imports e exports manuais! Você escreve `prisma.post.findMany()` e na hora a IDE te dá todos os campos baseados no prisma schema puramente de graça em Autocomplete total e perfeitamente checados!

## Drizzle ORM (O Rei Typescript em SQL Puro Nativo)
O Drizzle (A febre mais recente, extremamente focado no alto-desempenho e Edge Computing) pegou um caminho de "Se Toca JS". Você codifica as tabelas sem linguagem estática Prisma, **usando o seu script de Typescript Global Base mesmo**:

```typescript
import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';

// Crio a minha migração em TS Base puro de DB Engine:
export const tabelaUsuarios = pgTable('users', {
  id: serial('id').primaryKey(), // Incrementador!
  nomeInteiro: text('full_name').notNull(),
  idade: integer('age'),
});

// Aí usamos inferência cruzada do Drizzle embutida num utilitário parecido com Zod puro para reaver o Tipo isolado Estático limpo e tipificá-la no meu projeto pra rotas sem duplicar nada:
type CadastroDeUsuarioServer = InferSelectModel<typeof tabelaUsuarios>;
/*
TypeScript mapeou as regras cruzadas do core do PGTable e derivou dinamicamentee:
type CadastroDeUsuarioServer = {
  id: number;
  nomeInteiro: string;
  idade: number | null; // Nulável por falta do notNull aliás.
}
*/
```

Ao plugar essa simbiose completa do Banco de Dados com End2End Validation Front End Zod e tRPC/ReactQuery Type Checking Client, o JS vira inquebrável por tipagem.

---
## Flashcards
Diferença principal entre Prisma e Drizzle? :: Prisma usa uma linguagem própria (`.prisma`) e gera código; Drizzle usa TypeScript puro para tudo e tem foco em performance extrema.
Como o Prisma gera seus tipos? :: Através do comando `prisma generate`, que injeta os tipos específicos do seu banco dentro do diretório `node_modules`.
Vantagem do Drizzle na inferência? :: Ele permite extrair tipos de SELECT e INSERT de forma nativa e imediata usando utilitários do próprio TS, sem gerar arquivos extras.

## Conexões
- Prisma Generate: [[3-declaration-files|Declaration Files]] (Fase 8)
- Drizzle InferSelectModel: [[5-infer-keyword|infer]] (Fase 5)
- Validação: [[3-runtime-validation-zod|Zod Schemas]]
- Branded IDs: [[1-branded-types|Branded Types]] (Fase 9)
