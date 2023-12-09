/**
 * @swagger
 * /vinhos/listar-vinhos:
 *   get:
 *     summary: Lista vinhos paginados.
 *     description: Rota para listar vinhos de forma paginada.
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Limite de vinhos por página.
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *         description: Número da página.
 *     responses:
 *       200:
 *         description: Sucesso. Retorna a lista de vinhos paginados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   // Defina as propriedades retornadas pelo endpoint
 *       500:
 *         description: Erro ao listar vinhos.
 */

/**
 * @swagger
 * /vinhos/buscar-vinho/{id}:
 *   get:
 *     summary: Busca um vinho por ID.
 *     description: Rota para obter informações de um vinho por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do vinho.
 *     responses:
 *       200:
 *         description: Sucesso. Retorna informações do vinho.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   // Defina as propriedades retornadas pelo endpoint
 *       404:
 *         description: Vinho não encontrado.
 *       500:
 *         description: Erro ao buscar o vinho.
 */

/**
 * @swagger
 * /vinhos/criar-vinho:
 *   post:
 *     summary: Cria um novo vinho.
 *     description: Rota para criar um novo vinho.
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: Objeto contendo informações do novo vinho.
 *         schema:
 *           type: object
 *           properties:
 *             nome:
 *               type: string
 *               description: Nome do vinho.
 *             ano:
 *               type: integer
 *               description: Ano de produção do vinho.
 *             produtor:
 *               type: string
 *               description: Nome do produtor do vinho.
 *     responses:
 *       201:
 *         description: Vinho criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   // Defina as propriedades retornadas pelo endpoint
 *       400:
 *         description: Erro ao criar o vinho.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro.
 */

/**
 * @swagger
 * /vinhos/atualizar-vinho/{id}:
 *   put:
 *     summary: Atualiza um vinho por ID.
 *     description: Rota para atualizar informações de um vinho por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do vinho a ser atualizado.
 *       - in: body
 *         name: body
 *         required: true
 *         description: Objeto contendo as informações a serem atualizadas.
 *         schema:
 *           type: object
 *           properties:
 *             nome:
 *               type: string
 *               description: Novo nome do vinho.
 *             ano:
 *               type: integer
 *               description: Novo ano de produção do vinho.
 *             produtor:
 *               type: string
 *               description: Novo nome do produtor do vinho.
 *     responses:
 *       200:
 *         description: Vinho atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   // Defina as propriedades retornadas pelo endpoint
 *       400:
 *         description: Erro ao atualizar o vinho.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro.
 */

/**
 * @swagger
 * /vinhos/excluir-vinho/{id}:
 *   delete:
 *     summary: Exclui um vinho por ID.
 *     description: Rota para excluir um vinho por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do vinho a ser excluído.
 *     responses:
 *       200:
 *         description: Vinho excluído com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   // Defina as propriedades retornadas pelo endpoint
 *       400:
 *         description: Erro ao excluir o vinho.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro.
 */

/**
 * @swagger
 * /vinhos/filtrar-vinhos:
 *   get:
 *     summary: Filtra vinhos por ano, produtor e nome.
 *     description: Rota para filtrar vinhos com base em diferentes critérios.
 *     parameters:
 *       - in: query
 *         name: ano
 *         schema:
 *           type: integer
 *         description: Filtra vinhos pelo ano de produção.
 *       - in: query
 *         name: produtor
 *         schema:
 *           type: string
 *         description: Filtra vinhos pelo nome do produtor.
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Filtra vinhos pelo nome.
 *     responses:
 *       200:
 *         description: Sucesso. Retorna a lista de vinhos filtrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   // Defina as propriedades retornadas pelo endpoint
 *       500:
 *         description: Erro ao filtrar vinhos.
 *         content:
 *           application/json:
 */
