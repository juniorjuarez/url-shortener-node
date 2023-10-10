# Projeto de Estudos - URL Shortener

Este é um projeto de estudos para criar um encurtador de URL simples usando Node.js e PostgreSQL.

## Requisitos

- Node.js
- PostgreSQL

## Configuração

1. Clone o repositório para sua máquina local:

   ```bash
   git clone https://github.com/seu-usuario/url-shortener.git
   cd url-shortener
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente:

   ```env
   PORT=3000
   CONECTION_STRING=your_postgresql_connection_string
   ```

4. Crie o banco de dados PostgreSQL e execute as migrações:

   ```bash
   npm run migrate
   ```

## Uso

### Iniciar o servidor

Para iniciar o servidor, execute:

```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`.

### Rotas

#### Listar todas as URLs

- Método: GET
- URL: `/urls`

Esta rota retorna todas as URLs encurtadas armazenadas no banco de dados.

#### Listar URL por ID

- Método: GET
- URL: `/urls/:id`

Esta rota retorna uma URL específica com base no ID fornecido como parâmetro.

#### Encurtar uma nova URL

- Método: POST
- URL: `/urls`
- Corpo da Requisição:

```json
{
  "original_url": "https://www.example.com"
}
```

Esta rota cria uma nova URL encurtada no banco de dados.

#### Atualizar o status de uma URL

- Método: PATCH
- URL: `/urls/:id`
- Corpo da Requisição:

```json
{
  "is_active": true
}
```

Esta rota atualiza o status (ativo ou inativo) de uma URL com base no ID fornecido como parâmetro.

## Contribuição

Sinta-se à vontade para contribuir com melhorias para este projeto. Abra um problema (issue) ou envie um pedido de pull (pull request).

## Licença

Este projeto é licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter detalhes.

---

Este é um projeto simples para fins de estudo. Use-o como base para aprender mais sobre Node.js, PostgreSQL e desenvolvimento de APIs RESTful.
