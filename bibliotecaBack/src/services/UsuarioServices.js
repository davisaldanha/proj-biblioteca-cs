import UsuarioRepositories from '../repositories/UsuarioRepositories.js'
import AppError from '../errors/AppError.js'

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

          const result = await this.usuario_repositories.adicionar(usuario)

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

          const result = await this.usuario_repositories.atualizar(usuario)

          return result
     }
     async deletar (usuario) {
          if (!usuario.id) {
               throw new AppError("Insira o id da usuario",404);
               
          }
          
          const verificarID = await this.usuario_repositories.buscarPorID(usuario)
          
          if (!verificarID) {
               throw new AppError("Nenhuma usuario com esse id encontrado",404);
               
          }

          const result = await this.usuario_repositories.deletar(usuario)

          return result
     }
}

export default UsuarioServices