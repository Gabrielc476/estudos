---
fase: 6
tema: "Utility Types Nativos"
dificuldade: intermediário
domínio: 70
tags: [utility-types, partial, pick, omit, exclude, flashcards]
revisado: 2026-03-31
---
# Utility Types Nativos (Por trás das cortinas)

O TypeScript te entrega um cinto de utilidades pronto para uso. O segredo de um Sênior não é apenas saber como usá-los, mas sim saber **como eles são construídos** por baixo dos panos usando Mapped Types, Key Remapping e Infer!

Se você decorou bem os capítulos da `Fase 6`, você consegue construir qualquer um destes do zero:

## `Partial<T>`, `Required<T>`, `Readonly<T>`
Manipuladores baseados nos modificadores primitivos de propriedades (`?`, `-?`, `readonly`):

```typescript
// (Nativo) Partial: Devolve um clone com tudo Opcional
type MeuPartial<T> = { [K in keyof T]?: T[K] };

// (Nativo) Required: Devolve clone destruindo as flags de opcionais
type MeuRequired<T> = { [K in keyof T]-?: T[K] };

// (Nativo) Readonly: Instaura a flag readonly massivamente
type MeuReadonly<T> = { readonly [K in keyof T]: T[K] };
```

## `Pick<T, K>` e `Omit<T, K>`
Filtros brutos limitadores. Extraem um subconjunto magro das interfaces:

```typescript
// (Nativo) Pick: Exija as keys selecionadas (K extends keyof T) e itere só nelas!
type MeuPick<T, K extends keyof T> = { [P in K]: T[P] };

// (Nativo) Omit: Usa Type Level Extraction de Remap com `never` ou Exclude global
type MeuOmit<T, K extends keyof any> = { [P in keyof T as P extends K ? never : P]: T[P] };
```

## `Exclude<T, U>` e `Extract<T, U>`
Operações de conjunto sobre UNIÕES LITERAIS. Funcionam 100% nas costas da **Distributividade** dos Condicionais explicada na aula anterior:

```typescript
// Exclude: O que existe na Union T que não existe na U?
type MeuExclude<T, U> = T extends U ? never : T;
type RemoveA = MeuExclude<"A" | "B" | "C", "A">; // "B" | "C"

// Extract: Oposto. Traga pra root tudo que T tem de igual com a U!
type MeuExtract<T, U> = T extends U ? T : never;
type ExtraiB = MeuExtract<"A" | "B" | "C", "B" | "Z">; // "B"
```

## `ReturnType<T>` e `Parameters<T>`
Puxam as assinaturas cruéis de funções usando exatidão de inferências avulsas.

```typescript
// Puxando o Array das args puras (Tuple Array):
type MeusParameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

// Extraindo o "Loot" de saída da assinatura:
type MeuReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

Entender os Nativos Global Utils em sua pura sintaxe Type-Level prova que você dominou completamentente a abstração crua arquitetural de desenvolvimento back-end de TypeScript. Você domou a fera!

---
## Flashcards
Diferença conceitual entre `Pick` e `Omit`? :: `Pick` seleciona as chaves que você quer manter; `Omit` remove as chaves que você quer ignorar.
Como o `Exclude<T, U>` funciona? :: Ele remove da união `T` qualquer tipo que seja atribuível a `U`.
O que o `ReturnType<T>` extrai? :: Ele extrai o tipo do valor de retorno de uma função.

## Conexões
- Construídos com: [[1-mapped-types|Mapped Types]], [[5-conditional-distributivo|Condicionais]], [[5-infer-keyword|infer]]
- Partial usado em: [[6-typescript-testes|Mocks Tipados]] (Fase 11)
- Pick/Omit: Aplicação prática em [[2-key-remapping|Key Remapping]]
- ReturnType: Usado em [[5-type-testing|Type Testing]] (Fase 10)
