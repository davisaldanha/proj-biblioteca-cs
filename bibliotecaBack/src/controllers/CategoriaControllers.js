import CategoriaServices from "../services/CategoriaServices.js"

class CategoriaControllers {
     constructor() {
          this.categoria_services = new CategoriaServices()
     }

     visualizar = async (req,res,next) => {
          try {
               const result = await this.categoria_services.visualizar()

               res.status(200).json(result)
          } catch (error) {
              next(error) 
          }
     }
     buscarPorID = async (req,res,next) => {
          try {
               const id = req.params.id

               const categoria = {
                    id
               }

               const result = await this.categoria_services.buscarPorID(categoria)

               res.status(200).json(result)
          } catch (error) {
              next(error) 
          }
     }
     adicionar = async (req,res,next) => {
          try {
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
          } catch (error) {
              next(error) 
          }
     }
     atualizar = async (req,res,next) => {
          try {
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
          } catch (error) {
              next(error) 
          }
     }
     deletar = async (req,res,next) => {
          try {
               const id = req.params.id

               const categoria = {
                    id
               }

               const result = await this.categoria_services.deletar(categoria)

               res.status(200).json({
                    "message": "categoria deletada com sucesso",
                    result
               })
          } catch (error) {
              next(error) 
          }
     }
}

export default CategoriaControllers