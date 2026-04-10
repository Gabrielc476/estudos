import { Request, Response } from "express";
import { CreateTicketUseCase } from "../../application/createTicketUseCase";
import { PrismaTicketRepository } from "../db/ticketPrismaRepository";

export class CreateTicketController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { title, description, clienteId } = request.body;

        const ticketRepository = new PrismaTicketRepository();
        const createTicketUseCase = new CreateTicketUseCase(ticketRepository);

        // O nosso UseCase de Criar Ticket não retorna o ticket criado, ele apenas salva e joga na Fila!
        await createTicketUseCase.execute({
            title,
            description,
            clienteId
        });

        // 201 Created com a mensagem de que o chamado entrou na fila
        return response.status(201).json({ message: "Chamado aberto e inserido na Fila com sucesso!" });
    }
}
