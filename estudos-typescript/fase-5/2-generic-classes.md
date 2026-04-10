---
fase: 5
tema: "Generic Classes"
dificuldade: intermediário
domínio: 70
tags: [generics, classes, oop, data-structures, flashcards]
revisado: 2026-03-31
---
# Generic Classes

Exatamente como nas interfaces, classes no Typescript podem ser parametrizadas com tipos genéricos abstraíveis.
Isso é intensamente usado na construção de Estruturas de Dados genéricas (`Stack/Pilha`, `Queue`, `LinkedList`).

## A Sintaxe de Classes Genéricas

O parâmetro de tipo deve ir logo após o nome da classe:

```typescript
class Pilha<T> {
    private itens: T[] = [];

    empilhar(item: T): void {
        this.itens.push(item);
    }

    desempilhar(): T | undefined {
        return this.itens.pop();
    }
}

// Quando instanciamos:
const pilhaDeNumeros = new Pilha<number>();
pilhaDeNumeros.empilhar(10);
// pilhaDeNumeros.empilhar("Eita"); // ❌ ERRO! T foi travado implacavelmente como number na instância da classe pela raiz.
```

## Constraints em Classes (Heranças Inversas T extends X)

Você bloqueia e garante a forma do Generic em classes utilizando a keyword `extends`, unindo a Fase de restrições aos escopos da base da orientação a objetos:

```typescript
interface ComID {
    id: number;
}

// O repositório só vai funcionar para instâncias de classes que JÁ POSSUEM a prop "id: number" internamente!
class Repositorio<T extends ComID> {
    private db: T[] = [];

    adicionar(item: T) {
        this.db.push(item);
    }

    buscarPorId(id: number): T | undefined {
        // Agora podemos usar .id tranquilamente, pois o "extends ComID" garantiu ao intellisense que a instância T terá esse field vitalício.
        return this.db.find(item => item.id === id);
    }
}
```

🚨 **Observação crucial em classes estáticas**: O tipo `T` pertence à **Instância** da classe instanciada após o `new`. Você **não pode** usar o Generic Type parameter `T` livremente em propriedades ou métodos marcados intrinsecamente como `static` (ex: `static ultimo(item: T)`), já que os métodos static existem muito antes da classe efetivamente ser inicializada via instâncias!

---
## Flashcards
Para que servem Generic Classes? :: Para criar classes reutilizáveis que operam sobre tipos dinâmicos (como Pilhas, Filas ou Repositórios).
Onde o parâmetro `<T>` é definido na classe? :: Logo após o nome da classe na declaração (ex: `class Repositorio<T>`).
Podemos restringir os tipos aceitos por uma classe genérica? :: Sim, usando a sintaxe `class Repositorio<T extends BaseEntity>`.

## Conexões
- Pré-requisito: [[1-generic-interfaces-aliases|Generic Interfaces]]
- Modificadores: [[1-modificadores-acesso|public, private, protected]] (Fase 7)
- Herança: [[2-abstract-implements|Abstract e Implements]] (Fase 7)
- Covariância: [[3-covariancia-contravariancia|Covariância e Contravariância]]
