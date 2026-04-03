---
fase: 5
tema: "Conditional Types e Defaults"
dificuldade: intermediário
domínio: 70
tags: [conditional-types, defaults, logic, wow-analogy, flashcards]
revisado: 2026-03-31
---
# Generic Conditional e Defaults (Versão World of Warcraft)

Imagine que o Sistema de Tipos do TypeScript é o **Líder da sua Guilda (Raid Leader)** distribuindo loot. 
A regra para dar o loot depende da classe de quem pediu.

No TypeScript, usamos `T extends X ? Y : Z` para criar essa regra (Se T for X, então Y, senão Z).

## 1. O "If Ternário" dos Tipos

Pense nisso como macros de WoW: *"Se o alvo for um Guerreiro, equipe Placas. Se for Mago, equipe Tecido."*

```typescript
// Classes do WoW
type Guerreiro = { classe: "Guerreiro", rage: number };
type Mago = { classe: "Mago", mana: number };

// A Regra de Armadura (Conditional Type)
// Lê-se: O personagem (T) herda/é um Guerreiro? 
// SE SIM (?): O tipo retornado é "Placas"
// SE NÃO (:): O tipo retornado é "Tecido"
type TipoDeArmadura<T> = T extends Guerreiro ? "Placas" : "Tecido";

// O Raiden Leader avaliando:
type ArmaduraProt = TipoDeArmadura<Guerreiro>; // "Placas"
type ArmaduraFrost = TipoDeArmadura<Mago>;     // "Tecido"
```

## 2. Aplicando isso para funções reais (O Distribuidor de Loot)

Podemos programar uma função que muda o *Tipo de Retorno* dependendo da arma que for passada pra ela.

```typescript
type LootWarrior = { item: "Espada Longa" };
type LootMage = { item: "Cajado Arcano" };

// A condicional!
type DistribuirLoot<T> = T extends Guerreiro ? LootWarrior : LootMage;

function abrirBau<T extends Guerreiro | Mago>(jogador: T): DistribuirLoot<T> {
    if (jogador.classe === "Guerreiro") {
        return { item: "Espada Longa" } as DistribuirLoot<T>;
    } else {
        return { item: "Cajado Arcano" } as DistribuirLoot<T>;
    }
}

// Magia do TypeScript: O compilador lê seu jogador, passa pelo condicional, e crava o tipo de retorno!
const lootGuerreiro = abrirBau({ classe: "Guerreiro", rage: 100 }); 
// TS sabe perfeitamente que lootGuerreiro é { item: "Espada Longa" }

const lootMago = abrirBau({ classe: "Mago", mana: 500 });
// TS sabe que lootMago é { item: "Cajado Arcano" }
```

## 3. Defaults Condicionais (Armadura Padrão)

E se o Raiden Leader tiver uma regra padrão para os novatos?
"Me passe o seu tipo de jogador. Se você não me passar nada, vou assumir que você é um Guerreiro, e baseado nisso, sua armadura padrão será a de Guerreiro".

```typescript
// T: Tipo do Jogador (Padrão: Guerreiro se ninguém avisar)
// U: Armadura do Jogador (Padrão: Depende dinamicamente de T!)
type FichaPersonagem<
  T extends Guerreiro | Mago = Guerreiro,
  U = T extends Guerreiro ? "Placas" : "Tecido"
> = {
    personagem: T;
    equipamento: U;
}

// Como não passei Generics (<...>), o TS acionou os falsos defaults:
// Assumiu Guerreiro e automaticamente engatilhou U para "Placas"!
const novato: FichaPersonagem = {
    personagem: { classe: "Guerreiro", rage: 0 },
    equipamento: "Placas" // ✅ Perfeito! Se tentar colocar "Tecido" o TS nega.
};
```
Você acabou de criar regras dinâmicas em cima das tipagens, não sobrando espaço para erros em tempo de execução!

---
## Flashcards
Sintaxe de um Conditional Type? :: `T extends U ? X : Y` (Funciona como um ternário para tipos).
Para que serve o "Default Generic"? :: Para definir um tipo padrão caso o usuário não informe nenhum valor ao instanciar o genérico (ex: `<T = string>`).
Como combinar condicionais e defaults? :: Definindo o generic com default e usando o valor restrito para calcular o tipo final via condicional.

## Conexões
- Pré-requisito: [[1-generic-interfaces-aliases|Generic Interfaces]]
- Evolução: [[5-conditional-distributivo|Distributividade]] (Fase 6)
- Infer: [[5-infer-keyword|Keyword infer]]
- Aplicação: [[5-overloads-condicionais|Overloads Condicionais]] (Fase 9)
