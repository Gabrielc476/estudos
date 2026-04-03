# Roadmap Definitivo para Dominar JavaScript

Este é um **Roadmap Definitivo e Extenso**, estruturado com base nas especificações oficiais do ECMAScript (ECMA-262) e na [MDN Web Docs](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript).

## 🟢 Fase 1: Os Fundamentos (A Base Sólida)
*O objetivo aqui é entender a infraestrutura básica e a gramática da linguagem.*

- [x] **Visão Geral e História**: O que é o ECMAScript (ES)? A relação entre ES e JavaScript. O comitê TC39.
- [x] **Lexical Grammar**: Case sensitivity, comentários, literais, identificadores, palavras reservadas.
- [x] **Variáveis e Escopo Básico**: `var`, `let`, `const`. Diferenças cruciais (Hoisting e Temporal Dead Zone - TDZ).
- [x] **Tipos de Dados Primitivos**: `String`, `Number`, `BigInt`, `Boolean`, `Undefined`, `Null`, `Symbol`.
- [x] **Type Coercion (Coerção de Tipos)**: Conversão implícita vs explícita. Truthy e Falsy values. O conceito de dupla interrogação `??` (Nullish Coalescing) vs Or `||`.
- [x] **Operadores Completos**: Aritméticos, Atribuição, Comparação (`==` vs `===`), Lógicos, Bitwise (operações bi a bit), Ternário.
- [x] **Estruturas de Controle de Fluxo**: `if/else`, `switch` (e fall-through), `try/catch/finally`, `throw`.
- [x] **Loops e Iterações Básico**: `for`, `while`, `do...while`, `break`, `continue`, labels em iterações.

---

## 🟡 Fase 2: Estruturas de Dados e Objetos Nativos
*Como o JavaScript armazena e manipula informações complexas.*

- [x] **Strings em Profundidade**: Todos os métodos oficiais (`indexOf`, `lastIndexOf`, `slice`, `substring`, `replace`, `match`, `split`, `padStart`, etc). Template Literals e Tagged Templates.
- [x] **Arrays (A estrutura mais usada)**: 
  - Mutáveis: `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`.
  - Imutáveis (retornam novo array): `map`, `filter`, `reduce`, `concat`, `slice`, `flat`, `flatMap`, `toSorted`, `toReversed`.
  - Buscas: `find`, `findIndex`, `includes`, `some`, `every`.
- [x] **Numbers e Math**: Objeto `Math` nativo, `NaN` (Not a Number), Limites numéricos (por que `0.1 + 0.2` não é `0.3` no padrão IEEE 754), objeto `Date`.
- [x] **Objetos (O Básico)**: Criação literal estruturada, propriedades e métodos, acesso via ponto vs colchetes.
- [x] **Referência vs Valor**: Entender profundamente como objetos e arrays são passados como referência e primitivos como valor na memória.

---

## 🟠 Fase 3: Funções (Corações do JavaScript)
*Em JavaScript, funções são "First-Class Citizens" (Cidadãos de Primeira Classe). Delas derivam o poder funcional da linguagem.*

- [x] **Parâmetros e Argumentos**: O objeto especial `arguments`, rest parameters (`...args`), default parameters (`function(a = 1)`).
- [x] **Function Declarations vs Function Expressions**: Entender Hoisting em funções declaradas.
- [x] **Arrow Functions (`=>`)**: Diferenças sintáticas, ausência do objeto `arguments` nativo e a relação fundamental e estática com o `this` léxico.
- [x] **IIFE (Immediately Invoked Function Expression)**: Isolamento de escopo.
- [x] **Closures**: *Um dos conceitos mais importantes.* Como e por que funções lembram do escopo léxico em que foram declaradas mesmo após esse escopo ser encerrado.
- [x] **High-Order Functions (HOF)**: Funções que recebem outras funções como argumentos (callbacks) ou retornam funções.

---

## 🔴 Fase 4: Orientação a Objetos e O Misterioso `this`
*JavaScript não tem classes verdadeiras na sua base, tudo é resolvido por delegação de objetos (Prototypes).*

- [x] **O Contexto `this`**: Como o `this` dinâmico muda conforme a Invocação (Global, Objeto, Classe, Construtor, Evento).
- [x] **Mudando o `this` forçadamente**: Os métodos `.bind()`, `.call()`, `.apply()`.
- [x] **Prototype Chain (Cadeia de Protótipos)**: A mecânica oculta do `__proto__` e da propriedade `.prototype`. Como tentar acessar uma propriedade percorre essa cadeia.
- [x] **Constructor Functions**: Usando a palavra-chave `new` e o que ela faz internamente ao alocar memória e amarrar o prototype.
- [x] **Classes ECMAScript 2015+**: Declaração `class`, `constructor()`, métodos estáticos (`static`), campos privados (prefixo `#`), herança (`extends`, palavra-chave `super()`).
- [x] **Getters e Setters**: Interceptando o acesso e a modificação de propriedades.

---

## 🟣 Fase 5: Estruturas de Dados Avançadas
*As coleções especializadas introduzidas do ES6 em diante.*

- [x] **Destructuring Assigment**: Desestruturação aprofundada de arrays e objetos complexos (aliasing, valores default, desestruturação aninhada).
- [x] **Spread Operator (`...`)**: Espalhando propriedades em iterações de objetos e arrays.
- [x] **Map e Set**: Diferenças de desempenho e semântica comparados com Arrays e Objetos comuns. O fato de `Map` aceitar objetos como chaves.
- [x] **WeakMap e WeakSet**: Relação estrita com o Garbage Collector (não previnem que o objeto lido seja deletado da memória).

---

## 🔵 Fase 6: Assincronicidade (O Domínio do Tempo)
*Como o JavaScript lidar com ações demoradas sem travar (Single-Threaded).*

- [x] **A Arquitetura Assíncrona (A Engenharia da Engine)**: 
  - Call Stack (Pilha de Execução).
  - V8 Engine vs Web APIs (Browser) / C++ APIs (Node).
  - Message Queue / Callback Queue (Macrotasks).
  - Job Queue / Microtask Queue.
  - O famoso **Event Loop** em nível cirúrgico.
- [x] **Callbacks, Promises e Async/Await**: A evolução do código assíncrono, como evitar o *Callback Hell*, resolver cadeias (`.then().catch()`) e escrever código moderno legível.
- [x] **Métodos Estáticos de Promessas**: `Promise.all()`, `Promise.race()`, `Promise.allSettled()`, `Promise.any()`.
- [x] **Top-Level Await (ES2022)**: Uso de await sem funções async na raiz de módulos.
- [x] **Tratamento de Erros**: O básico de `try...catch...finally` e como aplicá-lo em funções assíncronas.

---

## ⚫ Fase 7: Metaprogramação (Nível Especialista)
*Aqui você deixa de usar o JavaScript puro e passa a reescrever o comportamento interno da própria linguagem.*

- [x] **Symbols**: O tipo primitivo que garante unicidade. Well-known symbols como `Symbol.iterator`, `Symbol.toPrimitive`, `Symbol.species`.
- [x] **Iterators e Iterables**: Transformando objetos complexos em estruturas que podem ser iteradas usando `for...of`.
- [x] **Generators (`function*` e palavra `yield`)**: Funções que podem pausar a própria execução múltiplas vezes, salvar seu estado transitório e retornar ao longo do tempo.
- [x] **`Proxy` e `Reflect`**: Interceptadores mágicos de baixo nível. Como interceptar `.get` e `.set` universalmente (o pilar da reatividade do Vue 3 e do MobX).
---

## 🟤 Fase 8: Módulos e Padrões de Organização
*Escalando suas bases de código de um arquivo simples para ecossistemas inteiros.*

- [x] **ECMAScript Modules (ESM)**: Uso de `export`, `import`, imports genéricos (`*`), export defaults. 
- [x] **Dynamic Imports**: Usando o método estático `import('caminho')` para Lazy Loading de módulos com requisições HTTP ou locais, que retorna uma Promise.
- [x] Diferença fundamental (e problemas de interoperabilidade) entre o sistema de módulo nativo do ES (ESM) e o histórico sistema do Node (CommonJS / `require`).

---

## 🟢 Fase 9: No Coração do V8 (Motor do Google Chrome / Node)
*O conteúdo que faz a diferença entre um Pleno e um Especialista.*

- [x] **JIT Compilation (Just-In-Time)**: Como e por que o V8 transforma as suas funções mais usadas (Hot Functions) de forma contínua para código de máquina otimizado. O uso do Profiler interno do JS.TurboFan). Como e porquê o código é JIT (Just In Time) compilado.
- [x] **Hidden Classes e Inline Caching**: Por que mudar a ordem (shape) da declaração de propriedades de objetos dentro do JavaScript cria problemas de performance absurdos para a compilação do motor V8.
- [x] **O Garbage Collector (GC)**: Como os algoritmos "*Mark-and-Sweep*" funcionam.
- [x] **Evitando Memory Leaks**: Event Listeners soltos, closures que prendem variáveis gigantes, referências circulares em arquiteturas antigas, uso errôneo de Variáveis Globais.
