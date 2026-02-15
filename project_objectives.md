# 8Tester: Objetivos do Projeto e Mapeamento de Recursos

Este documento descreve a visão estratégica do **8Tester** (Sistema Unificado de Garantia de Qualidade e Evolução) e como cada componente técnico foi desenhado para atingir esses objetivos.

## 🎯 Objetivo Principal
Criar uma plataforma de **QA (Quality Assurance) Autônoma e Personificada** que não apenas aponte erros técnicos, mas atue como um "Squad" de especialistas digitais. O objetivo é transformar a auditoria de sites de uma tarefa técnica e fria em uma experiência interativa, visual e semanticamente rica, acessível tanto para desenvolvedores quanto para gestores.

---

## 🏗️ Arquitetura e Recursos

Abaixo detalhamos como cada módulo do sistema contribui para o objetivo principal.

### 1. O "Squad" de Agentes (Personas)
A decisão de usar **Personas** não é apenas estética; é uma estratégia de UX para categorizar complexidade e tornar os relatórios digeríveis.

| Agente | Função Técnica | Como ajuda no Objetivo |
| :--- | :--- | :--- |
| **Lurdinha** 🕵️‍♀️ | **Link Crawler & Navigation** | Garante que a **experiência de navegação** do usuário final seja fluida, detectando links quebrados (404) e loops de redirecionamento que frustram clientes. |
| **Rosângela** 🛡️ | **Security & Headers Audit** | Protege a **reputação e a segurança** do projeto, verificando vulnerabilidades básicas (HTTPS, Headers de segurança), essenciais para SEO e confiança. |
| **Tereza** 🧹 | **Static Analysis & Linting** | Foca na **manutenibilidade e saúde do código**, garantindo que o projeto não acumule "dívida técnica" que impeça a evolução futura. |
| **Judith** ⚖️ | **Spec Verifier (AI)** | Verifica a **conformidade com o negócio**. Diferente de testes rígidos, usa IA para entender se "O login funciona" semanticamente, alinhando dev e produto. |

### 2. O Auditor (Motor de Coleta)
É o núcleo técnico (backend) que alimenta as personas.
*   **Recurso:** Crawler baseado em `Playwright` e `Cheerio`.
*   **Objetivo:** Simular um usuário real navegando. Ao usar um browser real (Headless Chrome), garantimos que o que o robô vê é exatamente o que o usuário vê (incluindo renderização JS), eliminando falsos positivos comuns em crawlers simples.

### 3. O Spec Verifier (Inteligência Artificial)
Módulo que conecta o 8Tester a LLMs (via OpenRouter).
*   **Recurso:** RAG (Retrieval-Augmented Generation) simplificado.
*   **Objetivo:** Permitir testes subjetivos ou complexos. Em vez de escrever 100 linhas de código para testar se uma imagem é "ofensiva" ou se um texto está "tom de voz correto", usamos IA para julgar com base em contexto, acelerando a criação de testes.

### 4. O Dashboard Interativo (Visualização)
A interface front-end construída em Next.js.
*   **Recurso:** Sidebar persistente, Gráficos de Saúde (Charts), Cards de Agentes.
*   **Objetivo:** **Democratizar os dados**. Um JSON de 10.000 linhas é inútil para um gerente de produto. O Dashboard traduz "50 erros 404" em um "Health Score de 60%", motivando a equipe a melhorar a nota do site (Gamificação).

### 5. Integração Docker & Easypanel (Infraestrutura)
*   **Recurso:** Containers isolados para `Agent` (API) e `Dashboard` (Frontend) comunicando-se via rede interna e volumes compartilhados.
*   **Objetivo:** **Facilidade de Deploy**. O sistema foi desenhado para ser "plug-and-play" em qualquer VPS. A separação em microsserviços garante que, se o Crawler travar em um site pesado, o Dashboard continua acessível.

### 6. Protocolo MCP (Expansibilidade)
*   **Recurso:** Model Context Protocol Server.
*   **Objetivo:** **Futuro e Integração**. Permite que o 8Tester seja controlado por outras IAs (como o Claude Desktop ou IDEs com IA). Isso transforma o 8Tester de uma "ferramenta isolada" em uma "skill" que pode ser invocada por qualquer agente inteligente.

---

## 🚀 Resumo do Fluxo de Valor

1.  **Entrada:** Usuário insere URL no Dashboard.
2.  **Processamento:** O **Auditor** navega, coleta dados e a **IA** analisa contextos.
3.  **Personificação:** Os dados brutos são filtrados pelas lentes de **Lurdinha**, **Tereza**, etc.
4.  **Saída:** Um Relatório Visual e acionável no **Dashboard**, permitindo correção rápida.

---
*Documento gerado em 14 de Fevereiro de 2026 para documentação do projeto 8Tester.*
