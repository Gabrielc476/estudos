---
fase: 7
tema: "Modificadores de Acesso"
dificuldade: intermediário
domínio: 70
tags: [oop, encapsulation, private, protected, public, flashcards]
revisado: 2026-03-31
---
# Modificadores de Acesso (Access Modifiers)

Um dos grandes pilares da Orientação a Objetos (OOP) clássica é o Encapsulamento. Em JavaScript puro, inicialmente tudo dentro de uma classe era público. O TypeScript adicionou modificadores de acesso na compilação muito antes do JS moderno adotar a própria privacidade de runtime.

Existem 3 modificadores de acesso:
1. `public` (Padrão): Pode ser acessado de qualquer lugar.
2. `private`: Só pode ser acessado **dentro da própria classe** que o definiu.
3. `protected`: Igual ao private, mas **permite** o acesso por *Subclasses* (classes que dão `extends` nela).

```typescript
class Personagem {
    public nome: string;
    protected level: number;
    private ouro: number;

    constructor(nome: string) {
        this.nome = nome;
        this.level = 1;
        this.ouro = 0; // O private é acessível internamente
    }

    /* Método público exposto que interage com o privado de forma controlada */
    public saquearXpEOuro() {
        this.level++;
        this.ouro += 100;
        console.log(`Você agora tem ${this.ouro} moedas.`);
    }
}

class Mago extends Personagem {
    usarMagia() {
        console.log(`Mago ${this.nome} conjurando!`);
        console.log(`Level: ${this.level}`); // ✅ Funciona, pois é protected (passa pros filhos)
        // console.log(`Ouro: ${this.ouro}`); // ❌ ERRO! Ouro é private, o filho não tem acesso.
    }
}

const p = new Personagem("Gabriel");
p.nome; // ✅ Público
// p.level; // ❌ Protegido, invisível aqui fora.
// p.ouro; // ❌ Privado, invisível aqui fora.
```

## O Conflito: TS `private` vs JavaScript `#` (ES2022)

O JavaScript moderno adicionou suporte nativo a campos privados reais (usando a tralha `#`). Existe uma gritante diferença arquitetônica em usar `private` (Typescript puro) ou o pre-fixo `#` (EcmaScript runtime):

- `private ouro: number`: É uma verificação de **Compilação** (Soft Privacy). O TS grita na IDE que é proibido. Mas ao rodar o arquivo, isso some no `.js` final e a variável `ouro` fica exposta (vazamento real!). Se alguém enfiar um `@ts-ignore` e rodar um `p.ouro = 999`, a injeção acontece.
- `#ouro: number`: É uma verificação em **Runtime** (Hard Privacy). O próprio motor Node/V8 proíbe violentamente de você acessar, estourando erro fatal.
  
*Regra*: Se quiser segurança absoluta na memória (ex: instâncias contendo chaves de Criptografia e Salts), use `#chaveExata`. Para encapsulamento e guia de arquitetura para a equipe programar do jeito certo na IDE, `private` é mais bonito, limpo e atende 99% dos casos.

---
## Flashcards
Diferença entre `private` e `protected`? :: `private` só permite acesso dentro da própria classe; `protected` permite acesso na classe e também em suas subclasses.
O que o modificador `public` (padrão) faz? :: Torna a propriedade ou método acessível de qualquer lugar, dentro ou fora da classe.
Diferença entre `private` do TS e `#` do JS? :: `private` é uma checagem de compilação (Soft Privacy); `#` é uma restrição real de runtime (Hard Privacy).

## Conexões
- Próximo: [[2-abstract-implements|Abstract e Implements]]
- Atalho construtor: [[3-parameter-properties|Parameter Properties]]
- Usado em: [[2-generic-classes|Generic Classes]] (Fase 5)
- `#` nativo do ES2022 vs `private` do TS
