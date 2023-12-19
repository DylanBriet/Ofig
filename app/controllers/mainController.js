const path = require('path');

const mainController = {

  // méthode pour la page d'accueil
  homePage: (req, res) => {
    res.render('acceuil');
  },

  // méthode pour la page article
  articlePage: (req, res) => {
    const filePath = path.resolve(__dirname + '/../views/article.ejs');
    res.render(filePath);
  }

};


module.exports = mainController;
