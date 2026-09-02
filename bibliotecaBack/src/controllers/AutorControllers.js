import AutorServices from "../services/AutorServices.js"

class AutorControllers {
     constructor() {
          this.autor_services = new AutorServices()
     }

     visualizar = async (req, res, next) => {

          const result = await this.autor_services.visualizar()

          res.status(200).json(result)
     }
     buscarPorID = async (req, res, next) => {

          const id = req.params.id

          const autor = {
               id
          }

          const result = await this.autor_services.buscarPorID(autor)

          res.status(200).json(result)

     }
     adicionar = async (req, res, next) => {

          const { nome, nascionalidade, data_nascimento } = req.body

          const autor = {
               nome,
               nascionalidade,
               data_nascimento
          }

          const result = await this.autor_services.adicionar(autor)

          res.status(201).json({
               "message": "autor adicionado com sucesso",
               result
          })

     }
     atualizar = async (req, res, next) => {

          const id = req.params.id
          const { nome, nascionalidade, data_nascimento } = req.body

          const autor = {
               id,
               nome,
               nascionalidade,
               data_nascimento
          }

          const result = await this.autor_services.atualizar(autor)

          res.status(200).json({
               "message": "autor atualizado com sucesso",
               result
          })

     }
     alterarAtivo = async (req, res, next) => {

          const id = req.params.id

          const autor = {
               id
          }

          const result = await this.autor_services.alterarAtivo(autor)

          res.status(200).json({
               "message": "autor deletado com sucesso",
               result
          })

     }
}

export default AutorControllers