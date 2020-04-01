const conection = require('../conectionDb');
const crypto = require('crypto');

module.exports = {

    async create(request, response) {
        const { name, ocupation, userName, userPass } = request.body;
        const userId = crypto.randomBytes(4).toString('HEX');
         await conection('user').insert({
            userId,
            name,
            ocupation,
            userName,
            userPass
        });
        return response.json({ userId });
    },

    async read(request, response) {
        const dados = await conection('user').select('*');
        return response.json(dados);
    }, 
    async readOnly(request, response) {
        const id = request.headers.autorization;
        const dados = await conection('user').where('userId', id).select('*');
        return response.json(dados);
    }, 

    async delete(request,response){
        const id = request.headers.autorization;
        await conection('user').where('userId', id).delete();
        return response.status(204).send();
    }
}