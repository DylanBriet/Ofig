const path = require('path');
const dataMapper = require('../dataMapper.js')
const router = require('../router');

const bookmarksController = {
  addBookmark: async (req, res) => {
    try {
      const figurineId = parseInt(req.params.id, 10);
      // Initialisez la liste de favoris s'il n'en existe pas dans la session
      if (!req.session.bookmarks) {
        req.session.bookmarks = [];
      }

      // Vérifiez si la figurine est déjà marquée comme favori
      const isBookmarked = req.session.bookmarks.find(b => b.id === figurineId);

      // Si la figurine n'est pas dans la liste des favoris, ajoutez-la
      if (!isBookmarked) {
        const figurine = await dataMapper.getOneFigurine(figurineId);
        if (figurine) {
          req.session.bookmarks.push(figurine);
        }
      }
      // Redirigez vers la page des favoris
      res.redirect('/favoris');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de l\'ajout aux favoris');
    }
  },

  deleteBookmark: async (req,res) => {

    try {
      const figurineId = parseInt(req.params.id, 10);
      
      // Mettre à jour la liste des favoris en supprimant la figurine avec l'id donné
      req.session.bookmarks = req.session.bookmarks.filter(bookmark => bookmark.id !== figurineId);
  
      // Redirigez vers la page des favoris après la suppression
      res.redirect('/favoris');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la suppression du favori');
    }

  },
};



module.exports = bookmarksController;
