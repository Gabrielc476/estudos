---
fase: 1
tema: Resumo da Fase 1
dificuldade: iniciante
domínio: 90
tags:
  - fundamentos
  - tipos-primitivos
  - inferencia
  - flashcards
revisado: 2026-03-31
---
# Fase 1: Fundamentos do Sistema de Tipos

Esta fase cobre o básico de como o TypeScript adiciona tipagem estática por cima do JavaScript.

## 1. Anotações de Tipo Básicas

Anotar tipos é dizer ao compilador o que uma variável, parâmetro ou retorno deve ser, usando a sintaxe `: tipo`.

```typescript
let nome: string = "Gabriel";
let idade: number = 25;
let ativo: boolean = true;
```

**Em funções:**
Os parâmetros **devem** ser tipados (quando `strict: true`). O retorno é opcional, mas altamente recomendado como uma rede de segurança.

```typescript
function somar(a: number, b: number): number {
    return a + b;
}
```

---

## 2. Tipos Primitivos

O TypeScript usa os 7 tipos primitivos do JavaScript, todos em **letras minúsculas**:

- `string`: Texto (`"Olá"`). **Atenção:** Nunca use `String` (maiúsculo), que é o object wrapper do JS.
- `number`: Inteiros e decimais (`42`, `3.14`, `NaN`).
- `boolean`: Verdadeiro ou falso (`true`, `false`).
- `bigint`: Números gigantescos (ex: `100n`).
- `null`: Ausência intencional de valor.
- `undefined`: Valor não definido.
- `symbol`: Identificador único (`Symbol("id")`).

---

## 3. Inferência de Tipos (Type Inference)

O TypeScript é inteligente o suficiente para descobrir os tipos sozinho pelo valor atribuído. **Anotar variáveis inicializadas é redundante e deve ser evitado.**

```typescript
let nome = "Gabriel"; // TS infere: string
let notas = [1, 2, 3]; // TS infere: number[]

// A diferença entre let e const:
let cor1 = "azul";   // Inferido: string (amplo)
const cor2 = "azul"; // Inferido: "azul" (literal type, porque const não muda)
```

**Quando a inferência não funciona (precisa anotar):**
1. Parâmetros de função.
2. Variáveis sem valor inicial (`let x;`).
3. Arrays vazios (`let lista = [];` vira `any[]`).

---

## 4. `any`, `unknown` e `never`

A tríade de extremos do type-system:

- **`any` (O buraco negro):** Desativa a tipagem. Aceita tudo e permite qualquer operação. É perigoso e contagia o código. Evite a todo custo.
- **`unknown` (A alternativa segura):** Aceita qualquer valor igual o `any`, mas **dá erro se você tentar usá-lo sem verificar o tipo antes**.
- **`never` (O impossível):** Um tipo que não aceita **nenhum valor**. Usado para funções que nunca retornam (lançam `throw` ou loop infinito) ou para o *exhaustive checking* em switch/cases.

---

## 5. `void` vs `undefined`

Ambos lidam com funções que "não retornam nada" em JS, mas têm uma semântica diferente no TypeScript:

- **`void`**: Significa que o TypeScript **vai ignorar** o que a função retornar. Usado para funções que só executam ações (`console.log`) ou callbacks flexíveis.
- **`undefined`**: Significa que a função é **obrigada a retornar `undefined` explicitamente** (`return undefined;`).

---

## 6. Type Assertions (Asserções)

Usadas quando você "sabe mais que o compilador". É você forçando um tipo (não há conversão ou validação em runtime).

```typescript
// Sintaxe com 'as':
const input = document.querySelector("#email") as HTMLInputElement;

// Sintaxe em ângulo (não funciona no React/JSX):
const input2 = <HTMLInputElement>document.querySelector("#email");
```

**`as const` (Muito útil):** Congela o valor ao tipo mais restrito possível (literal e readonly).

```typescript
const CONFIG = { porta: 3000 } as const;
// Cria um objeto onde porta é exatamente 3000 e é readonly.
```

---

## 7. Literal Types

São tipos que representam **valores exatos**, não apenas o grupo genérico. Podem ser de string, number ou boolean.

```typescript
// A variável só pode ter um desses três valores exatos:
let status: "pendente" | "aprovado" | "rejeitado" = "pendente";

// Se tentar colocar "falhou", da erro!
```

---
## Flashcards
Qual a diferença básica entre `any` e `unknown`? :: `any` desativa as verificações de tipo, permitindo qualquer operação; `unknown` exige que você verifique o tipo antes de realizar operações na variável.
O que é um Literal Type? :: É quando um tipo assume um valor exato e imutável (ex: `let status: "sucesso"` só aceita a string "sucesso").
O que o tipo `never` representa? :: Representa um valor que nunca deverá ocorrer, geralmente usado para funções que lançam erros ou loops infinitos.

## Conexões
- Detalhes: [[o-que-e-typescript|O que é TypeScript?]]
- Detalhes: [[configuracao-tsconfig|Configuração do tsconfig.json]]
- `any` vs `unknown`: Reforçado em [[narrowing-completo|Narrowing Completo]] (Fase 3)
- `never`: Usado em [[4-exhaustive-matching|Exhaustive Matching]] (Fase 9)
- Literal Types: Base dos [[discriminated-unions|Discriminated Unions]] (Fase 3)
- `as const`: Usado em [[5-typescript-react|TypeScript com React]] (Fase 11)
