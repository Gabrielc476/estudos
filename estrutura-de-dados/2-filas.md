---
fase: 12
tema: "Filas (Queues)"
dificuldade: intermediario
domínio: 0
tags: [estrutura-de-dados, filas, queues, flashcards]
revisado: 2026-04-03
---
# Filas (Queues)

## O que é uma Fila?

Uma **Fila** (Queue) é uma estrutura de dados linear que segue o princípio **FIFO** (*First In, First Out* - O primeiro a entrar é o primeiro a sair).
A melhor analogia é a fila de um banco ou supermercado: a primeira pessoa que chega na fila é a primeira a ser atendida (removida). Quem chega depois vai para o final (fim) da fila.

Como o foco aqui é construir tudo "na mão", criaremos uma Fila utilizando os conceitos base contruindo ponteiros.

---

## Implementação baseada em `Node` (Ponteiros / Encadeada)

Ao invés de arrays que precisam realocar a memória, na fila encadeada nós guardamos dois ponteiros vitais na nossa classe:
- Acessamos constantemente quem está no INÍCIO: Ponteiro `head` (cabeça/frente).
- Acessamos constantemente quem está no FIM para inserir novos dados: Ponteiro `tail` (cauda/trás).

```typescript
// Nosso bloco de construção continua igual
class NodeFila<T> {
  valor: T;
  proximo: NodeFila<T> | null;

  constructor(valor: T) {
    this.valor = valor;
    this.proximo = null;
  }
}

class Fila<T> {
  inicio: NodeFila<T> | null;
  fim: NodeFila<T> | null;
  tamanho: number;

  constructor() {
    this.inicio = null;
    this.fim = null;
    this.tamanho = 0;
  }

  // ENQUEUE: Adicionar um item ao FIM da fila
  enqueue(valor: T): void {
    const novoNo = new NodeFila(valor);

    // Se estiver vazia, o novo nó é tanto o início quanto o fim
    if (this.inicio === null) {
      this.inicio = novoNo;
      this.fim = novoNo;
    } else {
      // Se já tem gente, o atual "ultimo da fila" passa a apontar pro novo
      if (this.fim) {
        this.fim.proximo = novoNo;
      }
      // O ponteiro 'fim' da fila agora olha pro novo elemento recém chegado
      this.fim = novoNo;
    }
    this.tamanho++;
  }

  // DEQUEUE: Remover e atender o item do INÍCIO da fila
  dequeue(): T | null {
    if (this.inicio === null) {
      console.log("Fila Vazia!");
      return null;
    }

    const valorRemovido = this.inicio.valor; // Guardar valor para devolver
    
    // O início agora é deslocado para a segunda pessoa da fila
    this.inicio = this.inicio.proximo;
    this.tamanho--;

    // IMPORTANTE: Se a fila acaba de ficar vazia depois de remover a ultima pessoa,
    // o ponteiro do `fim` também precisa virar null.
    if (this.inicio === null) {
      this.fim = null;
    }

    return valorRemovido;
  }

  // PEEK (ou FRONT): Ver quem é o próximo a ser atendido, sem remover
  peek(): T | null {
    if (this.inicio === null) {
      return null;
    }
    return this.inicio.valor;
  }

  isEmpty(): boolean {
    return this.tamanho === 0;
  }
}

// === TESTANDO ===
const minhaFila = new Fila<string>();
minhaFila.enqueue("Cliente 1");
minhaFila.enqueue("Cliente 2");
minhaFila.enqueue("Cliente 3");

console.log(minhaFila.peek());    // "Cliente 1"
console.log(minhaFila.dequeue()); // Atende o Cliente 1
console.log(minhaFila.peek());    // "Cliente 2"
```

---

## Por que não Array Fixo puro? (O Paradoxo da Fila Sequencial)

Se a gente fosse usar Array (como fizemos na Pilha) e criasse nossa fila lá, teríamos um problema no método **dequeue** (atender o primeiro índice).
Ao remover o item no índice `0` de um array, precisamos trazer TODOS os outros itens (`1, 2, 3...`) uma casa para a esquerda. Em Python, tentar remover do inicio de uma `list` gera complexidade de tempo `O(N)`, enquanto usar Ponteiros (`Node`) gera `O(1)`.

>(A alternativa em casos em que seu professor na prova force uso de Array para Filas, é a criação da "Fila Circular" (Circular Queue) utilizando a matemática com operações de Módulo (`%`) para ficar movendo o índice `head` e `tail` circularmente pelo Array).

## Resumo dos Métodos Essenciais

| Método | Função | Complexidade (com Nodes) |
|---|---|---|
| **enqueue()** | Insere no fim (`tail`) | O(1) |
| **dequeue()** | Remove do começo (`head`) | O(1) |
| **peek()** | Olha quem está no começo | O(1) |

---
## Flashcards
Qual princípio a Estrutura de Fila (Queue) segue? :: Segue o princípio FIFO (First In, First Out). O primeiro a entrar é o primeiro a sair.
Na implementação de Filas com Nós (Nodes), quais ponteiros precisamos manter rastreados além do tamanho? :: Precisamos de dois: `head` (início da fila) e `tail` (fim da fila).
O que acontece na referência do ponteiro `tail` quando removemos (`dequeue`) o último e único elemento restante de uma Fila baseada em Nodes? :: Quando removemos o último elemento, a referência principal do `inicio` vira `null`, devendo ser feita também a checagem manual para setar o ponteiro `fim` para `null`.
Por que uma fila de ponteiros (`Node`) consegue perfomar operações em O(1) mas um Array fixo clássico tem operação de Dequeue em O(N)? :: Porque ao remover o elemento no índice 0 num array clássico, todos os outros elementos atrás dele precisam obrigatoriamente realizar um `shift` uma casa para trás, consumindo carga na ordem O(N).

## Conexões
- Anterior: [[1-pilhas|Pilhas (Stacks)]] (Abordagem LIFO)
- Próximo: [[3-lista-sequencial|Lista Sequencial]]
- Revisão OOP: [[1-modificadores-acesso|Modificadores de Acesso]] (Ideal para adicionar 'private' nos ponteiros previnindo manipulação fora dos métodos)
