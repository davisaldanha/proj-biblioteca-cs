import CategoriaServices from "../services/CategoriaServices.js"

class CategoriaControllers {
     constructor() {
          this.categoria_services = new CategoriaServices()
     }

     visualizar = async (req,res,next) => {

               const result = await this.categoria_services.visualizar()

               res.status(200).json(result)

     }
     buscarPorID = async (req,res,next) => {

               const id = req.params.id

               const categoria = {
                    id
               }

               const result = await this.categoria_services.buscarPorID(categoria)

               res.status(200).json(result)

     }
     adicionar = async (req,res,next) => {

               const {nome,descricao} = req.body

               const categoria = {
                    nome,
                    descricao
               }

               const result = await this.categoria_services.adicionar(categoria)

               res.status(201).json({
                    "message": "categoria adicionada com sucesso",
                    result
               })

     }
     atualizar = async (req,res,next) => {

               const id = req.params.id
               const {nome,descricao} = req.body

               const categoria = {
                    id,
                    nome,
                    descricao
               }

               const result = await this.categoria_services.atualizar(categoria)

               res.status(200).json({
                    "message": "categoria atualizada com sucesso",
                    result
               })

     }
     alterarAtivo = async (req,res,next) => {

               const id = req.params.id

               const categoria = {
                    id
               }

               const result = await this.categoria_services.alterarAtivo(categoria)

               res.status(200).json({
                    "message": "status alterado com sucesso",
                    result
               })

     }
}

export default CategoriaControllers