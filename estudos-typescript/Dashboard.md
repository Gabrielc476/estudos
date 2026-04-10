# 🧭 Dashboard de Estudos TypeScript

Bem-vindo ao seu Segundo Cérebro de TypeScript! Aqui você acompanha o progresso de domínio das 11 Fases de aprendizado.

---

## 📊 Visão Geral do Domínio

Este gráfico de tabela mostra o nível de confiança que você tem em cada tema.

```dataview
TABLE tema AS "Tópico", dificuldade AS "Dificuldade", domínio AS "Domínio %", revisado AS "Última Revisão"
FROM ""
WHERE tema != null
SORT fase ASC, tema ASC
```

---

## 🚩 Temas para Reforçar (Domínio < 80%)

Foque nestes temas durante suas sessões de Flashcards para elevar seu nível técnico.

```dataview
TABLE tema AS "Tópico", domínio AS "Domínio %"
FROM ""
WHERE tema != null AND domínio < 80
SORT domínio ASC
```

---

## 📂 Organização por Fases

Clique abaixo para ver as anotações de cada etapa:

- **Fase 1**: [[fase-1/resumo-fase1|Introdução e Fundamentos]]
- **Fase 2**: [[fase-2/resumo-fase2|Tipagem de Objetos e Interfaces]]
- **Fase 3**: [[fase-3/narrowing-completo|Narrowing e Guards]]
- **Fase 4**: [[fase-4/tipagem-de-funcoes|Funções e Generics Básicos]]
- **Fase 5**: [[fase-5/1-generic-interfaces-aliases|Generics Avançados e Condicionais]]
- **Fase 6**: [[fase-6/1-mapped-types|Meta-programação e Mapped Types]]
- **Fase 7**: [[fase-7/1-modificadores-acesso|POO e Classes Profundas]]
- **Fase 8**: [[fase-8/1-modulos|Módulos, tsconfig e d.ts]]
- **Fase 9**: [[fase-9/1-branded-types|Padrões de Arquitetura de Tipos]]
- **Fase 10**: [[fase-10/1-performance-type-checker|Performance, Debug e Migração]]
- **Fase 11**: [[fase-11/1-nodejs-typescript|Ecosistema, Frameworks e Testes]]

---

> [!TIP]
> **Como atualizar seu progresso**: 
> Sempre que você se sentir mais confiante em um tema após os Flashcards, abra o arquivo correspondente e mude o valor de `domínio` no cabeçalho (YAML). O Dashboard atualizará automaticamente!
