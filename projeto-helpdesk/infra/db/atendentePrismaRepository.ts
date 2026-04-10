import { PrismaClient, Atendente as PrismaAtendente } from "@prisma/client";
import { Atendente } from "../../domain/entities/atendente";
import { IAtendenteRepository } from "../../domain/repositories/atendenteRepository";

const prisma = new PrismaClient();

export class AtendentePrismaRepository implements IAtendenteRepository {
    
    // Devolvemos sempre a Entidade Rica s/ vazar a interface Prisma para o mundo exterior
    private mapToDomain(prismaAtendente: PrismaAtendente): Atendente {
        return new Atendente({
            id: prismaAtendente.id,
            nome: prismaAtendente.nome,
            email: prismaAtendente.email,
            telefone: prismaAtendente.telefone,
            senha: prismaAtendente.senha,
            ticketsConcluidos: prismaAtendente.ticketsConcluidos,
            ticketsEmAndamento: prismaAtendente.ticketsEmAndamento,
            ticketsCancelados: prismaAtendente.ticketsCancelados,
            ticketsAbertos: prismaAtendente.ticketsAbertos,
            createdAt: prismaAtendente.createdAt,
            updatedAt: prismaAtendente.updatedAt,
        });
    }

    async create(atendente: Atendente): Promise<void> {
        const data = atendente.toJson();

        await prisma.atendente.create({
            data: {
                id: data.id,
                nome: data.nome,
                email: data.email,
                telefone: data.telefone,
                senha: data.senha,
                ticketsConcluidos: data.ticketsConcluidos,
                ticketsEmAndamento: data.ticketsEmAndamento,
                ticketsCancelados: data.ticketsCancelados,
                ticketsAbertos: data.ticketsAbertos,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            }
        });
    }

    async update(atendente: Atendente): Promise<void> {
        const data = atendente.toJson();

        await prisma.atendente.update({
            where: { id: atendente.getId() },
            data: {
                nome: data.nome,
                email: data.email,
                telefone: data.telefone,
                senha: data.senha,
                ticketsConcluidos: data.ticketsConcluidos,
                ticketsEmAndamento: data.ticketsEmAndamento,
                ticketsCancelados: data.ticketsCancelados,
                ticketsAbertos: data.ticketsAbertos,
                updatedAt: data.updatedAt,
            }
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.atendente.delete({
            where: { id }
        });
    }

    async findById(id: string): Promise<Atendente | null> {
        const atendenteDb = await prisma.atendente.findUnique({
            where: { id }
        });

        if (!atendenteDb) return null;

        return this.mapToDomain(atendenteDb);
    }

    async findAll(): Promise<Atendente[]> {
        const atendentes = await prisma.atendente.findMany();
        return atendentes.map(this.mapToDomain.bind(this));
    }

    async findByEmail(email: string): Promise<Atendente | null> {
        const atendenteDb = await prisma.atendente.findUnique({
            where: { email }
        });

        if (!atendenteDb) return null;

        return this.mapToDomain(atendenteDb);
    }
}
