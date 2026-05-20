# Modelagem de banco de dados

## 1. Objetivo da modelagem
Descrever as entidades persistidas pelo backend e garantir que o modelo suporte o CRUD de pessoas e produtos.

## 2. Entidades principais
- `pessoas`
  - `id`: chave primária auto-gerada.
  - `nome`: texto.
  - `idade`: inteiro.
- `produtos`
  - `id`: chave primária auto-gerada.
  - `nome`: texto.
  - `quantidade`: inteiro.
  - `valor`: decimal.

## 3. Relacionamentos
Não há relacionamento entre `pessoas` e `produtos`. As duas entidades são independentes.

## 4. Normalização e justificativa
A modelagem está em 3ª forma normal: cada entidade armazena apenas atributos que pertencem a si mesma, sem repetição ou dependência transitiva.

## 5. Padrões obrigatórios
- Chave primária: `BIGSERIAL`/`IDENTITY` auto-gerada.
- Nomes de tabelas em plural: `pessoas`, `produtos`.
- Campos JSON seguem `camelCase`: `nome`, `idade`, `quantidade`, `valor`.
- Endpoints usam rota plural: `/api/pessoas`, `/api/produtos`.

## 6. Estratégia de migração
Atualmente o backend usa `spring.jpa.hibernate.ddl-auto=update` para criar/atualizar esquema em desenvolvimento. Em produção, recomenda-se migrar para ferramenta dedicada como Flyway ou Liquibase.

## 7. Script inicial
```sql
CREATE TABLE pessoas (
  id BIGSERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  idade INTEGER
);

CREATE TABLE produtos (
  id BIGSERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  quantidade INTEGER,
  valor NUMERIC(15,2)
);
```

## 8. Pedido para o Agente Arquiteto
Verifique se a modelagem atende ao escopo atual e identifique possíveis melhorias de integridade ou desempenho.
