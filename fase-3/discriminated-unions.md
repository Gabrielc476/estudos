---
fase: 3
tema: "Discriminated Unions"
dificuldade: iniciante
domínio: 70
tags: [discriminated-unions, unions, patterns, flashcards]
revisado: 2026-03-31
---
# Discriminated Unions (Uniões Discriminadas)

Esse é **o padrão de design de tipos mais poderoso e utilizado em todo o TypeScript moderno**. 
Livrarias como React (Reducers/Actions), Redux, XState, e qualquer validação de payload (como Zod) respiram esse padrão.

## O Problema que ele resolve

Imagine que você tem uma função que busca dados em uma API. Essa requisição pode ter 3 estados: "carregando", "sucesso" e "erro".

Uma tipagem inocente seria assim:

```typescript
// ❌ Abordagem ingênua e perigosa (NÃO FAÇA ISSO)
type State = {
    status: string;
    dados?: string[]; // Só tem se der sucesso
    erro?: string;    // Só tem se der erro
};

function renderizar(state: State) {
    if (state.status === "sucesso") {
        // O TS não garante que 'dados' existe! 
        // Ele ainda acha que `dados` pode ser undefined, forçando você a usar state.dados?.map()
        console.log(state.dados.map(x => x)); 
    }
}
```

O problema dessa abordagem é que ela permite **estados impossíveis**. Nada impede de existir um objeto assim:
`{ status: "carregando", erro: "Falhou", dados: ["a", "b"] }`.

---

## A Solução: Discriminated Unions

A ideia é criar **tipos separados e exatos** para cada cenário possível, e conectá-los (usando uma Union `|`) através de uma **propriedade comum e constante**. Essa propriedade é a nossa chave discriminadora (o "discriminador").

Normalmente chamamos essa chave de `type`, `kind` ou `status`, e usamos um **Literal Type** para ela.

Veja o exemplo acima reconstruído:

```typescript
// ✅ Abordagem Perfeita (Discriminated Union)

// Estado 1: Loading não tem mais nada
type StateLoading = {
    status: "carregando"; 
};

// Estado 2: Sucesso TEM QUE TER dados, mas não pode ter erro!
type StateSuccess = {
    status: "sucesso";
    dados: string[]; // Não é mais opcional, é obrigatório!
};

// Estado 3: Erro TEM QUE TER mensagem de erro, e não pode ter dados!
type StateError = {
    status: "erro";
    erro: string;
};

// A União que junta todos eles:
type State = StateLoading | StateSuccess | StateError;
```

A mágica acontece quando você faz um `if` ou `switch` checando essa **propriedade em comum (`status`)**:

```typescript
function renderizar(state: State) {
    
    // O TS sabe que a MAIORIA das propriedades não bate entre eles.
    // Mas ele sabe que TODOS os 3 têm a chave 'status'.
    
    if (state.status === "carregando") {
        // O TS "isolou" StateLoading. Não adianta procurar state.dados aqui.
        return "Carregando...";
    }
    
    if (state.status === "sucesso") {
        // ✨ MÁGICA: O TS "cortou" (narrowed) os outros dois tipos.
        // Ele sabe com 100% de certeza que somos 'StateSuccess'.
        // Logo, state.dados está tipado como 'string[]' (nunca será undefined).
        state.dados.forEach(d => console.log(d));
    }
    
    if (state.status === "erro") {
        console.error(state.erro);
    }
}
```

---

## Padrão Avançado: Exhaustive Checking com `never`

A Discriminated Union brilha mais ainda quando você usa o `switch/case` combinado com o tipo **`never`**. Isso garante que seu código NUNCA terá buracos (esquecer de tratar um caso novo que entrou no tipo).

```typescript
type Acao = 
    | { tipo: "CRIAR"; payload: string }
    | { tipo: "DELETAR"; id: number }
    | { tipo: "ATUALIZAR"; id: number; payload: string };

function reducer(acao: Acao) {
    switch (acao.tipo) {
        case "CRIAR":
            // Aqui acao é do primeiro tipo
            console.log(acao.payload);
            break;
        case "DELETAR":
            console.log(acao.id);
            break;
        case "ATUALIZAR":
            console.log(acao.id, acao.payload);
            break;
        default:
            // "Exhaustive Check" (Checagem Exaustiva)
            // Se cair aqui, significa que todos os tipos possíveis do Switch já foram filtrados.
            // Logo, não deveria sobrar nenhum tipo possível para a variável 'acao'.
            // O TS infere que, no default, ela é do tipo "never".
            
            const _exhaustiveCheck: never = acao;
            return _exhaustiveCheck;
    }
}
```

Por que isso é tão incrível?
Imagine que, 6 meses depois, outro programador chega e altera o tipo `Acao` para adicionar um novo evento:

```typescript
type Acao = 
    | { tipo: "CRIAR" ... }
    ...
    | { tipo: "ATUALIZAR" ... }
    | { tipo: "LIMPAR_TUDO" }; // 🚨 Novo tipo adicionado!
```

**Se você usou a checagem exaustiva com on `never` no default, veja o que acontece:**

O compilador vai imediatamente disparar um **ERRO vermelho no arquivo da função `reducer`**.
Por quê? Porque agora o tipo `LIMPAR_TUDO` vai vazar pelo switch, cair dentro do `default`, e o TS vai tentar atribuir ele ao tipo `never`.

A mensagem de erro será maravilhosa:
`Type '{ tipo: "LIMPAR_TUDO" }' is not assignable to type 'never'.`

Isso é o TypeScript te obrigando (em tempo de compilação) a ir lá no seu Switch e tratar o caso do "LIMPAR_TUDO", para sua aplicação nunca explodir em produção por ter um handle não atendido.

---

## Onde mais as Discriminated Unions são usadas?

Se você reparar na API `Fetch` ou manipuladores de JSON nativos (`Result`, `Either`), eles usam exatamente essa estrutura para proteger retornos:

```typescript
type HttpResponse<T> =
    | { ok: true; data: T }
    | { ok: false; error: Error };

async function buscarUsuario(): Promise<HttpResponse<{ nome: string }>> {
    try {
        return { ok: true, data: { nome: "Gabriel" } };
    } catch (e) {
        return { ok: false, error: e as Error };
    }
}
```
Na hora que você for consumir:
```typescript
const resposta = await buscarUsuario();

if (resposta.ok) {
    console.log(resposta.data); // data livre para consumo, erro não existe
} else {
    console.error(resposta.error); // error livre para consumo, data não existe
}
```

### Resumo Ouro 🥇
1. **Nunca crie "god objects"** (Objetos com vários atributos opcionais onde cada opção tem a ver com um estado que a variável possui internamente).
2. Estipule uma constante comum (geralmente `type`, `kind` ou `status`).
3. Separe cada variação num tipo exato, listando APENAS o que aquele tipo pode e deve ter.
4. Faça a união (`type Todos = A | B | C`).
5. Isole via Switch/Case validando a constante comum.
6. Jogue o Exhaustive `never` no fechamento!

---
## Flashcards
O que caracteriza uma Discriminated Union? :: A presença de uma propriedade comum com valor literal (o "discriminador") em todos os tipos da união.
Por que usar Discriminated Unions em vez de vários campos opcionais? :: Porque elas garantem estados válidos e impedem a combinação impossível de propriedades entre diferentes tipos.
Qual a vantagem de usar `switch` com Discriminated Unions? :: O TypeScript provê autocomplete para os casos do discriminador e narrowing automático para as propriedades específicas de cada tipo.

## Conexões
- Pré-requisito: [[narrowing-completo|Narrowing Completo]]
- Exhaustive checking com `never`: [[4-exhaustive-matching|Exhaustive Pattern Matching]] (Fase 9)
- Padrão usado em: [[7-state-machines|Type-Safe State Machines]] (Fase 9)
- Validação custom: [[predicates-asserts|Type Predicates]]
- Overloads combinados: [[5-overloads-condicionais|Overloads Condicionais]] (Fase 9)
