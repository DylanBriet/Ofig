const client = require('./database');

const dataMapper = {

    

    async getAllFigurines(){
        const sqlQuery = await client.query ('SELECT * FROM "figurine";');
        return sqlQuery.rows;
    },

    getOneFigurine: async (id) => {
        const result = await client.query('SELECT * FROM figurine WHERE id = $1;', [id]);
        return result.rows[0];
      },

      getReviewsByFigurineId: async (figurineId) => {
        const query = {
            text: 'SELECT * FROM review WHERE figurine_id =$1',
            values: [figurineId],
        };

        try {
            const { rows } = await client.query(query);
            return rows;
          } catch (error) {
            console.error('Error executing query', error.stack);
            throw error;
          }
        },



        getCountByCategory: async () => {
            const sqlQuery = `
              SELECT category, COUNT(*) AS count
              FROM figurine
              GROUP BY category;
            `;
            
            try {
              const result = await client.query(sqlQuery);
              return result.rows;
            } catch (error) {
              console.error('Error executing query', error.stack);
              throw error;
            }
          },

          getFigurinesByCategory: async (categoryName) => {
            const sqlQuery = `
              SELECT *
              FROM figurine
              WHERE category = $1;
            `;
            const values = [categoryName];
            const response = await client.query(sqlQuery, values);
            return response.rows;
          },


          getAverageReviewScoreForFigurines: async () => {
            const sqlQuery = `
              SELECT figurine_id, AVG(note) as average_score
              FROM review
              GROUP BY figurine_id;
            `;
            const response = await client.query(sqlQuery);
            return response.rows;
          }

};

module.exports = dataMapper;
