---
fase: 11
tema: "Front-end e Bundlers"
dificuldade: avançado
domínio: 70
tags: [vite, frontend, bundlers, swc, esbuild, flashcards]
revisado: 2026-03-31
---
# Front-end e Bundlers: O TypeScript Apenas Como Guarda-Costas

A maior ruptura que desenvolvedores sofrem é entender como o TypeScript opera no ecossistema Front-end de 2024 (React, Vue, Vite, NextJS) e no Turborepo.

O ecossistema inteiro parou de depender do compilador oficial da Microsoft (`tsc`) para fazer a quebra ("transpilação") de TypeScript para JavaScript. O motor `tsc` virou lento demais.

## Vite, esbuild e SWC (Rust)
Hoje em dia, Next.js usa o Compilador SWC (Feito em linguagem `Rust`). O Vite usa o Esbuild (Feito puramente em `Go`). 
Esses empacotadores (Bundlers) são 100x mais rápidos. Eles engolem o seu projeto `.ts` e `.tsx`, retiram o TypeScript à força bruta convertendo pra JS do navegador e buildam o site em milissegundos.

## Então, qual o Papel do `tsc` no Front-end hoje?
O Bundler (Vite) não verifica rigorosamente nenhum dos seus tipos durante a programação e build de Dev! Pra ele um erro `A string is not assignable to type number` não existe. Se bater erro cego e travar, é só na sua IDE do VSCode.

Por isso no script de *Build Produtiva* do Vite/Next você verá que a compilação agora é quebrada em DOIS estagios separados:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build"
  }
}
```

1. Primeiro ele chama o Node para rodar ativamente a barreira **Type-Checker do `tsc` da Microsoft**, mas diz pra o compilador **não gerar código js**. Ele fala: *"Olha no painel se tem tipo vazado ou erro strict sem interface; se tu aprovar tudo e me der joinha eu prossigo"*.
2. Em seguida o Bundler assume, entra rasgando em 1 segundo transformando e minificando para Web nativa!
 
Lidamos assim com um Front-end veloz para programar, mas perfeitamente tipificado quando vai ser feito o Push/Pipeline de deploy!

---
## Flashcards
O Vite faz verificação de tipos (Type-Checking) no Dev? :: Não por padrão; ele apenas remove os tipos (transpila) usando esbuild para ser ultra-veloz.
Como garantir que não há erros de tipo no build de produção? :: Rodando `tsc --noEmit` antes de chamar o comando de build do bundler (ex: `tsc && vite build`).
O que é o SWC/esbuild? :: São compiladores modernos escritos em Rust/Go que substituem o `tsc` na tarefa de gerar JS a partir de TS de forma muito mais performática.

## Conexões
- `tsc` como type checker: [[configuracao-tsconfig|tsconfig]] (Fase 1)
- `moduleResolution: bundler`: [[2-module-resolution|Module Resolution]] (Fase 8)
- SWC/esbuild: Alternativas ao tsc para transpilação
- React: [[5-typescript-react|TypeScript com React]]
