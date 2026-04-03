---
fase: 10
tema: "Performance do Type Checker"
dificuldade: avançado
domínio: 70
tags: [performance, compiler, traces, diagnostic, flashcards]
revisado: 2026-03-31
---
# Performance do Type Checker

O compilador do TypeScript não é mágico. Ele é um programa que roda na sua máquina e precisa avaliar **cada tipo, cada generic, cada conditional** que você escreveu. Quando o projeto cresce ou os tipos ficam absurdamente complexos, o compilador pode travar, engasgar e deixar sua IDE lenta.

## Tipos que Destroem a Performance

### 1. Recursão Profunda Demais
Lembra do `DeepPartial<T>` da Fase 6? Se a sua interface tiver 15 níveis de profundidade com arrays aninhados, o compilador vai descer em cada galho, explodir em centenas de instanciações e pode estourar o limite interno.

```typescript
// ⚠️ Perigoso em objetos muito profundos:
type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
// Se T tiver 20 níveis, o TS instancia DeepReadonly 20 vezes em cascata!
```

### 2. Unions Gigantes Distribuídas
Quando um Conditional Type recebe uma Union com centenas de membros, a distributividade faz o compilador avaliar o condicional **uma vez pra cada membro**:

```typescript
type GigaUnion = "a" | "b" | "c" | /* ... 500 membros ... */ | "zzz";
type Resultado = GigaUnion extends string ? true : false; 
// O TS avalia 500 vezes internamente!
```

### 3. Mapeamentos Cruzados com Template Literals
Combinar duas unions grandes em Template Literals gera uma **multiplicação cartesiana**:
```typescript
type A = "get" | "set" | "delete" | "update"; // 4
type B = "User" | "Post" | "Comment" | "Tag" | "Category"; // 5
type Rotas = `${A}${B}`; // 4 × 5 = 20 tipos gerados (ok)
// Mas se A tiver 50 e B tiver 50... são 2.500 tipos gerados de uma vez!
```

## Diagnosticando Gargalos com `--generateTrace`

O TypeScript tem uma ferramenta secreta de profiling:

```bash
npx tsc --generateTrace ./trace-output
```

Isso gera arquivos JSON na pasta `trace-output/` que você pode abrir no **Chrome DevTools** (aba Performance → Load Profile). Lá você vê exatamente qual tipo está demorando mais para ser resolvido, qual arquivo está pesado e onde o compilador gasta mais tempo.

## Dicas Práticas de Otimização
- Prefira **interfaces** sobre `type` para objetos (interfaces são cacheadas internamente pelo compilador).
- Evite tipos recursivos com mais de 5-6 níveis.
- Use `incremental: true` no tsconfig pra cachear builds anteriores.
- Quebre monorepos gigantes com `composite: true` e Project References.

---
## Flashcards
O que causa lentidão no Type Checker do TS? :: Tipos recursivos muito profundos, excesso de união de tipos e computações complexas de Conditional Types.
Como gerar um relatório de performance do compilador? :: Usando a flag `--generateTrace <diretorio>` ao rodar o comando `tsc`.
Dica para melhorar a performance de tipos? :: Preferir Interfaces em vez de Intersecções (`&`) sempre que possível, pois Interfaces de classes são cacheadas mais eficientemente.

## Conexões
- Recursão perigosa: [[4-recursive-types|Tipos Recursivos]] (Fase 6)
- Unions gigantes: [[5-conditional-distributivo|Distributividade]] (Fase 6)
- Template Literals: [[3-template-literal|Multiplicação Cartesiana]] (Fase 6)
- Config `incremental`: [[6-tsconfig|tsconfig Profundo]] (Fase 8)
