# 00 - Regras Universais e Orientação Geral do Sistema

## 1. Visão Geral e Proposta de Valor
O projeto consiste em um **Consolidador de Carteiras Digitais e Investimentos**. Como não haverá sincronização bancária, o valor do aplicativo reside na **experiência rápida de lançamento manual, clareza visual, inteligência sobre o patrimônio e projeções financeiras**.

### 🚨 PREMISSA CRÍTICA ABSOLUTA: INTEGRAÇÃO 100% MANUAL
* **NÃO EXISTE Open Finance, web scraping ou qualquer tipo de integração automática com APIs bancárias ou corretoras.**
* Toda e qualquer inclusão de dados é feita **estritamente de forma manual** pelo usuário.
* Nenhum agente está autorizado a desenhar fluxos automatizados de sincronização externa.

---

## 2. Stack Tecnológica Obrigatória
* **Backend:** Node.js + NestJS (TypeScript, arquitetura modular nativa, injeção de dependências).
* **Frontend Mobile:** React Native + TypeScript.
* **Validação de Dados:** **Zod** (Obrigatório no Frontend e Backend para garantir a integridade dos payloads).
* **Banco de Dados:** SQLite. 

---

## 3. Escopo Funcional e Arquitetura Core (O que o sistema faz)
O desenvolvimento será dividido por fases. O escopo atual foca estritamente no **MVP**.

### 3.1. O Coração do Sistema (Regra de Ouro da Arquitetura)
* **Proibição de Saldo Estático:** O "saldo atual" de uma conta ou ativo **NUNCA** deve ser a fonte primária de verdade. 
* **Ledger (Movimentações):** O sistema deve ser baseado no histórico de eventos. O saldo atual é sempre o **resultado do cálculo das movimentações** (aportes, saques, rendimentos, taxas, dividendos). Isso garante a integridade de gráficos de histórico e cálculos de performance.

### 3.2. Módulos do MVP
1. **Gestão de Usuário e Segurança:**
   * Criação de conta, autenticação segura e foco em privacidade dos dados.
2. **Cadastros Base:**
   * **Instituições:** Bancos, corretoras, exchanges, carteiras físicas (nome, tipo, moeda, cor).
   * **Ativos/Investimentos:** Renda fixa, ações, FIIs, cripto, caixinhas/metas (vinculados a uma instituição).
3. **Ledger (Movimentações):**
   * Registro manual de eventos (aporte, saque, rendimento, transferência, taxa, dividendo).
4. **Motor de Cálculos e Snapshots:**
   * **Performance Real:** Cálculo de rentabilidade utilizando métodos precisos considerando aportes no tempo (XIRR/TWR).
   * **Snapshots:** Geração de registros consolidados diários/mensais no banco para facilitar a plotagem de gráficos no dashboard sem precisar recalcular todo o ledger.
5. **Dashboard e Projeções:**
   * Visão geral de patrimônio, variação, alocação por categoria e gráficos temporais.
   * Projeção de juros compostos calculada no Backend: $$M = P(1+i)^n$$

*(Nota: Metas detalhadas, rebalanceamento e alertas inteligentes ficam reservados para a V2 do produto).*

---

## 4. Regras de Ouro dos Agentes (Protocolo de Atuação)
1. **Leitura Obrigatória:** Você deve ler este arquivo (`00`) e o Glossário (`09`) antes de processar qualquer tarefa.
2. **Fidelidade ao Contrato Anterior:**
   * O **Arquiteto** deve modelar o banco focando na tabela de movimentações como base de tudo.
   * O **Designer de API** não inventa rotas que o Arquiteto não modelou.
   * O **Back-end** e **Front-end** codificam exatamente o que está no contrato (`04`), aplicando validações **Zod**.
3. **Protocolo de Divergência:** Encontrou ambiguidade ou contradição? **PARE IMEDIATAMENTE**. Registre no Log (`08`) e aguarde a decisão do Humano. Não tente adivinhar.
4. **Validação Humana:** Avance para o próximo passo/módulo apenas após a aprovação explícita do Humano.