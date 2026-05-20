# Desenvolvimento back-end, módulo CRUD de Pessoas e Produtos

## 1. Contexto do módulo
O backend `appJava` implementa a API REST e a persistência em PostgreSQL para as entidades `Pessoa` e `Produto`. Ele é responsável por expor endpoints para listagem, consulta, criação, atualização e exclusão.

## 2. Requisitos técnicos
- Java 17
- Spring Boot 4
- Spring Data JPA
- Spring MVC
- PostgreSQL
- Maven (`./mvnw`)
- `spring.jpa.hibernate.ddl-auto=update` em desenvolvimento

## 3. Contrato da API consumido
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

## 4. O que deve ser gerado
- Classes de modelo `Pessoa` e `Produto`.
- Repositórios JPA para cada entidade.
- Serviços para lógica de CRUD.
- Controllers REST para cada recurso.
- Configuração de banco e CORS.

## 5. Testes obrigatórios
- Teste de contexto do Spring Boot (já existente em `ProjetoApplicationTests`).
- Testes de integração para endpoints REST.
- Testes de serviço para salvar, buscar, atualizar e deletar.

## 6. Critérios de aceite
- O backend compila com `./mvnw clean package`.
- O contexto do Spring Boot carrega sem erro.
- Os endpoints REST respondem conforme contrato.
- O banco PostgreSQL persiste `Pessoa` e `Produto` corretamente.
- A API retorna `404` para recursos não encontrados.
