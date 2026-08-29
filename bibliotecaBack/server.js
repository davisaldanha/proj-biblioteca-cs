import express from 'express'
import cors from 'cors'
import ErrorHandler from './src/middlewares/ErrorHandler.js'
import Routes from './src/routes/index.js'

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
app.use(`${prefix_url}`, Routes)

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