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
        const {page = 1} = request.query;
        const [count] = await conection('incident').count();
        const data = await conection('incident')
        .join('ongs', 'ong_id','=','incident.ong_id')
        .limit(5)
        .offset((page -1)*5)
        .select(['incident.*','ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
        response.header('X-Total-Count',count['count(*)']);
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

