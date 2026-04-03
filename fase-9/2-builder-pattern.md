---
fase: 9
tema: "O Builder Pattern Fortificado"
dificuldade: avançado
domínio: 70
tags: [patterns, builder, type-safety, state-transition, flashcards]
revisado: 2026-03-31
---
# O Builder Pattern Fortificado

O padrão Builder (`.setAlgo().setAquilo().build()`) é famoso no Java. Mas no JS, ele tem um problema de nascença: O Dev pode esquecer de chamar etapas primordiais e estourar a classe, ex: (`.build()` antes de ditar o status principal).
Mas que tal combinarmos esse padrão usando Type Safety estrito para **só liberar auto-complete e chamar de métodos da constelação se os métodos prévios essenciais tiverem sidos chamados**?

Usamos *Interfaces Mutantes Retornadas*:
```typescript
interface BotTristonho { falar(): void }

// 3. Status Final que OBRIGA a saída limpa
interface RoboPronto {
  atacar(): void;
}

// 2. Status com a Arma que EXIGE o Core
interface RoboComArma {
  instalarCoreIA(): RoboPronto; // Transição!
}

// 1. Status do Início, forçando ligar a máquina!
interface FabricaBuilder {
  plugarLaser(): RoboComArma; // Quando chamar esse, ele retorna o tipo que contém a fase 2
}

class CaminhoDeProducao implements FabricaBuilder, RoboComArma, RoboPronto {
  plugarLaser() { return this; }      // Retorna 'this' mas a casca Type-Level é "RoboComArma!"
  instalarCoreIA() { return this; }   // Retorna 'this' mas a casca muda pra "RoboPronto!"
  atacar() { console.log('PEW'); return this; }
}

const criador: FabricaBuilder = new CaminhoDeProducao();

// criador.atacar() // ❌ ERRO: Método Inexistente nessa fase de transição (Não instalou o laser nem a IA!).

// A IDE só vai destravando os comportamentos gradativamente baseada na tipagem sequencial das retornos interconectadas das interfaces State Machine:
criador
  .plugarLaser()
  .instalarCoreIA()
  .atacar(); // Agora a IDE liberou lindamente!
```

---
## Flashcards
Como o Builder Pattern pode ser fortificado no TS? :: Usando Generics para rastrear quais campos já foram preenchidos e impedir a chamada de `.build()` antes do tempo.
O que é o "Step Builder" no nível de tipos? :: Uma técnica onde cada método do builder retorna uma nova interface que só permite acesso aos próximos métodos válidos da sequência.
Vantagem de um Builder Type-Safe? :: Elimina os problemas de objetos incompletos em runtime.

## Conexões
- Usa Interfaces com transição: [[2-abstract-implements|Implements]] (Fase 7)
- State Machine: [[7-state-machines|Type-Safe State Machines]]
- Return Types encadeados: [[tipagem-de-funcoes|Tipagem de Funções]] (Fase 4)
