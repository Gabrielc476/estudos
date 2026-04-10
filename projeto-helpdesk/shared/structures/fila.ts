import { Ticket } from "../../domain/entities/ticket";

export class Fila<T> {
    // Mantemos os itens privados para encapsular a estrutura
    private itens: T[];

    constructor() {
        this.itens = [];
    }

    // Adiciona um elemento ao final da fila (Padrão FIFO)
    public enqueue(item: T): void {
        this.itens.push(item);

    }

    // Remove e retorna o primeiro elemento da fila
    public dequeue(): T | null {
        if (this.isEmpty()) {
            return null;
        }
        return this.itens.shift() || null;
    }

    // Retorna o tamanho atual
    public size(): number {
        return this.itens.length;
    }

    // Retorna se está vazia
    public isEmpty(): boolean {
        return this.itens.length === 0;
    }
}


export const filaTickets = new Fila<Ticket>();