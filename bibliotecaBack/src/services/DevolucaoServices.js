import DevolucaoRepositories from '../repositories/DevolucaoRepositories.js'
import AppError from '../errors/AppError.js'

class DevolucaoServices {
     constructor() {
          this.devolucao_repositories = new DevolucaoRepositories()
     }

     async visualizar () {
          const result = await this.devolucao_repositories.visualizar()

          return result
     }
     async buscarPorID (devolucao) {
          if (!devolucao.id) {
               throw new AppError("Insira o id da devolucao",404);
               
          }
          
          const result = await this.devolucao_repositories.buscarPorID(devolucao)
          
          if (!result) {
               throw new AppError("Nenhuma devolucao com esse id encontrado",404);
               
          }
          
          return result
     }
     async adicionar (devolucao) {
          if (!devolucao.exemplar_id) {
               throw new AppError("Insira o exemplar da devolucao",404);
               
          }
          if (!devolucao.funcionario_id) {
               throw new AppError("Insira o funcionario responsavel pela devolucao",404);
               
          }
          if (!devolucao.situacao) {
               throw new AppError("Insira a situação da devolucao",404);
               
          }

          const result = await this.devolucao_repositories.adicionar(devolucao)

          return result
     }
}

export default DevolucaoServices