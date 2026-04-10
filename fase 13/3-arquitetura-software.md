---
tags: [arquitetura, clean-code, ddd, solid]
---
# Reflexões sobre a Arquitetura Orientada a Objetos

Você implementou um *core* purista de Domínio, seguindo princípios fundamentais da Clean Architecture e do DDD (Domain-Driven Design) nos bastidores do Desafio Helpdesk! Considere esse arquivo um portfólio descritivo.

## O Ciclo da Execução Perfeita (Flow)
1. O Front End faz um `POST` ou chamada web com um 'DTO' (um Json puro tipo 'CreateAtendenteRequestDTO').
2. O **Controller** pega isso. Ele NUNCA sabe as regras da rua. Ele imediatamente envia os dados pro UseCase.
3. O **UseCase/Service** é o Maestro da orquestração da sua aplicação. Ele sabe o 'Quando' e o 'Como'. Ele puxa da Fila (arquivos de Ciência da Computação genéricos), instigando a base de dados via Repositories, e coordena o show. A grande sacada: O UseCase NÃO faz matemática pesada nem altera status sozinhos.
4. Os **Entities (Models)** é onde mora a sua regra pesada de verdade! A Entidade não apenas deixa alguém setar uma data passivamente. Ela usa "Ações Ricas" (ex: `concluirAtendimento()`) onde *ela mesma* muda a data e confere sua própria situação sem ninguém mandar.

## A Grande Dúvida: Por que separamos 'Repositories' se o Prisma é tão bom?
Porque o seu `CreateTicketUseCase` NUNCA precisa abraçar o banco diretamente! Se amanhã a sua empresa proibir o Prisma e mandar todos migrarem para *Firebase*, todo seu core de negócios seria rasgado com a troca de tecnologia?
No nosso modelo não! Você vai simplesmente substituir 1 único arquivo lá dentro de `infra/...` mas os seus maravilhosos Maestros (Use Cases) nunca precisarão ser reescritos! Eles dependem apenas da Interface (`IClienteRepository`). Esse é o coração da letra **D** do modelo SOLID (Dependency Inversion / Inversão de Controle).

## Flashcards
Na divisão Arquitetural, qual é a diferença vital encontrada entre a Entidade (Domain) e o UseCase (Application)? ;; A Entidade guarda e muda as prorpiedades (status, datas base, contagem de views) protegendo seus requisitos internos. O Use Case apenas orquestra etapas sequenciais como (Puxa do repositório -> Retira da Fila -> Pede pra Entidade se blindar -> Salva no Repositório final). O Use Case é enxuto, enquanto a Entidade é rica (Padrão de Modelo de Domínio Rico).
Crie um motivo arquitetural impeditivo que probe que o arquivo UseCase do projeto tenha métodos que chamem `prisma.ticket.create()` direto dentro dele, ao em vez do Repository ? ;; Porque os serviços UseCases devem ser integralmente agnósticos à tecnologia de banco dados, dependendo invariavelmente de uma Abstração Contratual (A Interface do IRepository). E isso é o famoso princípio da inversão do controle, que dá o poder do dono do repositório trocar de Ferramenta futura (TypeORM, Firebase, Sql nativo) sem apagar as lógicas de negócios consolidadas.
