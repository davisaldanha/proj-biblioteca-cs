import { NavLink } from "react-router-dom"

const NotFound = () => {
  return (
    <main id="notFound">
      <h1>404</h1>
      <h2>PAGINA NÃO ENCONTRADA</h2>
      <NavLink to={'/'}>Voltar para pagina inicial</NavLink>
    </main>
  )
}

export default NotFound
