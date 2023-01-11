let carts = document.querySelectorAll("#add2cart");
let products = [
  {
    name: "Acer Nitro5",
    tag: "Acer Nitro5",
    price: 51995,
    inCart: 0,
  },
  {
    name: "Acer Nitro 7",
    tag: "Acer Nitro 7",
    price: 61995,
    inCart: 0,
  },
  {
    name: "Aspire 5 Intel",
    tag: "Aspire 5 Intel",
    price: 37900,
    inCart: 0,
  },
  {
    name: "Aspire 7",
    tag: "Aspire 7",
    price: 45995,
    inCart: 0,
  },
  {
    name: "Package 1",
    tag: "Package 1",
    price: 42500,
    inCart: 0,
  },
  {
    name: "Package 2",
    tag: "Package 2",
    price: 60000,
    inCart: 0,
  },
  {
    name: "Windows 10 Pro",
    tag: "Windows 10 Pro",
    price: 2495,
    inCart: 0,
  },
  {
    name: "Microsoft Office Pro",
    tag: "Microsoft Office Pro",
    price: 2995,
    inCart: 0,
  },
  {
    name: "Windows 11",
    tag: "Windows 11",
    price: 3500,
    inCart: 0,
  },
  {
    name: "Logitech G535",
    tag: "Logitech G535",
    price: 6250,
    inCart: 0,
  },
  {
    name: "Razer Ornata v3",
    tag: "Razer Ornata v3",
    price: 2450,
    inCart: 0,
  },
  {
    name: "Logitech Prodigy G102",
    tag: "Logitech Prodigy G102",
    price: 1050,
    inCart: 0,
  },
  {
    name: "Asus Scabbard",
    tag: "Asus Scabbard",
    price: 1050,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".cart-amount").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart-amount").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart-amount").textContent = 1;
  }

  setItems(product);
}
function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost") || 0;

  console.log("My cartCost is", cartCost);
  console.log(typeof cartCost);
  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");

  console.log(cartItems);
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <div class="product">

        <img src="./img/${item.tag}.png">
        <span>${item.name}</span>
      </div>
      <div class="price">Price: ₱${item.price}</div>
      <div class="quantity">
        <span>Quantity: ${item.inCart}</span>
      </div>
      <div class="total">
       Total: ₱${item.inCart * item.price}
      </div>
      `;
    });

    productContainer.innerHTML += `
      <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">
          Basket Total: 
        </h4>
        <h4 class="basketTotal">
          ₱${cartCost}
        </h4>
      </div>
    `;
  }
}
onLoadCartNumbers();
displayCart();
