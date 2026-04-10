import { ITicketRepository } from "../domain/repositories/ticketRepository";
import { Ticket } from "../domain/entities/ticket";
import { quickSort } from "../shared/utils/quickSort";

export class GerarRelatorioUseCase {
    constructor(private ticketRepository: ITicketRepository) { }

    async execute(): Promise<Ticket[]> {
        // 1. O Repositório faz o trabalho pesado de ir ao Banco de Dados e trazer os filtrados
        const ticketsFechados = await this.ticketRepository.findByStatus("CLOSED");

        // 2. Proteção de Segurança: Só ordenamos tickets que realmente tenham o tempo calculado do banco
        const ticketsValidosParaRelatorio = ticketsFechados.filter(t => 
            t.getTempoDeResposta() !== null && t.getTempoDeResposta() !== undefined
        );

        // 3. O Desafio Final: Usamos o utilitário genérico importado, que é inteligente 
        // e descobre como ordenar quando nós "ensinamos" com a Arrow Function!
        const ticketsOrdenados = quickSort<Ticket>(
            ticketsValidosParaRelatorio, 
            (ticket) => ticket.getTempoDeResposta() as number
        );

        return ticketsOrdenados;
    }
}
