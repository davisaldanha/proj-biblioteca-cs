import LivroRepositories from '../repositories/LivroRepositories.js'
import AppError from '../errors/AppError.js'

class LivroServices {
     constructor() {
          this.livro_repositories = new LivroRepositories()
     }

     async visualizar () {
          const result = await this.livro_repositories.visualizar()

          return result
     }
     async buscarPorID (livro) {
          if (!livro.id) {
               throw new AppError("Insira o id da livro",404);
               
          }
          
          const result = await this.livro_repositories.buscarPorID(livro)
          
          if (!result) {
               throw new AppError("Nenhuma livro com esse id encontrado",404);
               
          }
          
          return result
     }
     async adicionar (livro) {
          if (!livro.isbn) {
               throw new AppError("Insira o isbn do livro",404);
               
          }
          if (!livro.titulo) {
               throw new AppError("Insira o titulo do livro",404);
               
          }
          if (!livro.ano_publicacao) {
               throw new AppError("Insira o ano de publicação do livro",404);
               
          }
          if (!livro.edicao) {
               throw new AppError("Insira a edição do livro",404);
               
          }
          if (!livro.editora) {
               throw new AppError("Insira a editora do livro",404);
               
          }
          if (!livro.categoria_id) {
               throw new AppError("Insira a categoria do livro",404);
               
          }
          if (!livro.descricao) {
               throw new AppError("Insira a descricao do livro",404);
               
          }
          if (!livro.autor_id) {
               throw new AppError("Insira o autor do livro",404);
               
          }
          
          const verificarIsbn = await this.livro_repositories.buscarPorIsbn(livro)
          
          if (verificarIsbn) {
               throw new AppError("Já existe uma livro com esse isbn",404);
               
          }

          const result = await this.livro_repositories.adicionar(livro)

          return result
     }
     async atualizar (livro) {
          if (!livro.id) {
               throw new AppError("Insira o id da livro",404);
               
          }
          
          const verificarID = await this.livro_repositories.buscarPorID(livro)
          
          if (!verificarID) {
               throw new AppError("Nenhuma livro com esse id encontrado",404);
               
          }

          const verificarIsbn = await this.livro_repositories.buscarPorIsbn(livro)

          if (verificarIsbn && verificarIsbn.id != livro.id) {
               throw new AppError("Já existe uma livro com esse isbn",404);
               
          }

          const result = await this.livro_repositories.atualizar(livro)

          return result
     }
     async deletar (livro) {
          if (!livro.id) {
               throw new AppError("Insira o id da livro",404);
               
          }
          
          const verificarID = await this.livro_repositories.buscarPorID(livro)
          
          if (!verificarID) {
               throw new AppError("Nenhuma livro com esse id encontrado",404);
               
          }

          const result = await this.livro_repositories.deletar(livro)

          return result
     }
}

export default LivroServices