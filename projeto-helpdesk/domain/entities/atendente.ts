interface AtendenteProps {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    createdAt: Date;
    updatedAt: Date;
    senha: string;
    ticketsConcluidos: number;
    ticketsEmAndamento: number;
    ticketsCancelados: number;
    ticketsAbertos: number;
}

export class Atendente {
    private props: AtendenteProps;

    constructor(props: AtendenteProps) {
        this.props = props;
    }

    public getId(): string {
        return this.props.id;
    }

    public getNome(): string {
        return this.props.nome;
    }

    public getEmail(): string {
        return this.props.email;
    }

    public getTelefone(): string {
        return this.props.telefone;
    }

    public getCreatedAt(): Date {
        return this.props.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.props.updatedAt;
    }

    public atualizarNome(nome: string): void {
        this.props.nome = nome;
        this.props.updatedAt = new Date();
    }

    public atualizarEmail(email: string): void {
        if (!this.validarEmail(email)) {
            throw new Error("Email inválido");
        }
        this.props.email = email;
        this.props.updatedAt = new Date();
    }

    public atualizarTelefone(telefone: string): void {
        this.props.telefone = telefone;
        this.props.updatedAt = new Date();
    }

    private validarEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    public getTicketsConcluidos(): number {
        return this.props.ticketsConcluidos;
    }

    public getTicketsEmAndamento(): number {
        return this.props.ticketsEmAndamento;
    }

    public getTicketsCancelados(): number {
        return this.props.ticketsCancelados;
    }

    public getTicketsAbertos(): number {
        return this.props.ticketsAbertos;
    }

    // === MÉTODOS DE AÇÃO (COMPORTAMENTO DE DOMÍNIO RICO) ===

    public iniciarNovoAtendimento(): void {
        this.props.ticketsEmAndamento += 1;
        this.props.ticketsAbertos -= 1;
        this.props.updatedAt = new Date();
    }

    public concluirAtendimento(): void {
        if (this.props.ticketsEmAndamento <= 0) {
            throw new Error("Não há tickets em andamento para concluir.");
        }
        this.props.ticketsEmAndamento -= 1;
        this.props.ticketsConcluidos += 1;
        this.props.updatedAt = new Date();
    }

    public cancelarAtendimento(): void {
        if (this.props.ticketsEmAndamento <= 0) {
            throw new Error("Não há tickets em andamento para cancelar.");
        }
        this.props.ticketsEmAndamento -= 1;
        this.props.ticketsCancelados += 1;
        this.props.updatedAt = new Date();
    }

    public reverterAtendimento(): void {
        if (this.props.ticketsEmAndamento <= 0) {
            throw new Error("Não há tickets em andamento para reverter.");
        }
        this.props.ticketsEmAndamento -= 1;
        this.props.ticketsAbertos += 1;
        this.props.updatedAt = new Date();
    }

    // === MÉTODO EXTRATOR ===
    public toJson(): Readonly<AtendenteProps> {
        return { ...this.props };
    }
}

export type { AtendenteProps };