# Raio-X Financeiro - Backend

Este é o backend para a aplicação Raio-X Financeiro, desenvolvido com Express.js e PostgreSQL.

## 🚀 Como executar localmente

1. Clone este repositório:
   ```bash
   git clone <url-do-repositorio>
   ```

2. Navegue até a pasta do backend:
   ```bash
   cd backend
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` baseado no `.env.example` e preencha com suas credenciais do PostgreSQL.

5. Execute o script SQL para criar a tabela:
   ```bash
   psql -U seu_usuario -d seu_banco -f schema.sql
   ```

6. Inicie o servidor:
   ```bash
   npm start
   ```

O servidor estará disponível em `http://localhost:3000`.

## 📄 Endpoints

### POST `/quiz`
- Salva os dados de um lead.

### POST `/webhook/paid`
- Atualiza o status de compra de um lead.

### GET `/lead/:email`
- Retorna os dados de um lead pelo email.

## ☁️ Deploy no Railway

1. Clique no botão abaixo para fazer deploy no Railway:

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/thiaguiar/raio-x-amigo-backend&envs=PGHOST,PGUSER,PGPASSWORD,PGDATABASE,PGPORT&PGHOSTDesc=Host+do+PostgreSQL&PGUSERDesc=Usuário+do+PostgreSQL&PGPASSWORDDesc=Senha+do+PostgreSQL&PGDATABASEDesc=Nome+do+banco+de+dados&PGPORTDesc=Porta+do+PostgreSQL)

2. Configure as variáveis de ambiente no Railway com base no `.env.example`.

3. O Railway criará automaticamente o banco PostgreSQL e o backend.