import express from 'express'
import CategoriaControllers from '../controllers/CategoriaControllers.js'
import AuthMiddlewares from '../middlewares/AuthMiddlewares.js'
import AdminMiddlewares from '../middlewares/AdminMiddlewares.js'
import expressAsyncHandler from 'express-async-handler'

const categoria_controllers = new CategoriaControllers()
const CategoriaRoutes = express.Router()

CategoriaRoutes.get('/', expressAsyncHandler(categoria_controllers.visualizar))
CategoriaRoutes.get('/:id', expressAsyncHandler(categoria_controllers.buscarPorID))
CategoriaRoutes.post('/', AuthMiddlewares, AdminMiddlewares, expressAsyncHandler(categoria_controllers.adicionar))
CategoriaRoutes.put('/:id', AuthMiddlewares, AdminMiddlewares, expressAsyncHandler(categoria_controllers.atualizar))
CategoriaRoutes.patch('/:id', AuthMiddlewares, AdminMiddlewares, expressAsyncHandler(categoria_controllers.alterarAtivo))

export default CategoriaRoutes