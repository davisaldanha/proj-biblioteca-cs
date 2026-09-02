import express from 'express'
import AuthControllers from '../controllers/AuthControllers.js'
import expressAsyncHandler from 'express-async-handler'

const auth_controllers = new AuthControllers()
const AuthRoutes = express.Router()

AuthRoutes.post('/login', expressAsyncHandler(auth_controllers.login))
AuthRoutes.post('/register', expressAsyncHandler(auth_controllers.register))

export default AuthRoutes