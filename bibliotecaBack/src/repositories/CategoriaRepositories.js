import prisma from '../database/prisma.js'

class CategoriaRepositories {
     async visualizar () {
          const result = await prisma.categoria.findMany({
               orderBy: {
                    nome: 'asc'
               }
          })

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
     async alterarAtivo (categoria) {
          const result = await prisma.$transaction( async (fx) => {
               const atual = await fx.categoria.findFirst({
                    where: {
                         id: categoria.id
                    },
                    select: {
                         ativo: true
                    }
               })

               const novo = await fx.categoria.update({
                    where: {
                         id: categoria.id
                    },
                    data: {
                         ativo: !atual.ativo
                    }
               })

               return novo
          })

          return result
     }
}

export default CategoriaRepositories