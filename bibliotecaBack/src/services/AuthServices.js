import AuthRepositories from "../repositories/AuthRepositories.js"
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import AppError from '../errors/AppError.js'

class AuthServices {
     constructor() {
          this.auth_repositories = new AuthRepositories()
     }

     async register (usuario) {
          if (!usuario.nome) {
               throw new AppError("Insira o nome do usuario",400);
               
          }
          if (!usuario.cpf) {
               throw new AppError("Insira o cpf do usuario",400);
               
          }
          if (!usuario.email) {
               throw new AppError("Insira o email do usuario",400);
               
          }
          if (!usuario.senha) {
               throw new AppError("Insira a senha do usuario",400);
               
          }
          if (!usuario.telefone) {
               throw new AppError("Insira o telefone do usuario",400);
               
          }
          if (!usuario.data_nascimento) {
               throw new AppError("Insira a data de nascimento do usuario",400);
               
          }
          if (!usuario.endereco) {
               throw new AppError("Insira o endereço do usuario",400);
               
          }
          
          if (usuario.senha.length < 8) {
               throw new AppError("A senha deve conter pelo menos 8 caracteres",400);
               
          }

          const verificarEmail = await this.auth_repositories.buscarPorEmail(usuario)

          if (verificarEmail) {
               throw new AppError("Ja existe um usuario com esse email",400);
               
          }

          const verificarCpf = await this.auth_repositories.buscarPorCpf(usuario)
          
          if (verificarCpf) {
               throw new AppError("Ja existe um usuario com esse cpf",400);
     
          }

          const senhaHasheada = await bcrypt.hash(usuario.senha, 10)

          const user = {
               nome: usuario.nome,
               cpf: usuario.cpf,
               email: usuario.email,
               senha: senhaHasheada,
               telefone: usuario.telefone,
               data_nascimento: usuario.data_nascimento,
               endereco: usuario.endereco,
               perfil: 'atendente',
               status: 'ativo'
          }

          const result = await this.auth_repositories.cadastrar(user)

          return result
     }

     async login (usuario) {
          if (!usuario.email) {
               throw new AppError("Insira o email do usuario",400);
               
          }
          if (!usuario.senha) {
               throw new AppError("Insira a senha do usuario",400);
               
          }
          
          const buscarUsuario = await this.auth_repositories.buscarPorEmail(usuario)
          
          if (!buscarUsuario) {
               throw new AppError("Email ou senha incorretos",400);
               
          }
          
          const verificarSenha = await bcrypt.compare(usuario.senha, buscarUsuario.senha)
          
          if (!verificarSenha) {
               throw new AppError("Email ou senha incorretos",400);
               
          }
          
          if (buscarUsuario.perfil == 'cliente' || buscarUsuario.status == 'inativo') {
               throw new AppError("Voce não tem autorização para acessar a plataforma",400);
               
          }

          const user = {
               id: buscarUsuario.id,
               nome: buscarUsuario.nome,
               email: buscarUsuario.email,
               data_cadastro: buscarUsuario.data_cadastro,
               perfil: buscarUsuario.perfil,
               status: buscarUsuario.status
          }

          const token = jwt.sign(user, process.env.JWT_SECRET, {
               expiresIn: '1d'
          })

          return {user, token}
     }
}

export default AuthServices