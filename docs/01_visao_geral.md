# 01 - Visão geral do sistema

## 1. Objetivo do projeto
Desenvolver o MVP (Produto Mínimo Viável) de um Consolidador de Carteiras Digitais e Investimentos. O sistema funcionará como uma ferramenta analítica de alto valor, baseada no registro manual de Movimentações, permitindo aos usuários visualizar seu patrimônio consolidado, histórico de performance e projeções de juros compostos.

## 2. Problema que o sistema resolve
Acompanhar o patrimônio distribuído em múltiplas Instituições é complexo e fragmentado. Sistemas baseados em Open Finance frequentemente apresentam falhas de sincronização ou preocupações de privacidade, enquanto planilhas manuais demandam muito tempo e conhecimento técnico para calcular rentabilidade real (TWR/XIRR). O sistema resolve isso oferecendo uma interface de lançamento rápido e inteligência de cálculo sobre dados inseridos manualmente pelo usuário.

## 3. Atores envolvidos
* **Usuário Final:** Pessoa física que registra suas Instituições, Ativos e Movimentações para consumir os relatórios e Projeções gerados pelo sistema.

## 4. Escopo inicial, dentro e fora
* **Dentro do Escopo (MVP):**
  * Gestão de Usuários (Autenticação local/PIN e biometria).
  * Cadastro de Instituições (ex: Nubank, XP, Binance) e Ativos (Renda Fixa, Ações, Cripto, Caixinhas).
  * Registro de Movimentações (Ledger: aportes, saques, rendimentos, dividendos).
  * Motor de cálculo de rentabilidade matemática e Snapshots periódicos de patrimônio.
  * Dashboard principal (gráficos, alocação) e Projeções simples de crescimento.
* **Fora do Escopo (MVP):**
  * Qualquer integração automática com bancos ou Web Scraping (proibição absoluta).
  * Rebalanceamento avançado de carteira e alertas inteligentes (reservado para V2).
  * Gestão de metas financeiras complexas e suporte multiusuário baseado em nuvem (reservado para V2/V3).

## 5. Restrições técnicas
* **Backend:** Node.js com framework NestJS. (Justificativa: Fornece arquitetura modular robusta e injeção de dependência natural para separar o Motor de Rentabilidade).
* **Frontend Mobile:** React Native com TypeScript. (Justificativa: Permite entrega multiplataforma rápida mantendo consistência de tipagem com o back-end).
* **Validação:** Zod em ambas as pontas. (Justificativa: Garante que os formulários de entrada manual obedeçam rigidamente à modelagem de dados, bloqueando requisições malformadas).
* **Banco de Dados:** Relacional local via ORM usando SQLite. (Justificativa: Garante a integridade transacional do Ledger financeiro em um ambiente local/offline simplificado e sem custos de infraestrutura de servidor).

## 6. Premissas
* **Arquitetura Ledger:** O "saldo atual" não existe como uma coluna editável e estática. Todo saldo é o resultado calculado de Movimentações registradas no tempo.
* **Privacidade Local Absoluta:** O uso do SQLite garante que os dados financeiros sensíveis do usuário residam unicamente no dispositivo, eliminando a dependência de servidores externos para a persistência principal.

## 7. Segurança e Criptografia Local
Como o aplicativo opera de forma 100% offline, a segurança local funciona como o principal argumento de venda ("Seus dados não ficam em servidores"). O ecossistema será protegido pelas seguintes diretrizes:
* **Criptografia do Banco de Dados:** O arquivo SQLite será integralmente criptografado em repouso (através de extensões como SQLCipher).
* **Bloqueio de Acesso:** Controle de acesso estrito na abertura do aplicativo por meio de Senha/PIN numérico definido pelo usuário ou Autenticação Biométrica nativa (FaceID/TouchID).
* **Gerenciamento de Chaves:** A chave simétrica de decodificação do banco de dados será vinculada ao armazenamento seguro do ecossistema do dispositivo mobile (Keychain no iOS e Keystore no Android), impedindo a extração do arquivo por clonagem de disco.
* **Exportação Segura:** Rotinas de backup local ou exportação (JSON/CSV) deverão gerar arquivos cifrados protegidos por uma senha definida sob demanda pelo usuário no momento do download.

## 8. Riscos conhecidos
* **Risco de Corrupção do Arquivo SQLite:** Como o banco de dados é um arquivo único local, falhas de hardware ou fechamento abrupto do app podem corromper os dados. (Mitigação: Implementar uma rotina de backup local e exportação/importação criptografada de dados).
* **Risco de Performance na Consulta de Ledger:** Calcular a rentabilidade XIRR processando milhares de Movimentações a cada abertura do app pode degradar a UX. (Mitigação: Implementar Snapshots diários/mensais consolidados no banco local).
* **Risco de Inconsistência de Tipagem:** O SQLite não possui um tipo estrito para decimais fixos, o que pode gerar erros de arredondamento em moedas (float). (Mitigação: O banco de dados e o back-end operarão valores financeiros utilizando estritamente números inteiros representando centavos).

## 9. Pedido para o Agente Arquiteto
*(Nota do Agente: Visão técnica expandida com sucesso. A inclusão da cifragem em repouso via SQLite protege o ecossistema local sem comprometer o isolamento de módulos do NestJS).*