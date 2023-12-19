const path = require('path');
const dataMapper = require('../dataMapper.js')

const mainController = {

  // méthode pour la page d'accueil
  homePage: async (req, res) => {
    try {
      let figurines = await dataMapper.getAllFigurines();
      const categoriesCount = await dataMapper.getCountByCategory();
      const averageScores = await dataMapper.getAverageReviewScoreForFigurines();
  
      // Associer chaque score moyen à la figurine correspondante
      figurines = figurines.map(figurine => {
        const averageScore = averageScores.find(score => score.figurine_id === figurine.id);
        figurine.average_score = averageScore ? averageScore.average_score.toFixed(2) : 'N/A';
        return figurine;
      });
  
      res.render('acceuil', { figurines, categoriesCount });
  
    } catch (error) { 
      console.error(error);
      res.status(500).send('Erreur lors de la récupération des figurines');
    }
  },

  // méthode pour la page article
  articlePage: async (req, res) => {
    try {
      // Récupérer l'article (figurine) en fonction de l'ID fourni dans les paramètres de la route
      const article = await dataMapper.getOneFigurine(req.params.id);
      const categoriesCount = await dataMapper.getCountByCategory();
      // Récupérer les avis associés à cette figurine
      const reviews = await dataMapper.getReviewsByFigurineId(req.params.id);
      // Passer à la fois l'article et les avis à la vue
      res.render('article', { article, reviews, categoriesCount });
    } catch (error) {
      res.status(500).send('Erreur lors de la récupération des données');
    }

  },

  categoryPage: async (req, res) => {
    try {
      const categoryName = req.params.categoryName;
      const categoriesCount = await dataMapper.getCountByCategory();
      const figurines = await dataMapper.getFigurinesByCategory(categoryName);
      res.render('category', { figurines, categoryName, categoriesCount });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la récupération des figurines');
    }
  },

};


module.exports = mainController;

