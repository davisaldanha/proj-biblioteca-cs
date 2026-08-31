import { useEffect, useState } from 'react'
import Toast from '../../components/Toast/Toast'
import api from '../../services/api'
import dataConvertida from '../../services/dataConvertida'
import Modal from '../../components/Modal/Modal'
import {useAuth} from '../../context/AuthContext'
import './home.css'

const Home = () => {
  // Entidades
  const [usuarios,setUsuarios] = useState([])
  const [autores,setAutores] = useState([])
  const [categorias,setCategorias] = useState([])
  const [livros,setLivros] = useState([])
  const [exemplares,setExemplares] = useState([])
  const [emprestimos,setEmprestimos] = useState([])
  const [devolucoes,setDevolucoes] = useState([])

  // ERROS/MENSAGENS
  const [errors,setErrors] = useState('')
  const [msg, setMsg] = useState('')

  // ABA ATIVA
  const [tab,setTab] = useState('usuarios')

  // MODAL
  const [modal, setModal] = useState({open: false, mode: '', register: null})

  // informações de autenticação
  const {user, logout} = useAuth()

  const buscarAPI = async () => {
      try {
      setErrors('')

      const users = await api.get('/usuarios')
      const autors = await api.get('/autores')
      const categories = await api.get('/categorias')
      const books = await api.get('/livros')
      const exemplers = await api.get('/exemplares')
      const empres = await api.get('/emprestimos')
      const devos = await api.get('/devolucoes')

      setUsuarios(users.data)
      setAutores(autors.data)
      setCategorias(categories.data)
      setLivros(books.data)
      setExemplares(exemplers.data)
      setEmprestimos(empres.data)
      setDevolucoes(devos.data)

    } catch (error) {
      const message = error.response?.data?.error || error.response?.data?.message
      setErrors(message)
    }
  }
  useEffect(()=> {
    buscarAPI()
  },[])


  // FILTROS
  const disponiveis = exemplares.filter((e) => e.status == 'Disponivel' && e.ativo)
  const emprestados = exemplares.filter((e) => e.status == 'Emprestado')

  const funcionarios = usuarios.filter((u) => u.perfil != 'cliente' && u.status == 'ativo')
  const clientes = usuarios.filter((u) => u.perfil == 'cliente' && u.status == 'ativo')
  
  const usuariosAtivos = usuarios.filter((u) => u.status == 'ativo')
  const exemplaresAtivos = exemplares.filter((e) => e.ativo)
  const livrosAtivos = livros.filter((l) => l.ativo)


  // SELETOR DO CONTEUDO ATIVO COM BASE NA TAB COM SWITCH E SELETOR DOS CAMPOS DO FORMULARIO
  let conteudo;
  let formulario;

  switch (tab) {
    case 'usuarios':
      formulario = (
        <>
          <div className="label-input">
            <label htmlFor="nome">Nome</label>
            <input defaultValue={modal.register?.nome || ''} name='nome' id='nome' type="text" aria-label='digite o nome do usuario' placeholder='Digite o nome do usuario' required/>
          </div>
          <div className="label-input">
            <label htmlFor="cpf">Cpf</label>
            <input defaultValue={modal.register?.cpf || ''} name='cpf' id='cpf' type="text" aria-label='digite o cpf do usuario' placeholder='Digite o cpf do usuario' required/>
          </div>
          <div className="label-input">
            <label htmlFor="email">Email</label>
            <input defaultValue={modal.register?.email || ''} name='email' id='email' type="email" aria-label='digite o email do usuario' placeholder='Digite o email do usuario' required/>
          </div>
          <div className="label-input">
            <label htmlFor="senha">Senha</label>
            <input name='senha' id='senha' type="password" aria-label='digite o senha do usuario' placeholder='Digite a senha do usuario'/>
          </div>
          <div className="label-input">
            <label htmlFor="telefone">Telefone</label>
            <input defaultValue={modal.register?.telefone || ''} name='telefone' id='telefone' type="text" aria-label='digite o telefone do usuario' placeholder='Digite o telefone do usuario' required/>
          </div>
          <div className="label-input">
            <label htmlFor="data_nascimento">Data nascimento</label>
            <input defaultValue={modal.register?.data_nascimento || ''} name='data_nascimento' id='data_nascimento' type="text" aria-label='digite o data de nascimento do usuario' placeholder='Digite a data de nascimento do usuario' required/>
          </div>
          <div className="label-input">
            <label htmlFor="endereco">Endereço</label>
            <input defaultValue={modal.register?.endereco || ''} name='endereco' id='endereco' type="text" aria-label='digite o endereco do usuario' placeholder='Digite o endereço do usuario' required/>
          </div>
          <div className="label-input">
            <label htmlFor="perfil">Perfil</label>
            <select defaultValue={modal.register?.perfil || ''} name="perfil" id="perfil" required>
              <option value="" selected disabled>Selecione o perfil do usuario</option>
              <option value="admin">Admin</option>
              <option value="atendente">Atendente</option>
              <option value="cliente">Cliente</option>
            </select>
          </div>
          <div className="label-input">
            <label htmlFor="status">Status</label>
            <select defaultValue={modal.register?.status || ''} name="status" id="status" required>
              <option value="" selected disabled>Selecione o status do usuario</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
        </>
      )
      conteudo = user.perfil == 'admin' ? usuarios.map((u) => 
        <article className="card-content" key={u.id}>
          <div className="box-text">
            <p>{u.nome}</p>
            <p>{u.status}</p>
            <p>{u.perfil}</p>
          </div>
          <div className="box-btn">
            <button aria-label='editar' disabled={user.perfil != 'admin'} onClick={() => setModal({open: true, mode: 'att', register: u} )}>Editar</button>
            <button aria-label='deletar' disabled={user.perfil != 'admin'} onClick={() => alterarAtivo(u.id)}>{u.status == 'ativo' ? 'Arquivar' : 'Desarquivar'}</button>
          </div>
        </article>
      ) : usuariosAtivos.map((u) => 
        <article className="card-content" key={u.id}>
          <div className="box-text">
            <p>{u.nome}</p>
            <p>{u.status}</p>
            <p>{u.perfil}</p>
          </div>
          <div className="box-btn">
            <button aria-label='editar' disabled={user.perfil != 'admin'} onClick={() => setModal({open: true, mode: 'att', register: u} )}>Editar</button>
            <button aria-label='deletar' disabled={user.perfil != 'admin'} onClick={() => alterarAtivo(u.id)}>{u.status == 'ativo' ? 'Arquivar' : 'Desarquivar'}</button>
          </div>
        </article>
      )
      break;

    case 'autores':
      formulario = (
        <>
          <div className="label-input">
            <label htmlFor="nome">Nome</label>
            <input defaultValue={modal.register?.nome || ''} name='nome' id='nome' type="text" aria-label='digite o nome do autor' placeholder='Digite o nome do autor' required/>
          </div>
          <div className="label-input">
            <label htmlFor="nascionalidade">Nascionalidade</label>
            <input defaultValue={modal.register?.nascionalidade || ''} name='nascionalidade' id='nascionalidade' type="text" aria-label='digite o nascionalidade do autor' placeholder='Digite o nascionalidade do autor' required/>
          </div>
          <div className="label-input">
            <label htmlFor="data_nascimento">Data Nascimento</label>
            <input defaultValue={modal.register?.data_nascimento || ''} name='data_nascimento' id='data_nascimento' type="text" aria-label='digite o data de nascimento do autor' placeholder='Digite a data de nascimento do autor' required/>
          </div>
        </>
      )
      conteudo = autores.map((a) => 
        <article className="card-content" key={a.id}>
          <div className="box-text">
            <p>{a.nome}</p>
            <p>{a.nascionalidade}</p>
            <p>{a.data_nascimento}</p>
          </div>
          <div className="box-btn">
            <button aria-label='editar' onClick={() => setModal({open: true, mode: 'att', register: a})} disabled={user.perfil != 'admin'}>Editar</button>
            <button aria-label='deletar' disabled={user.perfil != 'admin'} onClick={() => alterarAtivo(a.id)}>{a.ativo ? 'Arquivar' : 'Desarquivar'}</button>
          </div>
        </article>
      )
      break;

    case 'categorias':
      formulario = (
        <>
          <div className="label-input">
            <label htmlFor="nome">Nome</label>
            <input defaultValue={modal.register?.nome || ''} name='nome' id='nome' type="text" aria-label='digite o nome da categoria' placeholder='Digite o nome da categoria' required/>
          </div>
          <div className="label-input">
            <label htmlFor="descricao">Descricao</label>
            <input defaultValue={modal.register?.descricao || ''} name='descricao' id='descricao' type="text" aria-label='digite a descrição da categoria' placeholder='Digite a descrição da categoria' required/>
          </div>
        </>
      )
      conteudo = categorias.map((c) => 
        <article className="card-content" key={c.id}>
          <div className="box-text">
            <p>{c.nome}</p>
            <p>{c.descricao}</p>
          </div>
          <div className="box-btn">
            <button aria-label='editar' onClick={() => setModal({open: true, mode: 'att', register: c} )} disabled={user.perfil != 'admin'}>Editar</button>
            <button aria-label='deletar' disabled={user.perfil != 'admin'} onClick={() => alterarAtivo(c.id)}>{c.ativo ? 'Arquivar' : 'Desarquivar'}</button>
          </div>
        </article>
      )
      break;
  
    case 'livros':
      formulario = (
        <>
          <div className="label-input">
            <label htmlFor="isbn">Isbn</label>
            <input defaultValue={modal.register?.livro.isbn || ''} name='isbn' id='isbn' type="number" aria-label='digite o isbn do livro' placeholder='Digite o isbn do livro' required/>
          </div>
          <div className="label-input">
            <label htmlFor="titulo">Titulo</label>
            <input defaultValue={modal.register?.livro.titulo || ''} name='titulo' id='titulo' type="text" aria-label='digite o titulo do livro' placeholder='Digite o titulo do livro' required/>
          </div>
          <div className="label-input">
            <label htmlFor="ano_publicacao">Ano publicação</label>
            <input defaultValue={modal.register?.livro.ano_publicacao || ''} name='ano_publicacao' id='ano_publicacao' type="number" aria-label='digite o ano publicacao do livro' placeholder='Digite o ano de publicacao do livro' required/>
          </div>
          <div className="label-input">
            <label htmlFor="edicao">Edição</label>
            <input defaultValue={modal.register?.livro.edicao || ''} name='edicao' id='edicao' type="text" aria-label='digite o edicao do livro' placeholder='Digite a edicao do livro' required/>
          </div>
          <div className="label-input">
            <label htmlFor="editora">Editora</label>
            <input defaultValue={modal.register?.livro.editora || ''} name='editora' id='editora' type="text" aria-label='digite o editora do livro' placeholder='Digite a editora do livro' required/>
          </div>
          <div className="label-input">
            <label htmlFor="categoria">Categoria</label>
            <select defaultValue={modal.register?.livro.categoria.id || ''} name="categoria_id" id="categoria_id" required>
              <option value="" disabled>Selecione a categoria do livro</option>
              {categorias.map((c) =>
                <option value={c.id}>{c.nome}</option>
              )}
            </select>
          </div>
          <div className="label-input">
            <label htmlFor="descricao">Descrição</label>
            <input defaultValue={modal.register?.livro.descricao || ''} name='descricao' id='descricao' type="text" aria-label='digite o descricao do livro' placeholder='Digite a descricao do livro' required/>
          </div>
          <div className="label-input">
            <label htmlFor="autor_id">Autor</label>
            <select defaultValue={modal.register?.autor.id || ''} name="autor_id" id="autor_id" required>
              <option value="" disabled>Selecione o autor do livro</option>
              {
                autores.map((a) =>
                  <option value={a.id}>{a.nome}</option>
                )
              }
            </select>
          </div>
        </>
      )
      conteudo = user.perfil == 'admin' ? livros.map((l) =>
        <article className="card-content" key={l.id}>
          <div className="box-text">
            <p>{l.livro.titulo}</p>
            <p>{l.livro.descricao}</p>
          </div>
          <div className="box-btn">
            <button aria-label='editar' onClick={() => setModal({open: true, mode: 'att', register: l})} disabled={user.perfil != 'admin'}>Editar</button>
            <button aria-label='deletar' disabled={user.perfil != 'admin'} onClick={() => alterarAtivo(l.id)}>{l.ativo ? 'Arquivar' : 'Desarquivar'}</button>
          </div>
        </article>
      ) : 
        livrosAtivos.map((l) =>
        <article className="card-content" key={l.id}>
          <div className="box-text">
            <p>{l.livro.titulo}</p>
            <p>{l.livro.descricao}</p>
          </div>
          <div className="box-btn">
            <button aria-label='editar' onClick={() => setModal({open: true, mode: 'att', register: l})} disabled={user.perfil != 'admin'}>Editar</button>
            <button aria-label='deletar' disabled={user.perfil != 'admin'} onClick={() => alterarAtivo(l.id)}>{l.ativo ? 'Arquivar' : 'Desarquivar'}</button>
          </div>
        </article>
      )
      break;
  
    case 'exemplares':
      formulario = (
        <>
          <div className="label-input">
            <label htmlFor="cod_identificacao">Cod identificação</label>
            <input defaultValue={modal.register?.cod_identificacao || ''} name='cod_identificacao' id='cod_identificacao' type="text" aria-label='digite o cod identificacao do exemplar' placeholder='Digite a identificacao do exemplar' required/>
          </div>
          <div className="label-input">
            <label htmlFor="livro_id">Livro</label>
            <select defaultValue={modal.register?.livro.id || ''} name="livro_id" id="livro_id" required>
              <option value="" disabled>Selecione o livro desse exemplar</option>
              {
                livros.map((l) =>
                  <option value={l.livro.id}>{l.livro.titulo}</option>
                )
              }
            </select>
          </div>
          <div className="label-input">
            <label htmlFor="data_aquisicao">Data aquisição</label>
            <input defaultValue={modal.register?.data_aquisicao || ''} name='data_aquisicao' id='data_aquisicao' type="text" aria-label='digite a data de aquisição do exemplar' placeholder='Digite a data de aquisição do exemplar' required/>
          </div>
          <div className="label-input">
            <label htmlFor="estado_conservacao">Estado conservação</label>
            <input defaultValue={modal.register?.estado_conservacao || ''} name='estado_conservacao' id='estado_conservacao' type="text" aria-label='digite o estado de conservação do exemplar' placeholder='Digite o estado de conservação do exemplar' required/>
          </div>
          <div className="label-input">
            <label htmlFor="status">Status</label>
            <select defaultValue={modal.register?.status || ''} name="status" id="status" required>
              <option value="" disabled>Selecione o status do exemplar</option>
              <option value="Disponivel">Disponivel</option>
              <option value="Emprestado">Emprestado</option>
              <option value="Danificado">Danificado</option>
              <option value="Perdido">Perdido</option>
              <option value="Indisponivel">Indisponivel</option>
            </select>
          </div>
        </>
      )
      conteudo = user.perfil == 'admin' ? exemplares.map((e) => 
        <article className="card-content" key={e.id}>
          <div className="box-text">
            <p>{e.livro.titulo}</p>
            <p>{e.cod_identificacao}</p>
            <p>{e.status}</p>
          </div>
          <div className="box-btn">
            <button aria-label='editar' onClick={() => setModal({open: true, mode: 'att', register: e})} disabled={user.perfil != 'admin'}>Editar</button>
            <button aria-label='deletar' disabled={user.perfil != 'admin'} onClick={() => alterarAtivo(e.id)}>{e.ativo ? 'Arquivar' : 'Desarquivar'}</button>
          </div>
        </article>
      ) : exemplaresAtivos.map((e) => 
        <article className="card-content" key={e.id}>
          <div className="box-text">
            <p>{e.livro.titulo}</p>
            <p>{e.cod_identificacao}</p>
            <p>{e.status}</p>
          </div>
          <div className="box-btn">
            <button aria-label='editar' onClick={() => setModal({open: true, mode: 'att', register: e})} disabled={user.perfil != 'admin'}>Editar</button>
            <button aria-label='deletar' disabled={user.perfil != 'admin'} onClick={() => alterarAtivo(e.id)}>{e.ativo ? 'Arquivar' : 'Desarquivar'}</button>
          </div>
        </article>
      )
      break;

    case 'emprestimos':
      formulario = (
        <>
          <div className="label-input">
            <label htmlFor="usuario_id">Usuario</label>
            <select name="usuario_id" id="usuario_id" required>
              <option value="" disabled selected>Selecione o usuario que sera realizado o emprestimo</option>
              {clientes.map((c) =>
                <option value={c.id}>{c.nome}</option>
              )}
            </select>
          </div>
          <div className="label-input">
            <label htmlFor="funcionario_id">Funcionario responsavel</label>
            <select name="funcionario_id" id="funcionario_id" required>
              <option value="" disabled selected>Selecione o funcionario responsavel pelo emprestimo</option>
              {funcionarios.map((f) =>
                <option value={f.id}>{f.nome}</option>
              )}
            </select>
          </div>
          <div className="label-input">
            <label htmlFor="data_devolucao_prev">Data de devolução prevista</label>
            <input name='data_devolucao_prev' id='data_devolucao_prev' type="text" aria-label='digite a data de devolução prevista' placeholder='Digite a data de devolução prevista' required/>
          </div>
          <div className="label-input">
            <label htmlFor="estado_conservacao">Estado conservação</label>
            <input name='estado_conservacao' id='estado_conservacao' type="text" aria-label='digite o estado de conservação do exemplar' placeholder='Digite o estado de conservação do exemplar' required/>
          </div>
          <div className="label-input">
            <label htmlFor="status">Status</label>
            <select name="status" id="status" required>
              <option value="" disabled selected>Selecione o status do emprestimo</option>
              <option value="Em aberto">Em aberto</option>
              <option value="Devolvido">Devolvido</option>
              <option value="Em atraso">Em atraso</option>
            </select>
          </div>
          <div className="label-input">
            <label htmlFor="exemplar_id">Exemplar</label>
            <select name="exemplar_id" id="exemplar_id" required>
              <option value="" disabled selected>Selecione o exemplar que sera emprestado</option>
              {
                disponiveis.map((d) =>
                  <option value={d.id}>{d.livro.titulo}</option>
                )
              }
            </select>
          </div>
        </>
      )
      conteudo = emprestimos.map((e) =>
        <article className="card-content" key={e.id}>
          <div className="box-text">
            <p>{e.exemplar.livro.titulo}</p>
            <p>{e.exemplar.cod_identificacao}</p>
            <p>{e.emprestimo.status}</p>
          </div>
        </article>
      )
      break;
  
    case 'devolucoes':
      formulario = (
        <>
          <div className="label-input">
            <label htmlFor="exemplar_id">Exemplar</label>
            <select name="exemplar_id" id="exemplar_id" required>
              <option value="" disabled selected>Selecione o exemplar que sera devolvido</option>
              {
                emprestados.map((e) =>
                  <option value={e.id}>{e.livro.titulo}</option>
                )
              }
            </select>
          </div>
          <div className="label-input">
            <label htmlFor="funcionario_id">Funcionario responsavel</label>
            <select name="funcionario_id" id="funcionario_id" required>
              <option value="" disabled selected>Selecione o funcionario responsavel pela devolução</option>
              {funcionarios.map((f) =>
                <option value={f.id}>{f.nome}</option>
              )}
            </select>
          </div>
          <div className="label-input">
            <label htmlFor="situacao">Situação</label>
            <input name='situacao' id='situacao' type="text" aria-label='digite o situacao do exemplar' placeholder='Digite a situação do exemplar' required/>
          </div>
        </>
      )
      conteudo = devolucoes.map((d) =>
        <article className="card-content" key={d.id}>
          <div className="box-text">
            <p>{d.exemplar.livro.titulo}</p>
            <p>{d.exemplar.cod_identificacao}</p>
            <p>{dataConvertida(d.data_devolucao)}</p>
          </div>
        </article>
      )
      break;
  
    default:
      conteudo = <p>Nenhum dado encontrado.</p>
    }
    
    const enviarFormulario = async (dadosFormulario) => {
    try {
      setErrors('')
      setMsg('')

      let result

      if (modal.mode === 'att') {
        result = await api.put(
          `/${tab}/${modal.register.id}`,
          dadosFormulario
        )
      } else {
        result = await api.post(`/${tab}`, dadosFormulario)
      }

      const setterPorTab = {
        usuarios: setUsuarios,
        autores: setAutores,
        categorias: setCategorias,
        livros: setLivros,
        exemplares: setExemplares,
        emprestimos: setEmprestimos,
        devolucoes: setDevolucoes,
      }

      setMsg(result.data.message)
      
      const setEntidade = setterPorTab[tab]
      const entidadeSalva = result.data.result

      if (modal.mode == 'att') {
        setEntidade((entidades) => 
          entidades.map((e) => 
            e.id == entidadeSalva.id ? entidadeSalva : e
          )
        )
      } else {
        setEntidade((entidades) => [...entidades, entidadeSalva])
      }

      setModal({
        open: false,
        mode: 'add',
        register: null,
      })

      buscarAPI()
    } catch (erro) {
      const mensagem =
        erro.response?.data?.error || erro.response?.data?.message

      setErrors(mensagem)
    }
  }

  const alterarAtivo = async (id) => {
    try {
      setErrors('')
      setMsg('')

      const result = await api.patch(`/${tab}/${id}`)

      setMsg(result.data.message)

      const setterPorTab = {
        usuarios: setUsuarios,
        autores: setAutores,
        categorias: setCategorias,
        livros: setLivros,
        exemplares: setExemplares,
        emprestimos: setEmprestimos,
        devolucoes: setDevolucoes,
      }

      const setEntidade = setterPorTab[tab]
      const entidadeSalva = result.data.result

      setEntidade((entidades) => 
          entidades.map((e) => 
            e.id == entidadeSalva.id ? entidadeSalva : e
          )
        )

      buscarAPI()

    } catch (error) {
      const message = error.response?.data?.error || error.response?.data?.message

      setErrors(message)
    }
  }


  return (
    <main id="home">
      <div className="title">
        <div className="box-text">
          <h1>Painel Administrativo</h1>
          <p>Gerencie todos os recursos da plataforma</p>
        </div>

        <button aria-label='Logout' onClick={() => logout()}>SAIR</button>
      </div>

      <section className="cards">
        <article className="card">
          <h2>{livrosAtivos.length}</h2>
          <p>Livros</p>
        </article>
        <article className="card">
          <h2>{exemplaresAtivos.length}</h2>
          <p>Exemplares</p>
        </article>
        <article className="card">
          <h2>{disponiveis.length}</h2>
          <p>Disponiveis</p>
        </article>
        <article className="card">
          <h2>{emprestados.length}</h2>
          <p>Emprestados</p>
        </article>
      </section>

      <section className="tabs-content">
        <div className="tabs">
          <button onClick={() => setTab('usuarios')} className={tab == 'usuarios' ? 'tab active' : 'tab'} aria-label='tab'>Usuarios</button>
          <button onClick={() => setTab('autores')} className={tab == 'autores' ? 'tab active' : 'tab'} aria-label='tab' disabled={user.perfil != 'admin'}>Autores</button>
          <button onClick={() => setTab('categorias')} className={tab == 'categorias' ? 'tab active' : 'tab'} aria-label='tab' disabled={user.perfil != 'admin'}>Categorias</button>
          <button onClick={() => setTab('livros')} className={tab == 'livros' ? 'tab active' : 'tab'} aria-label='tab' >Livros</button>
          <button onClick={() => setTab('exemplares')} className={tab == 'exemplares' ? 'tab active' : 'tab'} aria-label='tab'>Exemplares</button>
          <button onClick={() => setTab('emprestimos')} className={tab == 'emprestimos' ? 'tab active' : 'tab'} aria-label='tab'>Emprestimos</button>
          <button onClick={() => setTab('devolucoes')} className={tab == 'devolucoes' ? 'tab active' : 'tab'} aria-label='tab'>Devoluções</button>
        </div>
      </section>

      <h2>Gerenciar {tab}</h2>
      <button onClick={() => setModal({open: true, mode: 'add', register: null})} className='btn-add' aria-label='Adicionar' disabled={user.perfil != 'admin' && tab != 'emprestimos' && tab != 'devolucoes'}>Adicionar</button>

      <section className="cards-content">
        {conteudo}
      </section>
      {errors? <Toast tipo='error' message={errors}/> : null}
      {msg? <Toast tipo='message' message={msg}/> : null}
      {modal.open && (
      <Modal
        titulo={modal.mode === 'att' ? `Editar ${tab}` : `Adicionar ${tab}`}
        onClose={() => setModal({ open: false, mode: 'add', register: null })}
        onSubmit={enviarFormulario}
      >
        {formulario}
      </Modal>
    )}
    </main>
  )
}

export default Home
