---
fase: 4
tema: "Optional e Default Params"
dificuldade: intermediário
domínio: 70
tags: [functions, parameters, optional, default, flashcards]
revisado: 2026-03-31
---
# Optional e Default Parameters

Ao trabalhar com funções, muitas vezes atributos não são obrigatórios para a execução.

## Parâmetros Opcionais (`?`)

Parâmetros opcionais (marcados com `?`) devem vir **SEMPRE no final da lista de argumentos**. O TypeScript não permite que um parâmetro opcional preceda um obrigatório.

```typescript
function saudacao(nome: string, sobrenome?: string) {
    if (sobrenome) {
        return `Olá ${nome} ${sobrenome}`;
    }
    return `Olá ${nome}`;
}

saudacao("Gabriel"); // ✅ Funciona, `sobrenome` fica 'undefined'
saudacao("Gabriel", "Silva"); // ✅ 
```
*Dica: Internamente, o TypeScript infere `sobrenome` como `string | undefined`.*

## Parâmetros Padrão (Default Parameters)

Parâmetros que recebem um valor padrão (`= valor`) **não precisam ser anotados**, pois o TS infere o tipo pelo valor e, de brinde, já os trata como opcionais.

```typescript
// O 'fator' é inferido como 'number' e já ganha status opcional
function multiplicar(a: number, fator = 2) {
    return a * fator; 
}

multiplicar(10);    // Retorna 20
multiplicar(10, 3); // Retorna 30
```

---
## Flashcards
Como declarar um parâmetro opcional em uma função? :: Adicionando uma interrogação `?` após o nome do parâmetro.
O que acontece se um parâmetro opcional não for passado? :: Ele assume o valor `undefined` dentro da função.
Diferença entre Parâmetro Opcional e Default Parameter? :: O opcional vira `undefined` se omitido; o default assume um valor pré-definido se omitido ou se passar `undefined`.

## Conexões
- Base: [[tipagem-de-funcoes|Tipagem de Funções]]
- Defaults em Generics: [[4-conditional-defaults|Conditional Defaults]] (Fase 5)
- Parameter Properties: [[3-parameter-properties|Atalho em Construtores]] (Fase 7)
