// déclarer un tableau de toutes les cartes et créer de l'aléatoire pour les placer 

let jeuTableau;
let allCards = document.querySelectorAll('.card')
let cptClickCurrent = 0
let dataImageShowed 


/* permer de masquer et démasquer les cartes */

allCards.forEach(card => {
    card.addEventListener("click", function() {
        playGame(card)
    })
})

function playGame(card) {
    cptClickCurrent ++
    if (cptClickCurrent == 1) {
        // 1er click, je cache les images trouvées avant
        allCards.forEach(card => {
            if(card.classList.contains("finded")) {
                // c'est une carte trouvée
            } else {
                // pas trouvée, il faut qu'elle soit masquée
                card.classList.add("hidden")
            }
        })
        // j'affiche la carte sur laquelle je viens de cliquer
        card.classList.remove("hidden")
        // je stocke la réponse derrière la carte et je la retourne
        dataImageShowed = card.dataset.image
    } 
    else if (cptClickCurrent == 2) {
        // 2è click, je vérifie si l'image a été trouvée
        card.classList.remove("hidden")
        if(dataImageShowed == card.dataset.image) {
            allCards.forEach(card => {
                if (card.classList.contains("hidden")) {
                    // c'est une carte cachée
                } 
                else {
                    card.classList.add("finded")
                }
            })
        }

        cptClickCurrent = 0
        // on oublie les cartes précédemment retournées car on ne les recherchera pas une nouvelle fois au tour d'après :
        dataImageShowed = ""

        // compter les crds qui n'ont pas la classe finded
        // si = 0 alors on a gagné le jeu

    }
}
