import express from 'express'
import AuthControllers from '../controllers/AuthControllers.js'

const auth_controllers = new AuthControllers()
const AuthRoutes = express.Router()

AuthRoutes.post('/login', auth_controllers.login)
AuthRoutes.post('/register', auth_controllers.register)

export default AuthRoutes