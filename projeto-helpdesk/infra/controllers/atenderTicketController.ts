import { Request, Response } from "express";
import { AtenderTicketUseCase } from "../../application/atenderTicketUseCase";
import { PrismaTicketRepository } from "../db/ticketPrismaRepository";
import { AtendentePrismaRepository } from "../db/atendentePrismaRepository";

export class AtenderTicketController {
    async handle(request: Request, response: Response): Promise<Response> {
        // O Id do Atendente pode vir do corpo ou dos parâmetros da URL (/tickets/process/:atendenteId)
        // Para simplificar, assumimos que venha no Body ou Params. Pegamos do Body:
        const { atendenteId } = request.body;

        const ticketRepository = new PrismaTicketRepository();
        const atendenteRepository = new AtendentePrismaRepository();
        const atenderTicketUseCase = new AtenderTicketUseCase(ticketRepository, atendenteRepository);

        const ticketEmAndamento = await atenderTicketUseCase.execute(atendenteId);

        return response.status(200).json(ticketEmAndamento.toJson());
    }
}
