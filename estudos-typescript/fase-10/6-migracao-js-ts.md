---
fase: 10
tema: "Migração de JS para TS"
dificuldade: avançado
domínio: 70
tags: [migration, legacy, strategy, incremental, flashcards]
revisado: 2026-03-31
---
# Migração de JavaScript para TypeScript

No mundo real, quase ninguém começa um projeto do zero em TypeScript. A maioria herda uma base gigante de JavaScript puro e precisa migrar **incrementalmente** sem quebrar tudo de uma vez.

O TypeScript foi projetado exatamente pra isso. Você pode ir adotando aos poucos, arquivo por arquivo.

## Estratégia 1: `allowJs` + `checkJs` (Modo Gentil)

No `tsconfig.json`, ative:
```json
{
  "compilerOptions": {
    "allowJs": true,   // Permite misturar .js e .ts no mesmo projeto
    "checkJs": true,   // O TS analisa erros mesmo dentro dos .js!
    "strict": false    // Comece sem strict, senão vai ser 5000 erros de uma vez
  }
}
```

Com isso o TypeScript começa a **verificar seus arquivos `.js` existentes** usando inferência. Ele não exige tipagem explícita, mas já pega erros óbvios como chamar métodos que não existem.

## Estratégia 2: `// @ts-check` (Arquivo por Arquivo)

Se não quiser ativar `checkJs` globalmente, adicione o comentário mágico no topo de arquivos individuais:

```javascript
// @ts-check

/** @type {number} */
let contador = 0;

contador = "ops"; // ❌ O TS agora grita mesmo sendo .js!
```

## Estratégia 3: JSDoc como Ponte

Antes de renomear o arquivo pra `.ts`, você pode tipar funções JavaScript usando comentários JSDoc. O TypeScript entende e valida:

```javascript
// utils.js

/**
 * @param {string} nome
 * @param {number} idade
 * @returns {{ nome: string, idade: number }}
 */
function criarUsuario(nome, idade) {
    return { nome, idade };
}

// O TS infere os tipos a partir do JSDoc! Autocomplete funciona!
```

## O Plano de Migração Ideal (Passo a Passo)

1. **Instalar TypeScript** e criar um `tsconfig.json` básico com `allowJs: true`, `strict: false`.
2. **Renomear** os arquivos mais simples de `.js` para `.ts` (utilitários, constantes, helpers).
3. **Adicionar tipagem** gradualmente nos arquivos renomeados.
4. **Ativar flags strict** uma por uma (`strictNullChecks` primeiro, depois `noImplicitAny`).
5. **Migrar** os arquivos complexos (controllers, services) por último.
6. **Remover** `allowJs` quando todos os arquivos forem `.ts`.
7. **Ativar** `"strict": true` completo como cerimônia final.

A beleza dessa estratégia é que **em nenhum momento o projeto quebra**. Cada passo é retrocompatível e pode ser deployado normalmente.

---
## Flashcards
Estratégia de migração incremental? :: Ativar `allowJs: true` no tsconfig para permitir que arquivos JS e TS coexistam no mesmo projeto durante a transição.
Como usar o TS em arquivos JS sem renomear para .ts? :: Adicionando o comentário `// @ts-check` no topo do arquivo JS e usando anotações JSDoc.
Para que serve o comando `ts-migrate`? :: É uma ferramenta automatizada para converter grandes bases de código JS para TS, injetando tipos básicos e suprimindo erros iniciais.

## Conexões
- `allowJs` e `checkJs`: [[6-tsconfig|tsconfig]] (Fase 8)
- JSDoc como ponte: Tipagem sem renomear arquivos
- `strict: false` → `true`: [[configuracao-tsconfig|Configuração]] (Fase 1)
- Estratégia incremental: Renomear .js → .ts gradualmente
