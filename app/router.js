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


router.get('/favoris', (req, res) => {
    res.render('favoris', { bookmarks: req.session.bookmarks });
  });

  router.get('/bookmarks/add/:id', bookmarksController.addBookmark);
  router.get('/bookmarks/remove/:id', bookmarksController.deleteBookmark);

// on exporte le router 
module.exports = router;