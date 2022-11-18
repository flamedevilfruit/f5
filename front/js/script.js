// appel a l'api

let products = [];

async function fetchApi() { //Méthode FETCH pour récupérer les données de l'API
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json()) // convertir les objets en json
    .then((data) => (products = data));}


    //--INSÉRER DES DONNÉES AU DOM : RÉCUPÉRER + AFFICHER LES ÉLÉMENTS--

async function getCanap() {
  await fetchApi();
  let items = document.getElementById("items");

  for (let i = 0; i < products.length; i++) {
    let anchor = document.createElement("a");
    let article = document.createElement("article");
    let image = document.createElement("img");
    let h3 = document.createElement("h3");
    let p = document.createElement("p");

    items.appendChild(anchor);
    anchor.appendChild(article);
    article.append(image, h3, p);

    anchor.href = `./product.html?id=${products[i]._id}`;
    image.alt = products[i].altTxt;
    image.src = products[i].imageUrl;
    h3.classList.add("productName");
    h3.textContent = products[i].name;
    p.classList.add("productDescription");
    p.textContent = products[i].description;
  }
}
getCanap();
