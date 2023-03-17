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
            for (let i = 0; i < article.colors.length; i++) {
                let itemColor = document.createElement("option");
                document.querySelector("#colors").appendChild(itemColor);
                itemColor.value = article.colors[i];
                itemColor.innerHTML = article.colors[i];
            }
        }
    });
}
getArticle();

//variable permettant au choix de l'utilisateur

// eslint-disable-next-line no-unused-vars
function userChoice(article) {
    const quantityChoice = document.querySelector("#quantity");
    const colorChoice = document.querySelector("#colors");

    //Si l'utilisateur a choisi un produit
    const addToCard = document.querySelector("#addToCard");

    addToCard.addEventListener("click", () => {
        if (quantityChoice.value > 0 && quantityChoice.value <= 100) {
            var colorPicked = colorChoice.value;
            var quantityPicked = quantityChoice.value;

            //creer un objet avec les données de l'article et de la quantité
            var productObj = {
                idProduct: article.idProduct,
                productColor: colorPicked,
                productQuantity: quantityPicked,
                productName: article.name,
                productDescription: article.description,
                productimg: article.imageUrl,
                productAlt: article.altTxt,
            };
            //console.log(productObj);
            //recuperer le panier du localstorage
            var itemsInLocalStorage = JSON.parse(localStorage.getItem("produit"));

            //pop up de confirmation
            const confirmationPopup = () => {
                if (window.confirm(`Votre commande de ${quantityPicked} ${article.name} de couleur ${colorPicked} au prix de ${article.price} € a bien été ajouté au panier.
                OK pour consultez le panier, ANNULER pour continuer`)) {
                    window.location.href = "cart.html";
                }
            };

            /*/confirmation d'envoie des prodiots dans le panier 
            if (itemInLocalStorage) {
                const resultaFind = itemsInLocalStorage.find(item => item.idproduct === article.idProduct && item.productColor === colorPicked);
                }
                //if(resultaFind)
            }*/
            const resultaFind = itemsInLocalStorage.find(item => item.idProduct === idProduct && item.productColor === colorPicked);
            
            if (resultaFind) {
                var newQuantity = parseInt(resultaFind.productQuantity) + parseInt(productObj.productQuantity);
                resultaFind.productQuantity = newQuantity;
                localStorage.setItem("produit", JSON.stringify(itemsInLocalStorage));
                confirmationPopup();
                console.log(resultaFind);
            } else {
                itemsInLocalStorage = [];
                itemsInLocalStorage.push(productObj);
                localStorage.setItem("produit", JSON.stringify(itemsInLocalStorage));
                confirmationPopup();
            }
        }
    });
}