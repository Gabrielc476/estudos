---
tags: [prisma, orm, typescript, backend]
aliases: [Prisma ORM]
---
# O que é o Prisma ORM?

Basicamente, o Prisma é um tradutor. Ele traduz seus objetos JavaScript/TypeScript perfeitos em código bruto de Banco de Dados (SQL) para não precisarmos escrever queries minuciosas (`SELECT * FROM tickets WHERE...`).

Ele é dividido em duas partes espetaculares que você precisa entender:
1. **Prisma Client:** A biblioteca que vai viver escondidinha lá na nossa pasta `repositories`. É ela quem faz o `prisma.ticket.create()`.
2. **Prisma Migrate:** A ferramenta "mágica" que pega o seu arquivo de texto chamado `schema.prisma` e *cria* as tabelas oficiais lá dentro do PostgreSQL sem que você precise abrir programas como DBeaver ou escrever SQL na mão.

## Por que usar o Prisma ao invés do famoso TypeORM ou Sequelize?
- **Intellisense Supremo:** Ele adivinha todos os tipos perfeitamente! Como nosso projeto é em TS, o Autocomplete do Prisma no VS Code previne *typos* de tabela na hora e garante que nós passamos `numbers` para números, e `strings` para strings.
- O formato do arquivo de modelagem dele (`schema.prisma`) é o mais limpo e amigável para humanos do mercado atual.

## Flashcards
O que é o Prisma ORM? ;; Um ORM focado em TypeScript/Node que funciona como um tradutor inteligente para executar queries SQL através de objetos puros, cuidando do banco ponta-a-ponta.
Qual é a principal utilidade do Prisma Command (Migrate)? ;; Ler o arquivo schema e executar construções de tabelas remotamente no Banco de Dados para que as tabelas de verdade fiquem sincronizadas com nossas variáveis.
