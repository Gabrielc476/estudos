---
fase: 12
tema: "Pilhas (Stacks)"
dificuldade: intermediario
domínio: 0
tags: [estrutura-de-dados, pilhas, stacks, flashcards]
revisado: 2026-04-03
---
# Pilhas (Stacks)

## O que é uma Pilha?

Uma **Pilha** (Stack) é uma estrutura de dados linear que segue o princípio **LIFO** (*Last In, First Out* - O último a entrar é o primeiro a sair).
Pense em uma pilha de pratos: você sempre coloca um prato novo no topo e, quando precisa de um prato, tira o que está no topo.

Como na sua prova de Python você precisará implementar as classes "na mão" sem usar as funções embutidas (embutidas significa que não faremos `array.pop()` ou `array.push()`), vamos criar essa lógica em TypeScript gerenciando a memória por conta própria usando dois modelos clássicos: **Com Array Manual** e **Com Nós (Nodes)**.

---

## 1. Implementação baseada em `Node` (Ponteiros / Encadeada)

Esta é a forma mais purista e clássica de estruturas de dados. Em vez de usar um bloco contínuo de memória (lista/array), armazenamos a Pilha através de objetos chamados `Node` (Nó). Cada nó guarda um **valor** e um ponteiro (`next`) para o nó que está abaixo dele na pilha.

```typescript
// Primeiro, criamos a classe Node que servirá como nosso "prato"
class NodePilha<T> {
  valor: T;
  proximo: NodePilha<T> | null;

  constructor(valor: T) {
    this.valor = valor;
    this.proximo = null; // Inicialmente, o próximo não aponta para ngm
  }
}

class Pilha<T> {
  topo: NodePilha<T> | null;
  tamanho: number;

  constructor() {
    this.topo = null;
    this.tamanho = 0;
  }

  // PUSH: Adicionar um item no TOPO da pilha
  push(valor: T): void {
    const novoNo = new NodePilha(valor);
    
    // Se a pilha já tinha itens, o "próximo" do nosso novo topo será o topo antigo
    if (this.topo !== null) {
      novoNo.proximo = this.topo;
    }
    
    this.topo = novoNo;
    this.tamanho++;
  }

  // POP: Remover o item do TOPO da pilha
  pop(): T | null {
    if (this.topo === null) {
      console.log("Pilha Vazia!");
      return null;
    }
    
    const valorRemovido = this.topo.valor; // Guardamos o valor
    this.topo = this.topo.proximo; // O topo passa a ser o elemento de baixo
    this.tamanho--;
    
    return valorRemovido;
  }

  // PEEK (ou TOP): Olhar quem está no topo sem remover
  peek(): T | null {
    if (this.topo === null) {
      return null;
    }
    return this.topo.valor;
  }

  // Verificar se a pilha está vazia
  isEmpty(): boolean {
    return this.tamanho === 0; // ou return this.topo === null;
  }
}

// === TESTANDO ===
const minhaPilha = new Pilha<number>();
minhaPilha.push(10);
minhaPilha.push(20);
minhaPilha.push(30);

console.log(minhaPilha.peek()); // 30
console.log(minhaPilha.pop());  // Remove o 30
console.log(minhaPilha.peek()); // Agora o topo é 20
```

---

## 2. Implementação baseada em Array (Sequencial)

Se a sua prova pedir uma Pilha feita com Array mas *sem* usar os métodos dinâmicos do array (ou seja, controlando o tamanho na mão), a lógica é a seguinte: você pré-aloca a memória (se houver capacidade máxima) ou apenas controla um índice chamado `topo`.

```typescript
class PilhaArray<T> {
  // Em Python você usaria uma lista: self.itens = [None] * capacidade
  itens: (T | null)[]; 
  capacidade: number;
  topoIndice: number; // Vai representar o índice do último elemento adicionado

  constructor(capacidade: number) {
    this.capacidade = capacidade;
    this.itens = new Array(capacidade).fill(null);
    this.topoIndice = -1; // -1 significa vazia (índice 0 seria 1 elemento)
  }

  push(valor: T): void {
    if (this.topoIndice >= this.capacidade - 1) {
      console.log("Erro: Stack Overflow (Pilha Cheia)!");
      return;
    }
    this.topoIndice++; // Move o índice para a próxima casa livre
    this.itens[this.topoIndice] = valor; // Insere o valor
  }

  pop(): T | null {
    if (this.topoIndice === -1) {
      console.log("Erro: Stack Underflow (Pilha Vazia)!");
      return null;
    }
    const valorRemovido = this.itens[this.topoIndice];
    this.itens[this.topoIndice] = null; // Esvazia o espaço (opcional, só p/ limpeza)
    this.topoIndice--; // O topo volta uma unidade
    
    return valorRemovido;
  }
  
  peek(): T | null {
    if (this.topoIndice === -1) return null;
    return this.itens[this.topoIndice];
  }
}
```

## Resumo dos Métodos Essenciais

| Método | Função | Complexidade (Encaedada / Array fixo) |
|---|---|---|
| **push()** | Insere no topo | O(1) |
| **pop()** | Remove e devolve o topo | O(1) |
| **peek()** | Apenas olha quem é o topo | O(1) |
| **isEmpty()** | Retorna boolean se vazia | O(1) |

---
## Flashcards
Qual princípio de organização a Estrutura de Pilha (Stack) segue? :: Segue o princípio LIFO (Last In, First Out), o último item a entrar é o primeiro a sair.
Como realizamos a operação PUSH ao implementar Pilha usando Nodes? :: Criamos o novo Node, fazemos o `next` desse Node apontar para o atual Topo, e então substituímos a referência do Topo para apontar para o novo Node.
O que são operações Stack Overflow e Stack Underflow? :: Overflow ocorre quando tentamos fazer 'push' e a capacidade da estrutura (como em arrays fixos) excedeu. Underflow ocorre quando tentamos fazer 'pop' em uma pilha que já está vazia.

## Conexões
- Próximo: [[2-filas|Filas (Queues)]] (A contra-parte FIFO das Pilhas)
- Revisão TS: [[2-generic-classes|Generic Classes]] (Para a sintaxe `<T>` usada na estrurtura)
- Revisão TS: [[4-recursive-types|Tipos Recursivos]] (Para o uso do ponteiro referenciando a si mesmo no `Node<T>`)
