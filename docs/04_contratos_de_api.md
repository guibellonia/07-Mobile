# Contratos de API

## 1. Objetivo
Definir os endpoints REST expostos pelo backend `appJava` para consumo do app mobile `appPessoas`.

## 2. Padrão de versionamento
No código atual, os endpoints não utilizam versionamento de rota. O padrão atual é:
- `/api/pessoas`
- `/api/produtos`

## 3. Autenticação e autorização
Não há autenticação e autorização implementadas.

## 4. Endpoints
### Pessoas
- `GET /api/pessoas`
  - Descrição: lista todas as pessoas.
  - Resposta: `200 OK`
  - Body: array de objetos Pessoa.

- `GET /api/pessoas/{id}`
  - Descrição: retorna a pessoa pelo id.
  - Resposta: `200 OK` se existe, `404 Not Found` se não existe.

- `POST /api/pessoas`
  - Descrição: cria nova pessoa.
  - Resposta: `200 OK` com o objeto criado (o código atual não define `201`).

- `PUT /api/pessoas/{id}`
  - Descrição: atualiza pessoa existente.
  - Resposta: `200 OK` se atualizou, `404 Not Found` se não existe.

- `DELETE /api/pessoas/{id}`
  - Descrição: remove pessoa.
  - Resposta: `204 No Content`.

### Produtos
- `GET /api/produtos`
  - Descrição: lista todos os produtos.
  - Resposta: `200 OK`

- `GET /api/produtos/{id}`
  - Descrição: retorna o produto pelo id.
  - Resposta: `200 OK` se existe, `404 Not Found` se não existe.

- `POST /api/produtos`
  - Descrição: cria novo produto.
  - Resposta: `200 OK` com o objeto criado.

- `PUT /api/produtos/{id}`
  - Descrição: atualiza produto existente.
  - Resposta: `200 OK` se atualizado, `404 Not Found` se não existe.

- `DELETE /api/produtos/{id}`
  - Descrição: remove produto.
  - Resposta: `204 No Content`.

## 5. Requisição e resposta com exemplos JSON reais
### Exemplo Pessoa
Request `POST /api/pessoas`
```json
{
  "nome": "Ana Silva",
  "idade": 28
}
```

Response `200 OK`
```json
{
  "id": 1,
  "nome": "Ana Silva",
  "idade": 28
}
```

### Exemplo Produto
Request `POST /api/produtos`
```json
{
  "nome": "Teclado Mecânico",
  "quantidade": 10,
  "valor": 299.90
}
```

Response `200 OK`
```json
{
  "id": 1,
  "nome": "Teclado Mecânico",
  "quantidade": 10,
  "valor": 299.90
}
```

## 6. Erros esperados
- `404 Not Found` para `GET`, `PUT` ou `DELETE` com id inexistente.
- `500 Internal Server Error` para falhas internas de servidor.
- `400 Bad Request` não está implementado explicitamente no backend atual; as validações ocorrem no app mobile.

## 7. Regras de contrato
- Campos obrigatórios são `nome` para Pessoa e Produto.
- IDs são gerados automaticamente pelo banco e retornados no body.
- O back-end aceita JSON e responde JSON.
- As rotas usam pluralização no caminho.

## 8. Pedido para o Agente Designer de API
Valide se os exemplos JSON e os códigos HTTP estão consistentes com a implementação atual e se há pontos de ambiguidade no contrato.
