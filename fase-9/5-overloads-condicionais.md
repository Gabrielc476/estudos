---
fase: 9
tema: "Overloads Condicionais"
dificuldade: avançado
domínio: 70
tags: [overloads, conditional-types, generics, functions, flashcards]
revisado: 2026-03-31
---
# Overloads Condicionais (Conditional Overloads)

Na Fase 4 você aprendeu Function Overloads básicos (múltiplas assinaturas pra uma única implementação). Agora a gente combina Overloads com **Generics e Conditional Types** para criar retornos que mudam dinamicamente baseado no tipo da entrada.

## O Problema: Retornos que dependem do Input

Imagine uma função `buscar()` que recebe um formato (`"json"` ou `"text"`) e deve retornar tipos completamente diferentes dependendo do que foi pedido:

```typescript
// SEM Overloads Condicionais (Resultado genérico e inútil):
function buscar(formato: "json" | "text"): object | string {
    // O dev que chamar vai receber 'object | string' e não sabe qual é qual!
    return formato === "json" ? { data: 123 } : "texto cru";
}
const resultado = buscar("json"); // tipo: object | string 😞 Inútil!
```

## A Solução: Overloads + Generics + Condicionais

```typescript
// Overload 1: Se pedir JSON, devolve objeto
function buscar(formato: "json"): Record<string, unknown>;
// Overload 2: Se pedir texto, devolve string
function buscar(formato: "text"): string;

// Implementação real (escondida do autocomplete do dev!)
function buscar(formato: "json" | "text"): Record<string, unknown> | string {
    if (formato === "json") return { data: 123 };
    return "texto cru";
}

const obj = buscar("json");  // tipo: Record<string, unknown> ✅ Exato!
const txt = buscar("text");  // tipo: string ✅ Exato!
```

## Versão Alternativa: Conditional Type Puro (Sem Overloads)

Às vezes dá pra resolver tudo num Generic + Conditional Type sem precisar escrever overloads:

```typescript
type ResultadoBusca<T extends "json" | "text"> = 
    T extends "json" ? Record<string, unknown> : string;

function buscarV2<T extends "json" | "text">(formato: T): ResultadoBusca<T> {
    if (formato === "json") return { data: 123 } as ResultadoBusca<T>;
    return "texto cru" as ResultadoBusca<T>;
}

const a = buscarV2("json");  // Record<string, unknown>
const b = buscarV2("text");  // string
```

**Quando usar cada abordagem?**
- **Overloads**: Quando as assinaturas são poucas e claramente distintas. Melhor legibilidade.
- **Conditional Type**: Quando as combinações são muitas ou o tipo de retorno segue uma lógica "calculável" a partir do input. Mais escalável.

---
## Flashcards
O que são Overloads Condicionais? :: É a combinação de múltiplas assinaturas de função com Conditional Types para derivar retornos dinâmicos baseados na entrada.
Vantagem sobre overloads simples? :: Permitem lidar com mapeamentos de tipos complexos que dependem de transformações profundas dos generics passados.
Como o TS escolhe o overload em tempo de compilação? :: O TS tenta encaixar os argumentos nas assinaturas de cima para baixo; a primeira que for compatível será a escolhida.

## Conexões
- Pré-requisito: [[overloads|Function Overloads]] (Fase 4)
- Conditional Types: [[4-conditional-defaults|Conditional Defaults]] (Fase 5)
- Distributividade: [[5-conditional-distributivo|Conditional Distributivo]] (Fase 6)
- Alternativa a overloads múltiplos
