const path = require('path');
const dataMapper = require('../dataMapper.js')

const mainController = {

  // méthode pour la page d'accueil
  homePage: async (req, res) => {
    try {
      const figurines = await dataMapper.getAllFigurines();

      res.render('acceuil', { figurines });

    } catch (error) {
      console.error(error); 
        res.status(500).send('Erreur')
    }
  },



  
  // méthode pour la page article
  articlePage: async (req, res) => {
    try {
      const article = await dataMapper.getOneFigurine(req.params.id);

      res.render('article', { article });

    }catch (error) {
      console.error(error); 
        res.status(500).send('Erreur')
    }
  }
};


module.exports = mainController;

