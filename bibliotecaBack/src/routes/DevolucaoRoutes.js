import express from 'express'
import DevolucaoControllers from '../controllers/DevolucaoControllers.js'
import AuthMiddlewares from '../middlewares/AuthMiddlewares.js'
import AdminMiddlewares from '../middlewares/AdminMiddlewares.js'

const devolucao_controllers = new DevolucaoControllers()
const DevolucaoRoutes = express.Router()

DevolucaoRoutes.get('/', devolucao_controllers.visualizar)
DevolucaoRoutes.get('/:id', devolucao_controllers.buscarPorID)
DevolucaoRoutes.post('/', AuthMiddlewares, AdminMiddlewares, devolucao_controllers.adicionar)

export default DevolucaoRoutes