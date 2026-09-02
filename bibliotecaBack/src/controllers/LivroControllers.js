import LivroServices from "../services/LivroServices.js"

class LivroControllers {
     constructor() {
          this.livro_services = new LivroServices()
     }

     visualizar = async (req,res,next) => {

               const result = await this.livro_services.visualizar()

               res.status(200).json(result)

     }
     buscarPorID = async (req,res,next) => {

               const id = req.params.id

               const livro = {
                    id
               }

               const result = await this.livro_services.buscarPorID(livro)

               res.status(200).json(result)

     }
     adicionar = async (req,res,next) => {

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

     }
     atualizar = async (req,res,next) => {

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

     }
     alterarAtivo = async (req,res,next) => {

               const id = req.params.id

               const livro = {
                    id
               }

               const result = await this.livro_services.alterarAtivo(livro)

               res.status(200).json({
                    "message": "livro deletado com sucesso",
                    result
               })

     }
}

export default LivroControllers