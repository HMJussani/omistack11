const conection = require('../conectionDb');
const crypto = require('crypto');



module.exports = {
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');
        await conection('ongs').insert({
            id, name, email, whatsapp, city, uf
        });
        return response.json({ id });
    },

    async read(request, response){      
        const ongs = await conection('ongs').select('*');
        return response.json(ongs);
    },

    async delete(request, response){
        const id = request.headers.autorization;
        await conection('ongs').where('id',id).delete();
        return response.status(204).send();
    },

    async welcome(request, response){
        return response.send('System Ok, Welcome!');
    }

};