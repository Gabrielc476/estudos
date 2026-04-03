---
fase: 5
tema: "Covariância e Contravariância"
dificuldade: intermediário
domínio: 70
tags: [variance, math, logic, functions, flashcards]
revisado: 2026-03-31
---
# Covariância e Contravariância

Bem-vindo a um dos tópicos matemáticos/acadêmicos mais assustadores, mas fundamentais para compreender o TypeScript avançado em seu nível celular.

Variância é a regra matemática de como o TypeScript julga se o Tipo "A" pode ser passado pro lugar ocupado pelo Tipo "B" quando ambos estão "engolidos" dentro de um contêiner Genérico imposto (ex: Callback Params).

Imagine essa hierarquia orientada a objetos:
1. `Animal` (Super Tipo Genérico / Abstração Total)
2. `Cachorro` (Subtipo Específico e Estrito de Animal)

Se uma função pura e plana pede o argumento *`Animal`*, eu posso passar argumento *`Cachorro`*? **SIM!**
Isso parece óbvio, certo? Mas as coisas ficam caóticas com as Estruturas em volta deles.

---

## Covariância (A Regra do Array - Mesma Direção)
A direção se **"MANTÉM"**

Se `Cachorro` é a subclasse de `Animal`, então um `Array<Cachorro>` também pode ser visto subclasse comportamental de um `Array<Animal>`?
No TypeScript a resposta é estritamente **SIM**. 
Arrays guardam estado e processam estado (via acesso ou retorno), portanto seu tipo de parâmetro aponta para fora na mesma direção da cadeia.

```typescript
type Passaro = { voar: boolean };
type Aguia = Passaro & { caca: boolean };

function soltar(gaiola: Array<Passaro>) {
    // liberação
}

const minhasAguias: Array<Aguia> = [{ voar: true, caca: true }];

// Isso funciona de forma orgânica! A gaiola pediu Pássaros. Você alocou as Águias inteiras ali dentro (todas as águias também se comportarão perfeitamente base no contrato como passáros).
soltar(minhasAguias); // ✅ COVARIANTE Pura.
```

---

## Contravariância (A Regra das Funções e Componentes - Direção Invertida)
A direção inteira inverte ativamente! **(CONTRA)**

Se `Cachorro` é subclasse de `Animal`, então uma função de Callback externa que *Lida especificamente com Cachorros `((c: Cachorro) => void)`* pode ser considerada de fato uma substituta correta de uma função que *Lida viavelmente com Todos os Animais `((a: Animal) => void)`* no momento da invocação?
Resposta absoluta da máquina de tipos: **NÃO! O sentido REVERTE e FURA!**

O compilador exige que os parâmetros abstratos de callback e assinaturas atuem logicamente de forma inversa.

A explicação é muito tangível: "Eu não posso dar pra você um tratador preparado apenas para lidar com *gatos*, se o seu canil mestre em tempo de execução vai abrigar passivamente *Ursos*".

```typescript
// O Callback esperado para o core do sistema funcionar deve conseguir lidar de braços abertos com QUALQUER eclesiagem do Tipo primitivo genético de Passaro
function processarPassaro(callback: (p: Passaro) => void) {
    // A função internamente baseada em RNG chama o seu callback argumentando um tipo que não tem TUDO que você imaginou.
    // Exemplo: O core do pacote chama injetando um simples pombo (tem voar, mas a struct dele NUNCA tem caca).
    callback({ voar: true }); 
}

// Seu script na infra quer tentar roubar as assinaturas
const tratadorIntensoDeAguia = (a: Aguia) => {
    console.log(a.caca);  // Aguia TEM 'caca'!
};

// Quando vc injeta o seu callback na thread base:
processarPassaro(tratadorIntensoDeAguia); 
// ❌ O TS JOGA UM ERRO CRÍTICO AQUI (Contravariância impeditiva). 
// Pois, se ele não fizesse isso ali na compilação em desenvolvimento, em `runtime` a parent call vai invocar seu callback com um Passaro pombo comum enviando: `{ voar: true }`. O paramêtro 'caca' exigido por seu subfundo vai quebrar dando undefined fatal!
```

_**Nota Crítica**_: No TypeScript, para ligar a checagem rígida na contravariância dos paramêtros de função, você PRECISA da ativação de `"strictFunctionTypes": true` configurado no escopo do `tsconfig.json` (Vem no preset do Strict).

---

## In/Out Modifiers (Typescript 4.7+)
Em arquiteturas megalomaníacas de frameworks como React Hook Form, NextJS, Redux Thunks etc, o compilador morre processando matematicamente as variâncias nas infinitas subpastas de árvore de tipos abertos para descobrir se algo tá invertido acidentalmente ou não...
Para aliviar dezenas de `computations`, você pode estampar hardcoded que um `GenericParameterType<Base>` entra no flow ativamente com a keyword `in` (Contravariância) e sai gerando valores acessíveis abertos usando `out` (Covariância).

Isso economiza recursos surreais do core do Typescript nas instâncias de Type checking:

```typescript
// TS: "Ele diz as regras... O tipo Genérico T só é devolvido (output). Jamais devorará parâmetros ativamente". -> Avaliado como Covariante
interface ProdutorLimpo<out T> {
    produzirParaLigar(): T;
}

// TS: "Entendido... O tipo T será puramente engolido nos loops e assinaturas aqui dentro (input). Ele nunca voltará pra surface". -> Avaliado nativamente como Contravariante
interface ConsumidorCego<in T> {
    consumirDandoTrash(item: T): void;
}
```

---
## Flashcards
O que é Covariância simples? :: É quando um tipo segue a mesma hierarquia de herança (se Gato estende Animal, então `Array<Gato>` pode ser atribuído a `Array<Animal>`).
Onde ocorre a Contravariância no TypeScript? :: Principalmente nos **Parâmetros de Funções**.
Por que parâmetros de funções são contravariantes? :: Porque uma função que espera um `Gato` não pode receber uma função que só sabe lidar com `Animais` genéricos (segurança de entrada).

## Conexões
- Pré-requisito: [[2-generic-classes|Generic Classes]]
- Flag `strictFunctionTypes`: [[configuracao-tsconfig|tsconfig.json]] (Fase 1)
- Relevante em: [[6-utility-types-nativos|Parameters e ReturnType]]
