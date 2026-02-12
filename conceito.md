# Conceito: Sistema Universal de Garantia de Qualidade e Evolução (SUGQE)

> **Missão:** Erradicar defeitos, validar objetivos de negócio e evoluir o código através de inteligência artificial autônoma e colaborativa.

Este documento detalha a arquitetura e o fluxo de trabalho para um sistema robusto de testes automatizados, desenhado para validar não apenas a funcionalidade técnica (links, botões), mas também o cumprimento dos objetivos de negócio, utilizando IA para análise e correção ativa.

---

## 1. Arquitetura do Sistema

O sistema é composto por quatro módulos principais que operam em ciclo contínuo:

### 1.1. O Auditor (The Auditor) - *Coleta e Validação*
Responsável por "varrer" o projeto em busca de inconsistências factuais e estruturais.
- **Link Crawler:** Verifica todos os links internos e externos, identificando 404s, redirects quebrados e timeouts.
- **Asset Validator:** Confere se imagens, vídeos e fontes carregam corretamente e estão otimizados.
- **Interactables Checker:** Testa programaticamente todos os éléments interativos (`<button>`, `<a>`, inputs) para garantir que possuam handlers anexados e não gerem erros de console ao serem acionados.
- **Accessibility Scanner:** Valida WCAG 2.1 (A/AA) para garantir inclusão.

### 1.2. O Verificador de Especificação (The Spec Verifier) - *Objetivos do Projeto*
Diferente de testes convencionais, este módulo usa IA (LLM via RAG) para comparar o **Software Construído** com a **Documentação de Requisitos**.
- **Input:** Lê `README.md`, `specs/`, e tickets do Jira/Linear.
- **Processo:** Transforma requisitos em "Critérios de Aceite Semente".
- **Execução:** Gera testes E2E dinâmicos (via Playwright/Cypress) para validar se os fluxos críticos de negócio (ex: "Usuário deve conseguir comprar um item") estão funcionando conforme o objetivo, não apenas tecnicamente.

### 1.3. O Executor de Testes (The Test Runner) - *Padrões e TDD*
Executa a suíte de testes existente, enforcing os padrões definidos nas skills do projeto.
- **Strict TDD Guard:** Impede commits de "features" sem testes correspondentes (baseado na skill `test-driven-development`).
- **Pattern Enforcer:** Analisa estaticamente os testes para garantir o uso de Factories, Mocking correto e descrições comportamentais (baseado na skill `testing-patterns`).

### 1.4. O Agente de Evolução (The Evolution Agent) - *Análise e Correção*
Uma IA autônoma que orquestra a correção e melhoria do código.

---

## 2. Integração de Skills (A "Salsa Secreta")

O diferencial deste sistema é a aplicação codificada das skills da equipe.

### 2.1. Skill: `brainstorming` (O Protocolo Socrático)
**Onde:** Interface de Chat do Sistema.
**Como:**
Quando o sistema detecta uma falha complexa ou ambiguidade nos requisitos (ex: "O botão está feio"), a IA não tenta adivinhar. Ela ativa o **Protocolo Socrático**:
1. **Pare:** Não altera o código.
2. **Pergunte:** Gera 3 perguntas estratégicas para o desenvolvedor (ex: "Qual o objetivo de design deste botão?", "Existe um guide de estilo?", "Isso bloqueia o lançamento?").
3. **Aguarde:** Só propõe a correção após o alinhamento.
*Isso evita o desperdício de tokens e refatorações indesejadas.*

### 2.2. Skill: `test-fixing` (Correção Sistemática)
**Onde:** Pipeline de CI/CD e Loop de Desenvolvimento.
**Como:**
Ao encontrar falhas, o Agente de Evolução segue rigorosamente o algoritmo da skill:
1. **Agrupamento Inteligente:** Agrupa erros por tipo (Import, Lógica, Dependência) e não por arquivo.
2. **Priorização:** Corrige infraestrutura antes de lógica de negócio.
3. **Iteração:** Aplica uma correção -> Roda subconjunto de testes -> Verifica -> Próximo grupo.
*Isso transforma um log de erro de 1000 linhas em um plano de ação estruturado de 5 passos.*

### 2.3. Skill: `agent-tool-builder` (Ferramentas da IA)
**Onde:** O "Cérebro" do Agente.
**Como:**
A IA não "alucina" comandos. Ela possui um set de ferramentas construídas comschemas JSON rigorosos (MCP):
- `scan_project(scope: "full" | "quick")`: Retorna relatório estruturado.
- `propose_fix(file: string, error_context: json)`: Gera diffs baseados no contexto.
- `verify_spec(requirement: string)`: Retorna boleano de cumprimento de objetivo.
*Cada ferramenta tem tratamento de erro explícito, garantindo que o Agente saiba quando falhou e possa tentar outra abordagem.*

---

## 3. Fluxo de Trabalho (The Workflow)

1. **Trigger:** Commit, PR ou agendamento noturno.
2. **Deep Scan:** O **Auditor** varre o projeto. (Relatório: Links, Assets, A11y).
3. **Test Run:** O **Executor** roda a suíte (Unit + E2E). Falhas são capturadas.
4. **Spec Check:** O **Verificador** valida se as novas mudanças quebraram objetivos de negócio antigos.
5. **AI Synthesis:** O **Agente de Evolução** compila todos os dados.
    - *Se houver erros simples:* Auto-fix (com `test-fixing`).
    - *Se houver erros complexos:* Inicia diálogo (com `brainstorming`).
6. **Reporting:** Gera um dashboard com status visual (ícones da skill `brainstorming`: ✅ 🔄 ⏳ ❌).

---

## 4. Próximos Passos para Implementação

1. **Setup do Runner:** Configurar Playwright para o "Auditor" (Scan de links e botões).
2. **Ingestão de Skills:** Criar prompts de sistema que leiam os arquivos `.md` das skills e instruam o Agente.
3. **Integração MCP:** Desenvolver o servidor MCP que expõe as ferramentas de teste para o Agente.
4. **Dashboard:** Criar interface (React/Next.js) para visualizar os relatórios e chutar o "Agente Socrático".

---


## 5. Equipe de Agentes Virtuais (Personas)

O sistema é personificado em 4 agentes especialistas, cada uma com foco distinto:

### 5.1. Lurdinha (Navegação & Implementação)
* "A incansável curadora de links."*
- **Missão:** Testar todos os links e itens de menu. Verificar se todas as páginas estão implementadas (sem 404s ou placeholders esquecidos).
- **Tech:** Baseada no módulo **Auditor (Crawler)**.
- **Saída:** Relatório de Links Quebrados e Estrutura de Navegação.

### 5.2. Tereza (Boas Práticas & Código)
*"A guardiã da qualidade."*
- **Missão:** Verificar se arquivos e estrutura seguem os padrões (Clean Code, Project Structure).
- **Tech:** Análise Estática, Linters, verificação de padrões de pastas.
- **Saída:** Relatório de "Code Smell" e Violações de Estrutura.

### 5.3. Judith (Conceito & Produto)
*"A visionária do produto."*
- **Missão:** Verificar se o produto final alinha com o `conceito.md` e buscar erros funcionais/visuais.
- **Tech:** **Spec Verifier (AI)** + Análise de Console Logs + Screenshots (Vision AI).
- **Saída:** Relatório de Discrepância de Conceito e Erros de Execução.

### 5.4. Rosangela (Segurança)
*"A chefe de segurança."*
- **Missão:** Seguir critérios mínimos de segurança (Headers, Dependências vulneráveis, Exposição de dados).
- **Tech:** `npm audit`, Check de Headers HTTP (CSP, HSTS), Varredura de Secrets.
- **Saída:** Relatório de Vulnerabilidades.

---

