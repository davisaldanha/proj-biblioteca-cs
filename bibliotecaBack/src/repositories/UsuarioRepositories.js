import prisma from '../database/prisma.js'

class UsuarioRepositories {
     async visualizar () {
          const result = await prisma.usuario.findMany({
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
          })

          return result
     }
     async buscarPorID (usuario) {
          const result = await prisma.usuario.findUnique({
               where: {
                    id: usuario.id
               },
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
          })

          return result
     }
     async buscarPorEmail (usuario) {
          const result = await prisma.usuario.findUnique({
               where: {
                    email: usuario.email
               },
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
          })

          return result
     }
     async buscarPorCpf (usuario) {
          const result = await prisma.usuario.findUnique({
               where: {
                    cpf: usuario.cpf
               },
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
          })

          return result
     }
     async adicionar (usuario) {
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
               },
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
          })

          return result
     }
     async atualizar (usuario) {
          const result = await prisma.usuario.update({
               where: {
                    id: usuario.id
               },
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
               },
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
          })

          return result
     }
     async alterarAtivo (usuario) {
          const result = await prisma.usuario.update({
               where: {
                    id: usuario.id
               }, data: {
                    status: usuario.status
               }, select: {
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
          })

          return result
     }
}

export default UsuarioRepositories