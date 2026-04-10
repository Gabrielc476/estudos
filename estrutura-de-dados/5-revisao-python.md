---
fase: 12
tema: "Revisão Final"
dificuldade: intermediario
domínio: 0
tags: [estrutura-de-dados, revisao, python, pandas]
revisado: 2026-04-06
---

# Revisão da Primeira Avaliação (Python)

Este arquivo é um arquivamento oficial, simplificado e altamente legível do `Revisão_Primeira_Avaliação.ipynb`. O código abaixo reflete exatamente a sintaxe que o seu professor espera para a prova, usando bibliotecas como numpy (vetores rápidos) e listas nativas limpas (pilhas).

## 1. As Classes de Estrutura base (O Núcleo)

Aqui estão as quatro bases originais de código que sua prova cobrará. Atenção aos Arrays Numpy (`np.empty`) que ele usa para travar a memória.

### 📝 Lista Sequencial (Array com shift manual)
```python
import numpy as np

class Listasequencial:
    def __init__(self, capacidade):
        self.capacidade = capacidade
        self.ultima_posicao = -1
        self.valores = np.empty(self.capacidade, dtype=int)

    def insere(self, valor):
        if self.ultima_posicao == self.capacidade - 1:
            print('Capacidade máxima atingida...')
        else:
            self.ultima_posicao += 1
            self.valores[self.ultima_posicao] = valor

    def pesquisar(self, valor):
        for i in range(self.ultima_posicao + 1):
            if valor == self.valores[i]:
                return i
        return -1

    def excluir(self, valor):
        posicao = self.pesquisar(valor)
        if posicao == -1:
            return -1
        for i in range(posicao, self.ultima_posicao):
            # O clássico Shift Left!
            self.valores[i] = self.valores[i + 1] 
        self.ultima_posicao -= 1
```

### ⏳ Fila (Queue usando Lista Circular)
*O uso do reinício de variáveis (quando elas batem na capacidade voltam pro 0) garante o reuso de memória simulando um ciclo.*
```python
class Fila:
    def __init__(self, capacidade):
        self.capacidade = capacidade
        self.inicio = 0
        self.final = -1
        self.numero_elementos = 0
        self.valores = np.empty(self.capacidade, dtype=int)

    def enfileirar(self, valor):
        if self.numero_elementos == self.capacidade:
            print('A fila está cheia')
            return
        if self.final == self.capacidade - 1:
            self.final = -1 # Hack da Fila Circular de Array
        self.final += 1
        self.valores[self.final] = valor
        self.numero_elementos += 1

    def desenfileirar(self):
        if self.numero_elementos == 0:
            print('A fila já está vazia')
            return
        temp = self.valores[self.inicio]
        self.inicio += 1
        if self.inicio == self.capacidade - 1:
            self.inicio = 0
        else:
            self.numero_elementos -= 1
            return temp
```

### 🥞 Pilha (Stack nativo simples)
```python
class Pilha:
    def __init__(self):
        self.items = []

    def empilhar(self, item):
        self.items = self.items + [item] # Evitando '.append()'

    def desempilhar(self):
        if not self.is_vazia():
            item_removido = self.items[-1]
            self.items = self.items[:-1] # Slicing de array p/ encolher
            return item_removido
        else:
            print("Pilha Vazia.")

    def topo(self):
        if not self.is_vazia():
            return self.items[-1]
```

### 🔢 Algoritmos de Ordenação (Bubble, Select e Quick)
```python
def bubble_sort(vetor):
    n = len(vetor)
    for i in range(n):
        for j in range(0, n - i - 1):
            if vetor[j] > vetor[j+1]:
                aux = vetor[j]
                vetor[j] = vetor[j+1]
                vetor[j+1] = aux
    return vetor

def select_sort(vetor):
    n = len(vetor)
    for i in range(n):
        id_min = i
        for j in range(i+1, n):
            if vetor[id_min] > vetor[j]:
                id_min = j
        aux = vetor[i]
        vetor[i] = vetor[id_min]
        vetor[id_min] = aux
    return vetor

# O grande Quick Sort da modernidade Python usando "List Comprehension" 
# É essa sutileza pythônica (sem indices numéricos) que torna ele muito mais facil no Python!
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)
```

---

## 2. A Missão Prática: O Padrão de Questões

As questões do seu professor seguem uma fórmula repetitiva que mistura `Pandas` (fatiamento de bases csv) e `Iteração Básica`. Ele não testa APENAS as estruturas, ele testa a manipulação de dados com lógicas matemáticas simples. 

**Exemplos Reais das Tarefas e Soluções Lógicas Exigidas:**

1. **Manipular CSV:**
   `dfprovaa = df1[:1000]['Temperature'].tolist()` (Fatia apenas as 1000 primeiras temperaturas do DataFrame e joga numa lista normal manipulável).

2. **Capturar "Maiores ou Menores" (O Fatiador Dinâmico):**
   Muitas vezes ele cobra: "as 15 primeiras" ou "as mais baixas". Em Python isso é feito com loop reverso ou laços simples após a ordenação. 
   - Exemplo (Maior para menor pegando de trás pra frente): `for i in range(-1, -16, -1): print(baseq1[i])`.

3. **Operar Dados:**
   - Exigência do Professor: Soma, Médias ou encontrar o Máximo/Topo apôs retirar (desempilhar) X elementos baseados no índice de fatiamento.
   - Um exemplo misturado (Filas e Pilhas): Como na clássica questão de transferir dados `Pilha -> Fila` ("Construa uma Pilha de 100 primeiras... enfileire 30 dessa pilha na estrutura Fila... desenfileire 15... diga qual é o topo hoje"). Isso garante que o conceito de LIFO/FIFO real não falha ao cruzar estruturas lógicas.

---
## Conexões
- O que te confunde acima já foi totalmente diluído no seu conhecimento base prático de [[1-pilhas]], [[2-filas]], [[3-lista-sequencial]] e [[4-ordenacao]] através da digitação raiz purista em Typescript. O pilar acadêmico está blindado.
