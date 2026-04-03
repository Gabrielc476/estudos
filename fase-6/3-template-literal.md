---
fase: 6
tema: "Template Literal Types"
dificuldade: intermediário
domínio: 70
tags: [template-literals, strings, interpolation, types, flashcards]
revisado: 2026-03-31
---
# Template Literal Types

No ES6 (JavaScript puro), ganhamos as *Template Strings* usando a crase: `` `Olá ${nome}` ``.
No TypeScript 4.1, essa mesma lógica foi elevada para o **nível de Tipos**. Você pode criar uniões massivas de strings baseadas em padrões sem precisar escrevê-las na mão.

Pense nisso como um **Sistema de Prefixos e Sufixos gerados automaticamente para itens e magias**. 

## Criando Uniões Estáticas de Strings

```typescript
type ElementoPoder = "Fogo" | "Gelo" | "Sombra";
type TierMagia = "Fraca" | "Forte" | "Suprema";

// Fazemos um "join" matricial mágico:
type MagiaCompleta = `Magia_${TierMagia}_De_${ElementoPoder}`;

/*
O TS matematicamente multiplica as uniões. Resultando em 9 literais exatos:
type MagiaCompleta = 
  | "Magia_Fraca_De_Fogo" | "Magia_Fraca_De_Gelo" | "Magia_Fraca_De_Sombra"
  | "Magia_Forte_De_Fogo" | "Magia_Forte_De_Gelo" | "Magia_Forte_De_Sombra"
  | "Magia_Suprema_De_Fogo" | "Magia_Suprema_De_Gelo" | "Magia_Suprema_De_Sombra"
*/

// O Autocomplete agora te obriga a usar apenas uma das 9 strings!
const minhaSkill: MagiaCompleta = "Magia_Suprema_De_Gelo"; // ✅
```

## O Casamento Supremo: Template Literals + Mapped Types (`as`)

Na lição anterior, vimos como usar `as` no iterador para renomear chaves. Agora conectamos os pontos.

Imagine que você recebe um objeto de Status e quer criar as "Setters Functions" (Funções que setam valor) automaticamente pra todas elas, adicionando o prefixo "set":

```typescript
type StatusPlayer = {
    vida: number;
    stamina: number;
    lvl: number;
};

// Vamos varrer a interface. Renomear e usar o Utilitário nativo de Strings do TS (Capitalize):
type GerarSetters<T> = {
    // Para cada chave em T, renomeie `as` set+ChaveMaiuscula.
    // O tipo do retorno é uma Function que recebe T[K] e não retorna nada.
    [K in keyof T as `set${Capitalize<string & K>}`]: (valor: T[K]) => void;
};

type InterfaceDoComponente = GerarSetters<StatusPlayer>;

/*
Resultou num SDK Front-end absurdamente seguro de Props Genéricas:
type InterfaceDoComponente = {
    setVida: (valor: number) => void;
    setStamina: (valor: number) => void;
    setLvl: (valor: number) => void;
}
*/
```

## Utilitários Nativos Embutidos

O TS traz utilitários invisíveis globais que só funcionam envoltos em Strings e Templates:
- `Uppercase<"gato">` 👉 `"GATO"`
- `Lowercase<"GATO">` 👉 `"gato"`
- `Capitalize<"gato">` 👉 `"Gato"`
- `Uncapitalize<"Gato">` 👉 `"gato"`

---
## Flashcards
O que são Template Literal Types? :: É a capacidade de criar tipos baseados em strings usando a sintaxe de crase no nível de tipos.
O que acontece ao combinar duas Uniões de Strings em um Template Literal? :: O TypeScript gera uma multiplicação cartesiana (todas as combinações possíveis entre elas).
Cite dois utilitários nativos de string do TS? :: `Capitalize<T>`, `Uppercase<T>`, `Lowercase<T>`, `Uncapitalize<T>`.

## Conexões
- Combinado com: [[2-key-remapping|Key Remapping]] para gerar getters/setters
- Performance: Unions grandes geram multiplicação cartesiana [[1-performance-type-checker|Performance]] (Fase 10)
- Capitalize/Uppercase: Utilitários de string nativos do TS
