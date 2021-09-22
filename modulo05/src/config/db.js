//Arquivo responsavel por fazer a conexão com o banco de dados 

const { Pool } = require("pg")

module.exports = new Pool({
    user: 'postgres',
    password:"12345678",
    host:"localhost",
    port: 5432,
    database:"gymmanager"
})