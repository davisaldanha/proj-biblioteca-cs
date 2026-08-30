import LivroServices from "../services/LivroServices.js"

class LivroControllers {
     constructor() {
          this.livro_services = new LivroServices()
     }

     visualizar = async (req,res,next) => {
          try {
               const result = await this.livro_services.visualizar()

               res.status(200).json(result)
          } catch (error) {
              next(error) 
          }
     }
     buscarPorID = async (req,res,next) => {
          try {
               const id = req.params.id

               const livro = {
                    id
               }

               const result = await this.livro_services.buscarPorID(livro)

               res.status(200).json(result)
          } catch (error) {
              next(error) 
          }
     }
     adicionar = async (req,res,next) => {
          try {
               const {isbn,titulo,ano_publicacao,edicao,editora,categoria_id,descricao,autor_id} = req.body

               const livro = {
                    isbn: parseInt(isbn),
                    titulo,
                    ano_publicacao: parseInt(ano_publicacao),
                    edicao,
                    editora,
                    categoria_id,
                    descricao,
                    autor_id
               }

               const result = await this.livro_services.adicionar(livro)

               res.status(201).json({
                    "message": "livro adicionado com sucesso",
                    result
               })
          } catch (error) {
              next(error) 
          }
     }
     atualizar = async (req,res,next) => {
          try {
               const id = req.params.id
               const {isbn,titulo,ano_publicacao,edicao,editora,categoria_id,descricao,autor_id} = req.body

               const livro = {
                    id,
                    isbn: parseInt(isbn),
                    titulo,
                    ano_publicacao: parseInt(ano_publicacao),
                    edicao,
                    editora,
                    categoria_id,
                    descricao,
                    autor_id
               }

               const result = await this.livro_services.atualizar(livro)

               res.status(200).json({
                    "message": "livro atualizado com sucesso",
                    result
               })
          } catch (error) {
              next(error) 
          }
     }
     alterarAtivo = async (req,res,next) => {
          try {
               const id = req.params.id

               const livro = {
                    id
               }

               const result = await this.livro_services.alterarAtivo(livro)

               res.status(200).json({
                    "message": "livro deletado com sucesso",
                    result
               })
          } catch (error) {
              next(error) 
          }
     }
}

export default LivroControllers