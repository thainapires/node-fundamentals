import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

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

/*
Query Parameters: http://localhost:3333/users?userId=1&name=Diego (Parâmetros nomeados) - URL Stateful
Route Parameters: https://localhost:333/users/1 (Parâmetros não nomeados) - Identificação de recurso
Request Body: Envio de informações de um formulário (quantas informações quiser) (HTTPS)
    POST http://localhost:3333/users 
*/

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if(route){

        const routeParams = req.url.match(route.path)

        const { query, ...params } = routeParams.groups 

        req.params = params
        req.query = query ? extractQueryParams(query) : {}

        return route.handler(req, res)
    }

    return res.writeHead(404).end()
})

server.listen(3333)