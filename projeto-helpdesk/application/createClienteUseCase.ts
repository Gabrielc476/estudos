import { Cliente } from "../domain/entities/cliente";
import { IClienteRepository } from "../domain/repositories/clienteRepository";
import { randomUUID } from "crypto";

export interface CreateClienteRequestDTO {
    nome: string;
    email: string;
    telefone: string;
    senha?: string; // Como não vamos ter autenticação, deixamos opcional
}

export class CreateClienteUseCase {
    constructor(private clienteRepository: IClienteRepository) { }

    async execute(data: CreateClienteRequestDTO): Promise<Cliente> {
        // Validação de e-mail duplicado
        const clienteExistente = await this.clienteRepository.findByEmail(data.email);
        if (clienteExistente) {
            throw new Error("Já existe um cliente cadastrado com este e-mail.");
        }

        // Instancia a Regra de Negócio Pura
        const cliente = new Cliente({
            id: randomUUID(),
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
            senha: data.senha || "sem-senha-123", // Valor default p/ não quebrar a Entity
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // Salva com a infraestrutura abstrata
        await this.clienteRepository.create(cliente);

        return cliente;
    }
}
