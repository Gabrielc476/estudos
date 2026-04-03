---
fase: 2
tema: "Resumo da Fase 2"
dificuldade: iniciante
domínio: 70
tags: [unions, intersections, interfaces, types, flashcards]
revisado: 2026-03-31
---
# Fase 2: Tipos Compostos e Estruturas

Esta fase lida com a maneira que combinamos tipos para descrever formas reais da sua aplicação (Arrays, Objetos, Dicionários etc).

## 1. Union Types (`|`)

Uma union permite que um valor seja "um tipo **OU** outro" (ex: `string | number`).

O TypeScript aplica **Type Narrowing** (Estreitamento) por Análise de Controle de Fluxo. Se a variável é uma dessas duas, você precisa isolar (narrow) antes de usar um método específico.

```typescript
function exibir(id: string | number) {
    if (typeof id === "string") {
        console.log(id.toUpperCase()); // ✅ só strings têm toUpperCase
    } else {
        console.log(id.toFixed(2));    // ✅ number isolado!
    }
}
```

As formas mais comuns de estreitar:
- `typeof` (para primitivos `string`, `number` etc)
- `instanceof` (para classes `Date`, `Array`)
- Operador `in` (para objetos e suas chaves)
- O combo master: Lidar com `null` e `undefined` isoladamente (`if (valor !== null)`).

---

## 2. Intersection Types (`&`)

Enquanto a Union é exclusiva, a Intersection ("este tipo **E** este tipo") **junta tudo num tipo maior**.
Ele obriga que o objeto final tenha TODAS as propriedades de TODOS os tipos da Intersection.

```typescript
type Pessoa = { nome: string };
type Trabalhador = { cargo: string };

type Funcionario = Pessoa & Trabalhador; 
// Dev's "nome" E "cargo" são OBRIGATORIOS
```

- **Vício oculto:** Conflitos silenciosos nas Intersections geram o temido `never`. (E.g. tentar juntar a mesma propriedade duas vezes sendo uma `string` e outra `number`)
- **VS Extends:** `type` com `&` resolve quieto, `interface` com `extends` grita de erro na hora da incompatibilidade.

---

## 3. Interfaces

O verdadeiro pilar de design orientado a objetos e modelagem no TypeScript. Defines contratos explícitos.

```typescript
// Prop. obrigatória e opcionais.
interface Usuario {
    nome: string;
    idade?: number; // pode não existir (number | undefined)
    readonly id: string; // Só leitura: Ts bloqueia overwrite.
}
```

Elas suportam:
- **Herança Simples e Múltipla (`extends`)**: Uma interface pode puxar tudo de `A` e `B` ao mesmo tempo.
- **Implementação por Classes (`implements`)**: Exige que as classes assinem e cumpram esse contrato na íntegra.

**⚡ O SuperPoder:** *Declaration Merging*! 
Ao declarar duas vezes a mesma `interface` no código ou nos pacotes (Ex: express `Request`), o TypeScript simplesmente junta as duas num mega-objeto no final da compilação.
Isso MATA a pau e é exclusivo de Interface.

---

## 4. Type Aliases (`type`)

O nome gordinho diz: apenas apelidar tipos. Porém, ele faz 99% do que a Interface faz para modelar objetos, e vai muito além:

- Faz union (`type ID = string | number`)
- Tipa primitivos diretos (`type N = string`)
- Cria Tuplas.

**Regra prática:**
1. Descrever Classes/Objetos que crescerão num framework ou pacote open source? Vá de **`interface`**.
2. Tipos soltos, unions variadas ou se só quiser tipar rápido um objeto qualquer? Vá de **`type`**.

---

## 5. Tuplas (Tuples)

Tupla é um Array quebrado onde o TypeScript **SABE o tamanho exato** e **quais tipos moram em quais índices fixos.**

```typescript
type Coordenada3D = [x: number, y: number, z?: number];
// z é opcional! x e y precisam ser number.
```

- **Rest parameters (`...`)**: Pode começar estruturada e agrupar final: `[string, ...number[]]`.
- **Atenção:** Em TS as Tuplas "vazam" tamanho com um `.push()`. Por isso, crie elas como **`readonly [string, number]`**.

---

## 6. Enums e a Alternativa Moderna

O Enum numérico agrupa constantes de zero a frente ou declaradas, mas eles têm uma arquitetura problemática onde:
1. Injetam uma quantidade ridícula de código JavaScript extra.
2. Gerenciam auto-indexes confusos (Enum "Heterogêneo").

*Sintaxe clássica*
```typescript
enum Status { Pendente = 1, Finalizado = 2 } // Evite
```

A **Alternativa Moderna Absoluta**: Union Types de Literais "Congelados" via `as const`.

```typescript
const STATUS = {
  OK: "OK",
  ERRO: "ERRO"
} as const; // Congela isso pra literal em vez de generalizar pra string!

type StatusValues = typeof STATUS[keyof typeof STATUS]; 
// Puxa: "OK" | "ERRO"
```

---

## 7. Arrays e Record

Coleções dinâmicas de tamanho ou formato variável. 

**Arrays**
Use `number[]` no dia a dia. Evite a sintaxe clássica `Array<number>`.
Para mixar: `let nomes: (string | number)[]`.

**Objetos (Dicionários)**
Se você não sabe quais são as chaves de um objeto proativo (ex: tabela de scores), use `Record<Chave, Valor>`.

```typescript
type NotaDeAlunos = Record<string, number>; 
// Equivalente à 'Index Signature': { [chave: string]: number }
```

O *Poder Extremo* do `Record` está na **restrição explícita de literais**:

```typescript
type Comida = "Pizza" | "Hamburguer";
type Contagem = Record<Comida, number>;
```
Isto obriga seu dicionário `{[k: string]: v}` a ter **exatamente** aquelas duas chaves de `Comida`. Nem a mais, nem a menos, todas configuradas por literais.

---
## Flashcards
Qual a principal diferença entre Interface e Type Alias no que diz respeito à extensão? :: Interfaces podem ser "reabertas" para adicionar novos campos (Merging), enquanto Type Aliases não podem ser alterados após criados.
O que faz um Intersection Type (`A & B`)? :: Ele cria um novo tipo que combina todas as propriedades de A e B obrigatoriamente.
O que é uma Tupla no TypeScript? :: É um array com tamanho fixo e tipos de elementos definidos para cada posição.

## Conexões
- Union Types: Base do [[narrowing-completo|Narrowing]] e [[discriminated-unions|Discriminated Unions]] (Fase 3)
- Intersection Types: Usados nos [[1-branded-types|Branded Types]] (Fase 9)
- Interfaces (Declaration Merging): Usado em [[4-declare-ambient|Module Augmentation]] (Fase 10)
- Tuplas: Aparecem em [[this-e-rest-parameters|Rest Parameters Tipados]] (Fase 4)
- Record: Base dos [[1-mapped-types|Mapped Types]] (Fase 6)
