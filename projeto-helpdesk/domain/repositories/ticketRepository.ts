import { Ticket, TicketStatus } from "../entities/ticket";

export interface ITicketRepository {
    create(ticket: Ticket): Promise<void>;
    update(ticket: Ticket): Promise<void>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Ticket | null>;
    findAll(): Promise<Ticket[]>;
    findByClienteId(clienteId: string): Promise<Ticket[]>;
    findByAtendenteId(atendenteId: string): Promise<Ticket[]>;
    findByStatus(status: TicketStatus): Promise<Ticket[]>;
}