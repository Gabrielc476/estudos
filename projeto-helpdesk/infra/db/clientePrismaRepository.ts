import { PrismaClient, Cliente as PrismaCliente } from "@prisma/client";
import { Cliente } from "../../domain/entities/cliente";
import { IClienteRepository } from "../../domain/repositories/clienteRepository";

const prisma = new PrismaClient();

export class ClientePrismaRepository implements IClienteRepository {
    private mapToDomain(prismaCliente: PrismaCliente): Cliente {
        return new Cliente({
            id: prismaCliente.id,
            nome: prismaCliente.nome,
            senha: prismaCliente.senha,
            email: prismaCliente.email,
            telefone: prismaCliente.telefone,
            createdAt: prismaCliente.createdAt,
            updatedAt: prismaCliente.updatedAt,
        });
    }

    async create(cliente: Cliente): Promise<void> {
        const data = cliente.toJson();

        await prisma.cliente.create({
            data: {
                id: data.id,
                nome: data.nome,
                senha: data.senha,
                email: data.email,
                telefone: data.telefone,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            }
        })
    }

    async update(cliente: Cliente): Promise<void> {
        const data = cliente.toJson();

        await prisma.cliente.update({
            where: { id: cliente.getId() },
            data: {
                nome: data.nome,
                senha: data.senha,
                email: data.email,
                telefone: data.telefone,
                updatedAt: data.updatedAt,
            }
        })
    }

    async delete(id: string): Promise<void> {
        await prisma.cliente.delete({
            where: { id }
        })
    }

    async findById(id: string): Promise<Cliente | null> {
        const clienteDb = await prisma.cliente.findUnique({
            where: { id }
        })

        if (!clienteDb) return null;

        return this.mapToDomain(clienteDb);
    }

    async findAll(): Promise<Cliente[]> {
        const clientes = await prisma.cliente.findMany();
        return clientes.map(this.mapToDomain.bind(this));
    }

    async findByEmail(email: string): Promise<Cliente | null> {
        const clienteDb = await prisma.cliente.findUnique({
            where: { email }
        })

        if (!clienteDb) return null;

        return this.mapToDomain(clienteDb);
    }
}