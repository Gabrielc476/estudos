/**
 * Algoritmo de QuickSort O(N log N) Genérico
 * 
 * @param array A lista de itens (Entidades, Objetos, Números, etc) para ordenar
 * @param getSortValue Uma função que ensina o QuickSort qual campo numérico ele deve olhar
 */
export function quickSort<T>(array: T[], getSortValue: (item: T) => number): T[] {
    // Parada recursiva
    if (array.length <= 1) {
        return array;
    }

    // Seçiona o pivô e descobre o valor dele chamando a função extratora
    const pivotIndex = Math.floor(array.length / 2);
    const pivot = array[pivotIndex] as T;
    const pivotValue = getSortValue(pivot);

    const maisRapidos: T[] = [];
    const maisDemorados: T[] = [];

    for (let i = 0; i < array.length; i++) {
        if (i === pivotIndex) continue; // Pula o próprio da contagem

        // Usa a injeção funcional para descobrir o valor da vez
        const itemAtual = array[i] as T;
        const valorAtual = getSortValue(itemAtual);

        if (valorAtual < pivotValue) {
            maisRapidos.push(itemAtual);
        } else {
            maisDemorados.push(itemAtual);
        }
    }

    // Recursão
    return [
        ...quickSort(maisRapidos, getSortValue),
        pivot,
        ...quickSort(maisDemorados, getSortValue)
    ];
}
