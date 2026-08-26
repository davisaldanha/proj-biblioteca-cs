import prisma from '../database/prisma.js'

class CategoriaRepositories {
     async visualizar () {
          const result = await prisma.categoria.findMany()

          return result
     }
     async buscarPorID (categoria) {
          const result = await prisma.categoria.findUnique({
               where: {
                    id: categoria.id
               }
          })

          return result
     }
     async buscarPorNome (categoria) {
          const result = await prisma.categoria.findUnique({
               where: {
                    nome: categoria.nome
               }
          })

          return result
     }
     async adicionar (categoria) {
          const result = await prisma.categoria.create({
               data: {
                    nome: categoria.nome,
                    descricao: categoria.descricao
               }
          })

          return result
     }
     async atualizar (categoria) {
          const result = await prisma.categoria.update({
               where: {
                    id: categoria.id
               },
               data: {
                    nome: categoria.nome,
                    descricao: categoria.descricao
               }
          })

          return result
     }
     async deletar (categoria) {
          const result = await prisma.categoria.delete({
               where: {
                    id: categoria.id
               }
          })

          return result
     }
}

export default CategoriaRepositories