import { Request, Response } from "express";
import { GerarRelatorioUseCase } from "../../application/gerarRelatorioUseCase";
import { PrismaTicketRepository } from "../db/ticketPrismaRepository";

export class GerarRelatorioController {
    async handle(request: Request, response: Response): Promise<Response> {
        
        const ticketRepository = new PrismaTicketRepository();
        const gerarRelatorioUseCase = new GerarRelatorioUseCase(ticketRepository);

        // Orquestra a busca de tickets e a ordenação massiva de O(N log N)
        const ticketsOrdenados = await gerarRelatorioUseCase.execute();

        // Extraimos e convertemos a Array de Entidades para Array Literal (JSON)
        const relatorioFormatadoParaBrowser = ticketsOrdenados.map(ticket => ticket.toJson());

        return response.status(200).json(relatorioFormatadoParaBrowser);
    }
}
