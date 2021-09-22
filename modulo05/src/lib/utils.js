//Esse arquivo pode ser utilizado de varias formas

module.exports = {
    age(timestamp){

            /*LOGICA PARA CALCULAR A IDADE  ABAIXO*/

        /*Aqui abaixo e a data atual, dia, mês e ano */
        const today = new Date() /* Esse aqui e um Objeto de data, que e diferente de um constructor, no constructor ele já e uma data, aqui nesse caso eu estou fazendo um objeto de data */
        
        /*Aqui abaixo vai ser a data de aniversario da pessoa */
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear() /* O metodo getFullYear vai pegar o ano todo, e um metodo que já vai extrair o ano */
        const month = today.getMonth() - birthDate.getMonth()    

        if(month < 0 || month == 0 && today.getDate() < birthDate.getDate()) { /* Estou analisando si o mês e menor que 0, ou seja, não estou no mês do meu aniversario "ou" si o mês e igual a 0, ou seja, estou no mês do meu aniversario "e" si hoje e o dia do meu aniversario */
            age = age - 1 /* Si por acaso hoje não for meu aniversario eu faço ano - 1 ano, */
        }

        return age
    },
    /* Fazendo ajuste de datas / Funções de data */
    date(timestamp) {
        const date = new Date(timestamp) /* Criando um novo objeto de data */

        /*Pegando o ano no formato yyyy */
        const year = date.getUTCFullYear() /* Coloquei "UTC" em frente dos GET  para pegar o tempo universal, si não utilizar o tempo universal da bug */

        /*Pegando o mês no formato mm */
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)/* O mês e de 0 a 11, sabendo que 11 e dezembro e 0 e janeiro, então eu adiciono mais 1 */
    
        /*Pegando o mês no formato dd */
        const day = `0${date.getUTCDate()}`.slice(-2)/* O getdate vai me dar uma data de 1 a 31, si o mês for de 31 */
                                            /*O slice vai pegar para mim somente os ultimos 2 digitos de trás para frente */

        /*Mostrando na tela return yyyy-mm-dd do tipo ISO*/
        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format:`${day}/${month}/${year}`
        }
    }
}