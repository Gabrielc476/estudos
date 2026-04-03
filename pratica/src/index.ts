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


