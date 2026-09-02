import DevolucaoServices from "../services/DevolucaoServices.js"

class DevolucaoControllers {
     constructor() {
          this.devolucao_services = new DevolucaoServices()
     }

     visualizar = async (req,res,next) => {

               const result = await this.devolucao_services.visualizar()

               res.status(200).json(result)

     }
     buscarPorID = async (req,res,next) => {

               const id = req.params.id

               const devolucao = {
                    id
               }

               const result = await this.devolucao_services.buscarPorID(devolucao)

               res.status(200).json(result)

     }
     adicionar = async (req,res,next) => {

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

     }
}

export default DevolucaoControllers