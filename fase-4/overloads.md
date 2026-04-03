---
fase: 4
tema: "Function Overloads"
dificuldade: intermediário
domínio: 70
tags: [overloads, polymorphism, signatures, flashcards]
revisado: 2026-03-31
---
# Function Overloads (Sobrecarga)

Sabe quando uma função no JavaScript faz 2 coisas completamente diferentes baseadas no número ou tipo de parâmetros que ela recebe?

O Type System não sabe ler a "mágica" dentro do seu bloco JS, então você precisa **Listar formalmente as Assinaturas de Sobrecarga (Overloads)** primeiro, e deixar a implementação de fato (Implementation Signature) em último, que deve abraçar TODAS as possibilidades das chamas acima dela.

## Ocultando a implementação do usuário

```typescript
// Assinatura 1: Se mandar só id (number), retorna Usuário
function buscarData(id: number): string;
// Assinatura 2: Se mandar d, m, a, constrói a data e retorna Date
function buscarData(dia: number, mes: number, ano: number): Date;

// Implementação (escondida do intelisense pro usuário externo!):
// Aqui precisamos usar tipos mais "soltos" (opcionais/unions) pra abraçar as assinaturas acima
function buscarData(a: number, b?: number, c?: number): string | Date {
    if (b !== undefined && c !== undefined) {
        // Lógica de Date (Assinatura 2)
        return new Date(c, b - 1, a);
    }
    // Lógica de Busca (Assinatura 1)
    return `Usuário de ID: ${a}`;
}

// Quando o programador for consumir:
const str = buscarData(150000000);   // ✅ Cai na assinatura 1 (inferido string)
const obj = buscarData(10, 5, 2024); // ✅ Cai na assinatura 2 (inferido Date)
const erro = buscarData(10, 5);       // ❌ Erro! Não existe assinatura pra 2 parâmetros.
```

> **Atenção**: O TypeScript **apaga** a vista implementação principal `(a, b?, c?)` dos olhos de quem quer usar. Ele só mostra as duas assinaturas "puras" e restritas que nós configuramos lá no topo.

---
## Flashcards
O que são Function Overloads? :: São múltiplas assinaturas de tipo para uma mesma função, permitindo que ela aceite diferentes combinações de parâmetros.
Onde deve ficar a implementação real de uma função com sobrecarga? :: Logo após todas as assinaturas de sobrecarga, em um bloco único que deve ser compatível com todas elas.
O usuário da função enxerga a assinatura da implementação? :: Não, o usuário só consegue ver e usar as assinaturas definidas nos overloads.

## Conexões
- Pré-requisito: [[tipagem-de-funcoes|Tipagem de Funções]]
- Evolução: [[5-overloads-condicionais|Overloads Condicionais com Generics]] (Fase 9)
- Alternativa: Conditional Types em [[4-conditional-defaults|Conditional Defaults]] (Fase 5)
