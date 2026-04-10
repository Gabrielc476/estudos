---
fase: 7
tema: "Mixins"
dificuldade: intermediário
domínio: 70
tags: [composition, oop, mixins, patterns, flashcards]
revisado: 2026-03-31
---
# Mixins (Herança Múltipla Dinâmica)

A linguagem primária Javascript e outras (como C# e Java), não deixam herdar logicamente e executar código ativo herdado de DOIS lugares ao mesmo tempo, quebrando a regra estrutural da herança única: **Você não pode fazer `class Filho extends Pai, Mae`**. (Se C++ ouvia a gente ele ria da restrição).

Isso não rola porque geraria um paradoxo maciço de funções repetitivas (o "Dilema do Diamante"). Se os dois pais tivessem funções ativas engatadas chadas `bater()`, quem o filho executaria? 

Mas... se você precisa compor o objeto de múltiplas heranças ou injetar traços nela fora do núcleo (`ex`: Eu quero criar um Soldado que puxe a Base HP da Raça, mas herde as funções completas puras e dinâmicas da Classe de Fogo que já foi codada separadamente pra Inimigos soltos...)?
O TypeScript possui o Padrão Master de Composição usando o encapsulamento funcional estático puro chamado de **Mixins**. 

## O Pattern Mixin

Lembrando que em JS **classes são funções mascaradas que criam Objetos**.
Um Mixin é uma função maluca que:
1. Recebe uma Classe original vazia pura na assinatura (O Molde).
2. Abre a classe dentro da função dinâmicamente herdando ativamente a arg injetadora (extends TheConstructor)
3. Estampa os atributos e métodos novos engatados nela e retorna O CONSTRUTURAL dessa nova classe híbrida cruzada para uso imediato no cache de execução da compilação!

```typescript
// --- 1. PREPARANDO A BASE DO CAOS --
// Tipo genérico bizarro inferido que obriga a dizer pro TypeScript que "isso é um Construtor cru de qualquer classe com zero ou infinitos args".
type ConstrutorGenerico = new (...args: any[]) => {};

// --- 2. O TRAÇO "MIXIN" DA ENGRENAGEM (Voador) ---
function MixerVoador<T extends ConstrutorGenerico>(ClasseBase: T) {
    // Nós retornamos a declaração abstrata inline de uma Classe nova Sem Nome que clona a sua classe ali!
    return class extends ClasseBase {
        // Novo Atributo dinâmico nascendo!
        noAr = false;
        
        // Novo comportamento híbrido herdável!
        voar() {
            this.noAr = true;
            console.log("✈️ Começou a voar pelos céus...");
        }
    };
}

// --- 3. O TRAÇO DO "MIXIN" ATIRADOR ---
function MixerAtirador<T extends ConstrutorGenerico>(ClasseBase: T) {
    return class extends ClasseBase {
        atirar() { console.log("🔫 Pew Pew!!"); }
    };
}


// A MAGIA ACONTECE AQUI. O COMBINGO PERFEITOS DOS CRUZAMENTOS DE ESPÉCIES!
class VeiculoBase {
    ligarCarro() { console.log("Vruum"); }
}

// Em vez de "extends Pai", criamos a Super Classe fundindo funções na casca dela!
const CarroAbreNasAlasEAereoBatizadoBase = MixerAtirador(MixerVoador(VeiculoBase));

// Usamos livremente o objeto com 3 naturezas (Veiculo, Voador, Atirador, juntas) SEM HERANÇA MÚLTIPLA PURA!
const meuBatmovelCustomFinal = new CarroAbreNasAlasEAereoBatizadoBase();
meuBatmovelCustomFinal.ligarCarro(); // Veiculo
meuBatmovelCustomFinal.voar(); // MixerVoador
meuBatmovelCustomFinal.atirar(); // MixerAtirador
```

---
## Flashcards
O que é o padrão Mixin? :: Uma função que recebe uma classe base e retorna uma nova classe que estende a base com funcionalidades adicionais.
Por que usar Mixins em JS/TS? :: Para contornar a limitação de não poder herdar de múltiplas classes simultaneamente (`extends A, B`).
Como tipar um Mixin? :: Usando um Common Generic Constructor que descreve uma classe capaz de ser instanciada.

## Conexões
- Alternativa a: [[2-abstract-implements|Herança com extends/implements]]
- Usa Intersection Types: [[resumo-fase2|Intersection Types]] (Fase 2)
- Tipo Construtor Genérico: [[generics-em-funcoes|Generics]] (Fase 4)
- Composição avançada: Padrão usado em libs como Effect e fp-ts
