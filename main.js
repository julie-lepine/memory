// déclarer un tableau de toutes les cartes et créer de l'aléatoire pour les placer 

let jeuTableau;
let cptClickCurrent = 0
let cardClickedId
// variables pour déterminer un tableau initial des cartes puis un vide pour placer aléatoirement les cartes dedans :
const cards = ['mickey', 'donald', 'dingo', 'picsou', 'daisy', 'minnie', 'zaza', 'miss-tick']
const gameBoard = document.getElementById('gameBoard')

// compteur
let nbPairesOnGame 
let cptCartesTrouvees 

// bouton pour récupérer le nb de paires voulues pour jouer + initialisation de la fonction initGame
document.getElementById('playButton').addEventListener("click", function() {
    let nbCardInput = document.getElementById('nbCardInput')
    initGame(nbCardInput.value)
})

// fonction qui gère le clic sur une carte : 
function clickOnCardEvent(card) {
    let allCards = document.querySelectorAll('.card')
    // vérifier qu'on a pas déjà retourné sur la carte et si oui, ne fait rien (return)
    if (card.classList.contains('finded')) {
        return;
    }
    cptClickCurrent++
    if (cptClickCurrent == 1) {
        // 1er click, je cache les images trouvées avant
        allCards.forEach(card => {
            if (card.classList.contains("finded")) {
                // c'est une carte trouvée
            } else {
                // carte pas trouvée, il faut qu'elle soit masquée
                card.classList.add("hidden")
            }
        })
        // j'affiche la carte sur laquelle je viens de cliquer en suppprimant sa classe hidden
        card.classList.remove("hidden")
        // je stocke la réponse derrière la carte et je la retourne
        cardClickedId = card.id
    }
    else if (cptClickCurrent == 2) {
        // 2è click, je vérifie si l'image a été trouvée
        if (cardClickedId == card.id) {
            cptClickCurrent = 1
            return
        } else {
            card.classList.remove("hidden")
            let cardClickedBefore = document.getElementById(cardClickedId)
            if (cardClickedBefore.dataset.image == card.dataset.image) {
                allCards.forEach(card => {
                    if (card.classList.contains("hidden")) {
                        // c'est une carte cachée, on ne fait rien
                    }
                    else if(!card.classList.contains("finded")) {
                        card.classList.add("finded")
                        cptCartesTrouvees++
                    }
                })
            }

            cptClickCurrent = 0
            // on oublie les cartes précédemment retournées car on ne les recherchera pas une nouvelle fois au tour d'après :
            cardClickedId = ""

            if(cptCartesTrouvees == nbPairesOnGame*2) {
                // animation pour la win
                alert('gagné')
            }
        }
    }
}

// placement aléatoire des cartes au démarrage de partie
function initGame(nbPaires) {
    // le plateau se vide quand on commence une partie plutôt que d'ajouter les cartes à la suite des anciennes déjà jouées
    gameBoard.innerHTML = ""
    nbPairesOnGame = nbPaires;
    cptCartesTrouvees = 0
    let gameCards = [];
    for (let i = 0; i < nbPaires; i++) {
        // 2 fois gameCards car chaque carte va par paire
        gameCards.push([cards[i], false])
        gameCards.push([cards[i], false])
    }

    console.log(gameCards);

    for (let i = 0; i < gameCards.length; i++) {
        let cardIsPositionned = false
        while (!cardIsPositionned) {
            // génération du chiffre aléatoire pour chaque carte
            let randomNumber = getRandomArbitrary(0, gameCards.length)
            if (gameCards[randomNumber][1] == false) {
                cardIsPositionned = true
                gameCards[randomNumber][1] = true
                // positionner la carte dans le html
                let cardHtml = getHtmlCodeCard(gameCards[randomNumber][0], i);
                gameBoard.innerHTML += cardHtml
                // générer le code html et l'inclure
            }
        }
    }
    // ajout de l'événement de clic sur toutes les cartes, permet de les masquer et démasquer
    let allCards = document.querySelectorAll('.card')
    allCards.forEach(card => {
        card.addEventListener("click", function () {
            clickOnCardEvent(card)
        })
    })
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function getHtmlCodeCard(nomCard, id) {
    return ` <div class ="card hidden" id="${id}" data-image="${nomCard}"> <img src="./img/${nomCard}.bmp"> </div> `
}