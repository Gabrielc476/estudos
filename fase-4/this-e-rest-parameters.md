---
fase: 4
tema: "this e Rest Parameters"
dificuldade: intermediário
domínio: 70
tags: [this, rest-parameters, spread, tuplas, flashcards]
revisado: 2026-03-31
---
# O parâmetro `this` em Funções e Rest Parameters

Em JS puro, o `this` é dinâmico (binding feito na invocação).
No TypeScript nós temos a capacidade de declarar (tipar) qual escopo nós prevemos que servirá de contêiner para a função e proteger isso estaticamente.

## Tipando o contexto (`this`)

Inserimos um **Parâmetro Fantasma** chamado `this` sendo sempre o *primeiro argumento* da Assinatura da Função. 
Quando invocado de fato no uso (runtime/compilação final), o compilador de JS vai ignorar nossa pseudo-argumenetação e usar só o que interessa.

```typescript
interface Usuario {
    nome: string;
    admin: boolean;
}

// O primeiro parâmetro 'this:' não conta no argumento de chamada (TS ignora pro usuário!)
function saudarAdmin(this: Usuario, msg: string) {
    if (this.admin) { // O autocomple pega as métricas perfeitas de Usuario
        console.log(`[SYS] O admin ${this.nome} disse: ${msg}`);
    }
}

const userLogado: Usuario = { nome: "Gabriel", admin: true };

// Injetando usando as APIs de Invocação de Contexto e aplicando:
const saudarBound = saudarAdmin.bind(userLogado);

// Chamando (msg: string apenas, o this escondeu!)
saudarBound("Ativei a feature!"); // ✅
```

*O TS possui utility Types globais para remover o this (`OmitThisParameter<T>`) ou extrair ele de uma func (`ThisParameterType<T>`).*

---

## Parâmetros Rest Tipados (`...args`)

As funções JS permitem espalhar parâmetros infinitos utilizando o Spread Syntax `...args`.
No TypeScript o Rest parameter é lido **obrigatoriamente** como um Array, ou mais estritamente, uma **Tupla** `[]`.

```typescript
// Tipagem como Array (Todos os itens devem ser numéricos, infinitos)
function somarTudo(...numeros: number[]) {
    return numeros.reduce((acc, curr) => acc + curr, 0);
}
somarTudo(1, 2, 3, 4, 5); // 15
```

### Usando Tuplas para Rest Parameters Estritos

Você pode fixar Tipos + Parâmetros infinitos variádicos e travar a ordem dos itens da entrada numa checagem rigorosa!

```typescript
// Tupla: O primeiro item é String obrigatório, o segundo Number, e o resto deve ser Booleanos infinitos
function megaLog(...args: [string, number, ...boolean[]]) {
    const [msg, num, ...flags] = args;
    console.log(msg, num, flags.every(f => f));
}

megaLog("Início", 42, true, false, true); // ✅ Passou nas reguas perfeitamente!
```

---
## Flashcards
Como tipar o `this` dentro de uma função no TS? :: Passando `this` como o primeiro parâmetro (falso) da função com o tipo desejado.
O que são Rest Parameters? :: É a sintaxe `...args` que agrupa todos os argumentos restantes passados para uma função em um único array.
Como tipar Rest Parameters com precisão usando tuplas? :: Definindo `...args: [string, number]` para forçar exatamente dois argumentos com esses tipos específicos.

## Conexões
- Base: [[tipagem-de-funcoes|Tipagem de Funções]]
- Tuplas tipadas: [[resumo-fase2|Tuplas]] (Fase 2)
- `this` em classes: [[1-modificadores-acesso|Modificadores de Acesso]] (Fase 7)
- `this` em Decorators: [[5-decorators-accessors|Decorators]] (Fase 7)
