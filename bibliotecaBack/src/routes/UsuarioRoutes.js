import express from 'express'
import UsuarioControllers from '../controllers/UsuarioControllers.js'
import AuthMiddlewares from '../middlewares/AuthMiddlewares.js'
import AdminMiddlewares from '../middlewares/AdminMiddlewares.js'

const usuario_controllers = new UsuarioControllers()
const UsuarioRoutes = express.Router()

UsuarioRoutes.get('/', usuario_controllers.visualizar)
UsuarioRoutes.get('/:id', usuario_controllers.buscarPorID)
UsuarioRoutes.post('/', AuthMiddlewares, AdminMiddlewares, usuario_controllers.adicionar)
UsuarioRoutes.put('/:id', AuthMiddlewares, AdminMiddlewares, usuario_controllers.atualizar)
UsuarioRoutes.delete('/:id', AuthMiddlewares, AdminMiddlewares, usuario_controllers.deletar)

export default UsuarioRoutes