var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");



//--APPEL À L'API POUR RÉCUPÉRER LES ÉLÉMENTS--

let article = [];


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

            /*for (let colors in article.colors) {
        }*/

        } else {
            //console.log("Something went wrong");
            alert("Something went wrong");
            document.location.href = "index.html";
        } 
    }) 
}
getArticle();

const quantityChoice = document.querySelector("#quantity");
const colorsChoice = document.querySelector("#colors");