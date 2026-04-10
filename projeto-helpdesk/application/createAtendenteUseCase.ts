import { Atendente } from "../domain/entities/atendente";
import { IAtendenteRepository } from "../domain/repositories/atendenteRepository";
import { randomUUID } from "crypto";

export interface CreateAtendenteRequestDTO {
    nome: string;
    email: string;
    telefone: string;
    senha?: string;
}

export class CreateAtendenteUseCase {
    constructor(private atendenteRepository: IAtendenteRepository) { }

    async execute(data: CreateAtendenteRequestDTO): Promise<Atendente> {
        // Validação de e-mail duplicado no banco
        const atendenteExistente = await this.atendenteRepository.findByEmail(data.email);
        if (atendenteExistente) {
            throw new Error("Já existe um atendente cadastrado com este e-mail.");
        }

        // Instancia a Entidade
        const atendente = new Atendente({
            id: randomUUID(),
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
            senha: data.senha || "admin123",
            
            // Regra de Negócio: Todo atendente recém-contratado nasce com score zerado
            ticketsConcluidos: 0,
            ticketsEmAndamento: 0,
            ticketsCancelados: 0,
            ticketsAbertos: 0, 

            createdAt: new Date(),
            updatedAt: new Date()
        });

        // Delega o envio paramétrico ao banco
        await this.atendenteRepository.create(atendente);

        return atendente;
    }
}
