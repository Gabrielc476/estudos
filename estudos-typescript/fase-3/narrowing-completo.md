---
fase: 3
tema: "Narrowing Completo"
dificuldade: iniciante
domínio: 70
tags: [typeof, instanceof, flow-analysis, flashcards]
revisado: 2026-03-31
---
# Fase 3: Narrowing e Controle de Fluxo

Nesta fase do roadmap de TypeScript, nós vamos entrar no coração do compilador: **Control Flow Analysis (Análise de Controle de Fluxo)**.

O compilador não lê apenas suas anotações de tipo de cima a baixo. Ele analisa *toda* a árvore lógica do seu código (`if`, `else`, `switch`, `return`). Conforme o fluxo vai passando por essas estruturas, os tipos vão sendo **estreitados**. 

Isso é o **Type Narrowing**.

---

## 1. Type Guards com `typeof` (Para Primitivos)

Você já usou o `typeof` no JS. O TypeScript entende o comportamento dele perfeitamente:

O `typeof` só retorna 8 strings possíveis no JavaScript primitivo central: `"string"`, `"number"`, `"boolean"`, `"symbol"`, `"undefined"`, `"object"`, `"function"` e `"bigint"`.

```typescript
function duplicar(valor: string | number) {
    // Aqui `valor` é 'string | number'

    if (typeof valor === "string") {
        // Magia: Aqui dentro o TS SABE que é uma string.
        return valor.repeat(2); 
    }

    // Se não era string, o que sobrou da union? 
    // Só pode ser number! O TS deduz isso sozinho.
    return valor * 2;
}
```

🚨 **Cuidado com O Famoso Bug do `typeof null`**:
Em JavaScript, `typeof null` retorna `"object"` (isso é um bug histórico do JS que nunca foi consertado).

Portanto, um `typeof valor === 'object'` **NÃO GARANTE** que não seja null:

```typescript
function imprimirInfo(alvo: Date | null) {
    if (typeof alvo === "object") {
        // alvo AINDA PODE SER NULL AQUI! (typeof null === 'object')
        console.log(alvo.getTime()); // ❌ Erro: 'alvo' possibly null
    }
}
```

---

## 2. Truthiness Narrowing (Lidando com Null/Undefined)

Para lidar com valores nulos ou variáveis não inicializadas (vazias, zero, NaN etc.), o TypeScript entende avaliações dinâmicas de conversão em booleano:

Os valores "falsy" no JS são: `0`, `""`, `NaN`, `null`, `undefined` e `false`.

```typescript
function pegarNome(nome: string | null | undefined) {
    
    if (nome) {
        // Aqui o TS sabe que 'nome' não pode ser null nem undefined.
        // Além disso, sabe que não é uma string vazia ("").
        // Logo, só pode ser uma 'string' válida com conteúdo.
        console.log("Nome extraído:", nome.toUpperCase());
    } else {
        console.log("Nenhum nome válido fornecido.");
    }
}
```

**⚠️ O Cuidado Necessário com Truthy**:
Essa abordagem resolve o problema do `null`, ok. Mas pode te sacanear com números e strings!
Se o nome fosse `""` (string vazia), ele entraria no `else`. Às vezes você **quer** permitir uma string vazia!

A forma definitiva de estreitar (narrow) `null` ou `undefined` de forma seguríssima é com a dupla exclamação de checagem direta:

```typescript
function pegarNomeSeguro(nome: string | null | undefined) {
    // Narrow explicitamente isolando nulls e undefineds:
    if (nome !== null && nome !== undefined) {
        // Aqui pode ser "", "Gabriel", "João". O TS sabe que é uma string sólida!
    }
}
```

---

## 3. Type Guards com `instanceof` (Para Classes)

Se a variável que você está checando foi construída com a keyword `new`, pode ser estreitada validando o protótipo com `instanceof`:

```typescript
function calcular(logica: Math | Date | string[]) {
    // logica nesse escopo baseia-se na tríade acima
    
    if (logica instanceof Date) {
        console.log(logica.toUTCString()); // ✅ é Data
    } else if (logica instanceof Array) {
        console.log(logica.length); // ✅ é Array de string
    }
}
```

---

## 4. O Operador `in` (Para Objetos/Interfaces Literais)

E se os objetos não forem classes (`new X`), mas construídos nativamente como objetos puros (`{...}`) ditados por um `type` genérico? `instanceof` não salva a gente aqui!

Para isso, usamos a validação da **chave**, com a sintaxe `"chave" in obj`:

```typescript
type Peixe = { barbatana: string };
type Passaro = { asa: number };

function mover(animal: Peixe | Passaro) {
    
    // Narrow com 'in':
    if ("barbatana" in animal) {
        // TS sabe: o animal TEM 'barbatana', ou seja, SÓ PODE SER o Peixe
        console.log(animal.barbatana); 
    } else {
        // Se não tem barbatana, da nossa união animalólica, só pode ser Passaro:
        console.log(animal.asa);
    }
}
```

Com o operador `in`, você ensina pro compilador de TypeScript qual caminho lógico da União seguir, baseando-se em chaves únicas!

---

## 5. Equality Narrowing (Comparações Diretas)

O TypeScript estreita baseado não só no formato (typeof/in) mas **nos valores** comparados ativamente:

```typescript
function analisar(x: string | number, y: string | boolean) {
    if (x === y) {
        // Pare, acompanhe:
        // x pode ser STRING ou NUMBER
        // y pode ser STRING ou BOOLEAN
        // Pra eles serem estritamente iguais (===), ambo OBRIGATORIAMENTE têm que ser do mesmo tipo primitivo.
        // O único tipo em comum ali? STRING!

        x.toUpperCase(); // ✅ x só pode ser string aqui dentro!
        y.toLowerCase(); // ✅ y só pode ser string aqui dentro!
    }
}
```
A inteligência do type-checker analisou o que é em comum num IF block que confia em igualdades restritas (`===`). É magia da checagem!

Quer que eu dê check nesta parte inicial do Narrowing e possamos pular para a arma mais absoluta de quem sabe TypeScript, a **Discriminated Union**?

---
## Flashcards
O que é o "Narrowing" no TypeScript? :: É o processo do compilador deduzir um tipo mais específico para uma variável dentro de um bloco de código, baseado em checagens lógicas.
Para que serve o operador `in` no estreitamento? :: Ele verifica se uma propriedade existe dentro de um objeto para diferenciar tipos em uma união.
Como o operador `instanceof` ajuda no narrowing? :: Ele verifica se um objeto é uma instância de uma determinada classe em runtime, estreitando o tipo para essa classe.

## Conexões
- Evolução: [[discriminated-unions|Discriminated Unions]]
- Custom Guards: [[predicates-asserts|Type Predicates e Assertion Functions]]
- Alternativa moderna: [[satisfies|Operador satisfies]]
- `typeof` e `instanceof`: Mencionados em [[o-que-e-typescript|O que é TypeScript?]] (Fase 1)
- Narrowing em Condicionais: [[5-conditional-distributivo|Conditional Types]] (Fase 6)
