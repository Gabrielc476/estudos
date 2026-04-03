---
fase: 11
tema: "Validação em Runtime com Zod"
dificuldade: avançado
domínio: 70
tags: [zod, validation, runtime, type-inference, flashcards]
revisado: 2026-03-31
---
# Integração com Zod/Yup (Runtime Validation)

### O Problema Absoluto do Typescript Puro
Apesar de anos de estudo e OOP, o TypeScript tem um calcanhar de aquiles trágico: **Os Tipos são apagados para sempre assim que o código vira Javascript (Compilado).**
Se o seu Back-End recebe um JSON de uma Requisição POST mal-intencionada da Internet com valores totalmente distorcidos batendo no seu controller na rede:
```typescript
interface PayloadPost { id: number, email: string }

// Usar generics com 'req.body as Payload' MENTE pra você!
const reqData = req.body as PayloadPost; // ❌ Mentira Grosseira!

// Na vida real o json debaixo dos panos era { id: "invalido", cpf: 994 } que o usuário mandou no carteiro postman! O Typescript não segurou nada na porta da API (pois os tipos ali já morreram)!
```

### A Solução Moderna Exata: Validation Libraries Inferidas (Zod)

Ferramentas modernas como o `Zod` resolvem o paradoxo reverso: Primeiro você estipula um **Schema Validatório de Javascript que roda e barra trapaceadores no RunTime Ativo da Porta**, injeta e avalia o Payload dentro dele, e pra gente não ter que codar a "Interface Typescript" pra IDE duplicada na mão, usamos a maravilha do **Infer** do utilitário Zod!

```typescript
import { z } from 'zod';

// 1. Você programa a Validadora e Lógica Javascript Executável pra travar a porta! (Roda no Servidor de Vdd!)
const usuarioSchemaRuntime = z.object({
  nome: z.string().min(3, "Nome muito curto!"),
  idade: z.number().int().min(18),
  tagsSecretas: z.array(z.string()).optional()
});

// 2. A MÁGICA SURGE AQUI! Zod Infer!
// O Zod é inteligente o bastante pra cuspir de volta a interface perfeita TS compilada extraida do Schema nativo sozinho com uma linhazinha apenas! 
type UsuarioTipoEstaticoDaIDE = z.infer<typeof usuarioSchemaRuntime>;
// Isso entrega grátis de volta pra IDE o type exato limpo que tu escreveria pra interface Type sem duplicação de arquivo de contrato!!

// Então na API validamos usando parse... que extirpa as impurezas JSON ou causa um throw fatal nas requisições podres:
const dadosBrutosDaRede = req.body;
const dadosLimpinhosEVivos = usuarioSchemaRuntime.parse(dadosBrutosDaRede); // Type de saída assume 'UsuarioTipoEstaticoDaIDE' automaticamente sem cast sujo falso "as"!
```

O Zod e suas Inferências fecham de fato a trindade da Defesa no Typescript em 2024: IDE Autocomplete seguro + Mapeamento Dinâmico de Types em uma linha + Blindagem do Servidor na requisição ativa!

---
## Flashcards
Principal falha do TS em APIs? :: Os tipos desaparecem após a compilação (Type Erasure), então o TS não protege a porta da sua API contra dados ruins da rede.
O que é o Zod? :: Uma biblioteca de validação em runtime que cria esquemas em JS e permite inferir tipos TS automaticamente a partir deles.
Para que serve o `z.infer<typeof schema>`? :: Ele extrai automaticamente uma Interface TypeScript perfeita do seu esquema de validação Zod, evitando duplicação de definições.

## Conexões
- Type Erasure: [[o-que-e-typescript|Tipos não existem em runtime]] (Fase 1)
- `z.infer` usa: [[5-infer-keyword|Keyword infer]] (Fase 5)
- Alternativa a: [[predicates-asserts|Assertion Functions]] (Fase 3)
- Usado com ORMs: [[4-orms-prisma-drizzle|Prisma e Drizzle]]
