import jwt from 'jsonwebtoken'
import 'dotenv/config'

const AuthMiddlewares = (req,res,next) => {
     try {
          const authHeaders = req.headers.authorization

          if (!authHeaders) {
               return res.status(400).json({
                    "error": "Voce precisa estar logado para acessar esse recurso"
               })
          }

          const token = authHeaders.split(' ')[1]

          const decode = await jwt.verify(token, process.env.JWT_SECRET)

          req.user = decode

          next()
     } catch (error) {
          return res.status(400).json({
               "error": error.message
          })
     }
}

export default AuthMiddlewares