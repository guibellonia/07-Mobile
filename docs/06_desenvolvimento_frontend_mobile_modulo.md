# Desenvolvimento front-end ou mobile, módulo appPessoas

## 1. Contexto do módulo
O app `appPessoas` é um aplicativo Expo React Native para gerenciamento de pessoas e produtos. Ele consome a API REST do backend e oferece telas de listagem, detalhe, cadastro, edição e exclusão.

## 2. Contrato consumido
- `GET /api/pessoas`
- `GET /api/pessoas/{id}`
- `POST /api/pessoas`
- `PUT /api/pessoas/{id}`
- `DELETE /api/pessoas/{id}`
- `GET /api/produtos`
- `GET /api/produtos/{id}`
- `POST /api/produtos`
- `PUT /api/produtos/{id}`
- `DELETE /api/produtos/{id}`

## 3. O que deve ser gerado
- Navegação por abas entre Pessoas e Produtos.
- Listas com refresh.
- Telas de detalhes com ações de editar e excluir.
- Formulários com validação local de campos.
- Feedback visual de sucesso e erro via modais.
- Serviço Axios configurado para consumo da API.

## 4. Experiência esperada
- Carregamento visível com `ActivityIndicator`.
- Mensagens de erro claras quando a API não responde.
- Validação de campos antes de enviar requisições.
- Retorno à lista após operação bem-sucedida.
- Interface consistente entre telas de Pessoa e Produto.

## 5. Testes obrigatórios
- Testes de renderização para cada tela.
- Testes de comportamento dos formulários.
- Verificação de navegação entre listas, detalhes e formulários.
- Verificação de upload de dados para a API.

## 6. Critérios de aceite
- O app abre sem erro em `expo start`.
- A lista de pessoas e produtos é carregada corretamente.
- Formulários aceitam somente dados válidos.
- Erros de rede ou API são exibidos ao usuário.
- O app usa `api.js` para todas as chamadas HTTP.
