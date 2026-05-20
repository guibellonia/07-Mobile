# 02 - Requisitos e regras de negócio

## 1. Requisitos funcionais

1. O sistema deve permitir o cadastro manual de Instituições financeiras e de investimento.
2. O sistema deve permitir o cadastro manual de Ativos/Investimentos vinculados a uma Instituição.
3. O sistema deve permitir o registro manual de Movimentações financeiras do tipo: aporte, saque, rendimento, taxa e dividendo.
4. O sistema deve calcular o patrimônio consolidado de cada Ativo e da carteira completa a partir do histórico de Movimentações.
5. O sistema deve exibir um dashboard com gráficos de evolução de patrimônio, alocação de ativos e variação temporal.
6. O sistema deve gerar projeções de crescimento aplicando juros compostos no backend.
7. O sistema deve armazenar os dados localmente usando SQLite, com integridade transacional e valores financeiros em centavos.
8. O sistema deve validar todos os dados de entrada usando Zod no frontend e no backend.
9. O sistema deve suportar autenticação local (PIN/biometria) para proteger o acesso ao app.
10. O sistema deve permitir exportação segura dos dados em formatos como JSON ou CSV, com proteção por senha.

## 2. Requisitos não funcionais

1. A aplicação deve ser modularizada em backend NestJS e frontend React Native com TypeScript.
2. O backend deve usar SQLite local e persistir os dados em formato compatível com o modelo de ledger.
3. A validação de dados deve ser consistente entre cliente e servidor, utilizando Zod como fonte de verdade.
4. O sistema deve ser construído para operar totalmente offline, sem dependências de APIs externas para sincronização de dados.
5. O aplicativo deve tratar valores monetários como inteiros em centavos para evitar erros de precisão do SQLite.
6. Deve existir criptografia de dados em repouso para o arquivo SQLite, com chaves gerenciadas no armazenamento seguro do dispositivo.
7. A interface deve priorizar usabilidade simples para lançamentos manuais e leitura rápida do patrimônio.
8. O aplicativo deve ser compatível com Android e iOS usando React Native.
9. A arquitetura deve prever rotinas de backup/importação do banco local para mitigar risco de corrupção de dados.
10. O sistema deve documentar erros e falhas em respostas de API de forma clara e previsível.

## 3. Regras de negócio

1. O saldo de um ativo ou carteira não pode ser armazenado como campo editável; deve ser calculado a partir do histórico de Movimentações.
2. Toda Movimentação deve ser registrada manualmente pelo usuário; não são permitidas importações ou sincronizações automáticas de instituições financeiras.
3. Movimentações devem ser imutáveis como eventos financeiros; exclusões físicas são proibidas, preferindo soft delete quando necessário.
4. Ativos pertencem a uma Instituição e podem ter tipos distintos como Renda Fixa, Ações, FIIs, Criptomoedas e Caixinhas.
5. O cálculo de rentabilidade deve considerar o momento dos aportes e saques, utilizando fórmulas matemáticas confiáveis (XIRR/TWR ou juros compostos simplificados conforme escopo).
6. Rendimento, taxa e dividendo são tipos de Movimentações que afetam o valor do ativo, e devem ser registrados com data e valor específicos.
7. A exportação de dados deve ser protegida por senha definida pelo usuário no momento do download.
8. A mensagem ao usuário deve deixar claro que os dados são 100% manuais e que nenhuma integração externa foi realizada.
9. O sistema deve tratar Instituições com nomes exclusivos e ativos identificados unicamente dentro da mesma Instituição.
10. Qualquer inconsistência de valor ou entrada inválida deve ser rejeitada pelo backend com erro informativo antes de persistir os dados.

## 4. Casos de uso prioritários

1. Cadastro de Instituição.
2. Cadastro de Ativo vinculado a uma Instituição.
3. Registro de Movimentação de aporte.
4. Registro de Movimentação de saque.
5. Visualização do patrimônio consolidado e da alocação por Instituição/Ativo.
6. Cálculo de projeção de crescimento de patrimônio com juros compostos.
7. Geração de snapshots periódicos para otimizar consultas e gráficos.
8. Autenticação local de acesso ao aplicativo.
9. Exportação segura de dados em JSON ou CSV.
10. Detecção e tratamento de entradas inválidas antes da persistência.

## 5. Critérios de aceite

1. Os endpoints e formulários permitem criar, listar, atualizar e excluir Instituições e Ativos conforme contrato.
2. As Movimentações são gravadas e o patrimônio agregado reflete corretamente o histórico de eventos.
3. O cálculo de saldo não usa campos estáticos; o valor exibido é derivado de Movimentações.
4. O backend valida os payloads com Zod e retorna erros claros em formato JSON.
5. A interface apresenta dashboard com pelo menos patrimônio total e alocação por ativo.
6. As projeções de juros compostos retornam valores plausíveis e consistentes com os inputs.
7. A base local SQLite grava valores de centavos e mantém integridade referencial entre Instituições, Ativos e Movimentações.
8. A exportação gera arquivo protegido e não expõe dados sem senha.
9. O aplicativo funciona offline sem chamadas de rede para sincronização financeira.
10. O sistema segue as regras de negócio do guia e não inclui nenhuma integração automática.

## 6. Dependências entre requisitos

1. O cadastro de Ativos depende do cadastro prévio de uma Instituição.
2. O registro de Movimentações depende da existência de um Ativo associado.
3. O cálculo de patrimônio depende de Movimentações válidas e do modelo de ledger.
4. A criptografia do banco depende da disponibilidade do armazenamento seguro do dispositivo.
5. A exportação segura depende da autenticação e da senha definida pelo usuário.
6. A validação Zod deve ser aplicada em todas as camadas para garantir comportamento consistente.
7. A geração de gráficos depende da persistência correta de Snapshots ou de uma consulta eficiente ao ledger.

## 7. Pedido para o Agente Arquiteto

Organize estes requisitos e regras de negócio em um modelo técnico coerente. Identifique qualquer lacuna ou ambiguidade que impeça a modelagem do banco e a definição dos contratos de API. Destaque especialmente:

- Como garantir que os valores financeiros sejam sempre armazenados como centavos.
- Como expressar a regra de ledger no modelo de domínio sem criar saldo estático.
- Quais entidades são essenciais para suportar os tipos de Movimentação descritos.
- Como a exportação segura deve ser tratada sem comprometer a operação offline do aplicativo.

