// Banner

var slides = document.querySelectorAll(".slide");
var counter = 1;
var intervalId;

function slideImage() {
  slides.forEach((slide) => {
    slide.style.opacity = 0;
  });

  slides[counter].style.opacity = 1;
}

function prev() {
  stopSlideInterval();
  counter = (counter - 1 + slides.length) % slides.length;
  slideImage();
  startSlideInterval();
}

function next() {
  stopSlideInterval();
  counter = (counter + 1) % slides.length;
  slideImage();
  startSlideInterval();
}

function startSlideInterval() {
  intervalId = setInterval(next, 6000);
}

function stopSlideInterval() {
  clearInterval(intervalId);
}

startSlideInterval();

// Cart

var openShoppingCart = document.querySelector(".cart");
var shoppingCart = document.querySelector(".shopping-cart");
var closeShoppingCart = document.querySelector(".close-shopping-cart");

openShoppingCart.addEventListener("click", () => {
  shoppingCart.classList.add("active");
});

closeShoppingCart.addEventListener("click", () => {
  shoppingCart.classList.remove("active");
});

const container = document.querySelector(".container");

function generateProductHTML(product) {
  return `
        <div class="col-3 mt-1">
            <div class="product">
                ${product.promotion ? `<span>${product.promotion}</span>` : ""}
                ${
                  product.discount
                    ? `<span class="promotion">${product.discount}</span>`
                    : ""
                }
                <img src="../img/${product.image}" alt="">
                <p class="name mt-2">${product.name}</p>
                ${
                  product.decrease
                    ? `<p class="price decoration mb-0">Giá: ${formatPrice(
                        product.price
                      )} VNĐ</p>
                                    <p class="decrease">Giá: ${formatPrice(
                                      product.decrease
                                    )} VNĐ</p>`
                    : `<p class="price">Giá: ${formatPrice(
                        product.price
                      )} VNĐ</p>`
                }
                <p class="add">Thêm vào giỏ hàng</p>
            </div>
        </div>
    `;
}

function displayProducts(products, categoryTitle) {
  const productsHTML = products
    .map((product) => generateProductHTML(product))
    .join("");
  container.insertAdjacentHTML(
    "beforeend",
    `
        <div class="row mt-3">
            <h2 class="col-12 text-center">${categoryTitle}</h2>
            <div class="row">
                ${productsHTML}
            </div>
        </div>
    `
  );
}

displayProducts(productsData2.newProducts, "Sản phẩm mới");

displayProducts(productsData2.popularProduct, "Sản phẩm mua nhiều nhất");

displayProducts(productsData2.discountProduct, "Sản phẩm khuyến mãi");

var listCart = document.querySelector(".list-cart");
var total = document.querySelector(".total");
var quantity = document.querySelector(".quantity");
var addToCart = document.querySelectorAll(".add");

var allProducts = [
  productsData2.newProducts,
  productsData2.popularProduct,
  productsData2.discountProduct,
];

var cart = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

addToCart.forEach((button, index) => {
  button.addEventListener("click", () => {
    const product = getAllProducts()[index];

    const existingCartItem = findCartItem(product);

    if (existingCartItem) {
      const counter = parseInt(
        existingCartItem.querySelector(".product-quantity").textContent
      );
      existingCartItem.querySelector(".product-quantity").textContent =
        counter + 1;
      cart.totalQuantity++;
      cart.totalPrice += product.decrease ? product.decrease : product.price;
    } else {
      cart.totalQuantity++;
      cart.totalPrice += product.decrease ? product.decrease : product.price;

      const newCartItem = document.createElement("li");
      newCartItem.className = "item";
      newCartItem.innerHTML = `
                <img src="../img/${product.image}" alt="">
                <div class="product">
                    <div class="information">
                        <p class="product-name">${product.name}</p>
                        ${
                          product.decrease
                            ? `<p class="decrease">Giá: ${formatPrice(
                                product.decrease
                              )} VNĐ</p>`
                            : `<p class="price">Giá: ${formatPrice(
                                product.price
                              )} VNĐ</p>`
                        }
                    </div>
                    <div class="adjust">
                        <span class="subtraction">-</span>
                        <span class="product-quantity">1</span>
                        <span class="add-product">+</span>
                    </div>
                </div>
            `;

      listCart.appendChild(newCartItem);

      const subtraction = newCartItem.querySelector(".subtraction");
      const addProduct = newCartItem.querySelector(".add-product");

      subtraction.addEventListener("click", () => {
        let counter = parseInt(
          newCartItem.querySelector(".product-quantity").textContent
        );
        if (counter > 1) {
          counter--;
          newCartItem.querySelector(".product-quantity").textContent = counter;
        } else {
          listCart.removeChild(newCartItem);
        }

        updateCart();
      });

      addProduct.addEventListener("click", () => {
        let counter = parseInt(
          newCartItem.querySelector(".product-quantity").textContent
        );
        counter++;
        newCartItem.querySelector(".product-quantity").textContent = counter;

        updateCart();
      });
    }

    updateCartUI();
  });
});

function findCartItem(product) {
  return Array.from(listCart.children).find((item) => {
    const itemName = item.querySelector(".product-name");
    return itemName && itemName.textContent === product.name;
  });
}

function getAllProducts() {
  return allProducts.reduce(
    (accumulator, currentCategory) => accumulator.concat(currentCategory),
    []
  );
}

function updateCartUI() {
  quantity.textContent = cart.totalQuantity;
  if (cart.totalQuantity > 0) {
    total.textContent = "Tổng tiền: " + formatPrice(cart.totalPrice) + " VNĐ";
  } else {
    total.textContent = "";
  }
}

function updateCart() {
  let newTotalPrice = 0;
  let newTotalQuantity = 0;

  listCart.querySelectorAll(".item").forEach((item) => {
    const priceElement = item.querySelector(".price");
    const price = priceElement
      ? parseFloat(priceElement.textContent.replace(/\D/g, ""))
      : 0;

    const quantityElement = item.querySelector(".product-quantity");
    const quantity = quantityElement
      ? parseInt(quantityElement.textContent)
      : 0;

    const decreaseElement = item.querySelector(".decrease");
    const decrease = decreaseElement
      ? parseFloat(decreaseElement.textContent.replace(/\D/g, ""))
      : 0;

    newTotalQuantity += quantity;
    if (decrease != 0) {
      newTotalPrice += decrease * quantity;
    } else {
      newTotalPrice += price * quantity;
    }
  });

  cart.totalQuantity = newTotalQuantity;
  cart.totalPrice = newTotalPrice;

  updateCartUI();
}

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

$(document).ready(() => {
  $(".btnConfirmPayment").on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    $("#exampleModal").modal("hide");
  });

  $(".btnCloseModal").on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    $("#exampleModal").modal("hide");
  });

  function validateName() {
    const namePayment = $("#name-payment").val();
    const pattern = /^[a-zA-Z\s]+$/;

    if (namePayment == "") {
      $(".error-namepayment").text("Vui lòng nhập họ tên");
      return false;
    }

    if (!pattern.test(namePayment)) {
      $(".error-namepayment").text("Vui lòng nhập đúng họ tên");
      return false;
    }

    return true;
  }

  $("#name-payment").blur(validateName);

  function validateTel() {
    const namePayment = $("#tel").val();
    const pattern = /^[\d]/;

    if (namePayment == "") {
      $(".error-tel").text("Vui lòng nhập số điện thoại");
      return false;
    }

    if (!pattern.test(namePayment)) {
      $(".error-tel").text("Vui lòng nhập đúng số điện thoại");
      return false;
    }

    return true;
  }

  $("#tel").blur(validateTel);

  function validateEmail() {
    const namePayment = $("#email").val();
    const pattern = /^\w{3,}@[a-zA-Z]\.com$/;

    if (namePayment == "") {
      $(".error-email").text("Vui lòng nhập Email");
      return false;
    }

    if (!pattern.test(namePayment)) {
      $(".error-email").text("Vui lòng nhập đúng Email");
      return false;
    }

    return true;
  }

  $("#email").blur(validateEmail);
});
