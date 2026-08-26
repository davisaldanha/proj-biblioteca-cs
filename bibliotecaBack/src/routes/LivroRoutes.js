import express from 'express'
import LivroControllers from '../controllers/LivroControllers.js'
import AuthMiddlewares from '../middlewares/AuthMiddlewares.js'
import AdminMiddlewares from '../middlewares/AdminMiddlewares.js'

const livro_controllers = new LivroControllers()
const LivroRoutes = express.Router()

LivroRoutes.get('/', livro_controllers.visualizar)
LivroRoutes.get('/:id', livro_controllers.buscarPorID)
LivroRoutes.post('/', AuthMiddlewares, AdminMiddlewares, livro_controllers.adicionar)
LivroRoutes.put('/:id', AuthMiddlewares, AdminMiddlewares, livro_controllers.atualizar)
LivroRoutes.delete('/:id', AuthMiddlewares, AdminMiddlewares, livro_controllers.deletar)

export default LivroRoutes