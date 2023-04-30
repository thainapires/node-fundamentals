import http from 'node:http'
import { json } from './middlewares/json.js'
import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
/*
GET, POST, PUT, PATCH, DELETE : Métodos que utilizaremos com mais frequência

GET: Buscar um recurso do backend
POST: Criar um recurso no backend
PUT: Atualizar um recurso no backend
PATCH: Atualizar uma informação específica de um recurso no backend
DELETE: Deletar um recurso do backend
*/

/*Stateful - Stateless 
Stateful terá sempre informação salva na memória*/

//Cabeçalhos (Requisição/Resposta) => Metadados

//HTTP Status Code

const database = new Database()

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    if(method === 'GET' && url === '/users'){

        const users = database.select('users')

        //Early return
        return res   
            .end(JSON.stringify(users))
    }

    if(method === 'POST' && url === '/users'){

        const { name, email } = req.body

        const user = {
            id: randomUUID(),
            name,
            email,
        }

        database.insert('users', user)
        
        //Early return
        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
})

server.listen(3333)