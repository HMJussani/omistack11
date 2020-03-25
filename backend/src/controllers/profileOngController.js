const conection = require('../conectionDb');

module.exports = {  

    async readOng(request, response) {
        const ong_id = request.headers.autorization;
        const data = await conection('incident').where('ong_id',ong_id).select('*');
        return response.json(data);
    },
};