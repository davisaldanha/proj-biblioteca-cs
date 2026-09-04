import express from 'express'
import DevolucaoControllers from '../controllers/DevolucaoControllers.js'
import AuthMiddlewares from '../middlewares/AuthMiddlewares.js'
import AdminMiddlewares from '../middlewares/AdminMiddlewares.js'
import expressAsyncHandler from 'express-async-handler'

const devolucao_controllers = new DevolucaoControllers()
const DevolucaoRoutes = express.Router()

DevolucaoRoutes.get('/', expressAsyncHandler(devolucao_controllers.visualizar))
DevolucaoRoutes.get('/:id', expressAsyncHandler(devolucao_controllers.buscarPorID))
DevolucaoRoutes.post('/', AuthMiddlewares, expressAsyncHandler(devolucao_controllers.adicionar))

export default DevolucaoRoutes