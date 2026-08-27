import express from 'express'
import EmprestimoControllers from '../controllers/EmprestimoControllers.js'
import AuthMiddlewares from '../middlewares/AuthMiddlewares.js'
import AdminMiddlewares from '../middlewares/AdminMiddlewares.js'

const emprestimo_controllers = new EmprestimoControllers()
const EmprestimoRoutes = express.Router()

EmprestimoRoutes.get('/', emprestimo_controllers.visualizar)
EmprestimoRoutes.get('/:id', emprestimo_controllers.buscarPorID)
EmprestimoRoutes.post('/', AuthMiddlewares, AdminMiddlewares, emprestimo_controllers.adicionar)

export default EmprestimoRoutes