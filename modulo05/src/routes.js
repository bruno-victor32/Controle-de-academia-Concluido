/*Aqui irei começar a fazer as configurações de rotas*/

const express = require('express')
const routes = express.Router() /*Express serve um metodo chamado Router, ele e capaz de fazer a variavel routes ser responsavel pelas rotas*/
const instructors = require('./app/controllers/instructors')
const members = require('./app/controllers/members')

/* Criando as Rotas */

routes.get('/', function(req, res) { /*Aqui seria a pagina inicial*/ 
    return res.redirect("/instructors")
}) 

routes.get('/instructors', instructors.index)
routes.get('/instructors/create', instructors.create)
routes.get('/instructors/:id', instructors.show) /* significa que quando eu passar o número 1 no navegador eu estou recebendo aqui dentro do express e atraves da nossa rota o id */
routes.get('/instructors/:id/edit', instructors.edit)
routes.post("/instructors", instructors.post )
routes.put("/instructors", instructors.put)
routes.delete("/instructors", instructors.delete)


routes.get('/members', members.index)
routes.get('/members/create', members.create)
routes.get('/members/:id', members.show) /* significa que quando eu passar o número 1 no navegador eu estou recebendo aqui dentro do express e atraves da nossa rota o id */
routes.get('/members/:id/edit', members.edit)
routes.post("/members", members.post )
routes.put("/members", members.put)
routes.delete("/members", members.delete)





module.exports = routes

//HTTP VERBS
// GET : Receber RESOURCE
// POST : Criar ou Salvar um novo RESOURCE com dados enviados
// PUT  : Atualizar RESOURCE
//DELETE: Deletar