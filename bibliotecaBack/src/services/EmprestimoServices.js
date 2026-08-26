import EmprestimoRepositories from '../repositories/EmprestimoRepositories.js'
import AppError from '../errors/AppError.js'

class EmprestimoServices {
     constructor() {
          this.emprestimo_repositories = new EmprestimoRepositories()
     }

     async visualizar () {
          const result = await this.emprestimo_repositories.visualizar()

          return result
     }
     async buscarPorID (emprestimo) {
          if (!emprestimo.id) {
               throw new AppError("Insira o id da emprestimo",404);
               
          }
          
          const result = await this.emprestimo_repositories.buscarPorID(emprestimo)
          
          if (!result) {
               throw new AppError("Nenhuma emprestimo com esse id encontrado",404);
               
          }
          
          return result
     }
     async adicionar (emprestimo) {
          if (!emprestimo.usuario_id) {
               throw new AppError("Insira o usuario que fez o emprestimo",404);
               
          }
          if (!emprestimo.funcionario_id) {
               throw new AppError("Insira o funcionario responsavel pelo emprestimo",404);
               
          }
          if (!emprestimo.data_devolucao_prev) {
               throw new AppError("Insira a data de devolução prevista do emprestimo",404);
               
          }
          if (!emprestimo.estado_conservacao) {
               throw new AppError("Insira o estado de conservacao do exemplar",404);
               
          }
          if (!emprestimo.status) {
               throw new AppError("Insira o status do emprestimo",404);
               
          }
          if (!emprestimo.exemplar_id) {
               throw new AppError("Insira o exemplar que foi emprestado",404);
               
          }

          const result = await this.emprestimo_repositories.adicionar(emprestimo)

          return result
     }
     async atualizar (emprestimo) {
          if (!emprestimo.id) {
               throw new AppError("Insira o id da emprestimo",404);
               
          }
          
          const verificarID = await this.emprestimo_repositories.buscarPorID(emprestimo)
          
          if (!verificarID) {
               throw new AppError("Nenhuma emprestimo com esse id encontrado",404);
               
          }

          const result = await this.emprestimo_repositories.atualizar(emprestimo)

          return result
     }
     async deletar (emprestimo) {
          if (!emprestimo.id) {
               throw new AppError("Insira o id da emprestimo",404);
               
          }
          
          const verificarID = await this.emprestimo_repositories.buscarPorID(emprestimo)
          
          if (!verificarID) {
               throw new AppError("Nenhuma emprestimo com esse id encontrado",404);
               
          }

          const result = await this.emprestimo_repositories.deletar(emprestimo)

          return result
     }
}

export default EmprestimoServices