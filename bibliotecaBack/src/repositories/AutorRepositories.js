import prisma from '../database/prisma.js'

class AutorRepositories {
     async visualizar () {
          const result = await prisma.autor.findMany()

          return result
     }
     async buscarPorID (autor) {
          const result = await prisma.autor.findUnique({
               where: {
                    id: autor.id
               }
          })

          return result
     }
     async adicionar (autor) {
          const result = await prisma.autor.create({
               data: {
                    nome: autor.nome,
                    nascionalidade: autor.nascionalidade,
                    data_nascimento: autor.data_nascimento
               }
          })

          return result
     }
     async atualizar (autor) {
          const result = await prisma.autor.update({
               where: {
                    id: autor.id
               },
               data: {
                    nome: autor.nome,
                    nascionalidade: autor.nascionalidade,
                    data_nascimento: autor.data_nascimento
               }
          })

          return result
     }
     async deletar (autor) {
          const result = await prisma.autor.delete({
               where: {
                    id: autor.id
               }
          })

          return result
     }
}

export default AutorRepositories