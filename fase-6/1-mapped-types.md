---
fase: 6
tema: "Mapped Types"
dificuldade: intermediário
domínio: 70
tags: [mapped-types, iteration, transformation, wow-analogy, flashcards]
revisado: 2026-03-31
---
# Mapped Types (Mapeamento de Tipos)

No TypeScript, às vezes você tem um Tipo (como uma Interface cheia de propriedades) e precisa de um **Clone modificado** dele. Por exemplo: Uma interface `Usuario`, e agora você precisa de um `UsuarioAtualizacao` onde *todas as propriedades sejam opcionais*.

Você não deve reescrever a interface inteira na mão e duplicar as tipagens. Você deve usar um **Mapped Type** para iterar sobre a original e gerar a nova automaticamente.

Pense nisso como um **Encantador (Enchanter) no WoW**: Ele pega o seu set inteiro de armadura limpo, varre peça por peça com um loop, e aplica "+10 Status Opcional" em cada uma delas de uma só vez.

## Como funciona (O Loop `in`)

A sintaxe base usa as chaves `[K in Keys]: TipoOriginal[K]`. Onde `Keys` é geralmente as chaves de um objeto que extraímos previamente com `keyof`.

```typescript
type PersonagemBase = {
    nome: string;
    level: number;
    classe: string;
};

// Vamos usar Type-Level Programming para clonar e modificar dinamicamente a estrutura inteira:
type TornarOpcional<T> = {
    // Para cada Chave iterativa (K) dentro das chaves literais de T (nome | level | classe)
    // Crie a propriedade de mesmo nome K, injete o modificador '?' (opcional), e mantenha o tipo base original herdado da assinatura T[K]
    [K in keyof T]?: T[K];
};

type PersonagemParcial = TornarOpcional<PersonagemBase>;
/*
Resultado Mágico (Gerado sozinho e rastreado instantaneamente em background!):
// Hover Oculto do TS apitrará perfeitamente:
type PersonagemParcial = {
    nome?: string | undefined;
    level?: number | undefined;
    classe?: string | undefined;
}
*/
```

## Modificadores Adicionais Dinâmicos (`+` e `-`)

Você pode adicionar ativamente e também explodir/remover modificadores de visibilidade e facultatividade durante o iterador usando `-` (subtrair/ignorar) ou `+` (forçar/adicionar - que é o atalho padrão se você omitir a marcação).

```typescript
type EquipamentoCongelado = {
    readonly espada?: string;
    readonly escudo?: string;
};

// A missão agora é remover a viisibilidade limitante 'readonly' E remover de raspão o '?' (opcional) de todas as chaves pra quebrar o state das binds!
type DescongelarFormatar<T> = {
    // -readonly (arranca e desativa o readonly force se existir)
    // -?        (arranca o marcador opcional se existir nas assinaturas de tipo)
    -readonly [K in keyof T]-?: T[K];
};

type EquipamentoProntoParaLuta = DescongelarFormatar<EquipamentoCongelado>;
/*
Resultado cru entregue aos parametros:
type EquipamentoProntoParaLuta = {
    espada: string; // Fixo e Completamente Obrigatório (Limpo)
    escudo: string; // Fixo e Completamente Obrigatório (Limpo)
}
*/
```

Os Mapped Types engrenam a arquitetura de base funcional pura de absolutamente TUDO o que faremos compondo utilitariamente daqui pra frente, pois eles são literalmente o método de JS `Array.map` abstraído e transpoto pro Type-Checking engine que transita estaticamente em propriedades imutáveis de Tipos de Objetos!

---
## Flashcards
Sintaxe base de um Mapped Type? :: `[K in keyof T]: T[K]`.
Para que serve o modificador `-?` em um Mapped Type? :: Para remover a obrigatoriedade (tornar obrigatório) de campos que eram opcionais.
Como tornar todas as propriedades de um tipo `readonly` via Mapped Type? :: `readonly [K in keyof T]: T[K]`.

## Conexões
- Pré-requisito: [[generic-constraints|`keyof` em Generics]] (Fase 4)
- Evolução: [[2-key-remapping|Key Remapping com `as`]]
- Recursão: [[4-recursive-types|Tipos Recursivos]]
- Implementação dos Utility Types: [[6-utility-types-nativos|Partial, Required, Readonly]]
