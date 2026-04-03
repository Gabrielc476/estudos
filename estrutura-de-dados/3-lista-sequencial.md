---
fase: 12
tema: "Lista Sequencial"
dificuldade: intermediario
domínio: 0
tags: [estrutura-de-dados, listas, arrays, flashcards]
revisado: 2026-04-03
---
# Lista Sequencial (Manual)

## O que é uma Lista Sequencial?

Uma **Lista Sequencial** guarda elementos em blocos consecutivos de memória. Na prática do dia a dia, programadores chamam isso de *Arrays* e usam os métodos nativos (como `push`, `splice`, `insert`).

Porém, em uma prova purista, as listas muitas vezes são tratadas como estruturas de tamanho e tipos de uso predefinidos. E caso você precise aumentar a capacidade da lista (crescer o Array) ou inserir dados no MEIO da lista, essas manipulações devem ser feitas copiando manualmente os elementos (`shift` para esquerda ou para direita).

---

## Implementação da Lista Sequencial Manual em TypeScript

Criaremos uma classe que simula perfeitamente uma Lista do Python por trás dos panos, construindo métodos essenciais como `insertAt` (inserir em um índice específico sem apagar) e `removeAt` (remover um indíce específico).

```typescript
class ListaSequencial<T> {
  // Em Python, representaria: self.dados = [None] * capacidade_inicial
  dados: (T | null)[];
  capacidade: number;
  tamanho: number; // Quantos itens de fato estão na lista (length util)

  constructor(capacidadeInicial: number = 5) {
    this.capacidade = capacidadeInicial;
    this.dados = new Array(this.capacidade).fill(null);
    this.tamanho = 0;
  }

  // 1. ADD / APPEND: Inserir no final válido da lista
  add(valor: T): void {
    if (this.tamanho === this.capacidade) {
      // Diferente da Pilha padrão (que pode travar), listas podem "crescer".
      // Em Python (e internamente), chamamos resize O(N) duplicando a memória.
      this._resize(this.capacidade * 2); 
    }
    this.dados[this.tamanho] = valor;
    this.tamanho++;
  }

  // 2. INSERT_AT: Inserir em um índice específico empurrando os outros pra direita
  insertAt(indice: number, valor: T): void {
    if (indice < 0 || indice > this.tamanho) {
      console.log("Erro: Índice fora dos limites!");
      return;
    }
    
    if (this.tamanho === this.capacidade) {
      this._resize(this.capacidade * 2);
    }

    // LÓGICA CORE: Realocar elementos na mão (Right-Shift)
    // O loop começa de trás pra frente empurrando cada item uma casa para frente.
    for (let i = this.tamanho; i > indice; i--) {
      this.dados[i] = this.dados[i - 1];
    }

    this.dados[indice] = valor;
    this.tamanho++;
  }

  // 3. REMOVE_AT: Remover de um índice empurrando os outros pra esquerda para tapar o buraco
  removeAt(indice: number): T | null {
    if (indice < 0 || indice >= this.tamanho) {
      console.log("Erro: Índice fora dos limites!");
      return null;
    }

    const valorRemovido = this.dados[indice];

    // LÓGICA CORE: Realocar elementos (Left-Shift)
    // O loop começa a partir do 'buraco' trazendo o vizinho da frente para ocupá-lo.
    for (let i = indice; i < this.tamanho - 1; i++) {
        this.dados[i] = this.dados[i + 1];
    }
    
    this.tamanho--;
    // Limpamos o último lugar para evitar dados perdidos / falhas com lixo de memória
    this.dados[this.tamanho] = null; 

    return valorRemovido;
  }

  // Helper privado para simular como a memória tem q agir num Array puro
  private _resize(novaCapacidade: number): void {
    console.log(`[Resize] Aumentando de ${this.capacidade} para ${novaCapacidade}`);
    const novosDados = new Array(novaCapacidade).fill(null);
    for (let i = 0; i < this.tamanho; i++) {
      novosDados[i] = this.dados[i];
    }
    this.dados = novosDados;
    this.capacidade = novaCapacidade;
  }

  get(indice: number): T | null {
    if (indice < 0 || indice >= this.tamanho) return null;
    return this.dados[indice];
  }
}

// === TESTANDO ===
const lista = new ListaSequencial<string>(3);
lista.add("A");
lista.add("B");
lista.add("D");

// Testando Shift para a Direita O(N)
lista.insertAt(2, "C"); // Array precisará de Resize e shift!
// Estado final: ["A", "B", "C", "D", null, null]
```

## Resumo dos Métodos e Complexidade Típica

| Método | Complexidade de Tempo Média / Pior Caso |
|---|---|
| Acesso pelo índice `.get(id)` | **O(1)** |
| Inserção/Remoção no fim da fila | **O(1)** (*Amortizado, caso n haja resize*) |
| Inserção no meio/início da fila | **O(N)** (*Devido a cópia pro lado/Shift*) |
| Remoção no meio/início da fila | **O(N)** (*Devido a cópia pro lado/Shift*) |

A lista Sequencial, por ficar em um local contínuo na CPU/RAM é maravilhosa para buscas e iterabilidade rápida, mas muito lenta para modificar em seus confins do meio ou início.

---
## Flashcards
Como é feita a inserção de um elemento no MEIO (`insertAt`) de uma Lista Sequencial? :: Precisamos iniciar um loop de trás para frente, empurrando todos os elementos a partir do índice desejado uma casa para a direita para "abrir espaço", só então alocando o valor na posse desejada.
Qual é a complexidade típica de Tempo de recuperar um elemento baseado em seu Índice numa Lista Sequencial? :: O(1), constante. Pois basta somar sua localização no bloco de memória.
De forma geral, o que causa lentidão no cenário de uma Lista Sequencial versus uma Lista Encadeada baseada em Nodes? :: A Lista Sequencial sofre bastante perdas na performance com remoções/inserções pois a ordem requer cópias constantes de todos os elementos para direita ou esquerda. Nas encadeadas, os ponteiros resolvem isso em O(1) de forma instantânea.
O que é o "Resize" em uma lista/array? :: É a criação de um novo array maior (normalmente dobrando a capacidade atual) e a cópia manual de todos os elementos antigos para este novo layout de memória para prevenir problemas de falta de espaço.

## Conexões
- Anterior: [[2-filas|Filas (Queues)]] (A contra-parte FIFO em memória linear ou circular usando arrays).
- Próximo: [[4-ordenacao|Algoritmos de Ordenação]]
