import { PrismaClient, Ticket as PrismaTicket } from "@prisma/client";
import { Ticket, TicketStatus } from "../../domain/entities/ticket";
import { ITicketRepository } from "../../domain/repositories/ticketRepository";

// Idealmente o PrismaClient é instanciado em um arquivo de conexão único, 
// mas para fins didáticos colocamos aqui diretamente.
const prisma = new PrismaClient();

export class PrismaTicketRepository implements ITicketRepository {

    // Função Auxiliar (Mapper): Converte o objeto sujo do banco de dados 
    // em uma Entidade limpa e rica de Negócios!
    private mapToDomain(prismaTicket: PrismaTicket): Ticket {
        return new Ticket({
            id: prismaTicket.id,
            title: prismaTicket.title,
            description: prismaTicket.description,
            status: prismaTicket.status as TicketStatus,
            atendenteId: prismaTicket.atendenteId,
            clienteId: prismaTicket.clienteId,
            dataAbertura: prismaTicket.dataAbertura,
            dataFechamento: prismaTicket.dataFechamento,
            tempoDeResposta: prismaTicket.tempoDeResposta,
            createdAt: prismaTicket.createdAt,
            updatedAt: prismaTicket.updatedAt,
        });
    }

    async create(ticket: Ticket): Promise<void> {
        // Agora usamos Key Mapping direto do DTO Readonly para garantir os dados precisos e imutáveis
        const data = ticket.toJson();

        await prisma.ticket.create({
            data: {
                id: data.id,
                title: data.title,
                description: data.description,
                status: data.status,
                dataAbertura: data.dataAbertura,
                clienteId: data.clienteId,
                atendenteId: data.atendenteId,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
                // dataFechamento e tempoDeResposta não nascem no create()
            }
        });
    }

    async update(ticket: Ticket): Promise<void> {
        const data = ticket.toJson();

        await prisma.ticket.update({
            where: { id: ticket.getId() },
            data: {
                status: data.status,
                atendenteId: data.atendenteId,
                dataAbertura: data.dataAbertura,
                dataFechamento: data.dataFechamento ?? null,
                tempoDeResposta: data.tempoDeResposta ?? null,
                updatedAt: data.updatedAt,
            }
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.ticket.delete({
            where: { id }
        });
    }

    async findById(id: string): Promise<Ticket | null> {
        const ticketDb = await prisma.ticket.findUnique({
            where: { id }
        });

        if (!ticketDb) return null;

        // Sempre retorna a ENTIDADE, nunca os dados sujos do Prisma
        return this.mapToDomain(ticketDb);
    }

    async findAll(): Promise<Ticket[]> {
        const tickets = await prisma.ticket.findMany();
        return tickets.map(this.mapToDomain); // Transforma o array do DB em array de Classes Ticket
    }

    async findByClienteId(clienteId: string): Promise<Ticket[]> {
        const tickets = await prisma.ticket.findMany({
            where: { clienteId }
        });
        return tickets.map(this.mapToDomain);
    }

    async findByAtendenteId(atendenteId: string): Promise<Ticket[]> {
        const tickets = await prisma.ticket.findMany({
            where: { atendenteId }
        });
        return tickets.map(this.mapToDomain);
    }

    async findByStatus(status: TicketStatus): Promise<Ticket[]> {
        const tickets = await prisma.ticket.findMany({
            where: { status }
        });
        return tickets.map(this.mapToDomain);
    }
}
