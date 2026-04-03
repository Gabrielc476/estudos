---
fase: 12
tema: "Ordenação"
dificuldade: intermediario
domínio: 0
tags: [estrutura-de-dados, ordenacao, sorting, flashcards]
revisado: 2026-04-03
---
# Ordenação (Sorting)

A ordenação é a organização natural ou pré-concebida dos elementos contidos nas estruturas de dados (normalmente Listas Sequenciais/Arrays) e é o problema algorítmico mais antigo da computação.

Como sua prova não permite usar a função `.sort()` built-in da linguagem, precisamos conhecer detalhadamente os algoritmos raiz que você implementará, em dois for loops aninhados (maioria).

Esses algoritmos que veremos possuem complexidade média e de pior caso **O(N²)**.

---

## 1. Bubble Sort (O Método da Bolha)

A ideia por trás do Bubble Sort é comparar itens adjacentes e realizar "swap" (troca) caso eles estejam operando foram de ordem. Desse modo, o elemento mais pesado (ou maior) vai flutuar pelo Array na forma de bolhas até seu repouso no final (que já fica permanentemente ordenado).

```typescript
function bubbleSort(arr: number[]): number[] {
  let trocado;
  const n = arr.length;

  // Itera pelo array inteiro n vezes. O número de loops é o tamanho do array.
  for (let i = 0; i < n; i++) {
    trocado = false;
    
    // "n - i - 1": Os elementos no fim a cada passo de i já voaram e repousaram no fim, 
    // então eles não precisam ser checados de novo.
    for (let j = 0; j < n - i - 1; j++) {
        
      // Se um cara à esquerda é MAIOR que o fella à direita... TROCA DE LUGAR!
      if (arr[j] > arr[j + 1]) {
        // SWAP Manual das posições
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        
        // Em python Swap pode ser feito mais chique: arr[j], arr[j+1] = arr[j+1], arr[j]
        
        trocado = true;
      }
    }
    
    // Se no meio inteirinho desse for (e percurso pela array) não rolar nenhuma troca sequer
    // isso quer dizer que o array já está sorted, é a hora de economizar os O(N) breaking; 
    if (!trocado) break;
  }
  return arr;
}
```

## 2. Selection Sort (Ordenação por Seleção)

Pense na estratégia bruta de Selecionar o Menor Cara que existe atualmente e varrê-lo pra primeira gaveta com certeza. Essa é a essência do Mínimo Local do Array desordenado de forma sequencial.

```typescript
function selectionSort(arr: number[]): number[] {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    // Nós assumimos q o indíce que estamos navegando é o menor da vez.
    let indiceMinimo = i;

    // Buscamos se exise UM CARA que seja MENOR que a gente do "i até N".
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[indiceMinimo]) {
        indiceMinimo = j; 
      }
    }

    // Se o Menor Indice atualizado não for o I q estamos navegando, Swap é engatilhado
    if (indiceMinimo !== i) {
      const temp = arr[i];
      arr[i] = arr[indiceMinimo];
      arr[indiceMinimo] = temp;
    }
  }

  return arr;
}
```

## 3. Insertion Sort (Ordenação por Inserção)

Esse algoritmo foca em iterar uma lista, mas diferente da bolha e da seleção, ele ataca como se eu estivesse abrindo em mãos as "cartas do super trunfo", organizando as novas que eu checo na parte ordenada da "mão de fato". A "sublista final" atrás da iteração ganha vida de forma totalmente ordenada desde os princípios.

```typescript
function insertionSort(arr: number[]): number[] {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const cartaAtual = arr[i];
    let j = i - 1; // Analiso qual a casa antiga à nossa atual Carta

    // Equanto as cartas de trás estiverem maiores q nós e ñ chegarmos no índice 0
    // Vamos movendo todo mundo pra direita (Array Shift).
    while (j >= 0 && arr[j] > cartaAtual) {
      arr[j + 1] = arr[j]; // Shift da carta atual (J) uma casa pra cima.
      j--;
    }
    
    // O buraco que sobraremos quando o laço While cair e parar,
    // será a casinha certinha pra ser populada.
    arr[j + 1] = cartaAtual;
  }

  return arr;
}

## 4. Quick Sort (Ordenação Rápida)

O Quick Sort é um algoritmo avançado e muito mais rápido, baseado no paradigma de **Divisão e Conquista** (Divide and Conquer). Sua complexidade média de tempo despenca para **O(N log N)**.
Ele funciona escolhendo um elemento como "Pivô" (Pivot) e particionando a array: movemos todos os itens menores que o pivô para a sua esquerda, e todos os maiores para a direita. Depois aplicamos a mesma regra recursivamente nas duas metades.

```typescript
function quickSort(arr: number[], inicio: number = 0, fim: number = arr.length - 1): number[] {
  if (inicio < fim) {
    // A função particionar faz o trabalho sujo de separar menores/maiores 
    // e nos devolve o índice onde o pivô parou
    const indicePivo = particionar(arr, inicio, fim);

    // Repete a lógica para o lado ESQUERDO do pivô
    quickSort(arr, inicio, indicePivo - 1);
    
    // Repete a lógica para o lado DIREITO do pivô
    quickSort(arr, indicePivo + 1, fim);
  }
  return arr;
}

// A alma do Quick Sort
function particionar(arr: number[], inicio: number, fim: number): number {
  const pivo = arr[fim]; // Escolhemos o último elemento como Pivô
  let i = inicio - 1; // Rastreador da "barreira" dos menores

  for (let j = inicio; j < fim; j++) {
    // Se acharmos alguém menor que o Pivô, ele vai pro lado esquerdo da barreira
    if (arr[j] <= pivo) {
      i++;
      
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }

  // Põe o Pivô na barreira exata que divide menores (esq) e maiores (dir)
  const tempPivo = arr[i + 1];
  arr[i + 1] = arr[fim];
  arr[fim] = tempPivo;

  return i + 1; // Onde o Pivô ficou definitivamente ancorado
}
```

---
## Flashcards
Qual a complexidade assintótica em pior caso (tempo) do Bubble, Selection e Insertion Sort? :: A complexidade em pior caso e casos normais é O(N²).
Qual o princípio fundamental do Bubble Sort? :: O Bubble foca em flutuar os valores em passagens contínuas pelo Array, comparando pares adjacentes e se o vizinho esquerdo for maior/sucessor que o direito, troca.
Qual é a principal intuição fundamental por trás de algoritmos como Insertion Sort na vida real? :: A de ordenar cartas de baralho na mão. Construíndo-se ativamente por trás ao ler da Esquerda à Direita as "cartas", comparando e retrocedendo o valor no melhor espaço com as cartas abertas no topo.
Qual a lógica principal para o Selection Sort? :: Ele procura a cada passada pela porçao Desordenada do Array pelo menor valor/mínimo absoluto possível e o seleciona, jogando no finalzinho da parte Ordenada.
Qual o paradigma e a complexidade do algoritmo Quick Sort? :: Divide and Conquer (Divisão e Conquista). Sua complexidade de tempo comum e rápida é de O(N log N).
Como o Quick Sort organiza os dados ao redor do Pivô (Pivot) através do particionamento? :: Ele percorre o array agrupando e movendo todos os números menores do que o pivô para a esquerda. Ao final, coloca o pivô no meio e tudo à direita será naturalmente maior, criando partições perfeitas.

## Conexões
- Anterior: [[3-lista-sequencial|Listas Sequenciais (Alvos ideais de algoritmos puristas de Sort)]]
