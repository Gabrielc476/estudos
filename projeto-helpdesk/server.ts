import "dotenv/config"; // Carrega as variáveis do .env logo na largada
import "express-async-errors"; // Pega os erros de funções async para não quebrar o server
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

// O roteador Oficial (Nosso mapa de endereços)
import { routes } from "./routes"; 

const app = express();

// Middlewares essenciais
app.use(cors()); // Libera o tráfego para frontends chamarem
app.use(express.json()); // Permite ler o corpo das requisições em formato JSON

// Injetando as rotas oficiais
app.use(routes);

// Rota de Teste para o seu browser
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Servidor Helpdesk operando perfeitamente!" });
});

// Middleware Global de Tratamento de Erros da Clean Architecture
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // Se o erro for algo esperado da nossa própria regra de negócio (ex: "Ticket já está em andamento.")
    if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
    }

    // Se for um bug bizarro que não previmos
    console.error(err);
    return res.status(500).json({ status: "error", message: "Erro Interno do Servidor" });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`🚀 Servidor voando na porta ${PORT}`);
    console.log(`📡 Acesse: http://localhost:${PORT}`);
});
