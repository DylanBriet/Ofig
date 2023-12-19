// Toujours commencer par importer les variables d'environnement !
require('dotenv').config();

const express = require('express');

// on importe le router
const router = require('./app/router');


const app = express();

// un peu de config
const PORT = process.env.PORT || 5000;



app.set('view engine', 'ejs');
app.set('views', './app/views');


// servir les fichiers statiques qui sont dans "integration"
app.use(express.static(__dirname + '/integration'));


// routage !
app.use(router);


// on lance le serveur
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
