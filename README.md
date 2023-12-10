# Sistema de Adega

O Sistema de Adega é uma aplicação Node.js que gerencia uma adega virtual, oferecendo funcionalidades para gerenciar usuários e seus vinhos, com autenticação para garantir acesso seguro às operações e interação com o banco de dados.

## Instalação e Configuração

1. Instale as dependências com o comando: `npm install`.
2. Configure as variáveis de ambiente.
3. Crie um arquivo `.env` na raiz do projeto.
4. Inicie a aplicação com o comando: `npm start`.

## API de Instalação de Banco de Dados

A API cria e inicializa as tabelas do banco de dados.

### Endpoints

- **Rota:** `/install`
  - **Método:** GET
  - **Descrição:** Inicializa o banco de dados com dados de exemplo, incluindo produtores de vinho, vinhos e contas de usuário.

Ao acessar essa rota, o banco de dados será inicializado com dados de exemplo.

## API de Usuários

A API gerencia usuários, incluindo cadastro, login, listagem, alteração e exclusão de usuários. Utiliza autenticação por token JWT para proteger as rotas de acesso restrito.

## Endpoints

### 1. Cadastro de Usuário

- **Endpoint:** `POST /cadastro`
- **Descrição:** Cadastra um novo usuário na aplicação.
- **Parâmetros (JSON):**
  - nome (string): Nome do usuário.
  - usuario (string): Nome de usuário para login.
  - senha (string): Senha do usuário.

### 2. Login de Usuário

- **Endpoint:** `POST /login`
- **Descrição:** Autentica um usuário e fornece um token JWT válido.
- **Parâmetros (JSON):**
  - usuario (string): Nome de usuário para login.
  - senha (string): Senha do usuário.

### 3. Listagem de Usuários (Requer Token)

- **Endpoint:** `GET /lista-usuario`
- **Descrição:** Lista todos os usuários cadastrados (apenas para administradores).
- **Requerimentos:** Token JWT válido com permissões de administrador.

### 4. Detalhes de Usuário por ID (Requer Token)

- **Endpoint:** `GET /:id`
- **Descrição:** Obtém os detalhes de um usuário específico pelo ID.
- **Requerimentos:** Token JWT válido.
- **Parâmetros da Rota:**
  - id (string): ID do usuário a ser consultado.

### 5. Alteração de Dados do Usuário (Requer Token)

- **Endpoint:** `POST /alterar-dados`
- **Descrição:** Altera os dados do usuário logado.
- **Requerimentos:** Token JWT válido.
- **Parâmetros (JSON):**
  - nome (string, opcional): Novo nome do usuário.
  - senha (string, opcional): Nova senha do usuário.

### 6. Criação de Administrador (Requer Token de Administrador)

- **Endpoint:** `POST /criar-admin`
- **Descrição:** Cria um novo administrador na aplicação.
- **Requerimentos:** Token JWT válido com permissões de administrador.
- **Parâmetros (JSON):**
  - nome (string): Nome do novo administrador.
  - usuario (string): Nome de usuário para login do administrador.
  - senha (string): Senha do administrador.

### 7. Exclusão de Usuário por ID (Requer Token de Administrador)

- **Endpoint:** `DELETE /:id`
- **Descrição:** Exclui um usuário pelo ID.
- **Requerimentos:** Token JWT válido com permissões de administrador.
- **Parâmetros da Rota:**
  - id (string): ID do usuário a ser excluído.

### 8. Atualização de Usuário por ID (Requer Token de Administrador)

- **Endpoint:** `PUT /:id`
- **Descrição:** Atualiza os dados de um usuário pelo ID.
- **Requerimentos:** Token JWT válido com permissões de administrador.
- **Parâmetros da Rota:**
  - id (string): ID do usuário a ser atualizado.
- **Parâmetros (JSON):**
  - nome (string, opcional): Novo nome do usuário.
  - usuario (string, opcional): Novo nome de usuário.
  - senha (string, opcional): Nova senha do usuário.
  - isAdmin (boolean, opcional): Define se o usuário terá permissões de administrador.

## API de Vinhos

## Introdução

A API gerencia vinhos na adega, incluindo listagem, busca, criação, atualização e exclusão de vinhos. Utiliza autenticação por token JWT para proteger as rotas de acesso restrito.

## Endpoints

### 1. Listar Vinhos (Requer Token)

- **Endpoint:** `GET /listar-vinhos`
- **Descrição:** Lista os vinhos cadastrados, com suporte à paginação.
- **Requerimentos:** Token JWT válido.
- **Parâmetros da Consulta:**
  - limite (opcional, padrão: 10): Número máximo de vinhos a serem retornados.
  - pagina (opcional, padrão: 1): Número da página a ser retornada.

### 2. Buscar Vinho por ID (Requer Token)

- **Endpoint:** `GET /buscar-vinho/:id`
- **Descrição:** Obtém os detalhes de um vinho específico pelo ID.
- **Requerimentos:** Token JWT válido.
- **Parâmetros da Rota:**
  - id (string): ID do vinho a ser consultado.

### 3. Criar Vinho (Requer Token)

- **Endpoint:** `POST /criar-vinho`
- **Descrição:** Cria um novo vinho na adega.
- **Requerimentos:** Token JWT válido.
- **Parâmetros do Corpo (JSON):**
  - nome (string): Nome do vinho.
  - ano (number): Ano de produção do vinho.
  - produtor (string): Produtor do vinho.

### 4. Atualizar Vinho por ID (Requer Token)

- **Endpoint:** `PUT /atualizar-vinho/:id`
- **Descrição:** Atualiza os dados de um vinho pelo ID.
- **Requerimentos:** Token JWT válido.
- **Parâmetros da Rota:**
  - id (string): ID do vinho a ser atualizado.
- **Parâmetros do Corpo (JSON):**
  - nome (string): Novo nome do vinho.
  - ano (number): Novo ano de produção do vinho.
  - produtor (string): Novo produtor do vinho.

### 5. Excluir Vinho por ID (Requer Token)

- **Endpoint:** `DELETE /excluir-vinho/:id`
- **Descrição:** Exclui um vinho pelo ID.
- **Requerimentos:** Token JWT válido.
- **Parâmetros da Rota:**
  - id (string): ID do vinho a ser excluído.

### 6. Filtrar Vinhos (Requer Token)

- **Endpoint:** `GET /filtrar-vinhos`
- **Descrição:** Filtra vinhos com base em ano, produtor e/ou nome.
- **Requerimentos:** Token JWT válido.
- **Parâmetros da Consulta:**
  - ano (opcional): Filtra vinhos pelo ano de produção.
  - produtor (opcional): Filtra vinhos pelo produtor.
  - nome (opcional): Filtra vinhos pelo nome.


