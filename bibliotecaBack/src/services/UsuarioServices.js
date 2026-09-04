import UsuarioRepositories from '../repositories/UsuarioRepositories.js'
import AppError from '../errors/AppError.js'
import bcrypt from 'bcrypt'

class UsuarioServices {
     constructor() {
          this.usuario_repositories = new UsuarioRepositories()
     }

     async visualizar () {
          const result = await this.usuario_repositories.visualizar()

          return result
     }
     async buscarPorID (usuario) {
          if (!usuario.id) {
               throw new AppError("Insira o id da usuario",404);
               
          }
          
          const result = await this.usuario_repositories.buscarPorID(usuario)
          
          if (!result) {
               throw new AppError("Nenhuma usuario com esse id encontrado",404);
               
          }
          
          return result
     }
     async adicionar (usuario) {
          if (!usuario.nome) {
               throw new AppError("Insira o nome do usuario",404);
               
          }
          if (!usuario.cpf) {
               throw new AppError("Insira o cpf do usuario",404);
               
          }
          if (!usuario.email) {
               throw new AppError("Insira o email do usuario",404);
               
          }
          if (!usuario.senha) {
               throw new AppError("Insira a senha do usuario",404);
               
          }
          if (!usuario.telefone) {
               throw new AppError("Insira o telefone do usuario",404);
               
          }
          if (!usuario.data_nascimento) {
               throw new AppError("Insira a data de nascimento do usuario",404);
               
          }
          if (!usuario.endereco) {
               throw new AppError("Insira o endereço do usuario",404);
               
          }
          if (!usuario.perfil) {
               throw new AppError("Insira o perfil do usuario",404);
               
          }
          if (!usuario.status) {
               throw new AppError("Insira o status do usuario",404);
               
          }
          
          const verificarCpf = await this.usuario_repositories.buscarPorCpf(usuario)
          
          if (verificarCpf) {
               throw new AppError("Já existe uma usuario com esse cpf",404);
               
          }

          const verificarEmail = await this.usuario_repositories.buscarPorEmail(usuario)
          
          if (verificarEmail) {
               throw new AppError("Já existe uma usuario com esse email",404);
               
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
               perfil: usuario.perfil,
               status: usuario.status
          }

          const result = await this.usuario_repositories.adicionar(user)

          return result
     }
     async atualizar (usuario) {
          if (!usuario.id) {
               throw new AppError("Insira o id da usuario",404);
               
          }
          
          const verificarID = await this.usuario_repositories.buscarPorID(usuario)
          
          if (!verificarID) {
               throw new AppError("Nenhuma usuario com esse id encontrado",404);
               
          }

          const verificarCpf = await this.usuario_repositories.buscarPorCpf(usuario)

          if (verificarCpf && verificarCpf.id != usuario.id) {
               throw new AppError("Já existe uma usuario com esse cpf",404);
               
          }

          const verificarEmail = await this.usuario_repositories.buscarPorEmail(usuario)

          if (verificarEmail && verificarEmail.id != usuario.id) {
               throw new AppError("Já existe uma usuario com esse email",404);
               
          }

          let senhaHasheada;

          const user = {
               id: usuario.id,
               nome: usuario.nome,
               cpf: usuario.cpf,
               email: usuario.email,
               telefone: usuario.telefone,
               data_nascimento: usuario.data_nascimento,
               endereco: usuario.endereco,
               perfil: usuario.perfil,
               status: usuario.status
          }
          if (usuario.senha) {
               senhaHasheada = await bcrypt.hash(usuario.senha, 10)

               user.senha = senhaHasheada
          }
          
          const result = await this.usuario_repositories.atualizar(user)

          return result
     }
     async alterarAtivo (usuario) {
          if (!usuario.id) {
               throw new AppError("Insira o id da usuario",404);
               
          }
          
          const verificarID = await this.usuario_repositories.buscarPorID(usuario)
          
          if (!verificarID) {
               throw new AppError("Nenhuma usuario com esse id encontrado",404);
               
          }

          const verificarEmprestimoAtivo = await this.usuario_repositories.buscarPorEmprestimoAtivo(usuario)

          if (verificarEmprestimoAtivo) {
               throw new AppError("Esse usuario possui um emprestimo ativo",404);
               
          }

          let status;

          if (verificarID.status == 'ativo') {
               status = 'inativo'
          } else {
               status = 'ativo'
          }

          const user = {
               id: usuario.id,
               status: status
          }

          const result = await this.usuario_repositories.alterarAtivo(user)

          return result
     }
}

export default UsuarioServices