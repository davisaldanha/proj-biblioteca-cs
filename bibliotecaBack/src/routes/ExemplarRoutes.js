import express from 'express'
import ExemplarControllers from '../controllers/ExemplarControllers.js'
import AuthMiddlewares from '../middlewares/AuthMiddlewares.js'
import AdminMiddlewares from '../middlewares/AdminMiddlewares.js'
import expressAsyncHandler from 'express-async-handler'

const exemplar_controllers = new ExemplarControllers()
const ExemplarRoutes = express.Router()

ExemplarRoutes.get('/', expressAsyncHandler(exemplar_controllers.visualizar))
ExemplarRoutes.get('/:id', expressAsyncHandler(exemplar_controllers.buscarPorID))
ExemplarRoutes.post('/', AuthMiddlewares, AdminMiddlewares, expressAsyncHandler(exemplar_controllers.adicionar))
ExemplarRoutes.put('/:id', AuthMiddlewares, AdminMiddlewares, expressAsyncHandler(exemplar_controllers.atualizar))
ExemplarRoutes.patch('/:id', AuthMiddlewares, AdminMiddlewares, expressAsyncHandler(exemplar_controllers.alterarAtivo))

export default ExemplarRoutes