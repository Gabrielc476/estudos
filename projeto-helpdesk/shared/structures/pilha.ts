import { Ticket } from "../../domain/entities/ticket";

export class Pilha<T> {
    private itens: T[];

    constructor() {
        this.itens = [];
    }

    // PUSH: Adiciona um elemento no topo da pilha (LIFO)
    public push(item: T): void {
        this.itens.push(item);
    }

    // POP: Remove e retorna o elemento que está no TOPO da pilha
    public pop(): T | null {
        if (this.isEmpty()) {
            return null; // Trata de forma segura o "Stack Underflow" (Pilha vazia)
        }
        // No TS, o pop() de array nativo remove exatamente o último item, imitando uma Pilha perfeita
        return this.itens.pop() || null;
    }

    // PEEK: Apenas espia qual é o próximo objeto no topo, sem remover
    public peek(): T | null {
        if (this.isEmpty()) {
            return null;
        }
        return this.itens[this.itens.length - 1] || null; // Pega o último objeto do lado direito da memória
    }

    // Retorna o tamanho atual
    public size(): number {
        return this.itens.length;
    }

    // Retorna se a Pilha está vazia
    public isEmpty(): boolean {
        return this.itens.length === 0;
    }
}


// --- Dicionário Global para o Sistema de UNDO Privado ---
// A chave (string) será o ID do Atendente. 
// O valor será uma Pilha novinha com os próprios tickets daquele cara.
export const pilhasDeUndoPorAtendente = new Map<string, Pilha<Ticket>>();
