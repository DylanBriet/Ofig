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

const session = require('express-session');
app.use(session({
    secret: 'keyboard catLMkfmlkl smldfkmùlkdmùksqùmlkd lkmlsdfkùlks', // une phrase le plus possible pour faire le plus complexe possible afin de générer le session ID
    // 2 paramètres obligatoires !
    resave: false, // force un enregistrement de notre session même si elle n'est pas modifiée
    saveUninitialized: true, // force un enregistrement d'une session non initialisée
    cookie:{
      secure: false,
      maxAge: (1000*60*60)
    }
}));

// routage !
app.use(router);


// on lance le serveur
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
