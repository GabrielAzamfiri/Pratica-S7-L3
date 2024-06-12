let carrello = [];

// *************mi prendo la ali tramite fetch************************
fetch("https://striveschool-api.herokuapp.com/books")
  .then((responseObj) => {
    // *************risposta************************
    console.log(responseObj);
    if (responseObj.ok) {
      return responseObj.json();
    } else {
      throw new Error("Errore nel reperimento dei dati");
    }
  }) // *************array della risposta****************************************
  .then((arrayBooks) => {
    // *************creo la card book**************************************************
    const row = document.getElementById("card-container");
    arrayBooks.forEach((book) => {
      const col = document.createElement("div");
      col.classList.add("col");

      const card = document.createElement("div");
      card.classList.add("card");

      const img = document.createElement("img");
      img.setAttribute("src", book.img);
      img.classList.add("card-img-top");

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      cardBody.classList.add("row");

      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = book.title;

      const cardText = document.createElement("p");
      cardText.classList.add("card-text");
      cardText.textContent = book.price + "$";

      // *************creo btn delete********************************************
      const btnDelete = document.createElement("button");
      btnDelete.classList.add("btn");
      btnDelete.classList.add("btn-danger");
      btnDelete.classList.add("my-3");
      btnDelete.textContent = "Delete Book";
      btnDelete.addEventListener("click", () => {
        col.remove();
      });

      // *************creo btn addToCart**********************************************

      const addToCart = document.createElement("button");
      addToCart.classList.add("btn");
      addToCart.classList.add("btn-primary");
      addToCart.textContent = "Add To Cart";
      // *************addEventListener sul bottone addToCart********************************************
      addToCart.addEventListener("click", () => {
        const cart = document.getElementById("cart");
        cart.classList.add("row");

        const cartItem = document.createElement("li");
        cartItem.classList.add("list-group-item");
        cartItem.classList.add("my-2");
        cartItem.textContent = book.title;

        // **********************creo btnDeleteCart******************
        const btnDeleteCart = document.createElement("button");
        btnDeleteCart.classList.add("btn");
        btnDeleteCart.classList.add("btn-danger");
        btnDeleteCart.classList.add("ms-5");
        btnDeleteCart.textContent = "Delete Book";

        // *************addEventListener sul bottone btnDeleteCart********************************************
        btnDeleteCart.addEventListener("click", () => {
          cartItem.remove();
          carrello.splice(carrello.indexOf(book.title), 1);
          // dopo aver tolto il libro dal array carrello rifaccio lo storage del carrello aggioranto
          localStorage.setItem("carrello", JSON.stringify(carrello));
        });
        carrello.push(book.title);
        localStorage.setItem("carrello", JSON.stringify(carrello));
        cartItem.appendChild(btnDeleteCart);
        cart.append(cartItem);
      });

      cardBody.append(cardTitle, cardText, btnDelete, addToCart);
      card.append(img, cardBody);
      col.append(card);
      row.append(col);
    });
  })
  .catch((err) => console.log(err));

// *************addEventListener al caricamento della pagina********************************************

window.addEventListener("DOMContentLoaded", () => {
  const storedCarrello = localStorage.getItem("carrello");
  // se la key carrello esiste nello storage
  if (storedCarrello) {
    // faccio tornare un array il mio dato nello storage
    const arrCarrello = JSON.parse(storedCarrello);

    // al caricamento della pagina riscrivo anche il mio carrello cosi non parte da vuoto
    // serve per far si che ad un nuovo addToCart continui ad aggiungere senza ripartire da vuoto
    carrello = arrCarrello;

    // per ogni item nel carrello ricrea le varie li con btnDeleteCart che ha ancora l'eventListener al click
    arrCarrello.forEach((item) => {
      const cart = document.getElementById("cart");
      cart.classList.add("row");

      const cartItem = document.createElement("li");
      cartItem.classList.add("list-group-item");
      cartItem.classList.add("my-2");
      cartItem.textContent = item;
      const btnDeleteCart = document.createElement("button");
      btnDeleteCart.classList.add("btn");
      btnDeleteCart.classList.add("btn-danger");
      btnDeleteCart.classList.add("ms-5");

      btnDeleteCart.textContent = "Delete Book";
      btnDeleteCart.addEventListener("click", () => {
        cartItem.remove();
        carrello.splice(carrello.indexOf(item), 1);
        localStorage.setItem("carrello", JSON.stringify(carrello));
      });
      cartItem.appendChild(btnDeleteCart);

      cart.append(cartItem);
    });
  }
});
