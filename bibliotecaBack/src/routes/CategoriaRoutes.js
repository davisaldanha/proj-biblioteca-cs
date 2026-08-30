import express from 'express'
import CategoriaControllers from '../controllers/CategoriaControllers.js'
import AuthMiddlewares from '../middlewares/AuthMiddlewares.js'
import AdminMiddlewares from '../middlewares/AdminMiddlewares.js'

const categoria_controllers = new CategoriaControllers()
const CategoriaRoutes = express.Router()

CategoriaRoutes.get('/', categoria_controllers.visualizar)
CategoriaRoutes.get('/:id', categoria_controllers.buscarPorID)
CategoriaRoutes.post('/', AuthMiddlewares, AdminMiddlewares, categoria_controllers.adicionar)
CategoriaRoutes.put('/:id', AuthMiddlewares, AdminMiddlewares, categoria_controllers.atualizar)
CategoriaRoutes.patch('/:id', AuthMiddlewares, AdminMiddlewares, categoria_controllers.alterarAtivo)

export default CategoriaRoutes