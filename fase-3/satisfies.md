---
fase: 3
tema: "Operador satisfies"
dificuldade: iniciante
domínio: 70
tags: [satisfies, inference, safety, flashcards]
revisado: 2026-03-31
---
# O Operador `satisfies` (TypeScript 4.9+)

Para fechar a Fase 3 com chave de ouro, precisamos falar sobre um dos operadores mais amados adicionados recentemente ao TypeScript: `satisfies`.

## O Problema que ele resolve

Imagine que temos um objeto de configurações de cores e um tipo que define as chaves possíveis:

```typescript
type CoresPermitidas = "primaria" | "secundaria" | "erro";
type ValoresCores = string | [number, number, number]; // RGB

// Objeto de tipagem solta:
const tema = {
    primaria: "blue",
    secundaria: [0, 255, 0],
    erro: "red"
};
```

Nesse cenário, o TS infere os tipos extamente como criamos. O problema começa se quisermos **garantir** que o objeto `tema` siga uma interface rígida (como `Record<CoresPermitidas, ValoresCores>`).

**Anotação clássica:**
```typescript
const tema: Record<CoresPermitidas, ValoresCores> = {
    primaria: "blue",
    secundaria: [0, 255, 0],
    erro: "red"
};

// ❌ ERRO AO USAR!
// O problema de ANOTAR o tipo é que a inferência do objeto se LARGOU.
// O TS "esqueceu" que primaria era uma string, agora pra ele é (string | [number, number, number])
tema.primaria.toUpperCase(); // Property 'toUpperCase' does not exist on type 'string | [number, number, number]'.
```

**Type Assertion (Gambiarra com 'as'):**
```typescript
const tema2 = {
    primaria: "blue",
    secundaria: [0, 255, 0],
    terciaria: "roxo" // ERRO SILENCIOSO! Inventei uma chave e o 'as' ignorou.
} as Record<CoresPermitidas, ValoresCores>;
```
O `as` é bruto! Ele joga fora as checagens normais de "chaves erradas" e só enfia o tipo goela abaixo.

---

## A Solução: `satisfies`

O operador `satisfies` foi criado para dizer:
*"TypeScript, valide se esse objeto cumpre este contrato. MAS, mantenha a inferência original exata intacta!"*

```typescript
const temaPerfeito = {
    primaria: "blue",
    secundaria: [0, 255, 0],
    erro: "red"
} satisfies Record<CoresPermitidas, ValoresCores>;

// 🎉 MÁGICA 1: Autocomplete e Narrowing Invicto!
temaPerfeito.primaria.toUpperCase(); // ✅ TS sabe que primaria é 'string'!
temaPerfeito.secundaria[0]; // ✅ TS sabe que secundaria é Tupla Numérica!

// 🎉 MÁGICA 2: Tipagem valente!
const temaRuim = {
    primaria: "blue",
    erro: "red",
    inexistente: "amarelo" // ❌ ERRO! O satisfies checou e bloqueou chave que não existe no Record!
                            // ❌ ERRO! Falta 'secundaria'
} satisfies Record<CoresPermitidas, ValoresCores>;
```

### Resumo: `as` vs `:` vs `satisfies`

| Operador | Valida erros extras? | Altera o tipo original inferido? | O que significa? |
|----------|----------------------|----------------------------------|------------------|
| `as` | ❌ Não (ignora tudo) | ✅ Sim (sobrescreve o tipo) | *"Confia em mim, force isso"* |
| `: Tipo` | ✅ Sim | ✅ Sim (sobrescreve pro genérico) | *"Esse objeto passa a ser SÓ isso"* |
| `satisfies`| ✅ Sim | ❌ Não (mantém a riqueza íntima) | *"Cheque se ele serve nisso, e só!"* |

Sempre que puder, e quiser que o TypeScript extraia as "keys" originais do seu Objeto Literal **para uso posterior**, trave esse objeto original com um `satisfies` de um contrato!

---
## Flashcards
Qual o principal benefício do operador `satisfies`? :: Ele valida se um objeto segue um tipo sem mudar a inferência específica (preservando literal types, por exemplo).
Diferença entre `as` e `satisfies`? :: `as` força o tipo (casting), podendo esconder erros; `satisfies` valida o tipo mas mantém a inferência original mais precisa.
Quando usar `satisfies` em configurações? :: Quando você quer que o TS valide se os campos obrigatórios existem, mas quer manter o autocomplete específico para os valores de cada chave.

## Conexões
- Complementa: [[narrowing-completo|Narrowing]] e [[predicates-asserts|Type Predicates]]
- Útil em fixtures de teste: [[6-typescript-testes|TypeScript com Testes]] (Fase 11)
- Combinado com `as const`: [[5-typescript-react|TypeScript com React]] (Fase 11)
- Record validado: [[resumo-fase2|Tipos Compostos]] (Fase 2)
