import prisma from '../database/prisma.js'

class AuthRepositories {
     async buscarPorCpf (usuario) {
          const result = await prisma.usuario.findUnique({
               where: {
                    cpf: usuario.cpf
               }, select: {
                    id: true,
                    nome: true,
                    email: true,
                    cpf: true,
                    data_nascimento: true,
                    data_cadastro: true,
                    telefone: true,
                    endereco: true,
                    perfil: true,
                    status: true
               }
          })

          return result
     }
     async buscarPorEmail (usuario) {
          const result = await prisma.usuario.findUnique({
               where: {
                    email: usuario.email
               }
          })

          return result
     }
     async cadastrar (usuario) {
          const result = await prisma.usuario.create({
               data: {
                    nome: usuario.nome,
                    cpf: usuario.cpf,
                    email: usuario.email,
                    senha: usuario.senha,
                    telefone: usuario.telefone,
                    data_nascimento: usuario.data_nascimento,
                    endereco: usuario.endereco,
                    perfil: usuario.perfil,
                    status: usuario.status
               }, select: {
                    id: true,
                    nome: true,
                    email: true,
                    cpf: true,
                    data_nascimento: true,
                    data_cadastro: true,
                    telefone: true,
                    endereco: true,
                    perfil: true,
                    status: true
               }
          })

          return result
     }
}

export default AuthRepositories