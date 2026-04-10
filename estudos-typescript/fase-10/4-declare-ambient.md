---
fase: 10
tema: "declare e Ambient Declarations"
dificuldade: avançado
domínio: 70
tags: [ambient-declarations, global, declare, augmentation, flashcards]
revisado: 2026-03-31
---
# `declare` e Ambient Declarations

Na Fase 8 você conheceu o `declare` básico dentro de arquivos `.d.ts`. Agora vamos ao poder completo: **injetar tipos no escopo global do projeto inteiro** e **modificar tipos de bibliotecas que já existem** sem tocar no código fonte delas.

## 1. `declare global` (Injeção Global)

Às vezes você precisa dizer pro TypeScript que uma variável existe globalmente (injetada por um script externo, um CDN, ou o próprio ambiente do navegador/servidor):

```typescript
// globals.d.ts (crie na raiz do seu projeto)
declare global {
    // Agora TODO arquivo .ts do projeto sabe que existe uma const global chamada CONFIG
    var CONFIG: {
        API_URL: string;
        DEBUG: boolean;
    };

    // Adicionando métodos no Window do navegador:
    interface Window {
        analytics: {
            track(evento: string): void;
        };
    }
}

// OBRIGATÓRIO: Esse export vazio transforma o arquivo em módulo e permite o declare global funcionar
export {};
```

## 2. Module Augmentation (Estender Módulos de Terceiros)

Imagina que você usa o Express e quer que todo `req` carregue um campo extra `req.usuario` que você injeta num middleware. O Express não sabe disso! Mas você pode **reabrir a tipagem dele** e colar propriedades novas:

```typescript
// express.d.ts
import "express"; // Importar o módulo original é OBRIGATÓRIO pra abrir ele

declare module "express" {
    interface Request {
        usuario?: {
            id: string;
            nome: string;
        };
    }
}
```

Agora em qualquer controller do seu projeto, `req.usuario` aparece no autocomplete sem nenhum cast sujo `as`!

## 3. Interface Merging Global (Augmentação de Interfaces Nativas)

Lembra que Interfaces fazem **Declaration Merging** automaticamente? Isso funciona até com interfaces globais do próprio TypeScript:

```typescript
// Adicionando um método no Array nativo globalmente:
declare global {
    interface Array<T> {
        primeiro(): T | undefined;
    }
}

// Implementação real (necessária em runtime!):
Array.prototype.primeiro = function() {
    return this[0];
};

// Agora qualquer array do projeto tem autocomplete:
const nums = [10, 20, 30];
nums.primeiro(); // tipo: number | undefined ✅
```

⚠️ **Cuidado**: Poluir o escopo global com `declare global` é poderoso mas perigoso. Use com moderação e apenas quando não houver alternativa modular.

---
## Flashcards
O que é "Module Augmentation"? :: É a técnica de usar `declare module "biblioteca"` para estender as interfaces originais de uma dependência externa.
Para que serve `declare global`? :: Para injetar tipos ou variáveis no escopo global (como propriedades extras no objeto `window` ou `process.env`).
Onde colocar Ambient Declarations? :: Geralmente em arquivos `.d.ts` dedicados ou em arquivos de configuração de ambiente.

## Conexões
- Pré-requisito: [[3-declaration-files|Declaration Files]] (Fase 8)
- Interface Merging: [[resumo-fase2|Interfaces]] (Fase 2)
- Augmentar Express: [[4-definitely-typed|@types/express]] (Fase 8)
- declare global: [[5-namespaces|Namespaces]] (Fase 8)
