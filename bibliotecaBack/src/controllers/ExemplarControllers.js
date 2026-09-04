import ExemplarServices from "../services/ExemplarServices.js"

class ExemplarControllers {
     constructor() {
          this.exemplar_services = new ExemplarServices()
     }

     visualizar = async (req,res,next) => {

               const result = await this.exemplar_services.visualizar()

               res.status(200).json(result)

     }
     buscarPorID = async (req,res,next) => {

               const id = req.params.id

               const exemplar = {
                    id
               }

               const result = await this.exemplar_services.buscarPorID(exemplar)

               res.status(200).json(result)

     }
     adicionar = async (req,res,next) => {

               const {cod_identificacao,livro_id,data_aquisicao,estado_conservacao,status} = req.body

               const exemplar = {
                    cod_identificacao: parseInt(cod_identificacao),
                    livro_id,
                    data_aquisicao,
                    estado_conservacao,
                    status
               }

               const result = await this.exemplar_services.adicionar(exemplar)

               res.status(201).json({
                    "message": "exemplar adicionado com sucesso",
                    result
               })

     }
     atualizar = async (req,res,next) => {

               const id = req.params.id
               const {cod_identificacao,livro_id,data_aquisicao,estado_conservacao,status} = req.body

               const exemplar = {
                    id,
                    cod_identificacao: parseInt(cod_identificacao),
                    livro_id,
                    data_aquisicao,
                    estado_conservacao,
                    status
               }

               const result = await this.exemplar_services.atualizar(exemplar)

               res.status(200).json({
                    "message": "exemplar atualizado com sucesso",
                    result
               })

     }
     alterarAtivo = async (req,res,next) => {

               const id = req.params.id

               const exemplar = {
                    id
               }

               const result = await this.exemplar_services.alterarAtivo(exemplar)

               res.status(200).json({
                    "message": "status alterado com sucesso",
                    result
               })

     }
}

export default ExemplarControllers