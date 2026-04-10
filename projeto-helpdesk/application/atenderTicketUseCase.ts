import { filaTickets } from "../shared/structures/fila";
import { ITicketRepository } from "../domain/repositories/ticketRepository";
import { IAtendenteRepository } from "../domain/repositories/atendenteRepository";
import { Ticket } from "../domain/entities/ticket";
import { Pilha, pilhasDeUndoPorAtendente } from "../shared/structures/pilha";

export class AtenderTicketUseCase {
    // Agora o Service precisa falar com os dois Repositórios!
    constructor(
        private ticketRepository: ITicketRepository,
        private atendenteRepository: IAtendenteRepository
    ) { }

    // Repare: na lógica de Fila de telemarketing, o Atendente NÃO ESCOLHE o Ticket. Ele só aperta "Próximo".
    async execute(atendenteId: string): Promise<Ticket> {

        // 1. Tira da fila diretamente em memória. O(1) puro.
        const ticket = filaTickets.dequeue();

        if (!ticket) {
            throw new Error("Oba! Fila vazia, não há tickets para atender no momento.");
        }

        // 2. Buscamos o Atendente no banco
        const atendente = await this.atendenteRepository.findById(atendenteId);
        if (!atendente) {
            throw new Error("Atendente não encontrado no sistema.");
        }

        // 3. Orquestramos o Undo Multi-Tenant (Protegendo contra Data Leaks)
        if (!pilhasDeUndoPorAtendente.has(atendente.getId())) {
             pilhasDeUndoPorAtendente.set(atendente.getId(), new Pilha<Ticket>()); // Cria a pilha zerada do Atendente
        }
        
        const pilhaDoAtendente = pilhasDeUndoPorAtendente.get(atendente.getId())!;
        pilhaDoAtendente.push(ticket); // Guarda na pilha *Dele*!

        // 3. Orquestramos a vida das DUAS entidades (Modelo Rico)
        ticket.iniciarTicket(atendente.getId()); // Ticket agora está IN_PROGRESS
        atendente.iniciarNovoAtendimento();      // Atendente ganha +1 na contagem de tickets

        // 4. Persistimos o estado das duas no Banco de Dados
        await this.ticketRepository.update(ticket);
        await this.atendenteRepository.update(atendente);

        // 5. Devolvemos o ticket retirado para o Controller mostrar na tela do Front-End
        return ticket;
    }
}