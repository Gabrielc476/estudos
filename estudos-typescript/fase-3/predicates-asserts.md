---
fase: 3
tema: "Predicates e Asserts"
dificuldade: iniciante
domínio: 70
tags: [type-guards, assertions, custom-narrowing, flashcards]
revisado: 2026-03-31
---
# Type Predicates e Assertion Functions

Até agora, vimos que o TypeScript é esperto o suficiente para *estreitar* (narrow) um tipo usando `typeof`, `instanceof` e `in` direto nos ifs.

Mas o que acontece quando você **extrai essa lógica para uma função separada**?

## O Problema das Funções de Checagem

Imagine que você escreve uma função que retorna um `boolean` só para limpar o código do seu `if`:

```typescript
type Peixe = { nadar: () => void };
type Passaro = { voar: () => void };

// Função auxiliar que checa se é um Peixe
function isPeixe(animal: Peixe | Passaro): boolean {
    // Retorna true se a propriedade 'nadar' existir 
    return (animal as Peixe).nadar !== undefined;
}

function mover(animal: Peixe | Passaro) {
    // Usamos a função auxiliar no if:
    if (isPeixe(animal)) {
        // ❌ Erro! O TypeScript se "perdeu".
        // Ele NÃO SABE que 'animal' é um Peixe aqui dentro.
        // Pra ele, isPeixe só retornou 'true' ou 'false', nada mais.
        animal.nadar(); // ❌ Property 'nadar' does not exist on type 'Peixe | Passaro'
    }
}
```

Quando a validação fica isolada atrás de uma função, o *Control Flow Analysis* do TS "quebra", porque ele não lê a implementação da sua função. Ele só vê que ela retornou `boolean`.

Como resolvemos isso? Ensinando ao TypeScript o que esse `boolean` **significa**.

---

## A Solução: Type Predicates (`is`)

Um **Type Predicate** (Predicado de Tipo) é um tipo especial de retorno de função. 
A sintaxe é `parâmetro is Tipo`.

Ao escrever isso no retorno, você está dizendo ao TypeScript: *"Confie em mim, se esta função retornar `true`, a variável que você passou como parâmetro É deste tipo"*.

Refatorando o exemplo anterior:

```typescript
// ✅ Mudamos o ': boolean' para ': animal is Peixe'
function isPeixe(animal: Peixe | Passaro): animal is Peixe {
    return (animal as Peixe).nadar !== undefined;
}

function mover(animal: Peixe | Passaro) {
    if (isPeixe(animal)) {
        // ✨ MÁGICA RESTAURADA! 
        // Como 'isPeixe' retornou true, o TS assume 'animal is Peixe'
        animal.nadar(); // ✅ Autocomplete funciona e erro some.
    } else {
        // Se isPeixe deu false, só sobrou Passaro:
        animal.voar();  // ✅ 
    }
}
```

### O uso mortal no `.filter()`

Se você tem um array misto e usa `filter()` para tirar os nulos, o TypeScript nativamente não entende isso:

```typescript
const valores: (number | null)[] = [1, null, 3, null, 5];

// A lógica funciona em JS, mas em TS:
const numeros = valores.filter(v => v !== null);
// 'numeros' continua tipado como (number | null)[] 😭
```

O Type Predicate é a arma pra "tipar o filter":

```typescript
// Criamos uma guard function reutilizável:
function isNumber(valor: number | null): valor is number {
    return valor !== null;
}

// Passamos ela no filter:
const numeros = valores.filter(isNumber);
// 🎉 Agora 'numeros' foi tipado perfeitamente como 'number[]' !!
```

---

## 2. Assertion Functions (`asserts`)

Existe um irmão mais agressivo do Type Predicate: as **Assertion Functions** (Funções de Asserção).

Enquanto o Predicate (`is`) funciona retornando `true` ou `false` e você a usa em um `if`, a Asserção (`asserts`) é uma função que **arremessa um erro** (Exception) se a condição falhar. Se ela **não arremessar**, o TypeScript estreita o tipo pro resto do escopo abaixo dela!

### Sintaxe: `asserts parametro is Tipo`

```typescript
// Função que explode se o erro não bater
function assertIsString(valor: unknown): asserts valor is string {
    if (typeof valor !== "string") {
        throw new Error("O valor não é uma string!");
    }
}

function imprimir(valor: unknown) {
    
    // Até aqui, 'valor' é undefined. Não sei o que é.
    // valor.toUpperCase() ❌ Erro
    
    // Chamamos a asserção no mesmo nível (sem 'if'):
    assertIsString(valor);

    // ✨ MÁGICA:
    // Se a linha acima passou (não explodiu o Error), o TS sabe
    // com 100% de certeza que o código abaixo lida apenas com string.
    
    console.log(valor.toUpperCase()); // ✅ TS sabe absoluto que é String.
}
```

### Onde isso é útil?
Geralmente no Node.js ou em fluxos de Validação/Middlewares. Se for inválido o Controller retorna `400 Bad Request` lançando um `throw`. O resto da função fica 100% estreitada. Bibliotecas como **Zod** usam e abusam do `asserts` e do `is` por baixo dos panos (via schemas de parsing estrito).

---

### Resumo Comparativo ⚡

| Funcionalidade | O que retorna no JS? | Sintaxe no TS | Onde usar? |
|----------------|----------------------|---------------|------------|
| **Type Predicate** | Retorna `boolean` | `val is Type` | Dentro de `if` ou no `.filter()` |
| **Assertion Func** | Retorna `void` (ou joga `throw`) | `asserts val is Type`| Direto no escopo. Se passar, dali pra baixo tá tipado. |

---
## Flashcards
Qual a sintaxe de retorno de um Type Predicate? :: `parametro is Tipo` (ex: `pet is Gato`).
O que uma Assertion Function faz? :: Ela valida se uma condição é verdadeira e, se não for, lança um erro; se for, ela garante o tipo para o restante do escopo.
Qual a sintaxe de retorno de uma Assertion Function? :: `asserts parametro is Tipo` (ex: `asserts val is string`).

## Conexões
- Pré-requisito: [[narrowing-completo|Narrowing Completo]]
- Usado junto com: [[discriminated-unions|Discriminated Unions]]
- Alternativa: [[satisfies|Operador satisfies]]
- Validação em runtime: [[3-runtime-validation-zod|Zod]] substitui asserts em APIs (Fase 11)
