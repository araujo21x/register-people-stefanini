# Register Service - Backend

Este é o serviço backend do projeto Register People Stefanini, desenvolvido com NestJS.

## 📋 Descrição

O Register Service é uma API REST desenvolvida em NestJS que fornece funcionalidades de autenticação e gerenciamento de pessoas. O projeto utiliza:

- **NestJS** - Framework para construção de aplicações server-side
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Docker** - Containerização

## 🚀 Como executar o projeto

### Pré-requisitos

- Node.js (versão 22 ou superior)
- npm
- PostgreSQL (se executando localmente)
- Docker e Docker Compose (opcional)

### Instalação e execução local

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run start:dev

# Executar em modo produção
npm run start:prod

# Executar em modo debug
npm run start:debug
```

### Comandos disponíveis

```bash
# Desenvolvimento
npm run start:dev      # Executa em modo watch
npm run start:debug    # Executa em modo debug

# Produção
npm run start:prod     # Executa em modo produção
npm run start          # Executa normalmente

# Build
npm run build          # Compila o projeto

# Linting e formatação
npm run lint           # Executa ESLint
npm run format         # Formata o código com Prettier
```

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Configurações do Banco de Dados
POSTGRES_DB=register_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=sua_senha_aqui
DATABASE_URL=postgresql://postgres:sua_senha_aqui@localhost:5432/register_db?schema=public

# Configurações da Aplicação
PORT=9000
NODE_ENV=development
JWT_SECRET=seu_secret_aqui
JWT_EXPIRES_IN=7d

# Configurações de Segurança
JWT_SECRET=seu_jwt_secret_aqui
```

### Explicação das variáveis:

- **POSTGRES_DB**: Nome do banco de dados PostgreSQL
- **POSTGRES_USER**: Usuário do banco de dados
- **POSTGRES_PASSWORD**: Senha do banco de dados
- **DATABASE_URL**: URL de conexão com o banco de dados
- **PORT**: Porta onde a aplicação será executada
- **NODE_ENV**: Ambiente de execução (development, production, test)
- **JWT_SECRET**: Chave secreta para assinatura dos tokens JWT
- **JWT_EXPIRES_IN**: duração do token

## 🐳 Docker

### Docker Compose do Backend (este diretório)

Este diretório contém um `docker-compose.yml` que executa apenas o backend e o banco de dados:

```bash
# Executar apenas o backend e banco de dados
docker-compose up -d

# Executar em modo detached (background)
docker-compose up -d

# Parar os containers
docker-compose down

# Reconstruir as imagens
docker-compose up --build -d

# Visualizar logs
docker-compose logs -f register-service
```

### Docker Compose Completo (raiz do projeto)

**⚠️ Importante**: Na raiz do projeto existe um `docker-compose.yml` completo que executa:
- Backend (register-service)
- Frontend (register-web) 
- Banco de dados (register-db)

Para executar o projeto completo:

```bash
# Na raiz do projeto
docker-compose up -d
```

### Comandos Docker úteis

```bash
# Construir imagem do backend
docker build -t register-service .

# Executar container do backend
docker run -p 9000:9000 --env-file .env register-service

# Acessar container em execução
docker exec -it register-service sh

# Visualizar logs
docker logs register-service
```

## 📁 Estrutura do Projeto

```
register-service/
├── src/
│   ├── modules/
│   │   ├── v1/           # API v1
│   │   │   ├── auth/     # Autenticação
│   │   │   ├── people/   # Gerenciamento de pessoas
│   │   │   └── health/   # Health check
│   │   └── v2/           # API v2 (versão mais recente)
│   ├── shared/           # Código compartilhado
│   ├── database/         # Configurações do banco
│   └── main.ts           # Ponto de entrada
├── prisma/               # Schema e migrações do banco
├── docker-compose.yml    # Docker do backend
└── Dockerfile           # Imagem Docker
```

## 🔗 Endpoints da API

A API está disponível em duas versões:

- **v1**: `/api/v1`
- **v2**: `/api/v2`

### Principais endpoints:

- `POST /api/v2/auth/login` - Login
- `POST /api/v2/auth/register` - Registro de usuário
- `GET /api/v2/people` - Listar pessoas
- `POST /api/v2/people` - Criar pessoa
- `GET /api/v2/people/:id` - Buscar pessoa
- `PUT /api/v2/people/:id` - Atualizar pessoa
- `DELETE /api/v2/people/:id` - Deletar pessoa

## 📚 Documentação da API

A documentação Swagger está disponível em:
- **link**: `http://localhost:9000/api/documentation`

## 🛠️ Desenvolvimento

### Migrações do Banco

```bash
# Gerar migração
npx prisma migrate dev --name nome_da_migracao

# Aplicar migrações
npx prisma migrate deploy

# Reset do banco (cuidado!)
npx prisma migrate reset

# Gerar cliente Prisma
npx prisma generate
```

### Studio do Prisma

```bash
# Abrir interface visual do banco
npx prisma studio
```