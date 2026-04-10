import { Ticket } from "../domain/entities/ticket";
import { ITicketRepository } from "../domain/repositories/ticketRepository";
import { IAtendenteRepository } from "../domain/repositories/atendenteRepository";
import { pilhasDeUndoPorAtendente } from "../shared/structures/pilha";
import { filaTickets } from "../shared/structures/fila";

export class ReverterTicketUseCase {
    constructor(
        private ticketRepository: ITicketRepository,
        private atendenteRepository: IAtendenteRepository
    ) { }

    async execute(atendenteId: string): Promise<Ticket> {
        const atendente = await this.atendenteRepository.findById(atendenteId);
        if (!atendente) {
            throw new Error("Atendente não encontrado");
        }

        // 1. Você SÓ olha pra pilha! Você não pode puxar um NOVO ticket da Fila para dar Undo,
        // senão você destrói um ticket que não tinha nada a ver com o erro.
        const pilhaDoAtendente = pilhasDeUndoPorAtendente.get(atendente.getId());
        if (!pilhaDoAtendente) {
            throw new Error("Pilha de undo não encontrada");
        }

        // 2. Extrai o ticket da Pilha particular dele
        const ticket = pilhaDoAtendente.pop();
        if (!ticket) {
            throw new Error("Você não possui ações recentes para desfazer.");
        }

        // 3. Modifica as entidades e limpa o erro (O ticket volta pra OPEN e fica sem dono)
        ticket.reverterTicket();
        atendente.reverterAtendimento();

        // 4. Salva a correção no banco de dados
        await this.ticketRepository.update(ticket);
        await this.atendenteRepository.update(atendente);

        // 5. O SEGREDO DO HELPDESK: O ticket que foi rejeitado/desfeito volta pra FILA
        // para que a próxima pessoa consiga atendê-lo!
        filaTickets.enqueue(ticket);

        return ticket;
    }
}