import { Cliente } from "../entities/cliente";

export interface IClienteRepository {
    create(cliente: Cliente): Promise<void>;
    update(cliente: Cliente): Promise<void>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Cliente | null>;
    findAll(): Promise<Cliente[]>;
    findByEmail(email: string): Promise<Cliente | null>;
}