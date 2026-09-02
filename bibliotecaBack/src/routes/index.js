import AuthRoutes from './AuthRoutes.js'
import AutorRoutes from './AutorRoutes.js'
import LivroRoutes from './LivroRoutes.js'
import EmprestimoRoutes from './EmprestimoRoutes.js'
import UsuarioRoutes from './UsuarioRoutes.js'
import CategoriaRoutes from './CategoriaRoutes.js'
import DevolucaoRoutes from './DevolucaoRoutes.js'

import Router from 'express'

const routes = Router()

routes.use('/', AuthRoutes)
routes.use('/autores', AutorRoutes)
routes.use('/livros', LivroRoutes)
routes.use('/emprestimos', EmprestimoRoutes)
routes.use('/usuarios', UsuarioRoutes)
routes.use('/categorias', CategoriaRoutes)
routes.use('/devolucoes', DevolucaoRoutes)

export default routes
