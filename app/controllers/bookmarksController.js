const path = require('path');

const bookmarksController = {

  // méthode pour afficher les favoris
  bookmarksPage: (req, res) => {
    const filePath = path.resolve(__dirname + '/../views/favoris.ejs');
    res.render(filePath);
  }

};


module.exports = bookmarksController;
