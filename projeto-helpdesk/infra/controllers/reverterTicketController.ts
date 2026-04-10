import { Request, Response } from "express";
import { ReverterTicketUseCase } from "../../application/reverterTicketUseCase";
import { PrismaTicketRepository } from "../db/ticketPrismaRepository";
import { AtendentePrismaRepository } from "../db/atendentePrismaRepository";

export class ReverterTicketController {
    async handle(request: Request, response: Response): Promise<Response> {
        // Rota /tickets/undo baterá aqui. Recebe o ID do atendente logado no sistema
        const { atendenteId } = request.body;

        const ticketRepository = new PrismaTicketRepository();
        const atendenteRepository = new AtendentePrismaRepository();
        const reverterTicketUseCase = new ReverterTicketUseCase(ticketRepository, atendenteRepository);

        // Dispara o algoritmo de LIFO da Pilha usando o ID puro de string
        const ticketRevertido = await reverterTicketUseCase.execute(atendenteId);

        return response.status(200).json({
            message: "Mecânica de Undo Acionada. Ticket foi retirado do Atendente e devolvido à Fila Global.",
            ticket: ticketRevertido.toJson()
        });
    }
}
