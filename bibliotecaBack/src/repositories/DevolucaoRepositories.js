import prisma from '../database/prisma.js'

class DevolucaoRepositories {
     async visualizar () {
          const result = await prisma.devolucao.findMany({
               select: {
                    id: true,
                    data_devolucao: true,
                    exemplar: {
                         select: {
                              id: true,
                              cod_identificacao: true,
                              livro: true,
                              data_aquisicao: true,
                              estado_conservacao: true,
                              status: true
                         }
                    },
                    usuario: {
                         select: {
                              id: true,
                              nome: true,
                              cpf: true,
                              email: true,
                              telefone: true,
                              data_nascimento: true,
                              data_cadastro: true,
                              endereco: true,
                              status: true,
                              perfil: true
                         }
                    },
                    situacao: true
               }
          })

          return result
     }
     async buscarPorID (devolucao) {
          const result = await prisma.devolucao.findUnique({
               where: {
                    id: devolucao.id
               },
               select: {
                    id: true,
                    data_devolucao: true,
                    exemplar: {
                         select: {
                              id: true,
                              cod_identificacao: true,
                              livro: true,
                              data_aquisicao: true,
                              estado_conservacao: true,
                              status: true
                         }
                    },
                    usuario: {
                         select: {
                              id: true,
                              nome: true,
                              cpf: true,
                              email: true,
                              telefone: true,
                              data_nascimento: true,
                              data_cadastro: true,
                              endereco: true,
                              status: true,
                              perfil: true
                         }
                    },
                    situacao: true
               }
          })

          return result
     }
     async buscarPorExemplarEmprestado (devolucao) {
          const result = await prisma.emprestimo_exemplar.findFirst({
               where: {
                    exemplar_id: devolucao.exemplar_id,
                    exemplar: {
                         status: 'em aberto'
                    }
               },
               select: {
                    id: true,
                    exemplar: true
               }
          })

          return result
     }
     async adicionar (devolucao) {
          const result = await prisma.$transaction(async (fx) => {
               const devol = await fx.devolucao.create({
                    data: {
                         exemplar_id: devolucao.exemplar_id,
                         funcionario_id: devolucao.funcionario_id,
                         situacao: devolucao.situacao
                    },
                    select: {
                    id: true,
                    data_devolucao: true,
                    exemplar: true,
                    usuario: {
                         select: {
                              id: true,
                              nome: true,
                              email: true,
                              telefone: true,
                              endereco: true,
                              data_cadastro: true,
                              data_nascimento: true,
                              status: true,
                              perfil: true
                         }
                    },
                    situacao: true
                    }
               })
               
               const exemplar = await fx.exemplar.update({
                    where: {
                         id: devol.exemplar.id
                    },
                    data: {
                         status: 'Disponivel'
                    },
                    select: {
                         id: true,
                         cod_identificacao: true,
                         livro: true,
                         data_aquisicao: true,
                         estado_conservacao: true,
                         status: true,
                         emprestimo_exemplar: true
                    }
               })

               const emprestimoExemplar = await fx.emprestimo_exemplar.findFirst({
                    where: {
                         exemplar_id: exemplar.id
                    },
                    select: {
                         emprestimo_id: true
                    }
               })

               const emprestimo = await fx.emprestimo.update({
                    where: {
                         id: emprestimoExemplar.emprestimo_id
                    },
                    data: {
                         status: 'Devolvido',
                         data_devolucao: new Date().toISOString()
                    }
               })

               return {
                    id: devol.id,
                    exemplar: devol.exemplar,
                    funcionario: devol.usuario,
                    situacao: devol.situacao,
               }
          })

          return result
     }
}

export default DevolucaoRepositories