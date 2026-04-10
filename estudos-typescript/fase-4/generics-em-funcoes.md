---
fase: 4
tema: "Generics em Funções"
dificuldade: intermediário
domínio: 70
tags: [generics, abstraction, reusable-code, flashcards]
revisado: 2026-03-31
---
# Generics em Funções (`<T>`)

Generics são a forma do TypeScript de criar **abstrações reutilizáveis**. Em funções paramétricas, eles definem variáveis de tipo que serão travadas/inferidas de acordo com o que quem chama a função repassar.

## Inferência Automática (`<T>`)

Você pode declarar o buraco da tipagem angular `<T>` na função e usá-lo livremente dentro dela.

```typescript
function ultimo<T>(array: T[]): T {
    return array[array.length - 1];
}

// O TypeScript infere o Generic Type baseado no argumento real:
const num = ultimo([1, 2, 3]);       // T é deduzido como 'number'
const str = ultimo(["a", "b", "c"]); // T é deduzido como 'string'
```

## Múltiplos Parâmetros Genéricos (`<T, U>`)

Quando uma tipagem se relaciona com mais de um fluxo de dados distinto:

```typescript
function fundir<T, U>(objX: T, objY: U): T & U {
    return { ...objX, ...objY };
}

// O TS mescla `{ nome: string }` + `{ idade: number }` dinamicamente!
const misto = fundir({ nome: "Ana" }, { idade: 30 }); 
misto.nome; // Funciona
misto.idade; // Funciona
```

---
## Flashcards
O que um Generic (`<T>`) faz em uma função? :: Ele age como uma variável de tipo, permitindo que a função trabalhe com diferentes tipos mantendo a integridade entre entrada e saída.
Como o TypeScript descobre o valor de `T` se eu não passar explicitamente? :: Através da **Inferência de Tipo**, analisando os argumentos passados na chamada da função.
Vantagem de usar Generics em vez de `any`? :: Generics preservam a informação do tipo original e garantem type-safety, enquanto `any` desativa as checagens.

## Conexões
- Evolução: [[generic-constraints|Generic Constraints (`extends` e `keyof`)]]
- Aprofundamento: [[1-generic-interfaces-aliases|Generic Interfaces]] (Fase 5)
- Aplicação real: [[3-phantom-types|Phantom Types e Event Emitters]] (Fase 9)
- Utility Types usam generics: [[6-utility-types-nativos|Utility Types Nativos]] (Fase 6)
