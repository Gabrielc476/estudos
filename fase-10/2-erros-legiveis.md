---
fase: 10
tema: "Erros de Tipo Legíveis"
dificuldade: avançado
domínio: 70
tags: [errors, debugging, readability, complex-types, flashcards]
revisado: 2026-03-31
---
# Erros de Tipo Legíveis

Conforme você avança no TypeScript, as mensagens de erro deixam de ser simples `Type 'string' is not assignable to type 'number'` e viram monstros de 15 linhas com generics aninhados, conditional types e utility types empilhados.

## Anatomia de um Erro Complexo

```
Type 'string' is not assignable to type 'Extract<keyof T, string> extends infer K 
  ? K extends keyof T 
    ? T[K] extends (...args: any[]) => infer R 
      ? R 
      : never 
    : never 
  : never'.
```

**Como ler isso sem surtar:**

### 1. Leia de Baixo pra Cima
O TS empilha os erros como uma pilha de chamadas. A última linha geralmente é a mais específica (onde o erro realmente mora). As linhas de cima são o "caminho" que o compilador percorreu até chegar ali.

### 2. Isole o Tipo Problemático
Copie o tipo gigante, cole num arquivo separado e vá substituindo os generics por tipos concretos até achar onde quebra:

```typescript
// O tipo monstro:
type Monstro<T> = T extends Promise<infer U> ? U extends Array<infer V> ? V : never : never;

// Teste com tipos concretos:
type Teste1 = Monstro<Promise<string[]>>;  // string ✅
type Teste2 = Monstro<Promise<number>>;    // never (number não é array!)
type Teste3 = Monstro<string>;             // never (string não é Promise!)
```

### 3. Use o Hover da IDE como Depurador
Passe o mouse sobre cada `type` alias intermediário. O VSCode te mostra o tipo resolvido. Isso é o seu `console.log` do mundo dos tipos.

### 4. Quebre Tipos Grandes em Aliases Menores
Em vez de empilhar tudo em uma única linha:
```typescript
// ❌ Ilegível:
type X<T> = T extends Promise<infer U> ? U extends Array<infer V> ? { items: V[] } : never : never;

// ✅ Quebrado e nomeado:
type DesembrulhaPromise<T> = T extends Promise<infer U> ? U : never;
type DesembrulhaArray<T> = T extends Array<infer V> ? V : never;
type X<T> = DesembrulhaPromise<T> extends infer Meio 
    ? Meio extends any[] 
        ? { items: DesembrulhaArray<Meio>[] } 
        : never 
    : never;
```

Nomear tipos intermediários é o equivalente a criar variáveis auxiliares no JS. Facilita a leitura e o debug.

---
## Flashcards
Técnica para ler erros complexos do TS? :: "Trabalhar de fora para dentro", identificando primeiro a propriedade que falhou e depois mergulhando nos generics.
O que o VSCode faz para ajudar em erros gigantes? :: Ele tenta abreviar tipos muito longos, mas você pode usar o comando "Show Type Definition" para ver a estrutura completa.
Como criar suas próprias mensagens de erro amigáveis? :: Usando Conditional Types que retornam Strings Literais em vez de `never`, descrevendo o erro para o usuário.

## Conexões
- Erros de Conditional Types: [[4-conditional-defaults|Condicionais]] (Fase 5)
- Erros de infer: [[5-infer-keyword|Keyword infer]] (Fase 5)
- Quebrar tipos complexos: [[6-utility-types-nativos|Utility Types]] (Fase 6)
- Suprimir erros: [[3-ts-expect-error|@ts-expect-error]]
