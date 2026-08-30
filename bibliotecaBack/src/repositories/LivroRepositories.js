import prisma from '../database/prisma.js'

class LivroRepositories {
     async visualizar () {
          const result = await prisma.livro_autor.findMany({
               select: {
                    id: true,
                    livro: {
                         select: {
                              id: true,
                              isbn: true,
                              titulo: true,
                              ano_publicacao: true,
                              edicao: true,
                              editora: true,
                              categoria: true,
                              descricao: true
                         }
                    },
                    autor: true
               }
          })

          return result
     }
     async buscarPorID (livro) {
          const result = await prisma.livro_autor.findUnique({
               where: {
                    id: livro.id
               },
               select: {
                    id: true,
                    livro: {
                         select: {
                              id: true,
                              isbn: true,
                              titulo: true,
                              ano_publicacao: true,
                              edicao: true,
                              editora: true,
                              categoria: true,
                              descricao: true
                         }
                    },
                    autor: true
               }
          })

          return result
     }
     async buscarPorIsbn (livro) {
          const result = await prisma.livro_autor.findFirst({
               where: {
                    livro: {
                         isbn: livro.isbn
                    }
               }, select: {
                    id: true,
                    livro: true
               }
          })

          return result
     }
     async adicionar (livro) {
          const result = await prisma.$transaction(async (fx) => {
               const book = await fx.livro.create({
                    data: {
                         isbn: livro.isbn,
                         titulo: livro.titulo,
                         ano_publicacao: livro.ano_publicacao,
                         edicao: livro.edicao,
                         editora: livro.editora,
                         categoria_id: livro.categoria_id,
                         descricao: livro.descricao
                    }, select : {
                         id: true,
                         isbn: true,
                         titulo: true,
                         ano_publicacao: true,
                         edicao: true,
                         editora: true,
                         categoria: true,
                         descricao: true
                    }
               })

               const livro_autor = await fx.livro_autor.create({
                    data: {
                         livro_id: book.id,
                         autor_id: livro.autor_id
                    }, select: {
                         autor: true
                    }
               })

               return {
                    id: livro_autor.id,
                    livro: {
                         id: book.id,
                         isbn: book.isbn,
                         titulo: book.titulo,
                         ano_publicacao: book.ano_publicacao,
                         edicao: book.edicao,
                         editora: book.editora,
                         categoria: book.categoria,
                         descricao: book.descricao,
                    },
                    autor: {
                         id: livro_autor.autor.id,
                         nome: livro_autor.autor.nome,
                         nascionalidade: livro_autor.autor.nascionalidade,
                         data_nascimento: livro_autor.autor.data_nascimento
                    }
               }
          })

          return result
     }
     async atualizar (livro) {
          const result = await prisma.$transaction(async (fx) => {
               const livro_autor = await fx.livro_autor.update({
                    where: {
                         id: livro.id
                    },
                    data: {
                         autor_id: livro.autor_id
                    }, select: {
                         autor: true,
                         livro: true,
                         id: true
                    }
               })
               
               const book = await fx.livro.update({
                    where: {
                         id: livro_autor.livro.id
                    },
                    data: {
                         isbn: livro.isbn,
                         titulo: livro.titulo,
                         ano_publicacao: livro.ano_publicacao,
                         edicao: livro.edicao,
                         editora: livro.editora,
                         categoria_id: livro.categoria_id,
                         descricao: livro.descricao
                    }, select : {
                         id: true,
                         isbn: true,
                         titulo: true,
                         ano_publicacao: true,
                         edicao: true,
                         editora: true,
                         categoria: true,
                         descricao: true
                    }
               })

               return {
                    id: livro_autor.id,
                    livro: {
                         id: book.id,
                         isbn: book.isbn,
                         titulo: book.titulo,
                         ano_publicacao: book.ano_publicacao,
                         edicao: book.edicao,
                         editora: book.editora,
                         categoria: book.categoria,
                         descricao: book.descricao,
                    },
                    autor: {
                         id: livro_autor.autor.id,
                         nome: livro_autor.autor.nome,
                         nascionalidade: livro_autor.autor.nascionalidade,
                         data_nascimento: livro_autor.autor.data_nascimento
                    }
               }
          })

          return result
     }
     async alterarAtivo (livro) {
          const result = await prisma.$transaction( async (fx) => {
               const atual = await fx.livro_autor.findFirst({
                    where: {
                         id: livro.id
                    },
                    select: {
                         ativo: true
                    }
               })

               const novo = await fx.livro_autor.update({
                    where: {
                         id: livro.id
                    },
                    data: {
                         ativo: !atual.ativo
                    },
                    select: {
                    id: true,
                    ativo: true,
                    livro: {
                         select: {
                              id: true,
                              isbn: true,
                              titulo: true,
                              ano_publicacao: true,
                              edicao: true,
                              editora: true,
                              categoria: true,
                              descricao: true
                         }
                    },
                    autor: {
                         select: {
                              id: true,
                              nome: true,
                              nascionalidade: true,
                              data_nascimento: true
                         }
                    }
               }
               })

               return novo
          })

          return result
     }
}

export default LivroRepositories