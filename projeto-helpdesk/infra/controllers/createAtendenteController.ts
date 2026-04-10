import { Request, Response } from "express";
import { CreateAtendenteUseCase } from "../../application/createAtendenteUseCase";
import { AtendentePrismaRepository } from "../db/atendentePrismaRepository";

export class CreateAtendenteController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { nome, email, telefone, senha } = request.body;

        const atendenteRepository = new AtendentePrismaRepository();
        const createAtendenteUseCase = new CreateAtendenteUseCase(atendenteRepository);

        const atendenteCriado = await createAtendenteUseCase.execute({
            nome,
            email,
            telefone,
            senha
        });

        return response.status(201).json(atendenteCriado.toJson());
    }
}
