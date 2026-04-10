import { Request, Response } from "express";
import { FecharTicketUseCase } from "../../application/fecharTicketUseCase";
import { PrismaTicketRepository } from "../db/ticketPrismaRepository";
import { AtendentePrismaRepository } from "../db/atendentePrismaRepository";

export class FecharTicketController {
    async handle(request: Request, response: Response): Promise<Response> {
        // Pegando o Id do Atendente e do Ticket forçando a tipagem Estrita para o Express
        const ticketId = request.params.ticketId as string;
        const atendenteId = request.body.atendenteId as string;

        const ticketRepository = new PrismaTicketRepository();
        const atendenteRepository = new AtendentePrismaRepository();
        const fecharTicketUseCase = new FecharTicketUseCase(ticketRepository, atendenteRepository);

        const ticketFechado = await fecharTicketUseCase.execute({
            ticketId,
            atendenteId
        });

        return response.status(200).json(ticketFechado.toJson());
    }
}
