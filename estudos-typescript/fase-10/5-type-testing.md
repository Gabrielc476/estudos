---
fase: 10
tema: "Type Testing"
dificuldade: avançado
domínio: 70
tags: [testing, types, quality, automation, flashcards]
revisado: 2026-03-31
---
# Type Testing (Testes Unitários para Tipos)

Você já sabe testar **código** com Jest, Vitest, etc. Mas e se eu te dissesse que dá pra escrever testes unitários para os seus **próprios tipos**? Não pro comportamento da função, mas pra garantir que o **sistema de tipos em si** funciona como esperado.

Isso é essencial quando você cria bibliotecas públicas ou utilitários genéricos complexos. Se alguém alterar um tipo interno sem querer, o teste de tipo quebra antes de chegar em produção.

## Biblioteca `expect-type`

A mais moderna e simples. Instale com `npm i -D expect-type`:

```typescript
import { expectTypeOf } from 'expect-type';

// Testando que o retorno de uma função é o esperado:
function somar(a: number, b: number) { return a + b; }
expectTypeOf(somar).returns.toBeNumber();

// Testando que um tipo genérico resolve corretamente:
type MeuPartial<T> = { [K in keyof T]?: T[K] };
type Resultado = MeuPartial<{ nome: string; idade: number }>;

expectTypeOf<Resultado>().toEqualTypeOf<{ nome?: string; idade?: number }>();

// Testando que algo NÃO é atribuível:
expectTypeOf<string>().not.toBeNumber();

// Testando parâmetros de função:
function login(email: string, senha: string) { return true; }
expectTypeOf(login).parameter(0).toBeString();
expectTypeOf(login).parameter(1).toBeString();
```

## Biblioteca `tsd`

Mais antiga e funciona como um CLI que roda os testes via `npx tsd`:

```typescript
import { expectType, expectNotType, expectError } from 'tsd';

// O tipo deve resolver pra string:
expectType<string>("hello");

// O tipo NÃO deve ser number:
expectNotType<number>("hello");

// Isso DEVE dar erro de compilação:
expectError<number>("texto");
```

## Quando usar Type Testing?

- Ao publicar uma **biblioteca npm** com tipos complexos.
- Ao criar **utility types** avançados (como os da Fase 6) que outros devs vão usar.
- Em **refactorings grandes** onde você quer garantir que os tipos não quebraram silenciosamente.
- Junto com CI/CD para ter uma **barreira automática** contra regressões de tipo.

É literalmente o `jest.expect()` do mundo invisível dos tipos.

---
## Flashcards
O que é Type Testing? :: É a prática de escrever testes que validam se os tipos gerados pelo código TS estão corretos (em vez de validar apenas o comportamento).
Cite uma biblioteca famosa para Type Testing? :: `expect-type` ou `tsd`.
Para que testar tipos? :: Para garantir que utilitários complexos de metaprogramação não quebrem durante refatorações da base de código.

## Conexões
- Testar Utility Types: [[6-utility-types-nativos|Utility Types]] (Fase 6)
- `@ts-expect-error`: [[3-ts-expect-error|Supressão de Erros]]
- Testes de código: [[6-typescript-testes|TypeScript com Testes]] (Fase 11)
- CI/CD: Pipeline de verificação
