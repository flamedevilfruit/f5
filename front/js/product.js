// Stockage de l'url de la page et de l'id du produit dans des varible
let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");



// Cette array vide permet de stocker les données du produits que fournit l'api
let article = [];


// function getArticle utilise fetch pour identifier le produit grâce à l'identifiant trouver dans l'url
// La deuxième promess transfere les données dans l'array article
// Puis avec les conditions, on affiche les elements seulement si article contient les données
// sinon une alert est affiche et renvoie à la page d'acceuil
function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        article = data;
        if (article) {
            let itemImg = document.createElement("img");
            let itemName = document.getElementById("title");
            let itemPrice = document.getElementById("price");
            let itemDescription = document.getElementById("description");

            document.querySelector(".item__img").appendChild(itemImg);

            itemImg.src = article.imageUrl;
            itemImg.alt = article.altTxt;
            itemName.innerHTML = article.name;
            itemPrice.innerHTML = article.price;
            itemDescription.innerHTML = article.description;

            //Boucle qui nous aide à parcourir les items dans l'objet colors enfin de facilité le choix de l'utilisateur
            /*for (let colors in article.colors) {
        }*/

        } else {
            //console.log("Something went wrong");
            alert("Something went wrong");
            document.location.href = "index.html";
        } 
    });
}
getArticle();

//variable permettant au choix de l'utilisateur

/*const quantityChoice = document.querySelector("#quantity");
const colorsChoice = document.querySelector("#colors");*/
