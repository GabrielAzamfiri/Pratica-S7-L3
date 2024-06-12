let carrello = [];
fetch("https://striveschool-api.herokuapp.com/books")
  .then((responseObj) => {
    console.log(responseObj);
    if (responseObj.ok) {
      return responseObj.json();
    } else {
      throw new Error("Errore nel reperimento dei dati");
    }
  })
  .then((arrayBooks) => {
    console.log(arrayBooks);
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

      const btnDelete = document.createElement("button");
      btnDelete.classList.add("btn");
      btnDelete.classList.add("btn-danger");
      btnDelete.classList.add("my-3");
      btnDelete.textContent = "Delete Book";
      btnDelete.addEventListener("click", () => {
        col.remove();
      });

      const addToCart = document.createElement("button");
      addToCart.classList.add("btn");
      addToCart.classList.add("btn-primary");
      addToCart.textContent = "Add To Cart";

      addToCart.addEventListener("click", () => {
        const cart = document.getElementById("cart");
        cart.classList.add("row");

        const cartItem = document.createElement("li");
        cartItem.classList.add("list-group-item");
        cartItem.classList.add("my-2");
        cartItem.textContent = book.title;
        const btnDeleteCart = document.createElement("button");
        btnDeleteCart.classList.add("btn");
        btnDeleteCart.classList.add("btn-danger");
        btnDeleteCart.classList.add("ms-5");

        btnDeleteCart.textContent = "Delete Book";
        btnDeleteCart.addEventListener("click", () => {
          cartItem.remove();
          carrello.splice(carrello.indexOf(book.title), 1);
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

window.addEventListener("DOMContentLoaded", () => {
  const storedCarrello = localStorage.getItem("carrello");
  if (storedCarrello) {
    // se ho trovato il nome saremo qui dentro
    const arrCarrello = JSON.parse(storedCarrello);
    carrello = arrCarrello;
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
