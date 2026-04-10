---
fase: 8
tema: "Namespaces"
dificuldade: intermediário
domínio: 70
tags: [namespaces, legacy, modules, scope, flashcards]
revisado: 2026-03-31
---
# Namespaces (TypeScript Legacy Modules)

Antes da ascensão oficial completa dos ecóistemas abertos padrão de **Módulos do ECMAScript** (`import` e `export`), lá no começo do Node e das primeiras versões antigonas de TS e Webpack, estruturar códigos em abas separadas sem vazar colisões puras p/ Global Variables (onde o método `const login()` sobrecrevia o `login()` vindo de outro script importado na tela) era um caos imensurável de colisão de contexto.

Como o TS é uma linguagem superset, a Microsoft criou à muito tempo atrás a Keyword customizada global `namespace` (Eles trouxeram isso do universo estrito de OOP do C# e C++). O namespace literalmente permitia que agrupar num "Contêiner Falso Envelopado em Fechadura (Closure)" funções separadas, evitando colisões.

```typescript
// Jeito legado TS 3.0 para modularização pura:
namespace UtilitariosDeString {
    // Isolado e Protegido aqui dentro
    const CONSTANTE_TAMANHO = 100;

    export function purificarUrl(str: string) {
        return str.trim();
    }
}

// Em outro lugar no arquivo ou chamando via "/// <reference />" import legacy
UtilitariosDeString.purificarUrl("    https... ");
```

## Porque devem ser sumariamente evitados
Os Namespaces só criam problemas de incompatibilidade com os compressores/bundles mordernos inteiros como Webpack/Vite/Esbuild/Rollup, e a pior dor de cabeça se você decidir mesclar Node.js e FrontEnd React monorepos. 

O ECMAScript trouxe o nativo `module importação { ... }`. Todas elas ganham encabçamento base invisível isolado do browser naturalmente por conta do `type="module"`. **Ninguém na terra e comunidade ativa mais cria um bloco Namespace ativamente.** (Eles só existem ainda como uso interno super pesado pela engine .d.ts base de declarações do DOM e tipagens de bibliotecas super complexas, como Global Type Augmentations, mas é estritamente de Type Level Declaration, nunca de lógica de functions/classes final).

---
## Flashcards
O que é um `namespace` no TS? :: Um contêiner arcaico para agrupar códigos e evitar colisões no escopo global, anterior aos módulos ES6.
Por que Namespaces devem ser evitados hoje? :: Porque causam problemas com bundlers modernos e foram substituídos pelo sistema nativo de módulos `import/export`.
Onde Namespaces ainda são úteis? :: Em arquivos de declaração globais (`.d.ts`) para organizar grandes APIs legadas do navegador ou do Node.

## Conexões
- Substituído por: [[1-modulos|Módulos ESM]]
- Ainda usado em: Declaration Files do DOM e [[4-declare-ambient|declare global]] (Fase 10)
- Contexto histórico: [[o-que-e-typescript|História do TypeScript]] (Fase 1)
