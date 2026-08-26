import prisma from '../database/prisma.js'

class EmprestimoRepositories {
     async visualizar () {
          const result = await prisma.emprestimo_exemplar.findMany({
               select: {
                    id: true,
                    emprestimo: {
                         select: {
                              id: true,
                              usuario_emprestimo_usuario_idTousuario: {
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
                              usuario_emprestimo_funcionario_idTousuario: {
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
                              data_emprestimo: true,
                              data_devolucao_prev: true,
                              data_devolucao: true,
                              status: true
                         }
                    },
                    exemplar: {
                         select: {
                              id: true,
                              cod_identificacao: true,
                              livro: true,
                              data_aquisicao: true,
                              estado_conservacao: true,
                              status: true
                         }
                    }
               }
          })

          return result
     }
     async buscarPorID (emprestimo) {
          const result = await prisma.emprestimo_exemplar.findUnique({
               where: {
                    id: emprestimo.id
               },
               select: {
                    id: true,
                    emprestimo: {
                         select: {
                              id: true,
                              usuario_emprestimo_usuario_idTousuario: {
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
                              usuario_emprestimo_funcionario_idTousuario: {
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
                              data_emprestimo: true,
                              data_devolucao_prev: true,
                              data_devolucao: true,
                              status: true
                         }
                    },
                    exemplar: {
                         select: {
                              id: true,
                              cod_identificacao: true,
                              livro: true,
                              data_aquisicao: true,
                              estado_conservacao: true,
                              status: true
                         }
                    }
               }
          })

          return result
     }
     async adicionar (emprestimo) {
          const result = await prisma.$transaction(async (fx) => {
               const empres = await fx.emprestimo.create({
                    data: {
                         usuario_id: emprestimo.usuario_id,
                         funcionario_id: emprestimo.funcionario_id,
                         data_devolucao_prev: emprestimo.data_devolucao_prev,
                         data_devolucao: emprestimo.data_devolucao,
                         estado_conservacao: emprestimo.estado_conservacao,
                         status: emprestimo.status
                    },
                    select: {
                         id: true,
                         usuario_emprestimo_usuario_idTousuario: {
                              select: {
                                   id: true,
                                   nome: true,
                                   cpf: true,
                                   email: true,
                                   telefone: true,
                                   data_nascimento: true,
                                   data_cadastro: true,
                                   endereco: true,
                                   perfil: true,
                                   status: true
                              }
                         },
                         usuario_emprestimo_funcionario_idTousuario: {
                              select: {
                                   id: true,
                                   nome: true,
                                   cpf: true,
                                   email: true,
                                   telefone: true,
                                   data_nascimento: true,
                                   data_cadastro: true,
                                   endereco: true,
                                   perfil: true,
                                   status: true
                              }
                         },
                         data_devolucao_prev: true,
                         data_devolucao: true,
                         status: true
                    }
               })

               const emprestimo_exemplar = await fx.emprestimo_exemplar.create({
                    data: {
                         emprestimo_id: empres.id,
                         exemplar_id: emprestimo.exemplar_id
                    },
                    select: {
                         id: true,
                         emprestimo: true,
                         exemplar: true
                    }
               })

               return {
                    id: emprestimo_exemplar.id,
                    emprestimo: {
                         usuario: empres,
                         funcionario: empres,
                         data_emprestimo: empres.data_emprestimo,
                         data_devolucao_prev: empres.data_devolucao_prev,
                         data_devolucao: empres.data_devolucao,
                         status: empres.status
                    },
                    exemplar: emprestimo_exemplar.exemplar
               }
          })

          return result
     }
     async atualizar (emprestimo) {
          const result = await prisma.$transaction(async (fx) => {
               const emprestimo_exemplar = await fx.emprestimo_exemplar.update({
                    where: {
                         id: emprestimo.id
                    },
                    data: {
                         exemplar_id: emprestimo.exemplar_id
                    },
                    select: {
                         id: true,
                         emprestimo: true,
                         exemplar: true
                    }
               })

               const empres = await fx.emprestimo.update({
                    where: {
                         id: emprestimo_exemplar.emprestimo.id
                    },
                    data: {
                         usuario_id: emprestimo.usuario_id,
                         funcionario_id: emprestimo.funcionario_id,
                         data_devolucao_prev: emprestimo.data_devolucao_prev,
                         data_devolucao: emprestimo.data_devolucao,
                         estado_conservacao: emprestimo.estado_conservacao,
                         status: emprestimo.status
                    },
                    select: {
                         id: true,
                         usuario_emprestimo_usuario_idTousuario: true,
                         usuario_emprestimo_funcionario_idTousuario: true,
                         data_devolucao_prev: true,
                         data_devolucao: true,
                         status: true
                    }
               })


               return {
                    id: emprestimo_exemplar.id,
                    emprestimo: {
                         usuario: empres,
                         funcionario: empres,
                         data_emprestimo: empres.data_emprestimo,
                         data_devolucao_prev: empres.data_devolucao_prev,
                         data_devolucao: empres.data_devolucao,
                         status: empres.status
                    },
                    exemplar: emprestimo_exemplar.exemplar
               }
          })

          return result
     }
     async deletar (emprestimo) {
          const result = await prisma.$transaction(async (fx) => {
               const emprestimo_exemplar = await fx.emprestimo_exemplar.delete({
                    where: {
                         id: emprestimo.id
                    }, 
                    select: {
                         id: true,
                         emprestimo_id: true,
                         exemplar: true
                    }
               })

               const empres = await fx.emprestimo.delete({
                    where: {
                         id: emprestimo_exemplar.emprestimo_id
                    }
               })

               return {
                    id: emprestimo_exemplar.id,
                    exemplar: emprestimo_exemplar.exemplar
               }
          })

          return result
     }
}

export default EmprestimoRepositories