import { Request, Response } from "express";
import { CreateClienteUseCase } from "../../application/createClienteUseCase";
import { ClientePrismaRepository } from "../db/clientePrismaRepository";

export class CreateClienteController {
    
    // Todo Controller por padrão usa a dupla "Request" e "Response" do Express
    async handle(request: Request, response: Response): Promise<Response> {
        
        // 1. O Controller atua como o "Porteiro da Web". Ele coleta o JSON bagunçado da internet.
        const { nome, email, telefone, senha } = request.body;

        // 2. Injeção de Dependências Manual (Injetamos o Repositório no UseCase)
        // (Em projetos de grande porte usaríamos um injetor automático como InversifyJS / Tsyringe)
        const clienteRepository = new ClientePrismaRepository();
        const createClienteUseCase = new CreateClienteUseCase(clienteRepository);

        // 3. Orquestração Oficial (onde a mágica e os tratamentos pesados rolam)
        const clienteCriado = await createClienteUseCase.execute({
            nome,
            email,
            telefone,
            senha // Se o json vier sem senha, o UseCase vai auto preencher por causa da nossa regrinha lá!
        });

        // 4. Retorno HTTP Puro
        // Usamos status 201 (CREATED) porque a finalidade primária desta rota é inserção
        // O .toJson() remove a "casca" da Entidade Typescript e transforma de volta pro JSON padrão pro Navegador entender
        return response.status(201).json(clienteCriado.toJson());
    }
}
