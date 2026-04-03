# Roadmap Definitivo para Dominar TypeScript

Este é um **Roadmap Definitivo e Extenso**, estruturado com base na [documentação oficial do TypeScript](https://www.typescriptlang.org/docs/), no [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) e nas especificações do ECMAScript que o TypeScript estende.

> **Pré-requisito**: Conhecimento sólido de JavaScript (ES6+). Este roadmap foca exclusivamente no que o TypeScript adiciona e transforma.

## 🟢 Fase 1: Fundamentos do Sistema de Tipos
*Entender a proposta do TypeScript e como ele adiciona tipagem estática ao JavaScript.*

- [x] **O que é TypeScript?**: Superset tipado do JavaScript. Compilação (transpilação) para JS. O compilador `tsc` e o arquivo `tsconfig.json`. Diferença entre tempo de compilação e tempo de execução (os tipos **não existem** em runtime).
- [x] **Configuração do Ambiente**: Instalação do TypeScript (`npm i -g typescript`), uso com `ts-node`, `tsx`, `Bun`, `Deno`. Configuração básica do `tsconfig.json` (`target`, `module`, `strict`, `outDir`, `rootDir`).
- [x] **Anotações de Tipo Básicas**: Tipando variáveis (`let x: number`), parâmetros de funções e retornos (`function soma(a: number, b: number): number`).
- [x] **Tipos Primitivos**: `string`, `number`, `boolean`, `null`, `undefined`, `bigint`, `symbol`. A diferença crucial entre `String` (wrapper object) e `string` (tipo primitivo).
- [x] **Inferência de Tipos (Type Inference)**: Quando e como o TypeScript deduz tipos automaticamente. Por que nem sempre é necessário anotar explicitamente.
- [x] **`any`, `unknown` e `never`**: 
  - `any`: Desativa a checagem (buraco negro do type-system).
  - `unknown`: A alternativa segura ao `any` (exige verificação antes do uso).
  - `never`: O tipo que representa algo que nunca acontece (funções que lançam exceções, branches impossíveis).
- [x] **`void`**: Tipo de retorno para funções que não retornam valor. Diferença sutil entre `void` e `undefined`.
- [x] **Type Assertions (Asserções de Tipo)**: `as` e `<Type>` (ângulo). Quando usar e os perigos (`as unknown as T` — double assertion). A asserção `as const`.
- [x] **Literal Types**: Tipos literais de string, número e boolean (`let dir: "left" | "right"`). 

---

## 🟡 Fase 2: Tipos Compostos e Estruturas
*Combinando tipos para modelar dados reais do mundo.*

- [x] **Union Types (`|`)**: Combinando múltiplos tipos (`string | number`). Narrowing automático com `typeof`, `instanceof` e `in`.
- [x] **Intersection Types (`&`)**: Mesclando tipos em um só (`TypeA & TypeB`). Diferenças fundamentais em relação a `extends` em interfaces.
- [x] **Interfaces**: Declaração com `interface`. Propriedades opcionais (`?`), readonly (`readonly`), herança com `extends` (múltipla). Declaration Merging (o superpoder exclusivo das interfaces).
- [x] **Type Aliases (`type`)**: Criação de tipos nomeados. Diferenças práticas entre `type` e `interface` (union types, intersection, mapped types só com `type`; merging só com `interface`).
- [x] **Tuplas (Tuples)**: Arrays com tipo e tamanho fixo (`[string, number]`). Tuplas nomeadas (`[name: string, age: number]`). Tuplas variádicas (variadic tuples).
- [x] **Enums**: `enum` numérico, string enum, enum heterogêneo. O custo em runtime (enums geram código JS). `const enum` como alternativa sem custo. Enum vs Union de Literais (a abordagem moderna).
- [x] **Arrays e Objetos Tipados**: `number[]` vs `Array<number>`. Objetos com index signatures (`{ [key: string]: number }`). `Record<K, V>` como alternativa tipada.

---

## 🟠 Fase 3: Narrowing e Controle de Fluxo de Tipos
*O TypeScript é inteligente — ele rastreia o tipo dentro de cada bloco de código.*

- [x] **Type Narrowing Completo**: 
  - `typeof` guards (para primitivos).
  - `instanceof` guards (para classes).
  - `in` operator (para checar propriedades em objetos).
  - Comparações de igualdade (`===`, `!==`, `==`, `!=`).
  - Truthiness narrowing (o que `if (value)` faz com o tipo).
- [x] **Discriminated Unions (Uniões Discriminadas)**: O padrão mais poderoso do TypeScript. Usar uma propriedade comum (`type`, `kind`, `status`) para discriminar entre variantes de uma union. Exhaustive checking com `never`.
- [x] **Type Predicates (`is`)**: Funções que retornam `value is Type` para criar custom type guards reutilizáveis.
- [x] **Assertion Functions (`asserts`)**: Funções que usam `asserts value is Type` para afirmar tipos via throw (padrão usado em validators).
- [x] **`satisfies` Operator (TS 5.0+)**: Validar que um valor satisfaz um tipo sem perder o tipo inferido mais específico. Diferença entre `satisfies` e `as`.

---

## 🔴 Fase 4: Funções Avançadas e Sobrecarga
*Dominando a tipagem de funções em todos os cenários possíveis.*

- [x] **Tipagem de Funções**: Function types (`(a: number) => string`). Tipando callbacks. `type` e `interface` para descrever assinaturas de função.
- [x] **Overload Signatures (Sobrecarga de Funções)**: Declarar múltiplas assinaturas para uma única implementação. Regras de ordenação e resolução de overloads.
- [x] **Generics em Funções**: `function identity<T>(value: T): T`. Inferência automática de generics. Múltiplos parâmetros genéricos (`<T, U>`).
- [x] **Generic Constraints (`extends`)**: Restringindo generics (`<T extends { length: number }>`). `keyof` com generics para acessar chaves de forma tipada.
- [x] **`this` Parameter Type**: Tipando explicitamente o `this` de funções e métodos. `ThisParameterType<T>` e `OmitThisParameter<T>`.
- [x] **Parâmetros Rest Tipados**: `...args: [string, number]` (rest como tupla). Inferência de rest parameters em generics.


---

## 🟣 Fase 5: Generics em Profundidade
*Generics são o coração da abstração reutilizável no TypeScript.*

- [x] **Generic Interfaces e Type Aliases**: `interface Container<T> { value: T }`. Defaults em generics (`<T = string>`).
- [x] **Generic Classes**: Classes parametrizadas por tipo. Constraints em classes genéricas.
- [x] **Covariância e Contravariância**: Como o TypeScript lida com subtipos em generics. `in` e `out` modifiers (TS 4.7+) para variância explícita. Por que arrays são covariantes e funções são contravariantes nos parâmetros.
- [x] **Generic Conditional Defaults e Inferência**: Padrões avançados como `<T extends string = "default">`. Inferência em cadeias de generics.
- [x] **`infer` Keyword**: Extraindo tipos dentro de conditional types (`T extends Promise<infer U> ? U : never`). Múltiplos `infer` e inferência em posições covariantes vs contravariantes.

---

## 🔵 Fase 6: O Sistema de Tipos como Linguagem (Type-Level Programming)
*Aqui o TypeScript deixa de ser "só tipagem" e vira uma linguagem de programação no nível dos tipos.*

- [x] **Mapped Types**: Transformando tipos existentes propriedade por propriedade (`{ [K in keyof T]: ... }`). Modificadores `readonly`, `?`, `-readonly`, `-?`. Remapeamento de chaves com `as`.
- [x] **Conditional Types**: `T extends U ? X : Y`. Distributividade sobre unions. Como evitar a distribuição com `[T] extends [U]`.
- [x] **Template Literal Types**: Tipos que usam template strings (`type Route = \`/api/${string}\``). Combinação com union types para gerar combinações. Utility types: `Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize`.
- [x] **Recursive Types**: Tipos que referenciam a si mesmos (`type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> }`). Limites de recursão do compilador.
- [x] **Key Remapping (`as` in Mapped Types)**: Filtrando e renomeando chaves dentro de mapped types (`as \`get${Capitalize<K>}\``).
- [x] **Utility Types Nativos em Profundidade**: Entender a implementação interna de cada utility type:
  - `Partial<T>`, `Required<T>`, `Readonly<T>`
  - `Pick<T, K>`, `Omit<T, K>`
  - `Record<K, T>`
  - `Exclude<T, U>`, `Extract<T, U>`
  - `NonNullable<T>`
  - `ReturnType<T>`, `Parameters<T>`, `ConstructorParameters<T>`, `InstanceType<T>`
  - `Awaited<T>` (TS 4.5+)
  - `NoInfer<T>` (TS 5.4+)

---

## ⚫ Fase 7: Classes Avançadas e Decorators
*OOP em TypeScript com recursos que não existem no JavaScript puro.*

- [x] **Modificadores de Acesso**: `public`, `private`, `protected`. Diferença entre `private` do TS e o `#` nativo do ES2022 (um é compilação, o outro é runtime).
- [x] **`abstract` Classes e Métodos**: Classes que não podem ser instanciadas diretamente. Métodos que devem ser implementados pelas subclasses.
- [x] **`implements` (Classes implementando Interfaces)**: Garantindo que uma classe segue um contrato. Diferença entre `extends` (herança) e `implements` (contrato).
- [x] **Parameter Properties**: Atalho `constructor(public name: string)` que declara e inicializa propriedades automaticamente.
- [x] **Mixins**: Padrão para composição de classes sem herança múltipla. Usando intersection types e funções construtoras.
- [x] **Decorators (Stage 3 / TS 5.0+)**: Os novos decorators nativos do TC39. `@classDecorator`, `@methodDecorator`, `@fieldDecorator`, `@accessorDecorator`. Diferença entre os decorators legados (`experimentalDecorators`) e os novos.
- [x] **`accessor` Keyword (TS 4.9+)**: Auto-accessors em classes que criam getter/setter automáticos.

---

## 🟤 Fase 8: Módulos, Namespaces e Declarações
*Como o TypeScript organiza e compartilha tipos entre projetos.*

- [x] **Módulos no TypeScript**: ESM nativo. `import type` e `export type` (importações apenas de tipo que são removidas na compilação). `verbatimModuleSyntax` (TS 5.0+).
- [x] **Module Resolution**: Estratégias `node`, `node16`, `nodenext`, `bundler`. Entender `moduleResolution` no `tsconfig.json`. Extensões `.js` em imports ESM.
- [x] **Declaration Files (`.d.ts`)**: O que são e como funcionam. `declare` keyword. Criando tipagens para bibliotecas sem tipos.
- [x] **DefinitelyTyped (`@types/`)**: O repositório comunitário de tipos. Como instalar e usar tipos de terceiros (`@types/node`, `@types/express`, etc).
- [x] **Namespaces (e por que evitá-los)**: `namespace` como agrupamento de tipos (uso legado). Por que módulos ESM são a abordagem moderna.
- [x] **`tsconfig.json` em Profundidade**:
  - `strict` e todas as flags que ele ativa (`strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`, `noImplicitAny`, etc).
  - `paths` e `baseUrl` para aliases de importação.
  - `references` e Project References para monorepos.
  - `composite`, `incremental`, `declaration`, `declarationMap`, `sourceMap`.

---

## 🟢 Fase 9: Padrões Avançados e Patterns do Mundo Real
*Técnicas e padrões que separam o usuário casual do especialista.*

- [x] **Branded/Nominal Types (Tipos Nominais)**: Criando tipos que são estruturalmente idênticos mas semanticamente distintos (`type UserId = number & { __brand: "UserId" }`). Por que o TypeScript é estrutural e não nominal por padrão.
- [x] **Builder Pattern com Types**: Encadear métodos com tipos que rastreiam o estado da construção (cada `.set()` retorna um tipo diferente).
- [x] **Exhaustive Pattern Matching**: Usar `never` e `switch` para garantir em tempo de compilação que todos os casos de uma union foram tratados.
- [x] **Type-Safe Event Emitters**: Tipando eventos e seus payloads dinamicamente com mapped types e generics.
- [x] **Overloads Condicionais (Conditional Overloads)**: Combinar overloads com generics e conditional types para retornos que dependem do input.
- [x] **Phantom Types (Tipos Fantasma)**: Parâmetros genéricos que existem apenas no nível do tipo para codificar estados e invariantes.
- [x] **HKTs (Higher-Kinded Types) Simulados**: Padrões para simular tipos de tipo superior usando interfaces e mapped types (o TypeScript não tem HKTs nativos).
- [x] **Type-Safe State Machines**: Modelando máquinas de estado com discriminated unions onde as transições são controladas pelo sistema de tipos.

---

## 🔴 Fase 10: Performance do Compilador e Diagnóstico
*Entender como o compilador TypeScript funciona internamente e como mantê-lo rápido.*

- [x] **Performance do Type Checker**: Por que certos padrões de tipos são lentos. Evitando tipos recursivos profundos. Usando `--generateTrace` para diagnosticar gargalos.
- [x] **Erros de Tipo Legíveis**: Lendo e interpretando mensagens de erro complexas do TypeScript. A arte de navegar por erros de conditional types e generics aninhados.
- [x] **`// @ts-expect-error` vs `// @ts-ignore`**: Suprimindo erros de forma controlada. Quando cada um é apropriado.
- [x] **`declare` e Ambient Declarations**: Declarando tipos globais (`declare global`). Augmentando módulos existentes (Module Augmentation). Augmentando interfaces globais.
- [x] **Type Testing**: Usando bibliotecas como `tsd` ou `expect-type` para escrever testes unitários para seus **tipos** (não para código, mas para os próprios tipos).
- [x] **Migração de JavaScript para TypeScript**: Estratégias incrementais (`allowJs`, `checkJs`, `@ts-check`). JSDoc como ponte para tipagem em arquivos `.js`.

---

## ⚫ Fase 11: Integração com Ecossistemas
*Aplicando TypeScript em contextos reais de desenvolvimento.*

- [x] **TypeScript com Node.js**: Configuração com `ts-node`, `tsx`, uso de `@types/node`. ESM vs CJS no Node com TS.
- [x] **TypeScript com React**: Tipando componentes (`FC`, `ReactNode`, `PropsWithChildren`), hooks (`useState<T>`, `useRef<T>`), event handlers, Context API tipada. `as const` em props.
- [x] **TypeScript com APIs REST**: Tipando requests e responses. Inferência de tipos a partir de schemas (Zod, io-ts, Valibot). Type-safe API clients.
- [x] **TypeScript com ORMs e Bancos de Dados**: Prisma, Drizzle, Kysely — como eles geram/inferem tipos a partir do schema do banco.
- [x] **TypeScript com Testes**: Tipando mocks, stubs e fixtures. Generics em helpers de teste.
- [x] **Monorepos com TypeScript**: Project References, `paths`, workspaces (npm/pnpm/yarn). Compilação incremental com `--build`.
