import { NavLink, useNavigate } from 'react-router-dom'
import './register.css'
import { useState } from 'react'
import Toast from '../../components/Toast/Toast'
import {useAuth} from '../../context/AuthContext'

const Register = () => {
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [telefone, setTelefone] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [endereco, setEndereco] = useState('')
  const [error, setError] = useState('')

  const {register} = useAuth()
  const navigate = useNavigate()

  const fazerCadastro = async (e) => {
    e.preventDefault()
    try {
      setError('')

      const result = await register(nome, cpf, email, senha, telefone, dataNascimento, endereco)

      navigate('/login')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <main id="register">
      <section className='box-login'>
        <h2>Já possui uma conta?</h2>
        <p>Faça login agora mesmo</p>
        <NavLink to={'/login'}>FAZER LOGIN</NavLink>
      </section>
      <section className="box-form">
        <h1>Criar Conta</h1>
        <p>Insira seuas dados para criar sua conta</p>
        <form onSubmit={fazerCadastro}>  
          <div className="label-input">
            <label htmlFor="nome">Nome</label>
            <input onChange={(e) => setNome(e.target.value)} id='nome' type="text" aria-label='digite seu nome' placeholder='Digite seu nome...' required/>
          </div>
          <div className="label-input">
            <label htmlFor="cpf">Cpf</label>
            <input onChange={(e) => setCpf(e.target.value)} id='cpf' type="text" aria-label='digite seu cpf' placeholder='Digite seu cpf...' required/>
          </div>
          <div className="label-input">
            <label htmlFor="email">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} id='email' type="email" aria-label='digite seu email' placeholder='Digite seu email...' required/>
          </div>
          <div className="label-input">
            <label htmlFor="senha">Senha</label>
            <input onChange={(e) => setSenha(e.target.value)} id='senha' type="password" aria-label='digite sua senha' placeholder='Digite sua senha...' required/>
          </div>
          <div className="label-input">
            <label htmlFor="telefone">Telefone</label>
            <input onChange={(e) => setTelefone(e.target.value)} id='telefone' type="text" aria-label='digite seu telefone' placeholder='Digite seu telefone...' required/>
          </div>
          <div className="label-input">
            <label htmlFor="dataNascimento">Data de nascimento</label>
            <input onChange={(e) => setDataNascimento(e.target.value)} id='dataNascimento' type="date" aria-label='digite sua data de nascimento' placeholder='Digite sua data de nascimento...' required/>
          </div>
          <div className="label-input">
            <label htmlFor="endereco">Endereço</label>
            <input onChange={(e) => setEndereco(e.target.value)} id='endereco' type="text" aria-label='digite seu endereço' placeholder='Digite seu endereço...' required/>
          </div>
          <button aria-label='CRIAR CONTA' type='submit'>CRIAR CONTA</button>
        </form>
      </section>
      {error? <Toast tipo='error' message={error}/> : null}
    </main>
  )
}

export default Register