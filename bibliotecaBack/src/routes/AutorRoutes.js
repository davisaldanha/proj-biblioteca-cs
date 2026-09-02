import express from 'express'
import AutorControllers from '../controllers/AutorControllers.js'
import AuthMiddlewares from '../middlewares/AuthMiddlewares.js'
import AdminMiddlewares from '../middlewares/AdminMiddlewares.js'
import expressAsyncHandler from 'express-async-handler'

const autor_controllers = new AutorControllers()
const AutorRoutes = express.Router()

AutorRoutes.get('/', expressAsyncHandler(autor_controllers.visualizar))
AutorRoutes.get('/:id', expressAsyncHandler(autor_controllers.buscarPorID))
AutorRoutes.post('/', AuthMiddlewares, AdminMiddlewares, expressAsyncHandler(autor_controllers.adicionar))
AutorRoutes.put('/:id', AuthMiddlewares, AdminMiddlewares, expressAsyncHandler(autor_controllers.atualizar))
AutorRoutes.patch('/:id', AuthMiddlewares, AdminMiddlewares, expressAsyncHandler(autor_controllers.alterarAtivo))

export default AutorRoutes