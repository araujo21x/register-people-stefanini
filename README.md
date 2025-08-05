# Sistema de Registro de Pessoas - Stefanini

## 📋 Descrição da Aplicação

Este é um sistema completo de registro e gerenciamento de pessoas desenvolvido para a Stefanini. A aplicação consiste em:

### 🏗️ Arquitetura
- **Backend**: API REST desenvolvida em NestJS com TypeScript
- **Frontend**: Interface web desenvolvida em React com TypeScript e Vite
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Autenticação**: JWT (JSON Web Tokens)

### 🚀 Funcionalidades
- **Autenticação de usuários** (login/registro)
- **CRUD completo de pessoas** (criar, listar, atualizar, deletar)
- **Gerenciamento de endereços** para cada pessoa
- **Validação de CPF** brasileiro
- **Interface responsiva** com design moderno
- **API versionada** (v1 e v2)
- **Documentação automática** com Swagger

### 🏛️ Estrutura do Projeto
```
register-people-stefanini/
├── register-service/     # Backend (NestJS)
├── register-web/         # Frontend (React + Vite)
├── docker-compose.yml    # Orquestração completa
└── README.md
```

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Configurações do Banco de Dados
POSTGRES_DB=register_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=sua_senha_aqui

# Configurações da API (Backend)
PORT=9000
NODE_ENV=development
JWT_SECRET=seu_jwt_secret_aqui
JWT_EXPIRES_IN=7d

# Configurações do Frontend
VITE_PORT=3000
VITE_BASE_URL_PREFIX_V1=api/v1
```

### 📝 Explicação das Variáveis

#### Banco de Dados
- **POSTGRES_DB**: Nome do banco de dados PostgreSQL
- **POSTGRES_USER**: Usuário do banco de dados
- **POSTGRES_PASSWORD**: Senha do banco de dados

#### Backend (register-service)
- **PORT**: Porta onde a API será executada (padrão: 9000)
- **NODE_ENV**: Ambiente de execução (development, production, test)
- **JWT_SECRET**: Chave secreta para assinatura dos tokens JWT
- **JWT_EXPIRES_IN**: Duração do token JWT (padrão: 7d)

#### Frontend (register-web)
- **VITE_PORT**: Porta onde o frontend será executado (padrão: 3000)
- **VITE_BASE_URL_PREFIX_V1**: Prefixo da API v1

## 🚀 Como Rodar

### Pré-requisitos
- Docker e Docker Compose instalados
- Node.js 18+ (para desenvolvimento local)
- PostgreSQL (para desenvolvimento local)

### 🐳 Usando Docker (Recomendado)

#### Executar Aplicação Completa
```bash
# Na raiz do projeto
docker-compose up -d
```

#### Comandos Docker Úteis
```bash
# Executar em background
docker-compose up -d

# Parar todos os containers
docker-compose down

# Reconstruir as imagens
docker-compose up --build -d

# Visualizar logs
docker-compose logs -f

# Logs de um serviço específico
docker-compose logs -f register-service
docker-compose logs -f register-web
docker-compose logs -f register-db
```

### 💻 Desenvolvimento Local

#### Backend (register-service)
```bash
cd register-service

# Instalar dependências
npm install

# Configurar banco de dados
npx prisma migrate deploy
npx prisma generate

# Executar em modo desenvolvimento
npm run start:dev

# Executar em modo produção
npm run start:prod
```

#### Frontend (register-web)
```bash
cd register-web

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run start:dev

# Build para produção
npm run build

# Preview da build
npm run start
```

## 🐳 Docker

### Containers Disponíveis

1. **register-db**: Banco de dados PostgreSQL
   - Porta: 5432
   - Volume persistente para dados
   - Nome do container: `register-db-stefanini-test`

2. **register-service**: API Backend (NestJS)
   - Porta: 9000 (configurável via PORT)
   - Depende do banco de dados
   - Executa migrações automaticamente
   - Nome do container: `register-service-stefanini-test`

3. **register-web**: Interface Frontend (React)
   - Porta: 3000 (configurável via VITE_PORT)
   - Depende do backend
   - Interface responsiva
   - Nome do container: `register-web-stefanini-test`

### Comandos Docker Essenciais

#### Executar Aplicação Completa
```bash
# Executar todos os serviços em background
docker-compose up -d

# Executar e mostrar logs
docker-compose up

# Parar todos os containers
docker-compose down

# Parar e remover volumes
docker-compose down -v
```



#### Acessar e Monitorar Containers
```bash
# Acessar containers em execução
docker exec -it register-service-stefanini-test sh
docker exec -it register-web-stefanini-test sh
docker exec -it register-db-stefanini-test psql -U postgres

# Limpar recursos Docker
docker-compose down -v  # Remove volumes também
docker system prune     # Remove recursos não utilizados
```

## 🌐 Acessos

Após executar a aplicação:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:9000
- **Documentação Swagger**: http://localhost:9000/api (se disponível)
- **Banco de Dados**: localhost:5432

## 📚 Tecnologias Utilizadas

### Backend
- **NestJS**: Framework Node.js
- **TypeScript**: Linguagem de programação
- **Prisma**: ORM para banco de dados
- **PostgreSQL**: Banco de dados
- **JWT**: Autenticação
- **Swagger**: Documentação da API

### Frontend
- **React**: Biblioteca JavaScript
- **TypeScript**: Linguagem de programação
- **Vite**: Build tool
- **Tailwind CSS**: Framework CSS
- **Radix UI**: Componentes acessíveis
- **React Hook Form**: Gerenciamento de formulários
- **Axios**: Cliente HTTP

## 🔒 Segurança

- Autenticação JWT
- Validação de dados com class-validator
- CORS configurado
- Helmet para headers de segurança
- Senhas criptografadas com bcrypt
