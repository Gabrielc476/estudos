---
fase: 7
tema: "Parameter Properties"
dificuldade: intermediário
domínio: 70
tags: [oop, classes, constructor, shorthand, flashcards]
revisado: 2026-03-31
---
# Atalho Limpo: Parameter Properties

No Typescript 90% da chatice redundante para declarar classes e construtores base foi aniquilada com os incríveis **Parameter Properties** (Propriedades Injetadas pelo Parâmetro construtor). 

No JavaScript puro ou TS antigo, se eu quisesse que minha classe gravasse uma propriedade de `nome` e `id`, tínhamos todo o ritual burocrático de 3 etapas de inicialização e repasse inútil:

### O jeito redundante clássico e lento:
```typescript
class JogadorArchaico {
    public id: number;      // 1. Declarar a Propriedade fora
    private nome: string;   // 1. Declarar a Propriedade
    
    constructor(idA: number, nomeA: string) { // 2. Pedir os args pelo Construtor Inicializador
        this.id = idA;       // 3. Fazer repasse brutal ('this.algo = algo') dentro do escopo.
        this.nome = nomeA;   // 3. Fazer repasse repare... 
    }
}
```

### O jeito Parameter Property (`this` implícito invisível automático)

No TS moderno, se colocarmos os Modificadores de Acesso (`public`, `private`, `protected` ou `readonly`) **DIRETAMENTE na frente da variável do argumento dentro dos parênteses do Construtor**, o TS compila magicamente na hora de criar o JS as três fases acima inteirinhas sozinhas de forma elegante pra você. Você só declara e fecha a chave.

```typescript
class JogadorOtimizado {
    constructor(
        public readonly id: number, 
        private nome: string,
        protected gold: number = 0 // Injeção com valores Defualts e Parametros de Acesso inclusos!
    ) {
        // Nada de `this.nome = nome` !!! O Scope Engine gera por nós secretamente!
        // Este bloco construtor vira desnecessário a menos que tenha logicas complexas ou inicializações de terceiras váriaveis não base!
    }
    
    atacar() {
        console.log(`${this.nome} desferiu golpe!`); // O TS inferiu que this.nome existe atrelado ativamente puramente invisível da base externa
    }
}

const x = new JogadorOtimizado(12356, "Gabriel"); // JS compilado: { id: 12356, nome: 'Gabriel', gold: 0 }
```

---
## Flashcards
O que são Parameter Properties no TS? :: É um atalho que permite declarar e inicializar propriedades de uma classe diretamente nos argumentos do construtor.
Como ativar o atalho do Parameter Property? :: Adicionando um modificador de acesso (`public`, `private`, etc) ou `readonly` na frente do parâmetro no construtor.
Vantagem das Parameter Properties? :: Elimina a redundância de declarar a variável fora, pedir no construtor e fazer o repasse `this.x = x`.

## Conexões
- Pré-requisito: [[1-modificadores-acesso|Modificadores de Acesso]]
- Defaults: [[optional-e-default-parameters|Parâmetros Opcionais]] (Fase 4)
- Usado junto com: [[2-abstract-implements|Classes Abstratas]]
