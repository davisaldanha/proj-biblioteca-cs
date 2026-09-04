import express from 'express'
import EmprestimoControllers from '../controllers/EmprestimoControllers.js'
import AuthMiddlewares from '../middlewares/AuthMiddlewares.js'
import AdminMiddlewares from '../middlewares/AdminMiddlewares.js'
import expressAsyncHandler from 'express-async-handler'

const emprestimo_controllers = new EmprestimoControllers()
const EmprestimoRoutes = express.Router()

EmprestimoRoutes.get('/', expressAsyncHandler(emprestimo_controllers.visualizar))
EmprestimoRoutes.get('/:id', expressAsyncHandler(emprestimo_controllers.buscarPorID))
EmprestimoRoutes.post('/', AuthMiddlewares, expressAsyncHandler(emprestimo_controllers.adicionar))

export default EmprestimoRoutes