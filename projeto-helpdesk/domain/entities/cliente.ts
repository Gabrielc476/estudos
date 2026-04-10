interface ClienteProps {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    createdAt: Date;
    updatedAt: Date;
    senha: string;
}

export class Cliente {
    private props: ClienteProps;


    constructor(props: ClienteProps) {
        if (!this.validarEmailStatic(props.email)) {
            throw new Error("Não é possível criar cliente: Email inválido.");
        }
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
        if (!this.validarEmailStatic(email)) {
            throw new Error("Email inválido");
        }
        this.props.email = email;
        this.props.updatedAt = new Date();
    }

    public atualizarTelefone(telefone: string): void {
        this.props.telefone = telefone;
        this.props.updatedAt = new Date();
    }

    private validarEmailStatic(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    public toJson(): Readonly<ClienteProps> {
        return { ...this.props };
    }
}


export type { ClienteProps };

