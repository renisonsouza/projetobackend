/**
 * @swagger
 * /usuarios/cadastro:
 *   post:
 *     summary: Cadastra um novo usuário.
 *     description: Rota para cadastrar um novo usuário na aplicação.
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: Objeto contendo informações do novo usuário.
 *         schema:
 *           type: object
 *           properties:
 *             nome:
 *               type: string
 *               description: Nome do usuário.
 *             usuario:
 *               type: string
 *               description: Nome de usuário.
 *             senha:
 *               type: string
 *               description: Senha do usuário.
 *           required:
 *             - nome
 *             - usuario
 *             - senha
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do usuário cadastrado.
 *                 nome:
 *                   type: string
 *                   description: Nome do usuário.
 *                 usuario:
 *                   type: string
 *                   description: Nome de usuário.
 *       400:
 *         description: Usuário já existe.
 */

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Realiza login de usuário.
 *     description: Rota para autenticar um usuário e gerar token de acesso.
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: Objeto contendo credenciais de login.
 *         schema:
 *           type: object
 *           properties:
 *             usuario:
 *               type: string
 *               description: Nome de usuário.
 *             senha:
 *               type: string
 *               description: Senha do usuário.
 *           required:
 *             - usuario
 *             - senha
 *     responses:
 *       200:
 *         description: Login bem-sucedido. Retorna token de acesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de acesso.
 *       401:
 *         description: Credenciais inválidas.
 *       500:
 *         description: Falha ao realizar o login.
 */

/**
 * @swagger
 * /usuarios/lista-usuario:
 *   get:
 *     summary: Retorna a lista de usuários.
 *     description: Rota para obter a lista de todos os usuários.
 *     responses:
 *       200:
 *         description: Sucesso. Retorna a lista de usuários.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do usuário.
 *                   nome:
 *                     type: string
 *                     description: Nome do usuário.
 *                   usuario:
 *                     type: string
 *                     description: Nome de usuário.
 *                   isAdmin:
 *                     type: boolean
 *                     description: Indica se o usuário é um administrador.
 *       500:
 *         description: Erro ao listar os usuários.
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Retorna um usuário específico.
 *     description: Rota para obter informações de um usuário específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sucesso. Retorna informações do usuário.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do usuário.
 *                 nome:
 *                   type: string
 *                   description: Nome do usuário.
 *                 usuario:
 *                   type: string
 *                   description: Nome de usuário.
 *                 isAdmin:
 *                   type: boolean
 *                   description: Indica se o usuário é um administrador.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao obter informações do usuário.
 */

/**
 * @swagger
 * /usuarios/alterar-dados:
 *   post:
 *     summary: Altera os dados de um usuário.
 *     description: Rota para alterar o nome e/ou a senha de um usuário.
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: Objeto contendo informações para alteração.
 *         schema:
 *           type: object
 *           properties:
 *             nome:
 *               type: string
 *               description: Novo nome do usuário.
 *             senha:
 *               type: string
 *               description: Nova senha do usuário.
 *     responses:
 *       200:
 *         description: Dados do usuário alterados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do usuário.
 *                 nome:
 *                   type: string
 *                   description: Novo nome do usuário.
 *                 usuario:
 *                   type: string
 *                   description: Nome de usuário.
 *                 isAdmin:
 *                   type: boolean
 *                   description: Indica se o usuário é um administrador.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Falha ao alterar os dados do usuário.
 */

/**
 * @swagger
 * /usuarios/criar-admin:
 *   post:
 *     summary: Cria um novo administrador.
 *     description: Rota para criar um novo usuário com privilégios de administrador.
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: Objeto contendo informações do novo administrador.
 *         schema:
 *           type: object
 *           properties:
 *             nome:
 *               type: string
 *               description: Nome do administrador.
 *             usuario:
 *               type: string
 *               description: Nome de usuário.
 *             senha:
 *               type: string
 *               description: Senha do administrador.
 *     responses:
 *       200:
 *         description: Administrador criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do administrador criado.
 *                 nome:
 *                   type: string
 *                   description: Nome do administrador.
 *                 usuario:
 *                   type: string
 *                   description: Nome de usuário do administrador.
 *                 isAdmin:
 *                   type: boolean
 *                   description: Indica que o usuário é um administrador.
 *       403:
 *         description: Apenas administradores podem criar novos administradores.
 *       500:
 *         description: Falha ao criar novo administrador.
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Exclui um usuário.
 *     description: Rota para excluir um usuário existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser excluído.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do usuário excluído.
 *                 nome:
 *                   type: string
 *                   description: Nome do usuário excluído.
 *                 usuario:
 *                   type: string
 *                   description: Nome de usuário excluído.
 *                 isAdmin:
 *                   type: boolean
 *                   description: Indica se o usuário excluído era um administrador.
 *       403:
 *         description: Apenas administradores podem excluir usuários.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Falha ao excluir o usuário.
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza informações de um usuário.
 *     description: Rota para atualizar informações de um usuário existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser atualizado.
 *         schema:
 *           type: integer
 *       - in: body
 *         name: body
 *         required: true
 *         description: Objeto contendo as informações a serem atualizadas.
 *         schema:
 *           type: object
 *           properties:
 *             nome:
 *               type: string
 *               description: Novo nome do usuário.
 *             usuario:
 *               type: string
 *               description: Novo nome de usuário.
 *             senha:
 *               type: string
 *               description: Nova senha do usuário.
 *             isAdmin:
 *               type: boolean
 *               description: Indica se o usuário deve se tornar administrador.
 *     responses:
 *       200:
 *         description: Informações do usuário atualizadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do usuário atualizado.
 *                 nome:
 *                   type: string
 *                   description: Novo nome do usuário.
 *                 usuario:
 *                   type: string
 *                   description: Novo nome de usuário.
 *                 isAdmin:
 *                   type: boolean
 *                   description: Indica se o usuário é um administrador.
 *       400:
 *         description: Nenhuma informação fornecida para atualização.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Falha ao atualizar o usuário.
 */

