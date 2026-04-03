---
fase: 7
tema: "Abstract e Implements"
dificuldade: intermediário
domínio: 70
tags: [oop, inheritance, abstract-classes, interfaces, implements, flashcards]
revisado: 2026-03-31
---
# Herança Múltipla Abstrata (`abstract` vs `implements` vs `extends`)

## 1. Classes e Métodos Abstratos (`abstract`)

Uma Classe Abstrata é um "Molde" ou uma "Planta Base". Você **nunca pode instanciar** com `new` diretamente. Ela só serve para que *outras* classes a estendam.
Além disso, um *método abstrato* força obrigatóriamente as classes herdeiras (os filhos) a montarem e implementarem aquele código para não quebrarem o contrato.

```typescript
abstract class Mob {
    // Propriedade comum base (quem herdar levará os Status junto)
    constructor(public vida: number, public dano: number) {}

    // Método obrigativo: Toda criatura DEVE atacar de um jeito único. A base TS não sabe como, o dev força os filhos a fazer.
    abstract atacar(alvo: string): void;

    // Método comum base: Comportamento fixo partilhado herdado.
    andar() {
        console.log("O mob está se movendo normalmente"); 
    }
}

// const bichoInvalido = new Mob(10, 10); // ❌ ERRO: Não pode estanciar Molde (Classe Abstrata).

class Zumbi extends Mob {
    // É OBRIGATÓRIO (TS gritará) construir a função atacar() para honrar a base abstrata:
    atacar(alvo: string): void {
        console.log(`Zumbi morde ${alvo} causando ${this.dano} de dano!`);
    }
}
```

## 2. A keyword de interface `implements`

Diferente do `extends` (que puxa comportamentos verdadeiros e métodos em Javascript Real da classe pai para a atual usando o Prototype Chain real da máquina), o `implements` lida **única e puramente com checagem de sistema de Tipos (TS)**. 
Ele garante que a Classe atual se força e obriga a se encaixar na `interface` acordada, mas nunca engolindo métodos do ar.

Isso é fundamental em arquiteturas "Orientadas a Interfaces" (Dependency Inversion, Hexagonal, Clean Architecture), nas quais você codá contratos isolados e molda a classe real pra respeitar!

```typescript
interface Logavel {
    enviarLogsDeSystema(msg: string): void;
}
interface Serializavel {
    converterJSON(): string;
}

// O TS vigia se o dev criar a classe e esquecer alguma das chaves cruciais garantidas pelo Implements (Herança de Contratos Múltiplos)
class BancoDeDados implements Logavel, Serializavel {

    // O desenvolvedor teve que escrever puramente à mão!
    enviarLogsDeSystema(msg: string) {
        console.log(`[SYS ADMIN BD]: ${msg}`);
    }

    // Teve que escrever na mão pra silenciar o interface check!
    converterJSON() {
        return JSON.stringify(this);
    }
}
```
**TL;DR**
- `extends`: "Eu SOU a continuação viva de um pai. Eu herdo os trejeitos e dinheiro dele".
- `implements`: "Eu ASSINO que obedeço esse papel/contrato em cartório, não importa como eu sou dentro de cara, mas de mim não sairá falha à essas regras".

---
## Flashcards
O que é uma Classe Abstrata (`abstract`)? :: É uma classe que não pode ser instanciada diretamente, servindo apenas como molde/base para outras classes.
Diferença entre `extends` e `implements`? :: `extends` herda lógica e comportamento (Prototype Chain); `implements` apenas obriga a classe a seguir um contrato/interface.
Para que serve um método abstrato? :: Para forçar todas as subclasses a fornecerem sua própria implementação obrigatória daquele método.

## Conexões
- Pré-requisito: [[1-modificadores-acesso|Modificadores de Acesso]]
- Composição alternativa: [[4-mixins|Mixins]]
- Interfaces em: [[resumo-fase2|Tipos Compostos]] (Fase 2)
- Builder Pattern usa implements: [[2-builder-pattern|Builder Pattern]] (Fase 9)
