import { Atendente } from "../entities/atendente";

export interface IAtendenteRepository {
    create(atendente: Atendente): Promise<void>;
    update(atendente: Atendente): Promise<void>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Atendente | null>;
    findAll(): Promise<Atendente[]>;
    findByEmail(email: string): Promise<Atendente | null>;
}