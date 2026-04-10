---
fase: 9
tema: "Exhaustive Pattern Matching"
dificuldade: avançado
domínio: 70
tags: [never, exhaustiveness, switch, patterns, flashcards]
revisado: 2026-03-31
---
# Exhaustive Pattern Matching

Você domina o TypeScript pra valer quando você blinda toda e qualquer fenda do compilador no Switch Case de uma União em que as variáveis de produção venham a mudar nas mãos do Programador do Futuro e quebrar seu front sem querer.
Chamamos isso de checagem puramente Extenuante (Exaustiva) lançando a carta-armadilha `never`, que vimos no começo do módulo!

```typescript
type TipoCobranca = "PIX" | "Boleto" | "Cartão";

function criarPagamento(method: TipoCobranca) {
    switch (method) {
        case "PIX":
             return gerarQRCode();
        case "Boleto":
             return enviarPDF();
        case "Cartão":
             return logarRedeCielo();
        default:
             // 🛡️ A ARMADILHA EXAUSTIVA:
             // Se cair aqui, force à variavel (Que restou sendo nada - never) ser validamente do tipo void. 
             const verficacaoRestante: never = method;
             throw new Error(`O Dev burro Esqueceu de fazer a aba no switch case: ${method}`);
    }
}

// Magia Branca: No futuro um Junior mexendo no seu código lá topo adiciona ' | "Crypto" ' no 'TipoCobranca'.
// Instantaneamente da raiz ele quebra o 'switch' laudo jogando esse trecho Default em chamas (Red Error) antes de subir em produção alertando o garoto:
// ❌ "Error: Tipo Crypto is not assignable to type 'never'".  O dev é forçado com faca no pescoço a ir lá e criar a implementação do if switch dela antes de ir fumar!
```

---
## Flashcards
Como garantir que todos os casos de uma Union foram tratados no `switch`? :: Atribuindo o valor do bloco `default` a uma variável do tipo `never`.
O que acontece se um novo tipo for adicionado à Union e o switch não for atualizado? :: O TypeScript gerará um erro de compilação no bloco de segurança `never`, avisando que o novo tipo "vazou".
Por que o Exhaustive Matching é importante em grandes projetos? :: Porque ele blinda o código contra refatorações futuras, forçando o desenvolvedor a tratar novos estados em todos os lugares necessários.

## Conexões
- Usa `never`: [[resumo-fase1|Tipo never]] (Fase 1)
- Discriminated Unions: [[discriminated-unions|Discriminated Unions]] (Fase 3)
- State Machines: [[7-state-machines|Type-Safe State Machines]]
- Switch seguro: Padrão de produção essencial
