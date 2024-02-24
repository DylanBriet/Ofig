const { Router } = require('express');

const express = require('express');

// on importe nos controllers
const mainController = require('./controllers/mainController');
const bookmarksController = require('./controllers/bookmarksController');


const router = express.Router();

// page d'accueil
router.get('/', mainController.homePage);

// page article
router.get('/article/:id', mainController.articlePage);


const dataMapper = require('./dataMapper');

router.get('/favoris', async (req, res) => {
  try {
    const categoriesCount = await dataMapper.getCountByCategory();
    const averageScore = await dataMapper.getAverageReviewScoreForFigurines();
    res.render('favoris', {
      bookmarks: req.session.bookmarks,
      categoriesCount,
      averageScore
    });
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération des données');
  }
});

 router.get('/category/:categoryName', mainController.categoryPage);
 router.get('/bookmarks/add/:id', bookmarksController.addBookmark);
 router.get('/bookmarks/remove/:id', bookmarksController.deleteBookmark);

// on exporte le router 
module.exports = router;