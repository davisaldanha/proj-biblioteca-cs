import CategoriaRepositories from '../repositories/CategoriaRepositories.js'
import AppError from '../errors/AppError.js'

class CategoriaServices {
     constructor() {
          this.categoria_repositories = new CategoriaRepositories()
     }

     async visualizar () {
          const result = await this.categoria_repositories.visualizar()

          return result
     }
     async buscarPorID (categoria) {
          if (!categoria.id) {
               throw new AppError("Insira o id da categoria",404);
               
          }
          
          const result = await this.categoria_repositories.buscarPorID(categoria)
          
          if (!result) {
               throw new AppError("Nenhuma categoria com esse id encontrado",404);
               
          }
          
          return result
     }
     async adicionar (categoria) {
          if (!categoria.nome) {
               throw new AppError("Insira o nome da categoria",404);
               
          }
          if (!categoria.descricao) {
               throw new AppError("Insira a descricao da categoria",404);
               
          }
          
          const verificarNome = await this.categoria_repositories.buscarPorNome(categoria)
          
          if (verificarNome) {
               throw new AppError("Já existe uma categoria com esse nome",404);
               
          }

          const result = await this.categoria_repositories.adicionar(categoria)

          return result
     }
     async atualizar (categoria) {
          if (!categoria.id) {
               throw new AppError("Insira o id da categoria",404);
               
          }
          
          const verificarID = await this.categoria_repositories.buscarPorID(categoria)
          
          if (!verificarID) {
               throw new AppError("Nenhuma categoria com esse id encontrado",404);
               
          }

          const verificarNome = await this.categoria_repositories.buscarPorNome(categoria)

          if (verificarNome && verificarNome.id != categoria.id) {
               throw new AppError("Já existe uma categoria com esse nome",404);
               
          }

          const result = await this.categoria_repositories.atualizar(categoria)

          return result
     }
     async alterarAtivo (categoria) {
          if (!categoria.id) {
               throw new AppError("Insira o id da categoria",404);
               
          }
          
          const verificarID = await this.categoria_repositories.buscarPorID(categoria)
          
          if (!verificarID) {
               throw new AppError("Nenhuma categoria com esse id encontrado",404);
               
          }

          const result = await this.categoria_repositories.alterarAtivo(categoria)

          return result
     }
}

export default CategoriaServices