import express from 'express'
import AuthRoutes from './AuthRoutes.js'
import AutorRoutes from './AutorRoutes.js'
import CategoriaRoutes from './CategoriaRoutes.js'
import DevolucaoRoutes from './DevolucaoRoutes.js'
import EmprestimoRoutes from './EmprestimoRoutes.js'
import ExemplarRoutes from './ExemplarRoutes.js'
import LivroRoutes from './LivroRoutes.js'
import UsuarioRoutes from './UsuarioRoutes.js'

const Routes = express.Router()

Routes.use(`/`, AuthRoutes)
Routes.use(`/autores`, AutorRoutes)
Routes.use(`/categorias`, CategoriaRoutes)
Routes.use(`/devolucoes`, DevolucaoRoutes)
Routes.use(`/emprestimos`, EmprestimoRoutes)
Routes.use(`/exemplares`, ExemplarRoutes)
Routes.use(`/livros`, LivroRoutes)
Routes.use(`/usuarios`, UsuarioRoutes)

export default Routes
