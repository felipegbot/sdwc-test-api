# Documentação da Aplicação sdwc-test-api

### Informações do projeto
Esta aplicação foi desenvolvida entre os dias 13 de maio de 2024 e 14 de maio de 2024, ela é destinada ao Teste Técnico proposto pela empresa  [SDWC](https://sdwc.me) (Sanduíche) para a vaga de Desenvolvedor Fullstack Pleno

### Objetivo do sistema
De acordo com o teste técnico: 
> Desenvolver um painel analytics que contabilize acessos de usuários e cliques nos
links de uma página web. A aplicação deve consistir em um frontend para a página
web e uma API em Node.js. A API será responsável por fornecer dados de acesso
diários, e a interface web exibirá um gráfico com o total de acessos por dia e uma
tabela com os links mais acessados nos últimos 7 dias.

Este objetivo foi atingido.

### Tecnologias utilizadas
- A aplicação foi criada usando o framework [NestJs](https://nestjs.com)
- Para o sistema de autentição foram utilizadas as libs bcrypt e passport-js, o modelo de autenticação escolhido foi o JWT (Json Web Token)
- Para os dados do tipo Date foi utilizado a lib moment-timezone para garantir a conversão correta dos dados
- Foi utilizado o TypeOrm como ORM.
- O SGBD escolhido foi o PostgresSql
- Para sistema de cache foi utilizado o Redis

### Estrutura do projeto
- O projeto está dividido em módulos devido majoritariamente à arquitetura do NestJs, cada módulo por sua vez está divido em subpastas que separam as funcionalidades de cada arquivo do projeto, por ex: dtos/, controllers/, services/, interfaces/, etc.
- O projeto não faz uso de nenhum tipo de teste até o momento.


### Informações adicionais
- Para a aplicação funcionar apropriadamente, é necessário estar autenticado, ter links cadastrados no banco e fazer ao menos 1 requisição para o endpoint `/visits/generate-data` utilizando o método `POST`. Com isso as informações serão geradas e a aplicação passará a retornar dados.

---

# Servindo a Aplicação sdwc-test-api

Este tópico fornece instruções sobre como servir a aplicação sdwc-test-api.

### Pré-requisitos

Antes de começar, certifique-se de ter o seguinte:

- Node.js instalado na sua máquina.
- yarn ou npm instalado na sua máquina.

### Servindo em modo de desenvolvimento

Para servir a aplicação em modo de desenvolvimento, siga estas etapas:

1. Certifique-se de ter um banco de dados PostgreSQL em execução.

2. Certifique-se de ter uma instância Redis em execução.

3. Você precisará preencher as seguintes variáveis de ambiente em um arquivo `.env`:

   - `DB_HOST`: O endereço do banco de dados PostgreSQL.
   - `DB_PORT`: A porta do banco de dados PostgreSQL.
   - `DB_USERNAME`: O nome de usuário do banco de dados PostgreSQL.
   - `DB_PASSWORD`: A senha do banco de dados PostgreSQL.
   - `DB_DATABASE`: O nome do banco de dados PostgreSQL a ser utilizado.
   - `REDIS_URL`: O endereço da instância do Redis.
   - `REDIS_PORT`: Porta da instância do Redis.
   - `JWT_SECRET`: Uma chave secreta para assinar e verificar tokens JWT.
   - `PORT`: A porta na qual o servidor será executado.
   - `MODE`: define como a aplicação sera executada, por ora apenas o valor `dev` é utilizado.

4. Execute o seguinte comando para iniciar a aplicação em modo de desenvolvimento:

```
yarn start:dev
```

Com essas instruções, você deverá ser capaz de servir a aplicação sdwc-test-api em modo de desenvolvimento.
