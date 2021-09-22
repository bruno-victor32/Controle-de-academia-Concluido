/*ESSE ARQUIVO E RESPONSAVEL POR EXPORTAR FUNÇÕES */

const { age, date } = require('../../lib/utils')
const Instructor = require('../models/instructor')


module.exports = {
    index(req, res){
        
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter, 
            page, 
            limit,
            offset,
            callback(instructors) {

                const pagination = {
                    total: Math.ceil(instructors[0].total / limit) , 
                    page
                }
                return res.render("instructors/index", { instructors, pagination, filter  })
            }
        }

        Instructor.paginate(params)

    },

    create(req, res){
        return res.render('instructors/create')
    },

    post(req, res){

            /*VALIDAÇÃO DOS DADOS ANTES DE ENVIAR PARA O BANCO DE DADOS*/
        const keys =  Object.keys(req.body) /*Aqui eu estou usando um construct chamando Object, ou seja, e uma função que vai criar um objeto para mim */

        for( key of keys) { /* Aqui eu estou verificando para cada uma das chaves que eu tenho no meu req.body como por exemplo name,birth e etc, si alguma chave esta vazia */
            if (req.body[key] == "") {/* Isso aqui e a mesma coisa de fazer "req.body.avatar_url" */
                return res.send('Please, fill all fields')  
            } 
        }

        Instructor.create(req.body, function(instructor){
            return res.redirect(`/instructors/${instructor.id}`)
        })

    },

    show(req, res){ /*Aqui e responsavel quando clicar em "ver" nos instructors eu visualizar os dados do instrutor */
        Instructor.find(req.params.id, function(instructor) {
            if (!instructor) return res.send("Instructor not found!")

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(",")

            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/show", { instructor})
        })

    },

    edit(req, res){

        Instructor.find(req.params.id, function(instructor) {
            if (!instructor) return res.send("Instructor not found!")

            instructor.birth = date(instructor.birth).iso

            return res.render("instructors/edit", { instructor})
        })

    },

    put(req, res){

        /*VALIDAÇÃO DOS DADOS ANTES DE ENVIAR PARA O BANCO DE DADOS*/
    const keys =  Object.keys(req.body) /*Aqui eu estou usando um construct chamando Object, ou seja, e uma função que vai criar um objeto para mim */

    for( key of keys) { /* Aqui eu estou verificando para cada uma das chaves que eu tenho no meu req.body como por exemplo name,birth e etc, si alguma chave esta vazia */
        if (req.body[key] == "") {/* Isso aqui e a mesma coisa de fazer "req.body.avatar_url" */
            return res.send('Please, fill all fields')  
        } 
    }

    Instructor.update(req.body, function() {
        return res.redirect(`/instructors/${req.body.id}`)
    })

    },

    delete(req, res){
        Instructor.delete(req.body.id, function() {
            return res.redirect(`/instructors`)
        })
    },
}
