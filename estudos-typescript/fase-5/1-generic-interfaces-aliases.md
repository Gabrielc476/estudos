---
fase: 5
tema: "Generic Interfaces e Aliases"
dificuldade: intermediário
domínio: 70
tags: [generics, interfaces, types, api-response, flashcards]
revisado: 2026-03-31
---
# Generic Interfaces e Type Aliases

Interfaces e Types também podem receber "parâmetros de tipo" (Generics). Isso permite construirmos contêineres e estruturas de dados dinâmicas.

## Passando Parâmetros para Interfaces e Types

A sintaxe é idêntica à de funções: `<T>`.

```typescript
interface Caixa<T> {
    conteudo: T;
}

const caixaNum: Caixa<number> = { conteudo: 100 };
const caixaStr: Caixa<string> = { conteudo: "Texto" };

// Com Type Aliases:
type RespostaAPI<T> = {
    sucesso: boolean;
    dados: T;
    erro?: string;
};

// Reutilizamos a estrutura genérica da resposta
const resUsuario: RespostaAPI<{ nome: string }> = {
    sucesso: true,
    dados: { nome: "Gabriel" }
};
```

## Valores Padrão (Defaults) em Generics

Você pode definir um tipo "padrão" caso quem esteja usando a sua interface não passe nada nos assinaladores angulares (`<T = Default>`).

```typescript
// Se ninguém passar um tipo para T, ele assumirá 'string'
interface Botao<T = string> {
    label: T;
    onClick: () => void;
}

const btnClassico: Botao = {
    label: "Salvar", // TS aceita string, pois foi o padrão.
    onClick: () => {}
};

const btnHtml: Botao<HTMLElement> = {
    label: document.createElement("span"), // TS exige HTMLElement.
    onClick: () => {}
};
```

---
## Flashcards
O que é uma Generic Interface? :: É uma interface que aceita um parâmetro de tipo `<T>`, permitindo definir estruturas flexíveis que mudam de acordo com o dado fornecido.
Exemplo comum de uso de Generic Interface? :: Tipagem de Respostas de API, onde o envelope (status, data) é o mesmo, mas o conteúdo de `data` varia.
Podemos ter múltiplos generics em uma interface? :: Sim, pode-se definir `<T, K, U>` e usá-los em diferentes propriedades da interface.

## Conexões
- Pré-requisito: [[generics-em-funcoes|Generics em Funções]] (Fase 4)
- Evolução: [[2-generic-classes|Generic Classes]]
- Defaults: [[4-conditional-defaults|Conditional Defaults]]
- Interfaces genéricas usadas em: [[6-hkts-simulados|HKTs Simulados]] (Fase 9)
