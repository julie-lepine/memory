let jeuTableau;
let allCards = document.querySelectorAll('.card')

/* permer de masquer et démasquer les cartes */

allCards.forEach(card => {
    card.addEventListener("click", function() {
         if (card.classList.contains("hidden")) {
            card.classList.remove("hidden")
         } else {
            card.classList.add("hidden")
         }
    })
})

/* création du tableau multidimensionnel */

function generateGameArray(x, y) {
    let Tableau = new Array(x)
    for (let i = 0; i < Tableau.length; i++) {
        Tableau[i] = new Array(y);
    }

    jeuTableau = Tableau;
}

/* retourne un nb aléatoire sur une plage de x */

function getrandomInt(max) {
    return Math.floor(Math.random() * max)
}

/*  */