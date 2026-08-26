import ExemplarRepositories from '../repositories/ExemplarRepositories.js'
import AppError from '../errors/AppError.js'

class ExemplarServices {
     constructor() {
          this.exemplar_repositories = new ExemplarRepositories()
     }

     async visualizar () {
          const result = await this.exemplar_repositories.visualizar()

          return result
     }
     async buscarPorID (exemplar) {
          if (!exemplar.id) {
               throw new AppError("Insira o id da exemplar",404);
               
          }
          
          const result = await this.exemplar_repositories.buscarPorID(exemplar)
          
          if (!result) {
               throw new AppError("Nenhuma exemplar com esse id encontrado",404);
               
          }
          
          return result
     }
     async adicionar (exemplar) {
          if (!exemplar.cod_identificacao) {
               throw new AppError("Insira a identificação do exemplar",404);
               
          }
          if (!exemplar.livro_id) {
               throw new AppError("Insira o livro do exemplar",404);
               
          }
          if (!exemplar.data_aquisicao) {
               throw new AppError("Insira a data de aquisição do exemplar",404);
               
          }
          if (!exemplar.estado_conservacao) {
               throw new AppError("Insira o estado de conservação do exemplar",404);
               
          }
          if (!exemplar.status) {
               throw new AppError("Insira o status do exemplar",404);
               
          }
          
          const verificarIdentificacao = await this.exemplar_repositories.buscarPorIdentificacao(exemplar)
          
          if (verificarIdentificacao) {
               throw new AppError("Já existe uma exemplar com essa identificação",404);
               
          }

          const result = await this.exemplar_repositories.adicionar(exemplar)

          return result
     }
     async atualizar (exemplar) {
          if (!exemplar.id) {
               throw new AppError("Insira o id da exemplar",404);
               
          }
          
          const verificarID = await this.exemplar_repositories.buscarPorID(exemplar)
          
          if (!verificarID) {
               throw new AppError("Nenhuma exemplar com esse id encontrado",404);
               
          }

          const verificarIdentificacao = await this.exemplar_repositories.buscarPorIdentificacao(exemplar)

          if (verificarIdentificacao && verificarIdentificacao.id != exemplar.id) {
               throw new AppError("Já existe uma exemplar com essa identificação",404);
               
          }

          const result = await this.exemplar_repositories.atualizar(exemplar)

          return result
     }
     async deletar (exemplar) {
          if (!exemplar.id) {
               throw new AppError("Insira o id da exemplar",404);
               
          }
          
          const verificarID = await this.exemplar_repositories.buscarPorID(exemplar)
          
          if (!verificarID) {
               throw new AppError("Nenhuma exemplar com esse id encontrado",404);
               
          }

          const result = await this.exemplar_repositories.deletar(exemplar)

          return result
     }
}

export default ExemplarServices