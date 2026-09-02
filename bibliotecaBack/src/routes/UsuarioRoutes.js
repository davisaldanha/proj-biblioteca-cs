import express from 'express'
import UsuarioControllers from '../controllers/UsuarioControllers.js'
import AuthMiddlewares from '../middlewares/AuthMiddlewares.js'
import AdminMiddlewares from '../middlewares/AdminMiddlewares.js'
import asyncHanlder from '../middlewares/AsyncHandler.js'

const usuario_controllers = new UsuarioControllers()
const UsuarioRoutes = express.Router()

UsuarioRoutes.get('/', asyncHanlder(usuario_controllers.visualizar))
UsuarioRoutes.get('/:id', asyncHanlder(usuario_controllers.buscarPorID))
UsuarioRoutes.post('/', AuthMiddlewares, AdminMiddlewares, asyncHanlder(usuario_controllers.adicionar))
UsuarioRoutes.put('/:id', AuthMiddlewares, AdminMiddlewares, asyncHanlder(usuario_controllers.atualizar))
UsuarioRoutes.patch('/:id', AuthMiddlewares, AdminMiddlewares, asyncHanlder(usuario_controllers.alterarAtivo))

export default UsuarioRoutes