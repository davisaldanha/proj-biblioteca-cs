import UsuarioServices from "../services/UsuarioServices.js"

class UsuarioControllers {
     constructor() {
          this.usuario_services = new UsuarioServices()
     }

     visualizar = async (req, res, next) => {

          const result = await this.usuario_services.visualizar()

          res.status(200).json(result)

     }
     buscarPorID = async (req, res, next) => {

          const id = req.params.id

          const usuario = {
               id
          }

          const result = await this.usuario_services.buscarPorID(usuario)

          res.status(200).json(result)

     }
     adicionar = async (req, res, next) => {

          const { nome, cpf, email, senha, telefone, data_nascimento, endereco, status, perfil } = req.body

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

     }
     atualizar = async (req, res, next) => {

          const id = req.params.id
          const { nome, cpf, email, senha, telefone, data_nascimento, endereco, status, perfil } = req.body

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

     }
     alterarAtivo = async (req, res, next) => {

          const id = req.params.id

          const usuario = {
               id
          }

          const result = await this.usuario_services.alterarAtivo(usuario)

          res.status(200).json({
               "message": "usuario deletado com sucesso",
               result
          })

     }
}

export default UsuarioControllers