# Desafio: API de Atendimento (Helpdesk)

Este é um projeto prático para você treinar **TypeScript, Node.js e Prisma ORM** aplicando **Programação Orientada a Objetos (POO)** e os conceitos de **Estruturas de Dados** (Pilhas, Filas, etc) que você estudou.

## Objetivo Principal
Construir uma API RESTful para um sistema de Helpdesk simulando os bastidores de um serviço de atendimento ao cliente, dividindo o código em camadas baseadas em POO (Entities, Repositories, Services, Controllers).

## Especificações Técnicas

* **Ambiente:** Node.js + Express
* **Linguagem:** TypeScript
* **ORM:** Prisma ORM (+ Banco de dados Relacional de sua preferência (PostgreSQL, SQLite))
* **Arquitetura:** Clean Architecture (com princípios SOLID). Padrões `Repository` e `Injeção de Dependências` são mandatórios.

## 📌 Os Requisitos do Sistema

### 1. Sistema de Fila de Chamados
- Os clientes devem conseguir criar um chamado (`POST /tickets`).
- Os chamados recém-criados assumem o status `OPEN`.
- A regra de negócio principal diz que os chamados são atendidos no formato **FIFO (First In, First Out)** - Primeiro a Entrar, Primeiro a Sair (Fila).

### 2. Atendimento ao Ticket
- Um atendente deve conseguir puxar o ticket mais antigo da Fila para resolvê-lo (`POST /tickets/process`).
- Caso o atendente puxe o chamado errado da Fila, ele deve ser capaz de dar um *"Undo"* (`POST /tickets/undo`). Internamente, sua API deve utilizar uma **Pilha (Stack LIFO)** para salvar as últimas ações do atendente e desfazer a atribuição se necessário.

### 3. Histórico e Ordenação
- Ponto de entrada: (`GET /reports`).
- Esta rota deve buscar no banco os chamados finalizados, passá-los para um algoritmo de ordenação (Bubble Sort, Merge Sort ou Quicksort implementado por **você** - não utilize o `Array.prototype.sort()`) e devolver os dados ordenados por tempo de resolução!

## 🏢 Arquitetura Esperada (Camadas de Classes)

Sua pasta `src` deverá conter as seguintes divisões e responsabilidades estritas:

- **Entity (`src/entities/`)**: As classes puras do TypeScript que representam seu domínio real (ex: `class Ticket`). Devem ter as mesmas propriedades do modelo do banco, porém garantidas por você via construtor. Não devem ter referências ao Express ou Prisma.
- **Repository (`src/repositories/`)**: Classes que cuidam exclusivamente de se comunicar com o banco de dados. Ex: `class PrismaTicketRepository implements ITicketRepository`.
- **Services/Use Cases (`src/services/`)**: As classes que abrigam suas regras de negócio. Ex: `class AssignTicketService`. As dependências devem ser injetadas por construtores!
- **Controllers (`src/controllers/`)**: Responsáveis por pegar a propiração do Express (`req`, `res`), chamar o Service e devolver JSON.

## Dicas Essenciais
- Use e abuse do `public`, `private` e `readonly` para blindar suas classes.
- Use `Interfaces` caso vá construir abstrações para seus repositórios da vida real.
- Cuidado com o vazamento de memória! O estado da Fila é salvo no Banco, mas como você guardará o estado da Pilha de Undos sem prejudicar a performance?

## Como Iniciar este Repositório
No terminal:
1. Para codar, use o comando: `npx ts-node-dev src/server.ts`
2. Para subir o banco do prisma (logo após definir seu `schema.prisma`), rode: `npx prisma migrate dev`

🚀 Boa Sorte e Bom Código!
