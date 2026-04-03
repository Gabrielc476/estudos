---
fase: 7
tema: "Decorators e Accessors"
dificuldade: intermediário
domínio: 70
tags: [decorators, accessors, metaprogramming, experimental, flashcards]
revisado: 2026-03-31
---
# Decorators (TC39 Padrão ECMAScript - Typescript 5.0+) e `accessor`

Decotadores (Decorators) são marcações estáticas mágicas na UI (`@nome`) que você encosta na "cabeça" de uma Instância, Método ou Propriedade em OOP (Classes). Elas são literalmente "Funções Interceptadoras de Comportamentos" de Alto-Nível sem estragar as subcamadas! Pense nisso como Middlewares de Orientação a Objeto.

Se você veio do Framework NestJS, Angular, TypeGraphQL ou TypeORM ou SprintBoot no Java... Decorators são a Alma daquele escopo.

**ALERTA IMPORTANTE:** No TS 5.0+ nós temos agora decorators **oficiais nativos suportados pelo ECMASCript 2022 stage de base nativa!!**. No passado usavamos o legadíssimo `experimentalDecorators: true` do config. A sintaxe de fundo de como as ferramentas pegam o "Contexto e Value" mudou brutalmente para melhor no TypeScript cru do 5.0.

## Criando um Decorator Nativo de Log do Methodo TS 5.0

Vamos criar um `@Logar` que encosta num método de uma classe pra escutar todo comando invocatório antes do método real trabalhar sua mágia interna.

```typescript
// 1. A Estrutura do Decorator de MÉTODOS Pura do TS 5.0 base (Ele abraça 2 binds: o metodo real invocado localmente e os contexts root dados do sistema).
function LogadorDeDesempenho(metodoOriginal: any, contexto: ClassMethodDecoratorContext) {
    // 2. Nós abortamos o comportamento injetando e engatando O NOVO MÉTODO mutador do proxy que varrerá do zero as assinaturas que seriam chamadas pelo original!
    return function (this: any, ...args: any[]) {
        console.log(`[LOG INJETADO NATIVADO]: Começando a chingar o método ${String(contexto.name)}!`);
        console.time("Performance");
        
        // Chamamos de fato agora com um apply o bind atratado a função original pura pra agir o efeito (Ele tem this bind!)
        const resultadoFinalExtrahidoOriginal = metodoOriginal.apply(this, args);
        
        console.timeEnd("Performance");
        return resultadoFinalExtrahidoOriginal;
    };
}

class Calculadora {
    @LogadorDeDesempenho // Injetamos em Runtime na frente do executor.
    somarProcessador(a: number, b: number) {
        let i = 0;
        while(i < 990000) i++; // Loop pra demorar muito..
        return a + b;
    }
}

const c = new Calculadora();
c.somarProcessador(5, 10);
/*
[LOG INJETADO NATIVADO]: Começando a chingar o método somarProcessador!
Performance: 1.34s
*/
```


## A Auto-Keyword nova `accessor` (TypeScript 4.9+)
Normalmente pra se ter `Getters/Setters` nas classes cruas, é muito bloco de codificação de background pra uma váriável só com o underline... Em TS foi adicionada o enxugamento `accessor` explícito gerador automático para classes:

```typescript
class Ponto {
    accessor zLevel = 0; 
    /* 
    Isso diz explicitamente pro Javascript Engine da Transpilação arrancar o `zLevel` bruto e silenciar, escrevendo no background isolamente do zero por trás das camadas pra você secretamente os campos restritos auto-gerados atrelados unicamente em getter/setters encapsulados com logicas nativas!
    Em resumo: Permitiu Decorators Nativos de Field Setters pegarem com context `ClassAccessorDecoratorContext` inteira em vez de estatico getter.
    */
}
```

---
## Flashcards
O que é um Decorator? :: Uma função interceptadora (middleware) que pode ser aplicada a classes, métodos ou propriedades para alterar seu comportamento.
Diferença dos Decorators no TS 5.0? :: Eles agora seguem o padrão oficial do ECMAScript, com sintaxe e contextos de metadados nativos.
Para que serve a keyword `accessor`? :: É um enxugamento que gera automaticamente getters e setters encapsulados para uma propriedade de classe.

## Conexões
- Pré-requisito: [[1-modificadores-acesso|Modificadores de Acesso]]
- `this` no decorator: [[this-e-rest-parameters|Tipagem de this]] (Fase 4)
- Decorators em frameworks: NestJS, Angular, TypeORM
- Config legado: `experimentalDecorators` no [[configuracao-tsconfig|tsconfig]] (Fase 1)
