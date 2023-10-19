Claro, aqui está o README atualizado com o exemplo JSON:

````markdown
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
````

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente:

   ```env
   PORT=3000
   CONECTION_STRING=your_postgresql_connection_string
   HOST=http://localhost:3000/url/
   ```

4. Crie o banco de dados PostgreSQL e execute as migrações:

   ```bash
   npm run migrate
   ```

5. Execute as seguintes instruções SQL no seu banco de dados PostgreSQL para criar a tabela `url_shortener`:

```sql
-- Table: public.url_shortener

-- DROP TABLE IF EXISTS public.url_shortener;

CREATE TABLE IF NOT EXISTS public.url_shortener
(
    id integer NOT NULL DEFAULT nextval('url_shortener_id_seq'::regclass),
    original_url text COLLATE pg_catalog."default" NOT NULL,
    shortened_url text COLLATE pg_catalog."default" NOT NULL,
    clicks integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    is_active boolean DEFAULT true,
    CONSTRAINT url_shortener_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.url_shortener
    OWNER to postgres;
```

## Uso

### Iniciar o servidor

Para iniciar o servidor, execute:

```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`.

### Rotas

A aplicação possui as seguintes rotas:

1. **Listar todas as URLs:**

   - Método: GET
   - URL: `/urls`
   - Descrição: Esta rota retorna todas as URLs encurtadas armazenadas no banco de dados.

   Exemplo de resposta:

   ```json
   [
     {
       "id": 1,
       "original_url": "youtube.com",
       "shortened_url": "TESTE/google.ocm",
       "clicks": 1,
       "created_at": "2023-10-08T16:36:12.342Z",
       "updated_at": "2023-10-08T16:36:12.342Z",
       "is_active": false
     }
   ]
   ```

2. **Listar URL por ID:**

   - Método: GET
   - URL: `/urls/:id`
   - Descrição: Esta rota retorna uma URL específica com base no ID fornecido como parâmetro.

3. **Encurtar uma nova URL:**

   - Método: POST
   - URL: `/urls`
   - Corpo da Requisição: `{ "original_url": "https://www.example.com" }`
   - Descrição: Esta rota cria uma nova URL encurtada no banco de dados.

4. **Atualizar o status de uma URL:**

   - Método: PATCH
   - URL: `/urls/:id`
   - Corpo da Requisição: `{ "is_active": true }`
   - Descrição: Esta rota atualiza o status (ativo ou inativo) de uma URL com base no ID fornecido como parâmetro.

5. **Redirecionar para URL original:**

   - Método: GET
   - URL: `/url/:url`
   - Descrição: Esta rota redireciona para a URL original correspondente com base no código encurtado fornecido.

## Contribuição

Sinta-se à vontade para contribuir com melhorias para este projeto. Abra um problema (issue) ou envie um pedido de pull (pull request).

## Licença

Este projeto é licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter detalhes.

---

Este é um projeto simples para fins de estudo. Use-o como base para aprender mais sobre Node.js, PostgreSQL e desenvolvimento de APIs RESTful.

```

Certifique-se de substituir "your_postgresql_connection_string" com sua própria string de conexão PostgreSQL. Certifique-se também de ajustar as rotas conforme necessário para o seu projeto.
```
