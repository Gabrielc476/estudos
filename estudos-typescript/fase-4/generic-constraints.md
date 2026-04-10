---
fase: 4
tema: "Generic Constraints"
dificuldade: intermediário
domínio: 70
tags: [generics, extends, keyof, constraints, flashcards]
revisado: 2026-03-31
---
# Generic Constraints (`extends`)

Nem sempre queremos que nossa função genérica aceite LITERALMENTE QUALQUER TIPO existente. As vezes queremos dizer:
*"Esta função aceita qualquer `<T>`, **desde que** esse `T` possua as propriedades que eu definir"*.

Para fechar o escopo de aceitação de um tipo genérico, usamos a restrição **`extends`**:

```typescript
// T deve estender (ter as propriedades de) um objeto com 'length' do tipo number
function loggerTamanho<T extends { length: number }>(item: T): void {
    // Sem o extends ali em cima, o TS jogaria erro dizendo que "Property length does not exist on type T"
    console.log(`O tamanho é: ${item.length}`);
}

loggerTamanho("Gabriel"); // ✅ String tem length nativo
loggerTamanho([1, 2, 3]); // ✅ Array tem length nativo
loggerTamanho(42);        // ❌ Number não tem length! TS bloqueia.
```

## O Combo Supremo: `extends` com `keyof`

O `keyof` é um operador em TS que extrai a união literal das chaves de um objeto!
Combinando `<T>` + `extends` + `keyof T`:

```typescript
// T é o objeto inteiro. K é a propriedade. K DEVE ser uma string que existe dentro de T!
function extrairPropriedade<T, K extends keyof T>(objeto: T, chave: K) {
    return objeto[chave];
}

const usuario = {
    nome: "Gabriel",
    idade: 25
};

const nome = extrairPropriedade(usuario, "nome"); // ✅ Autocomplete mostra 'nome' ou 'idade'
const erro = extrairPropriedade(usuario, "cpf");  // ❌ ERRO! '"cpf"' is not assignable to '"nome" | "idade"'.
```

---
## Flashcards
Como restringir um Generic para aceitar apenas objetos que tenham uma certa propriedade? :: Usando a keyword `extends` (ex: `T extends { id: number }`).
O que o operador `keyof T` faz? :: Ele extrai todas as chaves literais de um tipo `T` e as transforma em uma união de strings.
Para que serve `K extends keyof T` em uma função? :: Garante que o argumento `K` seja obrigatoriamente uma das chaves existentes no objeto `T`.

## Conexões
- Pré-requisito: [[generics-em-funcoes|Generics em Funções]]
- Evolução: [[2-generic-classes|Generic Classes]] (Fase 5)
- `keyof` é a base de: [[1-mapped-types|Mapped Types]] (Fase 6)
- `extends` em condicionais: [[5-conditional-distributivo|Conditional Types]] (Fase 6)
