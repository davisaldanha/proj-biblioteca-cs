import express from 'express'
import cors from 'cors'
import ErrorHandler from './src/middlewares/ErrorHandler.js'
import AuthRoutes from './src/routes/AuthRoutes.js'
import AutorRoutes from './src/routes/AutorRoutes.js'
import CategoriaRoutes from './src/routes/CategoriaRoutes.js'
import DevolucaoRoutes from './src/routes/DevolucaoRoutes.js'
import EmprestimoRoutes from './src/routes/EmprestimoRoutes.js'
import ExemplarRoutes from './src/routes/ExemplarRoutes.js'
import LivroRoutes from './src/routes/LivroRoutes.js'
import UsuarioRoutes from './src/routes/UsuarioRoutes.js'

const app = express()
const port = 3000
const prefix_url = "/api/v1"

app.use(express.json())
app.use(cors())

app.get('/', (req,res) => {
     res.status(200).json({
          "message": "API ONLINE"
     })
})

// ROTAS
app.use(`${prefix_url}`, AuthRoutes)
app.use(`${prefix_url}/autores`, AutorRoutes)
app.use(`${prefix_url}/categorias`, CategoriaRoutes)
app.use(`${prefix_url}/devolucoes`, DevolucaoRoutes)
app.use(`${prefix_url}/emprestimos`, EmprestimoRoutes)
app.use(`${prefix_url}/exemplares`, ExemplarRoutes)
app.use(`${prefix_url}/livros`, LivroRoutes)
app.use(`${prefix_url}/usuarios`, UsuarioRoutes)

app.use((req,res) => {
     res.status(404).json({
          "message": "ROTA NÃO ENCONTRADA"
     })
})

app.use(ErrorHandler)

app.listen(port, () => {
     console.log(`SERVIDOR RODANDO NA PORTA ${port}`)
})

//emprestimos