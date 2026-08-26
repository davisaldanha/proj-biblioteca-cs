import EmprestimoServices from "../services/EmprestimoServices.js"

class EmprestimoControllers {
     constructor() {
          this.emprestimo_services = new EmprestimoServices()
     }

     visualizar = async (req,res,next) => {
          try {
               const result = await this.emprestimo_services.visualizar()

               res.status(200).json(result)
          } catch (error) {
              next(error) 
          }
     }
     buscarPorID = async (req,res,next) => {
          try {
               const id = req.params.id

               const emprestimo = {
                    id
               }

               const result = await this.emprestimo_services.buscarPorID(emprestimo)

               res.status(200).json(result)
          } catch (error) {
              next(error) 
          }
     }
     adicionar = async (req,res,next) => {
          try {
               const {usuario_id,funcionario_id,data_devolucao_prev,data_devolucao,estado_conservacao,status,exemplar_id} = req.body

               const emprestimo = {
                    usuario_id,
                    funcionario_id,
                    data_devolucao_prev,
                    data_devolucao,
                    estado_conservacao,
                    status,
                    exemplar_id
               }

               const result = await this.emprestimo_services.adicionar(emprestimo)

               res.status(201).json({
                    "message": "emprestimo adicionado com sucesso",
                    result
               })
          } catch (error) {
              next(error) 
          }
     }
     atualizar = async (req,res,next) => {
          try {
               const id = req.params.id
               const {usuario_id,funcionario_id,data_devolucao_prev,data_devolucao,estado_conservacao,status,exemplar_id} = req.body

               const emprestimo = {
                    id,
                    usuario_id,
                    funcionario_id,
                    data_devolucao_prev,
                    data_devolucao,
                    estado_conservacao,
                    status,
                    exemplar_id
               }

               const result = await this.emprestimo_services.atualizar(emprestimo)

               res.status(200).json({
                    "message": "emprestimo atualizado com sucesso",
                    result
               })
          } catch (error) {
              next(error) 
          }
     }
     deletar = async (req,res,next) => {
          try {
               const id = req.params.id

               const emprestimo = {
                    id
               }

               const result = await this.emprestimo_services.deletar(emprestimo)

               res.status(200).json({
                    "message": "emprestimo deletado com sucesso",
                    result
               })
          } catch (error) {
              next(error) 
          }
     }
}

export default EmprestimoControllers