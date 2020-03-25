const conection = require('../conectionDb');

module.exports = {

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.autorization;
        const [id] = await conection('incident').insert({
            title,
            description,
            value,
            ong_id
        });
        return response.json({ id });
    },

    async read(request, response) {
        const data = await conection('incident').select('*');
        return response.json(data);
    },

    async delete(request, response) {
        const ong_id = request.headers.autorization;
        const { id } = request.params;
        const incident = await conection('incident').where('id', id).select('ong_id').first();

        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: "Não permitido" });
        }
        await conection('incident').where('id', id).delete();
        return response.status(204).send();

    }



};

