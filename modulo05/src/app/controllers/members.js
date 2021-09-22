const { age, date } = require('../../lib/utils')

const Member = require('../models/Member')

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
            callback(members) {

                const pagination = {
                    total: Math.ceil(members[0].total / limit) , 
                    page
                }
                return res.render("members/index", { members, pagination, filter  })
            }
        }

        Member.paginate(params)
    },

    create(req, res){

        Member.instructorsSelectOptions(function(options) {
            return res.render('members/create', { instructorOptions: options})
        })

    },

    post(req, res){

            /*VALIDAÇÃO DOS DADOS ANTES DE ENVIAR PARA O BANCO DE DADOS*/
        const keys =  Object.keys(req.body) /*Aqui eu estou usando um construct chamando Object, ou seja, e uma função que vai criar um objeto para mim */

        for( key of keys) { /* Aqui eu estou verificando para cada uma das chaves que eu tenho no meu req.body como por exemplo name,birth e etc, si alguma chave esta vazia */
            if (req.body[key] == "") {/* Isso aqui e a mesma coisa de fazer "req.body.avatar_url" */
                return res.send('Please, fill all fields')  
            } 
        }

        Member.create(req.body, function(member){
            return res.redirect(`/members/${member.id}`)
        })

    },

    show(req, res){ /*Aqui e responsavel quando clicar em "ver" nos members eu visualizar os dados do instrutor */
        Member.find(req.params.id, function(member) {
            if (!member) return res.send("Member not found!")

            member.birth = date(member.birth).birthDay

            return res.render("members/show", { member})
        })

    },

    edit(req, res){

        Member.find(req.params.id, function(member) {
            if (!member) return res.send("Member not found!")

            member.birth = date(member.birth).iso

            Member.instructorsSelectOptions(function(options) {
                return res.render('members/edit', {member, instructorOptions: options})
            })
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

    Member.update(req.body, function() {
        return res.redirect(`/members/${req.body.id}`)
    })

    },

    delete(req, res){
        Member.delete(req.body.id, function() {
            return res.redirect(`/members`)
        })
    },
}
