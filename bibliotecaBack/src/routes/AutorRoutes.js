import express from 'express'
import AutorControllers from '../controllers/AutorControllers.js'
import AuthMiddlewares from '../middlewares/AuthMiddlewares.js'
import AdminMiddlewares from '../middlewares/AdminMiddlewares.js'

const autor_controllers = new AutorControllers()
const AutorRoutes = express.Router()

AutorRoutes.get('/', autor_controllers.visualizar)
AutorRoutes.get('/:id', autor_controllers.buscarPorID)
AutorRoutes.post('/', AuthMiddlewares, AdminMiddlewares, autor_controllers.adicionar)
AutorRoutes.put('/:id', AuthMiddlewares, AdminMiddlewares, autor_controllers.atualizar)
AutorRoutes.patch('/:id', AuthMiddlewares, AdminMiddlewares, autor_controllers.alterarAtivo)

export default AutorRoutes