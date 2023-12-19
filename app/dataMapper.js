const client = require('./database');

const dataMapper = {

    

    async getAllFigurines(){
        const sqlQuery = await client.query ('SELECT * FROM "figurine";');
        return sqlQuery.rows;
    },

    getOneFigurine: async (id) => {
        const result = await client.query('SELECT * FROM figurine WHERE id = $1;', [id]);
        return result.rows[0];
      }
};

module.exports = dataMapper;