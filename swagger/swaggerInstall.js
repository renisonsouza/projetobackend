/**
 * @swagger
 * /install:
 *   get:
 *     summary: Insere informaçoes iniciais no Banco de Dados.
 *     description: Rota para obter uma lista de produtores, vinhos e usuários.
 *     responses:
 *       200:
 *         description: Sucesso. Retorna produtores, vinhos e usuários.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indica se a requisição foi bem-sucedida.
 *                 produtores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       codigo:
 *                         type: integer
 *                         description: Código do produtor de vinho.
 *                       nome:
 *                         type: string
 *                         description: Nome do produtor de vinho.
 *                     required:
 *                       - codigo
 *                       - nome
 *                   description: Lista de produtores de vinho.
 *                 vinhos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nome:
 *                         type: string
 *                         description: Nome do vinho.
 *                       ano:
 *                         type: integer
 *                         description: Ano de produção do vinho.
 *                       produtorCodigo:
 *                         type: integer
 *                         description: Código do produtor do vinho.
 *                     required:
 *                       - nome
 *                       - ano
 *                       - produtorCodigo
 *                   description: Lista de vinhos.
 *                 usuarios:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nome:
 *                         type: string
 *                         description: Nome do usuário.
 *                       username:
 *                         type: string
 *                         description: Nome de usuário.
 *                       senha:
 *                         type: string
 *                         description: Senha do usuário.
 *                       admin:
 *                         type: boolean
 *                         description: Indica se o usuário é um administrador.
 *                     required:
 *                       - nome
 *                       - username
 *                   description: Lista de usuários.
 */