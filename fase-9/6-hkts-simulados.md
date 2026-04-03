---
fase: 9
tema: "HKTs (Higher-Kinded Types) Simulados"
dificuldade: avançado
domínio: 70
tags: [hkt, functional-programming, abstractions, advanced-generics, flashcards]
revisado: 2026-03-31
---
# HKTs (Higher-Kinded Types) Simulados

## O que são Higher-Kinded Types?

Em linguagens como Haskell e Scala, existe um conceito chamado **Tipos de Tipo Superior (HKTs)**. A ideia é: em vez de passar um tipo concreto como `Array<number>` para um Generic, você passa o **próprio construtor de tipo** (`Array`) e deixa a função decidir o que botar dentro dele depois.

Pense assim com analogia WoW: Em vez de dar pro NPC uma **Espada de Fogo pronta**, você entrega a ele a **Forja de Espadas** e ele escolhe o elemento depois.

O TypeScript **não tem HKTs nativos**. Mas a comunidade criou um Pattern engenhoso pra simular isso usando Interfaces e Mapped Types.

## O Pattern de Simulação

A ideia é criar uma "Interface Registro" que mapeia nomes de construtores de tipo para os tipos concretos:

```typescript
// 1. O "Registro" central de construtores de tipos
interface RegistroDeContainers {
    Array: unknown[];
    Promise: Promise<unknown>;
    Set: Set<unknown>;
}

// 2. Um utilitário que "aplica" um tipo concreto dentro de um construtor registrado
type Aplicar<Container extends keyof RegistroDeContainers, Valor> = 
    Container extends "Array" ? Valor[] :
    Container extends "Promise" ? Promise<Valor> :
    Container extends "Set" ? Set<Valor> :
    never;

// 3. Agora podemos criar funções que recebem o "nome do container" como Generic
function criarContainer<C extends keyof RegistroDeContainers, V>(
    tipo: C, 
    valor: V
): Aplicar<C, V> {
    if (tipo === "Array") return [valor] as Aplicar<C, V>;
    if (tipo === "Promise") return Promise.resolve(valor) as Aplicar<C, V>;
    if (tipo === "Set") return new Set([valor]) as Aplicar<C, V>;
    throw new Error("Container desconhecido");
}

const arr = criarContainer("Array", 42);     // tipo: number[]
const prom = criarContainer("Promise", "oi"); // tipo: Promise<string>
const set = criarContainer("Set", true);      // tipo: Set<boolean>
```

## Onde isso aparece no mundo real?

Bibliotecas como **fp-ts** (Programação Funcional em TypeScript) e **Effect** usam variações desse padrão para criar abstrações como `Functor`, `Monad` e `Applicative` que operam sobre qualquer container genérico.

É um padrão extremamente avançado. Se você entendeu a mecânica do "registro de construtores", você já está à frente de 99% dos devs TypeScript.

---
## Flashcards
O que é um Higher-Kinded Type (HKT)? :: É um tipo que aceita outro tipo como parâmetro sem aplicá-lo imediatamente (um "tipo de tipos").
O TypeScript suporta HKTs nativamente? :: Não de forma direta, mas podemos simulá-los usando "Defunctionalization" e interfaces de registro global.
Para que servem HKTs na prática? :: Para criar abstrações matemáticas e funcionais poderosas, como Functors e Monads, que funcionam com qualquer contêiner (Array, Option, Task).

## Conexões
- Registro de tipos: [[1-mapped-types|Mapped Types]] (Fase 6)
- Conditional Types: [[5-conditional-distributivo|Distributividade]] (Fase 6)
- Generic Interfaces: [[1-generic-interfaces-aliases|Generics]] (Fase 5)
- Usado em libs: fp-ts, Effect
