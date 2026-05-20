# 09 - Glossário de domínio

## 1. Termos do negócio
Este dicionário compartilhado blinda o projeto contra o uso de jargões que sugiram automações inexistentes e padroniza os conceitos financeiros.

| Termo | Definição | Sinônimos Proibidos | Exemplo de Uso |
| :--- | :--- | :--- | :--- |
| **Instituição** | Entidade onde o dinheiro está alocado (banco, corretora, exchange ou local físico). Cadastrada manualmente. | Banco Externo, Sincronização Bancária. | "O usuário cadastrou a *Instituição* XP Investimentos." |
| **Ativo** | Representação de um investimento ou reserva de valor (Ações, Renda Fixa, Cripto, Caixinha) atrelado a uma Instituição. | Produto Automático. | "O usuário adicionou o *Ativo* Tesouro Selic." |
| **Movimentação** | Registro imutável de um evento financeiro lançado manualmente pelo usuário (Aporte, Saque, Rendimento, Dividendo, Taxa). | Transação Sincronizada, Fetch Bancário. | "O app registrou uma *Movimentação* de Aporte." |
| **Renda Passiva** | Valores recebidos provindos de rendimentos de ativos (Dividendos, Juros, Aluguéis de FIIs). | Scraping de Proventos. | "A *Renda Passiva* deste mês foi de R$ 100." |
| **Projeção** | Cálculo matemático de expectativa de crescimento do patrimônio futuro baseado em juros compostos. | Previsão de IA, Bola de Cristal. | "A *Projeção* para 5 anos exige um aporte maior." |

---

## 2. Termos técnicos

| Termo | Definição | Contexto de Uso |
| :--- | :--- | :--- |
| **Ledger (Livro-razão)** | Padrão arquitetural onde o saldo não é um campo estático editável, mas sim o somatório calculado de todas as *Movimentações* associadas a um ativo. | Arquiteto e Back-end (Modelagem e Lógica). |
| **Snapshot** | Registro estático gerado periodicamente (ex: fim do dia) com o saldo total consolidado naquele momento. Serve para otimizar o carregamento de gráficos sem recalcular o Ledger inteiro. | Arquiteto e Back-end (Cronjobs / Services). |
| **TWR / XIRR** | Métodos matemáticos (Time-Weighted Return e Extended Internal Rate of Return) para calcular a verdadeira rentabilidade da carteira, isolando ou considerando o peso das datas dos aportes e saques. | Back-end (Motor de Rentabilidade). |
| **Soft Delete** | Exclusão lógica (`deleted_at`). Nenhum dado é apagado via `DELETE` físico. | Banco de Dados e Back-end. |

---

## 3. Convenções de nomenclatura

| Elemento | Padrão Exigido | Exemplo |
| :--- | :--- | :--- |
| **Tabelas do Banco (SQL)** | `snake_case`, plural, em inglês (recomendado para código). | `institutions`, `assets`, `transactions`, `snapshots` |
| **Campos do Banco (SQL)** | `snake_case`. | `amount`, `transaction_date`, `asset_id` |
| **Endpoints da API (REST)** | `kebab-case`, substantivos no plural, com versionamento. | `/api/v1/transactions`, `/api/v1/assets` |
| **Variáveis e Funções** | `camelCase`. | `calculateXirr()`, `generateSnapshot()` |
| **Classes, Interfaces** | `PascalCase`. | `TransactionEntity`, `CreateAssetDto` |

---

## 4. Termos ambíguos resolvidos
*(Seção a ser preenchida durante a evolução do projeto caso agentes entrem em conflito sobre termos).*

---

## 5. Pedido para o Agente Documentador
Mantenha este arquivo consistente. Toda nova definição ou resolução de ambiguidade deve ser adicionada aqui, mediante aprovação do Humano Validador.