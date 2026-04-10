import { Router } from "express";

// Importação dos Nossos Controladores (Os "Gerentes" da API)
import { CreateClienteController } from "./infra/controllers/createClienteController";
import { CreateAtendenteController } from "./infra/controllers/createAtendenteController";
import { CreateTicketController } from "./infra/controllers/createTicketController";
import { AtenderTicketController } from "./infra/controllers/atenderTicketController";
import { FecharTicketController } from "./infra/controllers/fecharTicketController";
import { ReverterTicketController } from "./infra/controllers/reverterTicketController";
import { GerarRelatorioController } from "./infra/controllers/gerarRelatorioController";

export const routes = Router();

// Instanciamento Automático 
const createClienteController = new CreateClienteController();
const createAtendenteController = new CreateAtendenteController();
const createTicketController = new CreateTicketController();
const atenderTicketController = new AtenderTicketController();
const fecharTicketController = new FecharTicketController();
const reverterTicketController = new ReverterTicketController();
const gerarRelatorioController = new GerarRelatorioController();

// =======================================================
// MAPA OFICIAL DA API (ENDPOINTS)
// =======================================================

// Atores do Sistema
routes.post("/clientes", createClienteController.handle);
routes.post("/atendentes", createAtendenteController.handle);

// Ciclo de Vida do Chamado (O coração do Desafio File / Pilha)
routes.post("/tickets", createTicketController.handle); // Abre chamado -> Vai pra Fila!
routes.post("/tickets/process", atenderTicketController.handle); // Atendente retira o ticket mágico 1 da fila!
routes.post("/tickets/:ticketId/close", fecharTicketController.handle); // Encerra contato com Cliente
routes.post("/tickets/undo", reverterTicketController.handle); // Ops, usei a pilha (LIFO) para devolver!

// Admin e Dashboard
routes.get("/reports", gerarRelatorioController.handle); // Dispara a função do Quicksort (O(N log N)) 
