import UsuarioServices from "../services/UsuarioServices.js"

class UsuarioControllers {
     constructor() {
          this.usuario_services = new UsuarioServices()
     }

     visualizar = async (req,res,next) => {
          try {
               const result = await this.usuario_services.visualizar()

               res.status(200).json(result)
          } catch (error) {
              next(error) 
          }
     }
     buscarPorID = async (req,res,next) => {
          try {
               const id = req.params.id

               const usuario = {
                    id
               }

               const result = await this.usuario_services.buscarPorID(usuario)

               res.status(200).json(result)
          } catch (error) {
              next(error) 
          }
     }
     adicionar = async (req,res,next) => {
          try {
               const {nome,cpf,email,senha,telefone,data_nascimento,endereco,status,perfil} = req.body

               const usuario = {
                    nome,
                    cpf,
                    email,
                    senha,
                    telefone,
                    data_nascimento,
                    endereco,
                    status,
                    perfil
               }

               const result = await this.usuario_services.adicionar(usuario)

               res.status(201).json({
                    "message": "usuario adicionado com sucesso",
                    result
               })
          } catch (error) {
              next(error) 
          }
     }
     atualizar = async (req,res,next) => {
          try {
               const id = req.params.id
               const {nome,cpf,email,senha,telefone,data_nascimento,endereco,status,perfil} = req.body

               const usuario = {
                    id,
                    nome,
                    cpf,
                    email,
                    senha,
                    telefone,
                    data_nascimento,
                    endereco,
                    status,
                    perfil
               }

               const result = await this.usuario_services.atualizar(usuario)

               res.status(200).json({
                    "message": "usuario atualizado com sucesso",
                    result
               })
          } catch (error) {
              next(error) 
          }
     }
     deletar = async (req,res,next) => {
          try {
               const id = req.params.id

               const usuario = {
                    id
               }

               const result = await this.usuario_services.deletar(usuario)

               res.status(200).json({
                    "message": "usuario deletado com sucesso",
                    result
               })
          } catch (error) {
              next(error) 
          }
     }
}

export default UsuarioControllers