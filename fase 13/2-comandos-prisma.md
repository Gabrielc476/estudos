---
tags: [prisma, terminal, comandos]
---
# Comandos de Sobrevivência do Prisma

Eu sei que comandos de terminal enchem de ansiedade na primeira vez. Aqui está sua 'colinha' amigável de como as coisas nascem no projeto!

## 1. Como a biblioteca nasce (Iniciando)
Lá no nosso shell do projeto, rodamos isto:
```bash
# Isso baixa as ferramentas
npm install prisma --save-dev
npm install @prisma/client

# Esse aqui inicia o Prisma criando sozinho a pasta /prisma
npx prisma init
```

## 2. A Mágica de Construir no Banco (Migrate)
A partir do momento que você preencher o `schema.prisma` com o formato dos Tickets e Atendentes, nós vamos avisar pro PostgreSQL criar as gavetas rodando:
```bash
npx prisma migrate dev --name init
```
*(O `--name init` diz ao sistema de backups dele que este é o commit "inicial", na próxima vez que você rodar você pode trocar a palavra `init` para algo descritivo, ex: `--name adicionei_campo_celular`)*.

## 3. A cereja do TypeScript:
Se quisermos ser hackers e abrir nossas tabelas completinhas direto do navegador para verificar se os Repositórios estão salvando dados corretamente, tem o melhor atalho do Prisma:
```bash
npx prisma studio
```
Vai carregar um site local com todas as tabelas prontas para você espiar os dados ou até adicionar tickets clicando com o mouse em modo visual!

## Flashcards
O que faz o comando `npx prisma init`? ;; O comando instala os pre-requisitos de arquivo no seu projeto, criando um diretório 'prisma' contendo o `schema.prisma` e preparando um `.env` básico com rotas de banco.
Pra que rodamos `npx prisma migrate dev` e o que a instrução `--name` faz no comando? ;; O `migrate` lê o arquivo escrito por nós e transmite a ordem de criação de tabelas oficiais no Postgres. A variável `--name` carimba a alteração para que o histórico do banco de dados possa ser lido como commits no github.
O que esperar do comando `npx prisma studio`? ;; Uma interface gráfica nativa de banco de dados diretamente dentro de alguma porta do `localhost` no seu navegador favorito.
