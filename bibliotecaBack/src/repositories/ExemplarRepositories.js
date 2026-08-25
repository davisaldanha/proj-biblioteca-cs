import prisma from '../database/prisma.js'

class ExemplarRepositories {
     async visualizar () {
          const result = await prisma.exemplar.findMany({
               select: {
                    id: true,
                    cod_identificacao: true,
                    livro: true,
                    data_aquisicao: true,
                    estado_conservacao: true,
                    status: true
               }
          })

          return result
     }
     async buscarPorID (exemplar) {
          const result = await prisma.exemplar.findUnique({
               where: {
                    id: exemplar.id
               },
               select: {
                    id: true,
                    cod_identificacao: true,
                    livro: true,
                    data_aquisicao: true,
                    estado_conservacao: true,
                    status: true
               }
          })

          return result
     }
     async buscarPorIdentificacao (exemplar) {
          const result = await prisma.exemplar.findUnique({
               where: {
                    cod_identificacao: exemplar.cod_identificacao
               },
               select: {
                    id: true,
                    cod_identificacao: true,
                    livro: true,
                    data_aquisicao: true,
                    estado_conservacao: true,
                    status: true
               }
          })

          return result
     }
     async adicionar (exemplar) {
          const result = await prisma.exemplar.create({
               data: {
                    cod_identificacao: exemplar.cod_identificacao,
                    livro_id: exemplar.livro_id,
                    data_aquisicao: exemplar.data_aquisicao,
                    estado_conservacao: exemplar.estado_conservacao,
                    status: exemplar.status
               },
               select: {
                    id: true,
                    cod_identificacao: true,
                    livro: true,
                    data_aquisicao: true,
                    estado_conservacao: true,
                    status: true
               }
          })

          return result
     }
     async atualizar (exemplar) {
          const result = await prisma.exemplar.update({
               where: {
                    id: exemplar.id
               },
               data: {
                    cod_identificacao: exemplar.cod_identificacao,
                    livro_id: exemplar.livro_id,
                    data_aquisicao: exemplar.data_aquisicao,
                    estado_conservacao: exemplar.estado_conservacao,
                    status: exemplar.status
               },
               select: {
                    id: true,
                    cod_identificacao: true,
                    livro: true,
                    data_aquisicao: true,
                    estado_conservacao: true,
                    status: true
               }
          })

          return result
     }
     async deletar (exemplar) {
          const result = await prisma.exemplar.delete({
               where: {
                    id: exemplar.id
               },
               select: {
                    id: true,
                    cod_identificacao: true,
                    livro: true
               }
          })

          return result
     }
}

export default ExemplarRepositories