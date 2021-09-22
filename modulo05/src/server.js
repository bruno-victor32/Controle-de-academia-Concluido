const express = require('express') /* Importamos o Nunjucks em nosso projeto. */
const nunjucks = require('nunjucks') /* Importamos o Nunjucks em nosso projeto. */
const routes = require("./routes")
const methodOverride = require('method-override') /*METHOD OVERRIDE vai permitir que a gente utilize os metodos PUT e DELETE */

const server = express() /* Variavel do servidor */

/*Aqui são os  middleware os interceptadores */
server.use(express.urlencoded({extended:true})) /*Essa linha vai ser responsavel por fazer funcionar o meu req body */
server.use(express.static('public'))
server.use(methodOverride('_method')) /*Fazendo a configuração do METHOD OVERRIDE*/
server.use(routes) /* O use e um chamado middleware, que vai interceptar o ponto A ao ponto B  */


server.set("view engine","njk")

/*Configurando o nunjucks */
nunjucks.configure("src/app/views",{
    express:server,
    autoescape:false,
    noCache:true
})

server.listen(5000,function(){ /*Aqui vai iniciar o servidor */
    console.log("server is running")/*Essa função vai ser executada assim que for chamado a porta 5000*/
})