import AutorRepositories from '../repositories/AutorRepositories.js'
import AppError from '../errors/AppError.js'

class AutorServices {
     constructor() {
          this.autor_repositories = new AutorRepositories()
     }

     async visualizar () {
          const result = await this.autor_repositories.visualizar()

          return result
     }
     async buscarPorID (autor) {
          if (!autor.id) {
               throw new AppError("Insira o id da autor",404);
               
          }
          
          const result = await this.autor_repositories.buscarPorID(autor)
          
          if (!result) {
               throw new AppError("Nenhuma autor com esse id encontrado",404);
               
          }
          
          return result
     }
     async adicionar (autor) {
          if (!autor.nome) {
               throw new AppError("Insira o nome do autor",404);
               
          }
          if (!autor.nascionalidade) {
               throw new AppError("Insira a nascionalidade do autor",404);
               
          }
          if (!autor.data_nascimento) {
               throw new AppError("Insira a data de nascimento do autor",404);
               
          }

          const result = await this.autor_repositories.adicionar(autor)

          return result
     }
     async atualizar (autor) {
          if (!autor.id) {
               throw new AppError("Insira o id do autor",404);
               
          }
          
          const verificarID = await this.autor_repositories.buscarPorID(autor)
          
          if (!verificarID) {
               throw new AppError("Nenhuma autor com esse id encontrado",404);
               
          }

          const result = await this.autor_repositories.atualizar(autor)

          return result
     }
     async deletar (autor) {
          if (!autor.id) {
               throw new AppError("Insira o id do autor",404);
               
          }
          
          const verificarID = await this.autor_repositories.buscarPorID(autor)
          
          if (!verificarID) {
               throw new AppError("Nenhuma autor com esse id encontrado",404);
               
          }

          const result = await this.autor_repositories.deletar(autor)

          return result
     }
}

export default AutorServices