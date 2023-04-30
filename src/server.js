import http from 'node:http'
import { json } from './middlewares/json.js'

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

const users = []

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    if(method === 'GET' && url === '/users'){
        //Early return
        return res   
            .end(JSON.stringify(users))
    }

    if(method === 'POST' && url === '/users'){

        const {name, email} = req.body

        users.push({
            id: 1,
            name,
            email,
        })
        
        //Early return
        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
})

server.listen(3333)