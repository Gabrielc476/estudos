---
fase: 10
tema: "@ts-expect-error vs @ts-ignore"
dificuldade: avançado
domínio: 70
tags: [directives, error-handling, best-practices, flashcards]
revisado: 2026-03-31
---
# `@ts-expect-error` vs `@ts-ignore`

Às vezes você **sabe** que o TypeScript vai reclamar de uma linha, e você quer silenciá-lo de propósito. Existem duas formas de fazer isso, mas elas têm comportamentos brutalmente diferentes.

## `// @ts-ignore` (O Cala-Boca Cego)

Silencia **qualquer** erro na linha seguinte. Não importa qual seja. E o pior: se no futuro o erro desaparecer (porque você corrigiu o código ou atualizou uma lib), o `@ts-ignore` fica lá abandonado sem fazer nada — e ninguém te avisa.

```typescript
// @ts-ignore
const x: number = "texto"; // Silenciado. Nenhum erro aparece.

// Mas se depois você corrigir:
// @ts-ignore
const y: number = 42; // Não tem mais erro... mas o @ts-ignore ficou zumbificado ali pra sempre!
```

## `// @ts-expect-error` (O Silenciador Inteligente)

Funciona igual ao `@ts-ignore`, MAS com uma regra extra genial: **Se a linha seguinte NÃO tiver erro nenhum, o próprio `@ts-expect-error` vira um erro!**

```typescript
// @ts-expect-error - Testando que isso é proibido
const x: number = "texto"; // ✅ Tinha erro, foi silenciado.

// Mas se o erro sumir:
// @ts-expect-error - Testando que isso é proibido
const y: number = 42; // ❌ ERRO: "Unused '@ts-expect-error' directive."
```

## Qual usar? Sempre `@ts-expect-error`.

| Característica | `@ts-ignore` | `@ts-expect-error` |
|---|---|---|
| Silencia erros | ✅ | ✅ |
| Avisa se o erro sumiu | ❌ | ✅ |
| Ideal para testes | ❌ | ✅ |
| Risco de código morto | Alto | Zero |

**Regra de ouro**: Use `@ts-expect-error` quando você precisa intencionalmente testar que algo dá erro (type testing) ou quando lida com limitações temporárias do TS. Reserve `@ts-ignore` apenas para bibliotecas absolutamente quebradas onde não há alternativa.

Sempre adicione um comentário explicando **por que** o erro está sendo suprimido:
```typescript
// @ts-expect-error - A lib X não exporta esse tipo corretamente, PR aberto: github.com/x/123
import { bugado } from "lib-x";
```

---
## Flashcards
Diferença crucial entre `@ts-ignore` e `@ts-expect-error`? :: `@ts-ignore` silencia qualquer erro para sempre; `@ts-expect-error` silencia agora, mas reclama se o erro deixar de existir no futuro.
Qual é considerado Best Practice? :: `@ts-expect-error`, pois garante que você não esqueceu um comentário de supressão após o código ser corrigido.
Quando usar `@ts-expect-error`? :: Ao escrever testes de tipo ou ao lidar com migrações onde você sabe que uma linha está quebrada temporariamente.

## Conexões
- Usado em: [[5-type-testing|Type Testing]]
- Erros de tipo: [[2-erros-legiveis|Erros Legíveis]]
- Testes: [[6-typescript-testes|TypeScript com Testes]] (Fase 11)
