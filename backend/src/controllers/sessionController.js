const conection = require('../conectionDb');

module.exports = {

    async create(request, response) {
        const { id } = request.body;       
        const data = await conection('ongs').where('id', id).select('name').first();
        if (!data) {
            return response.status(400).json({ error: 'Ong não encontrada.' });
        }
        return response.json(data);
    },
};