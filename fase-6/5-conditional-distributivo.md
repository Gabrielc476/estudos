---
fase: 6
tema: "Conditional Types e Distributividade"
dificuldade: intermediário
domínio: 70
tags: [conditional-types, distributivity, unions, logic, flashcards]
revisado: 2026-03-31
---
# Conditional Types e Distributividade

Na fase anterior nós vimos o básico sobre os `Conditional Types` (`T extends U ? X : Y`).
A verdadeira dor de cabeça matemática deles (e o seu maior poder) ocorre quando injetamos **Unions (`A | B`)** lá dentro do `T`.

Quando o TypeScript bate num Condicional e percebe que a entrada `T` é uma união, ele não avalia a união inteira de uma vez. Ele **Distribui** a condicional explodindo-a para avaliar cada membro separadamente, e depois une os resultados. (Pense na propriedade distributiva da matemática: `A * (B + C) = A*B + A*C`).

## A Distributividade em Ação

```typescript
// Se T for uma string, retorne um Array dessa string. Senão, retorne numero.
type ParaArray<T> = T extends string ? T[] : number;

// E se mandarmos a União (string | boolean)?
type MeuTipoMagico = ParaArray<string | boolean>;

/* 
O que o TS faz por baixo dos panos (Distributividade):
1. Pega 'string': string extends string ? string[] : number -> string[]
2. Pega 'boolean': boolean extends string ? boolean[] : number -> number
3. Une tudo: string[] | number

Resultado final perfeito mapeado para as duas frentes:
type MeuTipoMagico = string[] | number 
*/
```

## Como Desativar a Distributividade (Bloqueio em Tupla `[]`)

Em casos raros de Metaprogramação pesada, você **não quer** que o TS separe a união. Você quer avaliar se "A União Inteira `(A | B)`" é estritamente igual à outra coisa.

Para desligar esse comportamento automático, envelopamos o tipo na comparação dentro de colchetes de Tupla `[]`.

```typescript
// Distributivo (ON):
type ExtendeString<T> = T extends string ? true : false;
type Teste1 = ExtendeString<"Texto" | 123>; // true | false (distribuiu avaliando o texto, e dps o 123)

// Distributivo DESLIGADO (Block em Tupla ON):
type ExtendeStringRigido<T> = [T] extends [string] ? true : false;

// O TS avalia toda a união de uma vez: "A union ['Texto' OU 123] estritamente é herança fechada do grupo universal [string]?"
type Teste2 = ExtendeStringRigido<"Texto" | 123>; // literal 'false' limpo! (A união inteira falhou em ser apenas textual).
```

Saber como desligar a Distributividade envelopando com `[T]` é uma das perguntas de entrevista técnica mais avançadas e valiosas em TypeScript!

---
## Flashcards
O que é a Distributividade em Condicionais? :: É o comportamento onde o TS avalia cada membro de uma união separadamente ao passar por um Conditional Type.
Como desativar a distributividade automática? :: Envolvendo os tipos da comparação em colchetes de tupla `[]` (ex: `[T] extends [U]`).
Por que desativar a distributividade? :: Para verificar se a união inteira como um bloco único respeita uma regra, em vez de avaliar membro por membro.

## Conexões
- Pré-requisito: [[4-conditional-defaults|Conditional Types]] (Fase 5)
- Base de: [[6-utility-types-nativos|Exclude e Extract]]
- Desligar distributividade: Truque avançado com `[T] extends [U]`
- Aplicação: [[5-overloads-condicionais|Overloads Condicionais]] (Fase 9)
