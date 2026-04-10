---
fase: 6
tema: "Tipos Recursivos"
dificuldade: intermediário
domínio: 70
tags: [recursion, deep-partial, json, complex-structures, flashcards]
revisado: 2026-03-31
---
# Tipos Recursivos (Recursive Types)

Assim como uma função em JS pode chamar a si mesma (recursividade), no TypeScript, **um Tipo pode se referenciar estaticamente a si mesmo**.

Isso é massivamente utilizado para estruturas de dados aninhadas infinitamente:
- A Árvore do DOM (HTML) com _children_.
- Menus infinitinhos de navegação em telas.
- Retornos e DTOs de apis GraphQL hierárquicos.

## Exemplo Clássico: O Arquivo JSON Infinito

```typescript
// O valor de uma chave num JSON pode ser texto, numero, booleano, ou... outro JSON escondido infinitamente aninhado!
type JsonDinâmico = 
    | string 
    | number 
    | boolean 
    | null
    | JsonDinâmico[] // Posição Recursiva (O prório tipo vira item do Array!)
    | { [key: string]: JsonDinâmico }; // Posição Recursiva (O próprio tipo vira valor da chave dinâmica!)

// Funciona sem reclamar por níveis ilimitados:
const payload: JsonDinâmico = {
    dados: {
        lista: [
            123,
            { nome: "Gabriel" },
            [ true, null ]
        ]
    }
}
```

## Exemplo Avançado com Mapped Types (`DeepPartial`)

Lembra que o utilitário nativo global `Partial<T>` apenas varre O PRIMEIRO NÍVEL do objeto botando `?` nas propriedades dele?

E se você tivesse um Menu Gigante, e o Form Update precisasse varrer **todos os níveis abismais** da tipagem, e afrouxar os nós estipulando que literalmente TUDO nela lá nas entranhas fosse opcional? Você precisa de recursão pura:

```typescript
type ArmaduraComplexa = {
    id: number;
    statusBase: {
        vida: number;
        forca: number;
    };
    slotsSecundarios: {
        pedras: {
            nome: string;
            critico: number;
        }[];
    }
};

// Aqui o Type-Level Programming esbarra nos limites mortais do TypeScript Checker!
type DeepPartial<T> = {
    // Pra cada chave K dento do objeto superior:
    // Injete o ?. No valor dela, CHAME O DEEP PARTIAL DE NOVO descendo ao infinito e forçando o ciclo a engolir a árvore filha inteira do galho avaliado.
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type FormFiltroDeBuscaDaArmadura = DeepPartial<ArmaduraComplexa>;

// Funcionou perfeitamente. Todos os filhos de todas a subpastas viraram facultativos (undefined/?:):
const meuTesteBuscaLivre: FormFiltroDeBuscaDaArmadura = {
    statusBase: {
        vida: 100 // Ignorou erro de exigir a "prop: forca". O Mapped Recursive afrouxou o nó de dentro!
    }
};
```

⚠️ **ALERTA DO COMPILADOR**: O TypeScript possui um limite hardcoded de chamadas recursivas dentro do próprio type checker (para evitar Loop Infinitos que crasham a IDE rodando o background worker). Se a sua estrutura ultrapassar profundamente, ele lançará a exceção na compilação em vermelho: *Type instantiation is excessively deep and possibly infinite*.

---
## Flashcards
O que é um Tipo Recursivo? :: É um tipo que se referencia a si mesmo em sua definição, permitindo estruturas aninhadas infinitamente.
Exemplo real de uso de tipos recursivos? :: Tipagem de objetos JSON complexos ou árvores de componentes (DOM/Menus).
O que é o `DeepPartial<T>`? :: É uma versão recursiva do `Partial` que torna opcionais as propriedades em todos os níveis de profundidade de um objeto.

## Conexões
- Pré-requisito: [[1-mapped-types|Mapped Types]]
- DeepPartial/DeepReadonly: Variações recursivas de [[6-utility-types-nativos|Partial e Readonly]]
- Limites de recursão: [[1-performance-type-checker|Performance do Compilador]] (Fase 10)
- JSON tipado: Útil em [[3-runtime-validation-zod|Validação com Zod]] (Fase 11)
