---
fase: 9
tema: "Branded Types"
dificuldade: avançado
domínio: 70
tags: [branded-types, nominal-typing, type-safety, intersection-types, flashcards]
revisado: 2026-03-31
---
# Branded Types (Tipos Nominais Simulados)

No cenário universal de linguagens verbais como Java e C#, a tipagem é **Nominal**. Se você tem a classe `Cachorro` e a classe `Carro` e ambas por coincidência tenham uma string `nome`, você NUNCA pode igualar as instâncias delas ou passá-las nas mesmas funções por acidente, afinal o NOME formal da raiz da estrutura é diferente.

O TypeScript, por outro lado, sofre do sistema de **Tipagem Estrutural (Duck Typing)**. O que significa isso? Se tem a estrutura (formato) de um pato, e faz quack, para o compilador do Typescript, é um Pato, não importa quem originou a variável de verdade.

```typescript
type IdUsuario = number;
type IdProduto = number;

function apagarUsuario(id: IdUsuario) { /* apaga do bd */ }

const tecladoId: IdProduto = 999;
// TRAGÉDIA: O compilador aceita de boa, afinal as duas coisas no fundo são "number" vazio estruturalmente!
apagarUsuario(tecladoId); 
```

## A Solução Sênior: "Marcando" o gado (Branding)
Nós injetamos artificialmente na assinatura matemática do Type um **fantasma estruturil** impossível de existir no JS cru para fazer a assinatura da variável travar por divergencia nominal falsa!

```typescript
// 1. O Padrão Marca de Fogo (Brand)
type NomeUnicoDaBrand<T, NomeDaBrand> = T & { __brand: NomeDaBrand };

// 2. Aplicamos os selos únicos 
type UserIdSafe = NomeUnicoDaBrand<number, "Usuario">;
type ProdIdSafe = NomeUnicoDaBrand<number, "Produto">;

// 3. A Função agora exija a Brand de Usuário
function apagarUsuarioSeguro(id: UserIdSafe) { console.log("Apagando!") }

const tecladoIDSeguro = 999 as ProdIdSafe;
const marioIDSeguro = 42 as UserIdSafe;

// apagarUsuarioSeguro(tecladoIDSeguro); // 🛑 TRAVOU: O TypeScript grita que a tag '__brand: Produto' não se encaixa na tag '__brand: Usuario'
apagarUsuarioSeguro(marioIDSeguro); // ✅ PERFEITO!
```

Com os selos abstratos criados por `Intersection Types &`, bloqueamos lógicas perigosas blindando Tipos Primitivos que partilham a mesma cara!

---
## Flashcards
O que são Branded Types? :: São tipos primitivos (como string ou number) "marcados" com uma propriedade falsa via interseção para simular tipagem nominal.
Para que servem os Branded Types? :: Para evitar que valores de mesma estrutura base sejam trocados por acidente (ex: não passar um `Email` onde se espera um `UserId`).
Como criar um Branded Type? :: Fazendo uma interseção do tipo base com um objeto literal único: `type Email = string & { __brand: "Email" }`.

## Conexões
- Usa Intersection Types: [[resumo-fase2|Tipos Compostos]] (Fase 2)
- Tipagem Estrutural vs Nominal: [[o-que-e-typescript|Duck Typing]] (Fase 1)
- Relacionado: [[3-phantom-types|Phantom Types]]
- Usado em IDs de banco: [[4-orms-prisma-drizzle|ORMs Tipados]] (Fase 11)
