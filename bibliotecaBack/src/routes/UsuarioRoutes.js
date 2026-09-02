import express from 'express'
import UsuarioControllers from '../controllers/UsuarioControllers.js'
import AuthMiddlewares from '../middlewares/AuthMiddlewares.js'
import AdminMiddlewares from '../middlewares/AdminMiddlewares.js'
import expressAsyncHandler from 'express-async-handler'

const usuario_controllers = new UsuarioControllers()
const UsuarioRoutes = express.Router()

UsuarioRoutes.get('/', expressAsyncHandler(usuario_controllers.visualizar))
UsuarioRoutes.get('/:id', expressAsyncHandler(usuario_controllers.buscarPorID))
UsuarioRoutes.post('/', AuthMiddlewares, AdminMiddlewares, expressAsyncHandler(usuario_controllers.adicionar))
UsuarioRoutes.put('/:id', AuthMiddlewares, AdminMiddlewares, expressAsyncHandler(usuario_controllers.atualizar))
UsuarioRoutes.patch('/:id', AuthMiddlewares, AdminMiddlewares, expressAsyncHandler(usuario_controllers.alterarAtivo))

export default UsuarioRoutes