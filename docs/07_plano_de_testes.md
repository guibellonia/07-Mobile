# Plano de testes

## 1. Objetivo
Definir como validar o projeto `appJava` e `appPessoas` em termos de arquitetura, implementação e experiência do usuário.

## 2. Testes de arquitetura
- Verificar se o backend compila com Java 17 e Spring Boot 4.
- Verificar se o arquivo `application.properties` está apontando para PostgreSQL.
- Confirmar que o app mobile usa Expo e React Navigation.

## 3. Testes de back-end
- Executar `./mvnw clean package`.
- Executar `./mvnw test`.
- Testar manualmente os endpoints com ferramentas como Postman ou curl.
- Validar os retornos: `200` para listagem e criação, `404` para recurso inexistente, `204` para exclusão.

## 4. Testes de front-end ou mobile
- Executar `expo start` e abrir no emulador ou dispositivo.
- Validar fluxo de cadastro, edição, visualização e exclusão de pessoa.
- Validar fluxo de cadastro, edição, visualização e exclusão de produto.
- Confirmar que erros de rede exibem mensagens adequadas.

## 5. Critérios de aprovação
- Backend e mobile funcionam integrados com a mesma base URL.
- O usuário consegue completar o fluxo CRUD para ambas as entidades.
- As mensagens de validação aparecem antes de enviar dados inválidos.
- O app não trava em caso de falha de comunicação com a API.

## 6. Evidências
- Logs de execução do Maven e do Expo.
- Prints ou descrições do comportamento de telas.
- Resultado dos testes unitários e de integração.

## 7. Pedido para o Agente de QA
Organize estes testes por prioridade e registre todas as falhas encontradas com passos de reprodução claros.
