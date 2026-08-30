import express from 'express'
import ExemplarControllers from '../controllers/ExemplarControllers.js'
import AuthMiddlewares from '../middlewares/AuthMiddlewares.js'
import AdminMiddlewares from '../middlewares/AdminMiddlewares.js'

const exemplar_controllers = new ExemplarControllers()
const ExemplarRoutes = express.Router()

ExemplarRoutes.get('/', exemplar_controllers.visualizar)
ExemplarRoutes.get('/:id', exemplar_controllers.buscarPorID)
ExemplarRoutes.post('/', AuthMiddlewares, AdminMiddlewares, exemplar_controllers.adicionar)
ExemplarRoutes.put('/:id', AuthMiddlewares, AdminMiddlewares, exemplar_controllers.atualizar)
ExemplarRoutes.patch('/:id', AuthMiddlewares, AdminMiddlewares, exemplar_controllers.alterarAtivo)

export default ExemplarRoutes