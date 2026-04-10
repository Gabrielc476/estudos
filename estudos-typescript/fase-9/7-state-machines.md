---
fase: 9
tema: "Type-Safe State Machines"
dificuldade: avançado
domínio: 70
tags: [state-machines, patterns, flow-control, logic, flashcards]
revisado: 2026-03-31
---
# Type-Safe State Machines

Uma Máquina de Estados é um modelo onde um sistema só pode estar em **um estado por vez**, e as transições entre estados são **regras fixas controladas**. Exemplo clássico: um Pedido de e-commerce passa por `Criado → Pago → Enviado → Entregue`, e NUNCA pode pular de `Criado` direto pra `Entregue`.

No JavaScript puro, nada te impede de fazer `pedido.status = "Entregue"` a qualquer momento. O TypeScript pode travar isso **em tempo de compilação** usando Discriminated Unions e funções que só aceitam estados válidos como entrada.

## Modelando os Estados com Discriminated Unions

```typescript
type PedidoCriado   = { status: "criado";   itens: string[] };
type PedidoPago     = { status: "pago";     itens: string[]; recibo: string };
type PedidoEnviado  = { status: "enviado";  itens: string[]; recibo: string; rastreio: string };
type PedidoEntregue = { status: "entregue"; itens: string[]; recibo: string; rastreio: string };

type Pedido = PedidoCriado | PedidoPago | PedidoEnviado | PedidoEntregue;
```

## Transições como Funções Tipadas

Cada função de transição **aceita APENAS o estado anterior válido** e **retorna APENAS o próximo estado**:

```typescript
function pagarPedido(pedido: PedidoCriado, recibo: string): PedidoPago {
    return { ...pedido, status: "pago", recibo };
}

function enviarPedido(pedido: PedidoPago, rastreio: string): PedidoEnviado {
    return { ...pedido, status: "enviado", rastreio };
}

function entregarPedido(pedido: PedidoEnviado): PedidoEntregue {
    return { ...pedido, status: "entregue" };
}

// FLUXO VÁLIDO:
const novo: PedidoCriado = { status: "criado", itens: ["Teclado", "Mouse"] };
const pago = pagarPedido(novo, "REC-001");
const enviado = enviarPedido(pago, "BR123456789");
const entregue = entregarPedido(enviado);

// FLUXO INVÁLIDO (TS GRITA):
// entregarPedido(novo);  // ❌ Não pode entregar um pedido que nem foi pago!
// enviarPedido(novo, "X"); // ❌ Não pode enviar sem pagar!
```

## Por que isso é poderoso?

1. **Impossível pular etapas**: O compilador te obriga a seguir a sequência.
2. **Dados progressivos**: Cada estado carrega apenas os dados que fazem sentido naquele momento (o `rastreio` só existe depois do envio).
3. **Refactoring seguro**: Se você adicionar um novo estado (ex: `"cancelado"`), o `never` no exhaustive switch vai te forçar a tratar ele em todo lugar.

Este padrão é a espinha dorsal de sistemas de pagamento, workflows de aprovação, pipelines de CI/CD e qualquer domínio onde a ordem das operações importa.

---
## Flashcards
O que é uma Type-Safe State Machine? :: É um modelo onde os estados e transições de um sistema são regidos estritamente pelo sistema de tipos, impedindo transições ilegais.
Como representar estados de forma segura? :: Usando Discriminated Unions para cada estado possível, garantindo que as propriedades específicas só existam no estado correto.
Melhor forma de gerenciar ações em máquinas de estado? :: Criando um mapeamento onde cada Estado só aceita uma determinada União de Ações válidas para aquele momento.

## Conexões
- Discriminated Unions: [[discriminated-unions|Discriminated Unions]] (Fase 3)
- Exhaustive checking: [[4-exhaustive-matching|Exhaustive Matching]]
- Builder Pattern: [[2-builder-pattern|Builder Pattern com Types]]
- Phantom Types: [[3-phantom-types|Tipagem Fantasma]]
