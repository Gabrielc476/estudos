---
fase: 4
tema: "Tipagem de Funções"
dificuldade: intermediário
domínio: 70
tags: [functions, types, arrow-functions, callbacks, flashcards]
revisado: 2026-03-31
---
# Tipagem de Funções

Existem 3 formas principais de declarar o "formato lógico" de uma função (seu Type).

```typescript
// 1. Usando Type Alias clássico (Sintaxe de Flecha OBRIGATÓRIA):
type MatFuncao = (a: number, b: number) => number;

// 2. Usando Interface Genérica (Sintaxe de Callable):
interface Mapeador {
    (valor: string): boolean;
}

// 3. Tipando a função direto na declaração (In-line):
function executar(fn: (x: number) => void) {
    fn(10);
}
```

Usar `type` com a sintaxe de Arrow (`=>`) é definitivamente a maneira mais legível na maioria dos casos do dia a dia.

---

## O terror do Tipo `Function` (com F maiúsculo)

Jamais anote um parâmetro genérico com `Function`. Isso destrói o propósito da tipagem forte e devolve sua função para o mundo sombrio e solto do Any.

```typescript
// ❌ RUIM: Aceita literalmente qualquer função que exista na terra, com zeros a um zilhão de parametros, retornando qualquer lixo.
function rodarLimpo(fn: Function) {
    fn(); // Pode explodir runtime dependendo do que passaram
}

// ✅ BOM: Use uma assinatura de Any Arrow para representar "qualquer função callável".
function rodarSeguro(fn: (...args: any[]) => any) {
    fn();
}
```

---
## Flashcards
Como tipar uma Arrow Function de forma completa? :: Usando a sintaxe `(params) => returnType` ou definindo um tipo separado para a assinatura.
Diferença entre tipar o retorno como `void` ou `never`? :: `void` significa que a função retorna nada (ou undefined); `never` significa que a função nunca termina ou sempre lança um erro.
O que é um "Callback Type"? :: É a definição do formato de uma função que será passada como argumento para outra função.

## Conexões
- Evolução: [[overloads|Function Overloads]]
- Generics: [[generics-em-funcoes|Generics em Funções]]
- Callbacks tipados: [[5-typescript-react|Eventos React]] (Fase 11)
- Utility `Parameters` e `ReturnType`: [[6-utility-types-nativos|Utility Types]] (Fase 6)
