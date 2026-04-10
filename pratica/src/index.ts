class ListaSequencial {
    private dados: (number | null)[];
    private capacidade: number;
    private tamanho: number;

    constructor(capacidade: number) {
        this.capacidade = capacidade;
        this.tamanho = 0;
        this.dados = new Array(this.capacidade).fill(null);
    }

    anexar(valor: number): void {
        if (this.tamanho === this.capacidade) {
            console.log("Lista cheia!")
            return
        }
        this.dados[this.tamanho] = valor;
        this.tamanho++;
    }

    inserirEm(valor: number, indice: number): void {
        if (this.tamanho === this.capacidade) {
            console.log("Lista cheia!")
            return
        }
        if (indice < 0 || indice > this.tamanho) {
            console.log("Indice invalido!")
            return
        }

        for (let i = this.tamanho; i > indice; i--) {
            this.dados[i] = this.dados[i - 1];
        }
        this.dados[indice] = valor;
        this.tamanho++;
    }

    removerEm(indice: number): number | null {
        if (indice < 0 || indice >= this.tamanho) {
            console.log("Indice invalido!")
            return null
        }
        const valorRemovido = this.dados[indice];
        for (let i = indice; i < this.tamanho - 1; i++) {
            this.dados[i] = this.dados[i + 1];
        }
        this.dados[this.tamanho - 1] = null;
        this.tamanho--;
        return valorRemovido;
    }

    mostrarMemoria(): (number | null)[] {
        return this.dados;
    }

    get(indice: number): number | null {
        if (indice < 0 || indice >= this.tamanho) {
            console.log("Indice invalido!")
            return null
        }
        return this.dados[indice];
    }


}



function bubbleSort(array: number[]): number[] {
    let trocou = true;
    if (array.length <= 1) {
        console.log("Array menor que 1")
        return array;
    }
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                trocou = true;
            }
        }
        if (!trocou) {
            break;
        }
    }
    return array;

}

function selectionSort(array: number[]): number[] {
    if (array.length <= 1) {
        console.log("array menor que 1")
        return array;
    }
    for (let i = 0; i < array.length - 1; i++) {
        let minimo = i;
        for (let j = 0; i < array.length; j++) {
            if (array[j] < array[minimo]) {

                minimo = j;
            }
        }

        if (minimo !== i) {
            const temp = array[i];
            array[i] = array[minimo];
            array[minimo] = temp;
        }

    }

    return array;
}

function insertionSort(array: number[]): number[] {
    //[5,8,33,4,1,2]
    if (array.length <= 1) {
        console.log("array menor que 1")
        return array;
    }
    for (let i = 1; i < array.length; i++) {
        const cartaAtual = array[i]
        let j = i - 1;
        while (j >= 0 && array[j] > cartaAtual) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = cartaAtual;
    }
    return array;
}

function quickSort(array: number[], inicio: number = 0, fim: number = array.length - 1): number[] {
    //[5,8,33,4,1,2]
    if (array.length <= 1) {
        console.log("array menor que 1")
        return array;
    }

    let pivo = particionar(array, inicio, fim);// a partir do array de referencia ele será 1
    quickSort(array, inicio, pivo - 1);// aqui ele vai ser 0
    quickSort(array, pivo + 1, fim);// aqui ele vai ser 2
    return array;

}

function particionar(array: number[], inicio: number, fim: number): number {
    //aqui ele vai ser o 2 na primeira chamada
    const pivo = array[fim];
    //i vai ser igual a -1 na primeira chamada
    let i = inicio - 1;
    for (let j = inicio; j < fim; j++) {
        if (array[j] <= pivo) {
            //pro j entrar aqui ele tá na posição 4
            i++;
            //aqui array[i] = 5
            //temp = 5
            const temp = array[i];
            //array[j] = 1
            //array[i] = 1
            array[i] = array[j];
            //logo array[j] vai ser igual a 5 então o item na posição 4 vai ser 5
            array[j] = temp;
        }
    }

    //aqui i vai ser igual a 0, array[0 + 1] = 8
    const temp = array[i + 1];
    //array[0 + 1] virou 2 pois ele é o ultimo elemento
    array[i + 1] = array[fim];
    //array[fim] virou 8 pois ele é o item que estava na posição 0 + 1
    array[fim] = temp;
    //retorna i + 1 que é 1
    return i + 1;
}


class Pilha<T> {
    dados: (T | null)[]
    capacidade: number
    topo: number

    constructor(capacidade: number) {
        this.capacidade = capacidade;
        this.topo = -1;
        this.dados = new Array(this.capacidade).fill(null);
    }

    push(valor: T): void {
        if (this.topo === this.capacidade - 1) {
            console.log("pilha cheia")
        }
        this.topo++;
        this.dados[this.topo] = valor;
    }
    pop(): T | null {
        if (this.topo === -1) {
            console.log("pilha vazia")
            return null;
        }
        const valorRemovido = this.dados[this.topo];
        this.dados[this.topo] = null;
        this.topo--;
        return valorRemovido;
    }

    peek(): T | null {
        if (this.topo === -1) {
            console.log("pilha vazia")
            return null;
        }
        return this.dados[this.topo];
    }

    mostrarPilha(): (T | null)[] {
        return this.dados;
    }

    estaVazia(): boolean {
        return this.topo === -1;
    }


}

function inverterPalavra(palavra: string): string {
    const pilha = new Pilha<string>(palavra.length);

    for (let i = 0; i < palavra.length; i++) {
        pilha.push(palavra[i]);
    }

    let palavraInvertida = ""
    while (!pilha.estaVazia()) {
        palavraInvertida += pilha.pop();
    }
    return palavraInvertida;



}


const resultado = inverterPalavra("ESTRUTURA");
console.log("Original: ESTRUTURA | Invertida: ", resultado)
// Deve ser: ARUTURTSE
const resultado2 = inverterPalavra("PROVA");
console.log("Original: PROVA | Invertida: ", resultado2)


class FilaNo<T> {
    valor: T
    proximo: FilaNo<T> | null

    constructor(valor: T) {
        this.valor = valor;
        this.proximo = null;
    }
}

class Fila<T> {
    inicio: FilaNo<T> | null
    fim: FilaNo<T> | null
    tamanho: number

    constructor() {
        this.inicio = null;
        this.fim = null
        this.tamanho = 0;

    }

    entrarNaFila(valor: T): void {
        const novoNo = new FilaNo(valor);
        if (this.inicio === null) {
            this.inicio = novoNo;
            this.fim = novoNo;
        } else {
            if (this.fim) {
                this.fim.proximo = novoNo;

            }
            this.fim = novoNo;
        }
        this.tamanho++;
    }

    quemEoProximo(): T | null {
        if (this.inicio === null) {
            console.log("fila vazia")
            return null;
        }
        return this.inicio.valor;
    }

    atenderProximo(): T | null {
        if (this.inicio === null) {
            console.log("fila vazia")
            return null;
        }
        const valorRemovido = this.inicio.valor;
        this.inicio = this.inicio.proximo;
        this.tamanho--;
        return valorRemovido;
    }

    mostrarFila(): (T | null)[] {
        const fila: (T | null)[] = [];
        let noAtual = this.inicio;
        while (noAtual !== null) {
            fila.push(noAtual.valor);
            noAtual = noAtual.proximo;
        }
        return fila;
    }
}

const filaDoItau = new Fila();
filaDoItau.entrarNaFila("Gabriel");
filaDoItau.entrarNaFila("Roberto");
filaDoItau.entrarNaFila("Marcos");
console.log("No topo da fila esperando:", filaDoItau.quemEoProximo());
// ESPERADO: Gabriel
const atendido1 = filaDoItau.atenderProximo();
console.log(`Caixa chamou o cliente: ${atendido1}`); // ESPERADO: Gabriel
console.log("Agora no topo esperando:", filaDoItau.quemEoProximo()); // ESPERADO: Roberto
filaDoItau.atenderProximo(); // Atende Roberto
filaDoItau.atenderProximo(); // Atende Marcos
console.log("Apos fechar o banco:", filaDoItau.quemEoProximo());