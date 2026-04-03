---
fase: 9
tema: "Emitters Type-Safe e Phantom Types"
dificuldade: avançado
domínio: 70
tags: [event-emitters, phantom-types, generics, validation, flashcards]
revisado: 2026-03-31
---
# Emitters Type-Safe e Phantom Types

## Type-Safe Event Emitters
No Event-Driven de Nodejs Clássico (`EventEmitter`), os eventos são só strings mágicas `on('evento', (dado) => {})`. O dev escrevia o nome do evento errado e perdia horas depurando do porquê nada disparar.  
Hoje moldamos um Mapa de Assinaturas (Mapped Parameters Event Hooks):

```typescript
type MapaEventosDoMeuServer = {
    "login": (user: string, token: string) => void;
    "logout": () => void;
    "erro": (codigo: number) => void;
};

// Extraino o Generic em cima de K que TEM que existir nas Chaves literais do Mapa:
function escutar<K extends keyof MapaEventosDoMeuServer>(
    evento: K, 
    callback: MapaEventosDoMeuServer[K] // Tipagem inferida dinâmicamente de dentro doming do dicionario!
) {
    // Escutamos ativamente sem vazar Types
}

escutar("login", (usuario, token) => { 
    // Typescript autocompletou usuario e token automaticamente lendo eles das entranhas limpas da Tuple! 
});

// escutar("bug", () => {}) // ❌ Erro: O evento 'bug' não existe na tipagem Matrix base!
```

## Phantom Types (Tipagem Fantasma com Generics)
Parecido com as "Marcas Restritivas" (Branded Types), nós podemos colocar *Generics em uma Classe Omitidos/Vazios que guardam a alma do estado de compilação sem existir fisicamente nas varíaveis internas:*

```typescript
// Uma classe bizarra onde o T é um fantasma e nem existe no Construtor!
class Formulario<EstadoValidacao> {
   constructor(public dados: string) {}
}

const createForm = (dados:string) => new Formulario<"Sujo">(dados);
const validarForm = (formBase: Formulario<"Sujo">) => new Formulario<"Limpinho">(formBase.dados);
const salvarBD = (formValidado: Formulario<"Limpinho">) => console.log(formValidado);

const form = createForm("Gabriel;Senha"); // Tipo atual é 'Formulario<"Sujo">'

// salvarBD(form); // ❌ ERRO: A função salvarBD só aceita Formulários Limpinhos! Trave o programador! 

const formAprovado = validarForm(form);
salvarBD(formAprovado); // ✅ O Tipo Fantasma evoluiu pra Limpinho na esteira. Tudo em paz.
```

---
## Flashcards
O que é um Phantom Type? :: É um parâmetro genérico que aparece na declaração de um tipo mas não é usado em nenhuma de suas propriedades reais.
Para que servem os Phantom Types? :: Para rastrear o "estado" de um dado apenas no nível de compilação (ex: saber se um dado está Validado ou Cru).
Como tipar um Event Emitter de forma segura? :: Criando um mapeamento de `NomeDoEvento -> TipoDoPayload` e usando generics para validar os argumentos de `.on()` e `.emit()`.

## Conexões
- Event Map usa: [[1-mapped-types|Mapped Types]] e [[generic-constraints|Generic Constraints]]
- Phantom Types = Generics vazios: [[1-generic-interfaces-aliases|Generic Interfaces]] (Fase 5)
- Relacionado: [[1-branded-types|Branded Types]]
- Formulários validados: [[3-runtime-validation-zod|Zod Schemas]] (Fase 11)
