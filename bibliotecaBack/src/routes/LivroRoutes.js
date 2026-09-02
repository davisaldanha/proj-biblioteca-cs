import express from 'express'
import LivroControllers from '../controllers/LivroControllers.js'
import AuthMiddlewares from '../middlewares/AuthMiddlewares.js'
import AdminMiddlewares from '../middlewares/AdminMiddlewares.js'
import expressAsyncHandler from 'express-async-handler'

const livro_controllers = new LivroControllers()
const LivroRoutes = express.Router()

LivroRoutes.get('/', expressAsyncHandler(livro_controllers.visualizar))
LivroRoutes.get('/:id', expressAsyncHandler(livro_controllers.buscarPorID))
LivroRoutes.post('/', AuthMiddlewares, AdminMiddlewares, expressAsyncHandler(livro_controllers.adicionar))
LivroRoutes.put('/:id', AuthMiddlewares, AdminMiddlewares, expressAsyncHandler(livro_controllers.atualizar))
LivroRoutes.patch('/:id', AuthMiddlewares, AdminMiddlewares, expressAsyncHandler(livro_controllers.alterarAtivo))

export default LivroRoutes