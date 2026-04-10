import { ITicketRepository } from "../domain/repositories/ticketRepository";
import { IAtendenteRepository } from "../domain/repositories/atendenteRepository";
import { Ticket } from "../domain/entities/ticket";


export interface FecharTicketRequestDTO {
    ticketId: string;
    atendenteId: string;
}

export class FecharTicketUseCase {
    constructor(
        private ticketRepository: ITicketRepository,
        private atendenteRepository: IAtendenteRepository
    ) { }

    async execute(data: FecharTicketRequestDTO): Promise<Ticket> {
        // 1. Buscamos o ticket no banco usando o ID que o Front-end nos passou
        const ticket = await this.ticketRepository.findById(data.ticketId);
        
        if (!ticket) {
            throw new Error("Ticket não encontrado.");
        }

        // Validação de segurança: "Esse ticket realmente pertence a você?"
        if (ticket.getAtendenteId() !== data.atendenteId) {
            throw new Error("Você não tem permissão para fechar um ticket que está com outro atendente.");
        }

        // 2. Buscamos o Atendente
        const atendente = await this.atendenteRepository.findById(data.atendenteId);
        if (!atendente) {
            throw new Error("Atendente não encontrado.");
        }

        // 3. Orquestramos a conclusão!
        ticket.concluirTicket();            // Calcula o tempo de resposta e muda status p/ CLOSED
        atendente.concluirAtendimento();    // Subtrai de 'em andamento' e soma em 'concluídos'

        // 4. Salva tudo
        await this.ticketRepository.update(ticket);
        await this.atendenteRepository.update(atendente);

        return ticket;
    }
}
