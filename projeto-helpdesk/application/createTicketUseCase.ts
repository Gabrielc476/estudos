import { Ticket } from "../domain/entities/ticket";
import { ITicketRepository } from "../domain/repositories/ticketRepository";

import { randomUUID } from "crypto";
import { filaTickets } from "../shared/structures/fila";

// O formato de "dados puros" que a internet vai enviar para a nossa API
export interface CreateTicketRequestDTO {
    title: string;
    description: string;
    clienteId: string;
}

export class CreateTicketUseCase {
    constructor(private ticketRepository: ITicketRepository) { }

    async execute(data: CreateTicketRequestDTO): Promise<void> {
        // É responsabilidade do UseCase de Criação transformar os dados simples em Entidade!
        const ticket = new Ticket({
            id: randomUUID(), // Gera um ID único e mundialmente seguro automatico
            title: data.title,
            description: data.description,
            status: "OPEN", // Todo ticket nasce OPEN
            clienteId: data.clienteId,
            atendenteId: null, // Ninguém atendeu ainda
            dataAbertura: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // Chama o repositório para salvar no banco
        await this.ticketRepository.create(ticket);
        filaTickets.enqueue(ticket);
    }
}