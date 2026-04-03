---
fase: 11
tema: "TypeScript com Testes"
dificuldade: avançado
domínio: 70
tags: [testing, vitest, jest, mocks, fixtures, flashcards]
revisado: 2026-03-31
---
# TypeScript com Testes

Testar código TypeScript traz um desafio extra: você precisa tipar **mocks**, **stubs** e **fixtures** sem que o sistema de tipos lute contra você.

## Frameworks de Teste com TS

Os frameworks modernos (Vitest, Jest) rodam TypeScript nativamente ou com mínima configuração:
- **Vitest**: Suporte nativo de primeira classe. Zero config pro TS.
- **Jest**: Precisa do `ts-jest` ou do `@swc/jest` pra transpilar.

## Tipando Mocks

O maior problema de mocks é que o TypeScript exige o objeto **completo**. Se você quer mockar um serviço com 20 métodos mas só usa 1 no teste, o TS reclama dos 19 faltantes.

### Solução 1: `Partial` + `as`
```typescript
interface UsuarioService {
    buscar(id: string): Promise<Usuario>;
    criar(dados: NovoUsuario): Promise<Usuario>;
    deletar(id: string): Promise<void>;
    listar(): Promise<Usuario[]>;
}

// Mock apenas do que o teste precisa:
const mockService = {
    buscar: vi.fn().mockResolvedValue({ id: "1", nome: "Gabriel" }),
} as unknown as UsuarioService;

// Funciona, mas o 'as unknown as' é feio. Alternativa mais limpa:
const mockServiceLimpo: Partial<UsuarioService> = {
    buscar: vi.fn().mockResolvedValue({ id: "1", nome: "Gabriel" }),
};
```

### Solução 2: Generics em Helpers de Teste
Crie uma função utilitária reutilizável que gera mocks tipados:
```typescript
function criarMock<T>(overrides: Partial<T> = {}): T {
    return overrides as T;
}

const mock = criarMock<UsuarioService>({
    buscar: vi.fn().mockResolvedValue({ id: "1", nome: "Gabriel" }),
});
```

## Tipando Fixtures (Dados de Teste)

```typescript
// Crie uma factory tipada para gerar dados de teste:
function criarUsuarioFake(overrides: Partial<Usuario> = {}): Usuario {
    return {
        id: "fake-id",
        nome: "Usuário Teste",
        email: "teste@teste.com",
        idade: 25,
        ...overrides, // Sobrescreve só o que o teste precisa
    };
}

// No teste:
const usuario = criarUsuarioFake({ nome: "Custom" });
// tipo: Usuario completo e tipado ✅
```

## Testando Tipos (Recapitulando a Fase 10)

Lembre-se de que `expect-type` serve pra testar os **tipos em si**, não os valores:
```typescript
import { expectTypeOf } from 'expect-type';

// Garante que a factory retorna o tipo correto:
expectTypeOf(criarUsuarioFake).returns.toEqualTypeOf<Usuario>();
```

## Dica de Ouro: `satisfies` em Fixtures

O operador `satisfies` (Fase 3) brilha em fixtures. Ele valida o formato **sem alargar o tipo**:
```typescript
const dadosDeTeste = {
    nome: "Gabriel",
    role: "admin" as const,
} satisfies Partial<Usuario>;
// 'role' mantém o tipo literal "admin" em vez de virar string genérica!
```

---
## Flashcards
Como mockar apenas uma parte de um serviço no TS? :: Usando `Partial<Servico>` ou fazendo casting com `as unknown as Servico` para evitar o erro de propriedades faltando.
Vantagem do Vitest em relação ao Jest para TS? :: Vitest tem suporte nativo out-of-the-box para TS sem precisar configurar compiladores externos lentos como o ts-jest.
Para que serve o operador `satisfies` em dados de teste (fixtures)? :: Para validar se os dados seguem o tipo desejado sem "alargar" os tipos literais, mantendo o autocomplete preciso.

## Conexões
- Partial em mocks: [[6-utility-types-nativos|Partial]] (Fase 6)
- `satisfies` em fixtures: [[satisfies|Operador satisfies]] (Fase 3)
- Type Testing: [[5-type-testing|expect-type]] (Fase 10)
- Factory genérica: [[generics-em-funcoes|Generics]] (Fase 4)
