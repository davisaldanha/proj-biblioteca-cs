import { NavLink, useNavigate } from 'react-router-dom'
import './login.css'
import { useState } from 'react'
import Toast from '../../components/Toast/Toast'
import {useAuth} from '../../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')

  const {login} = useAuth()
  const navigate = useNavigate()

  const fazerLogin = async (e) => {
    e.preventDefault()
    try {
      setError('')

      const result = await login(email, senha)

      navigate('/')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <main id="login">
      <section className='box-register'>
        <h2>Não possui uma conta?</h2>
        <p>Crie uma agora mesmo</p>
        <NavLink to={'/register'}>CRIAR CONTA</NavLink>
      </section>
      <section className="box-form">
        <h1>Fazer Login</h1>
        <p>Insira seuas dados para acessar a plataforma</p>
        <form onSubmit={fazerLogin}>  
          <div className="label-input">
            <label htmlFor="email">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} id='email' type="email" aria-label='digite seu email' placeholder='Digite seu email...' required/>
          </div>
          <div className="label-input">
            <label htmlFor="senha">Senha</label>
            <input onChange={(e) => setSenha(e.target.value)} id='senha' type="password" aria-label='digite sua senha' placeholder='Digite sua senha...' required/>
          </div>
          <button aria-label='Fazer Login' type='submit'>FAZER LOGIN</button>
        </form>
      </section>
      {error? <Toast tipo='error' message={error}/> : null}
    </main>
  )
}

export default Login
