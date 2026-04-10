const STATUS = {
    OPEN: "OPEN",
    CLOSED: "CLOSED",
    IN_PROGRESS: "IN_PROGRESS",
} as const;

type TicketStatus = (typeof STATUS)[keyof typeof STATUS];

interface TicketProps {
    id: string;
    title: string;
    description: string;
    status: TicketStatus;
    atendenteId: string | null;
    clienteId: string;
    dataAbertura: Date;
    dataFechamento?: Date | null;
    tempoDeResposta?: number | null;
    createdAt: Date;
    updatedAt: Date;
}

export class Ticket {
    private props: TicketProps;

    constructor(props: TicketProps) {
        this.props = props;
    }

    public getId(): string {
        return this.props.id;
    }

    public getTitle(): string {
        return this.props.title;
    }

    public getDescription(): string {
        return this.props.description;
    }

    public getStatus(): TicketStatus {
        return this.props.status;
    }

    public getCreatedAt(): Date {
        return this.props.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.props.updatedAt;
    }

    public atualizarStatus(status: TicketStatus): void {
        this.props.status = status;
        this.props.updatedAt = new Date();
    }

    public getAtendenteId(): string | null {
        return this.props.atendenteId;
    }

    public getClienteId(): string {
        return this.props.clienteId;
    }

    public iniciarTicket(atendenteId: string): void {
        if (this.props.status === STATUS.IN_PROGRESS) {
            throw new Error("Ticket já está em andamento.");
        }
        this.props.atendenteId = atendenteId;
        this.props.status = STATUS.IN_PROGRESS;
        this.props.updatedAt = new Date();
        this.props.dataAbertura = new Date();
    }

    public concluirTicket(): void {
        if (this.props.status === STATUS.CLOSED) {
            throw new Error("Ticket já está fechado.");
        }
        this.props.status = STATUS.CLOSED;
        this.props.updatedAt = new Date();
        this.props.dataFechamento = new Date();

        // Auto-calcula o tempo de resposta protegendo a regra de negócio!
        this.calcularTempoDeResposta();
    }

    private calcularTempoDeResposta(): void {
        if (this.props.dataAbertura && this.props.dataFechamento) {
            this.props.tempoDeResposta = this.props.dataFechamento.getTime() - this.props.dataAbertura.getTime();
        }
    }

    public getTempoDeResposta(): number | null | undefined {
        return this.props.tempoDeResposta;
    }

    public toJson(): Readonly<TicketProps> {
        return { ...this.props };
    }

    public reverterTicket(): void {
        if (this.props.status === STATUS.OPEN) {
            throw new Error("Ticket já está aberto.");
        }
        this.props.status = STATUS.OPEN;
        this.props.atendenteId = null; // Tira das costas do atendente
        this.props.updatedAt = new Date();
    }


}


export type { TicketProps, TicketStatus };