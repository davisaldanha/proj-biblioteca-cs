import DevolucaoServices from "../services/DevolucaoServices.js"

class DevolucaoControllers {
     constructor() {
          this.devolucao_services = new DevolucaoServices()
     }

     visualizar = async (req,res,next) => {
          try {
               const result = await this.devolucao_services.visualizar()

               res.status(200).json(result)
          } catch (error) {
              next(error) 
          }
     }
     buscarPorID = async (req,res,next) => {
          try {
               const id = req.params.id

               const devolucao = {
                    id
               }

               const result = await this.devolucao_services.buscarPorID(devolucao)

               res.status(200).json(result)
          } catch (error) {
              next(error) 
          }
     }
     adicionar = async (req,res,next) => {
          try {
               const {exemplar_id,funcionario_id,situacao} = req.body

               const devolucao = {
                    exemplar_id,
                    funcionario_id,
                    situacao
               }

               const result = await this.devolucao_services.adicionar(devolucao)

               res.status(201).json({
                    "message": "devolucao adicionado com sucesso",
                    result
               })
          } catch (error) {
              next(error) 
          }
     }
     atualizar = async (req,res,next) => {
          try {
               const id = req.params.id
               const {exemplar_id,funcionario_id,situacao} = req.body

               const devolucao = {
                    id,
                    exemplar_id,
                    funcionario_id,
                    situacao
               }

               const result = await this.devolucao_services.atualizar(devolucao)

               res.status(200).json({
                    "message": "devolucao atualizado com sucesso",
                    result
               })
          } catch (error) {
              next(error) 
          }
     }
     deletar = async (req,res,next) => {
          try {
               const id = req.params.id

               const devolucao = {
                    id
               }

               const result = await this.devolucao_services.deletar(devolucao)

               res.status(200).json({
                    "message": "devolucao deletado com sucesso",
                    result
               })
          } catch (error) {
              next(error) 
          }
     }
}

export default DevolucaoControllers