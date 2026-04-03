---
fase: 11
tema: "TypeScript com React"
dificuldade: avançado
domínio: 70
tags: [react, frontend, hooks, props, context, flashcards]
revisado: 2026-03-31
---
# TypeScript com React

No React moderno (18+), praticamente todo projeto já nasce em TypeScript. A tipagem protege seus componentes, hooks e eventos de forma que erros de props ou estados quebrados sejam pegos antes de abrir o navegador.

## Tipando Componentes

### A forma moderna (função simples tipada)
```typescript
// O jeito recomendado em 2024+: função normal com tipo no objeto de props
type CardProps = {
    titulo: string;
    destaque?: boolean;       // Prop opcional
    children: React.ReactNode; // Aceita qualquer JSX filho
};

function Card({ titulo, destaque = false, children }: CardProps) {
    return (
        <div className={destaque ? "card-gold" : "card"}>
            <h2>{titulo}</h2>
            {children}
        </div>
    );
}
```

### `React.FC` — Evite!
O tipo `React.FC<Props>` (Function Component) foi popular no passado, mas a comunidade abandonou porque ele injetava `children` automaticamente e causava confusão. Prefira sempre a função simples com props tipadas no argumento.

## Tipando Hooks

```typescript
// useState com tipo explícito (quando o valor inicial não revela o tipo completo)
const [usuario, setUsuario] = useState<Usuario | null>(null);

// useRef tipado (referência a um elemento HTML)
const inputRef = useRef<HTMLInputElement>(null);

// useRef como variável mutável (não ligada ao DOM)
const contadorRef = useRef<number>(0);
```

## Tipando Eventos

O React tem tipos próprios para cada evento. A IDE te ajuda, mas os mais comuns:

```typescript
// Evento de clique
function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    console.log(e.currentTarget.textContent);
}

// Evento de input (digitação)
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value); // string tipada!
}

// Evento de formulário
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
}
```

## Context API Tipada

```typescript
type TemaContexto = {
    modo: "claro" | "escuro";
    alternar: () => void;
};

// Crie o contexto com um valor inicial ou null seguro:
const TemaCtx = React.createContext<TemaContexto | null>(null);

// Hook customizado que garante que o contexto existe:
function useTema(): TemaContexto {
    const ctx = React.useContext(TemaCtx);
    if (!ctx) throw new Error("useTema deve estar dentro de <TemaCtx.Provider>");
    return ctx;
}
```

## `as const` em Props (Arrays e Objetos Literais)

Quando você passa um array ou objeto direto como prop, o React infere ele de forma genérica (`string[]`). Use `as const` pra preservar os literais:

```typescript
// Sem as const:
<Menu opcoes={["Home", "Sobre", "Contato"]} />
// opcoes é inferido como string[]

// Com as const:
<Menu opcoes={["Home", "Sobre", "Contato"] as const} />
// opcoes é inferido como readonly ["Home", "Sobre", "Contato"] — literal e imutável!
```

---
## Flashcards
Como tipar as Props de um componente de forma recomendada? :: Definindo um `type` ou `interface` e desestruturando os argumentos da função do componente.
Por que evitar o tipo `React.FC`? :: Porque ele injeta automaticamente a propriedade `children` mesmo se o componente não a usar, causando falta de clareza.
Como tipar um `useRef` para um elemento do DOM? :: Passando o tipo específico do elemento HTML no generic (ex: `useRef<HTMLInputElement>(null)`).

## Conexões
- Hooks genéricos: [[generics-em-funcoes|Generics em Funções]] (Fase 4)
- Event types: [[tipagem-de-funcoes|Tipagem de Funções]] (Fase 4)
- `as const` em props: [[resumo-fase1|Literal Types e as const]] (Fase 1)
- Context API: [[1-generic-interfaces-aliases|Generic Interfaces]] (Fase 5)
- Bundler: [[2-frontend-bundlers|Frontend e Bundlers]]
