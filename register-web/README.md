# Register Web - Aplicação Frontend

Uma aplicação web moderna baseada em React para gerenciamento de registro de pessoas, construída com TypeScript, Vite e Tailwind CSS.

## 🚀 Funcionalidades

- **Autenticação de Usuários**: Sistema de login e registro de usuários
- **Gerenciamento de Pessoas**: Operações CRUD para registros de pessoas
- **Design Responsivo**: Abordagem mobile-first com Tailwind CSS
- **Tema Escuro/Claro**: Capacidade de alternar entre temas
- **Validação de Formulários**: Gerenciamento robusto de formulários com React Hook Form e Zod
- **Tabelas de Dados**: Tabelas interativas com ordenação e paginação
- **Notificações Toast**: Feedback do usuário com react-toastify
- **Rotas Protegidas**: Proteção de rotas baseada em autenticação

## 🛠️ Stack Tecnológica

- **Framework**: React 19.1.0 com TypeScript
- **Build Tool**: Vite 7.0.4
- **Estilização**: Tailwind CSS 4.1.11
- **Componentes UI**: Primitivas Radix UI com componentes customizados
- **Gerenciamento de Estado**: React Query (TanStack Query) para estado do servidor
- **Gerenciamento de Formulários**: React Hook Form com validação Zod
- **Roteamento**: React Router DOM 7.7.1
- **Cliente HTTP**: Axios
- **Ícones**: Lucide React
- **Manipulação de Datas**: date-fns e react-day-picker

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Núcleo da aplicação
│   ├── components/         # Componentes de rotas de autenticação
│   ├── context/           # Contextos React (auth, theme)
│   ├── hooks/             # Hooks React customizados
│   ├── libs/              # Configurações de bibliotecas externas
│   ├── Router/            # Configuração de roteamento
│   ├── services/          # Camada de serviços da API
│   └── utils/             # Funções utilitárias
├── view/                  # Camada de interface
│   ├── assets/            # Ativos estáticos
│   ├── components/        # Componentes UI reutilizáveis
│   ├── layouts/           # Componentes de layout
│   ├── pages/             # Componentes de páginas
│   └── styles/            # Estilos globais
└── main.tsx              # Ponto de entrada da aplicação
```

## 🚀 Como Começar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn como gerenciador de pacotes

### Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositório>
   cd register-people-stefanini/register-web
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configuração do Ambiente**
   
   Crie um arquivo `.env` no diretório raiz:
   ```env
   VITE_API_BASE_URL=http://localhost:9000
   VITE_PORT=3000
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run start:dev
   # ou
   yarn start:dev
   ```

   A aplicação estará disponível em `http://localhost:3000`

## 📜 Scripts Disponíveis

- `npm run start:dev` - Inicia o servidor de desenvolvimento com hot reload
- `npm run build` - Constrói a aplicação para produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa ESLint para verificar qualidade do código

## 🎨 Componentes UI

A aplicação utiliza uma biblioteca de componentes construída sobre primitivas Radix UI:

- **Botões**: Vários estilos e variantes de botões
- **Formulários**: Campos de entrada, selects, date pickers com validação
- **Tabelas**: Tabelas de dados com ordenação e paginação
- **Diálogos**: Diálogos modais para confirmações e formulários
- **Toast**: Sistema de notificações para feedback do usuário
- **Alternador de Tema**: Toggle para tema escuro/claro

## 🔐 Autenticação

A aplicação implementa um sistema de autenticação baseado em JWT:

- **Login**: Autenticação de usuário com email/senha
- **Registro**: Criação de novas contas de usuário
- **Rotas Protegidas**: Redirecionamento automático para usuários não autenticados
- **Gerenciamento de Token**: Atualização e armazenamento automático de tokens

## 📊 Gerenciamento de Pessoas

A funcionalidade principal da aplicação inclui:

- **Listar Pessoas**: Visualizar todas as pessoas registradas com paginação
- **Adicionar Pessoa**: Criar novos registros de pessoas com validação
- **Editar Pessoa**: Atualizar informações de pessoas existentes
- **Deletar Pessoa**: Remover registros de pessoas com confirmação
- **Buscar e Filtrar**: Encontrar registros específicos de pessoas

## 🌐 Integração com API

O frontend se comunica com a API backend através de:

- **Axios**: Cliente HTTP para requisições da API
- **React Query**: Gerenciamento de estado do servidor e cache
- **Tratamento de Erros**: Tratamento centralizado de erros e feedback do usuário
- **Type Safety**: Integração completa com TypeScript e tipos da API

## 🎯 Funcionalidades Principais

### Validação de Formulários
- Validação em tempo real usando schemas Zod
- Regras de validação customizadas (CPF, intervalos de data, etc.)
- Mensagens de erro e destaque de campos

### Design Responsivo
- Abordagem mobile-first
- Layouts adaptativos para diferentes tamanhos de tela
- Elementos de interface touch-friendly

### Performance
- Code splitting e lazy loading
- Bundle otimizado
- Re-renderizações eficientes com React Query

### Experiência do Desenvolvedor
- TypeScript para type safety
- ESLint para qualidade do código
- Hot module replacement
- Path aliases para imports limpos

## 🐳 Docker

### Docker Compose (Recomendado)

Para executar toda a aplicação (frontend + backend + banco):

```bash
# Na raiz do projeto
docker-compose up -d

# Parar todos os containers
docker-compose down

# Reconstruir as imagens
docker-compose up --build -d

# Visualizar logs
docker-compose logs -f register-web
```