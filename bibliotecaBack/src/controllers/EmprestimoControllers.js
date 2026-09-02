import EmprestimoServices from "../services/EmprestimoServices.js"

class EmprestimoControllers {
     constructor() {
          this.emprestimo_services = new EmprestimoServices()
     }

     visualizar = async (req,res,next) => {

               const result = await this.emprestimo_services.visualizar()

               res.status(200).json(result)

     }
     buscarPorID = async (req,res,next) => {

               const id = req.params.id

               const emprestimo = {
                    id
               }

               const result = await this.emprestimo_services.buscarPorID(emprestimo)

               res.status(200).json(result)

     }
     adicionar = async (req,res,next) => {

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

     }
}

export default EmprestimoControllers