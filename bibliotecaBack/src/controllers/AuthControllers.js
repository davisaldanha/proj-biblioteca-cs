import AuthServices from "../services/AuthServices.js"

class AuthControllers {
     constructor() {
          this.auth_services = new AuthServices()
     }

     login = async (req,res,next) => {
          try {
               const {email, senha} = req.body

               const usuario = {
                    email,
                    senha
               }

               const result = await this.auth_services.login(usuario)

               res.status(200).json({
                    "message": "Usuario logado com sucesso",
                    result
               })
          } catch (error) {
               next(error)
          }
     }

     register = async (req,res,next) => {
          try {
               const {nome,cpf,email,senha,telefone,data_nascimento,endereco} = req.body

               const usuario = {
                    nome,
                    cpf,
                    email,
                    senha,
                    telefone,
                    data_nascimento,
                    endereco
               }

               const result = await this.auth_services.register(usuario)

               res.status(201).json({
                    "message": "Usuario cadastrado com sucesso"
               })
          } catch (error) {
               next(error)
          }
     }
}

export default AuthControllers