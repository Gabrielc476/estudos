---
fase: 5
tema: "A Palavra-Chave infer"
dificuldade: intermediário
domínio: 70
tags: [infer, conditional-types, wow-analogy, extraction, flashcards]
revisado: 2026-03-31
---
# A Palavra-Chave `infer` (Versão World of Warcraft)

Se o *Conditional Type* (`T extends X`) é o Raid Leader distribuindo o loot observando sua classe, a palavra-chave **`infer`** é o **Ladino (Rogue)** usando *Pickpocket* ou *Inspect* para roubar informações sigilosas de dentro dos equipamentos dos outros.

Com `infer`, você diz ao compilador TypeScript: **"Hey Ladino, chegue de fininho por trás desse contêiner complexo de tipos, descubra qual é o tipo escondido lá dentro, roube ele, coloque numa variável temporária e me dê para eu usar!"**

O Infer **só e unicamente pode ser usado em branches lógicos condicionais** (`extends ? :`).

## Exemplo 1: Roubando o tipo de um Item do Banco (Tirando de Arrays)

Você interceptou os dados do banco da sua Guilda. Eles vieram tipados como um Baú Fechado: um Array de Itens super complexos: `Array<{ nome: string, level: number, bindOnPickup: boolean }>`.
Mas você quer criar uma função que cuide de **um único Item** sem precisar reescrever aquela tipagem gigante. Você quer "roubar" apenas a receita do item que tá lá dentro.

```typescript
// O Ladino Chegando (O TS):
// "Se o Baú (T) for um Array de alguma coisa escondida (infer U)...
// Pegue esse U, e jogue no meu bolso (retorne U). Ou fuja (never)!"

type InspecionarBau<T> = T extends Array<infer U> ? U : never;

// O Array complexo da guilda:
type BauDaGuilda = Array<{ nome: string; level: number }>;

// O Ladino agindo e entregando a info:
type ItemUnico = InspecionarBau<BauDaGuilda>;

// BOOM! O Ladino quebrou as algemas do Array. 'ItemUnico' agora vale puramente: { nome: string; level: number }
```

## Exemplo 2: Descascando a Pedra de Regresso (Promises e `Awaited`)

Magos fazem um portal (`Promise`), e dentro daquele portal, o que vai chegar é a Cidade de Orgrimmar (`{ cidade: "Orgrimmar" }`).
Se a sua variável é a magia lançada (`Promise<{ cidade: string }>`), como você extrai só a "cidade" pra usar no mapa local sem levar a "Promise" junto?

```typescript
// Se a Magia lançada (T) for uma Promise contendo algo escondido dentro (infer U)...
// Descasque e me dê o 'U'! Se não for Promise, me devolva a pedra normal (T)
type DescascarPortal<T> = T extends Promise<infer U> ? U : T;

type Magia = Promise<{ cidade: "Orgrimmar" }>;

type ChegadaNoMapa = DescascarPortal<Magia>; // Extraído e Descascado: { cidade: "Orgrimmar" }
```

## Exemplo 3: Inspecionando a Tática do Boss (Mapeamento de Funções)

O Boss da raide tem um script secreto (`função`). Alguém te deu apenas o executável do boss (`typeof BossMacro`). Você precisa criar um Addon (Mod) que receba **exatamente os mesmos parâmetros** que a magia do Boss requer (ex: alvoId, danoHit, reflect), mas você não sabe quais são.

Vamos roubar a assinatura de parâmetros do Boss com `infer`:

```typescript
// Ladino diz: "Se o script (T) for uma Função, se infiltre nos argumentos dela (infer Args)... e roube a assinatura!"
type InspecionarBuildDoBoss<T> = T extends (...args: infer Args) => any ? Args : never;

// O Script do Boss que nós nem escrevemos, só herdamos da Blizzard:
const bossAtaque = (alvoId: string, danoHit: number, reflect: boolean) => { /* ... */ };

// Roubando os dados da mecânica do Boss:
type ArgumentosParaOAddon = InspecionarBuildDoBoss<typeof bossAtaque>;

// Resultado obtido pelo infer na variável 'ArgumentosParaOAddon':
// Retornou a exata TUPLA de paramtros:
// [alvoId: string, danoHit: number, reflect: boolean]

// Agora você pode usar essa tupla para criar suas próprias magias 100% tipadas batendo com a do Boss!
```

O `infer` é literalmente o "Mecanismo de Engenharia Reversa" do TypeScript. Sempre que se deparar com uma "casca protetora de sintaxe" muito grande (`Array<X>`, `Promise<X>`, `(args) => X`) e quiser extrair só o que tá ali no X suculento, mande o Ladino Inspecionar!

---
## Flashcards
O que a palavra-chave `infer` faz? :: Permite "capturar" e extrair um tipo de dentro de outra estrutura (como o retorno de uma promessa ou item de array).
Onde o `infer` deve ser obrigatoriamente usado? :: Dentro da cláusula `extends` de um Conditional Type.
Como extrair o tipo de retorno de uma função com `infer`? :: `T extends (...args: any) => infer R ? R : never`.

## Conexões
- Pré-requisito: [[4-conditional-defaults|Conditional Types]]
- Usado em: [[6-utility-types-nativos|ReturnType, Parameters]]
- Usado pelo Zod: [[3-runtime-validation-zod|z.infer]] (Fase 11)
- Usado pelo Drizzle: [[4-orms-prisma-drizzle|InferSelectModel]] (Fase 11)
