$(document).ready(() => {
  $(".cart").click(() => {
    $(".shopping-cart").addClass("active");
  });

  $(".close-shopping-cart").click(() => {
    $(".shopping-cart").removeClass("active");
  });

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
    const pattern = /^[a-zA-Z'đĐ\s]+$/;

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
    const pattern = /^[\w]{3,}[\w\d]*@[a-zA-Z]+\.[a-zA-Z]+$/;

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

const container = document.querySelector(".container");

function generateProductHTML(product) {
  return `
        <div class="product">
            ${product.promotion ? `<span>${product.promotion}</span>` : ""}
            ${
              product.discount
                ? `<span class="promotion">${product.discount}</span>`
                : ""
            }
            <img src="../img/${product.image}">
            <p class="name mt-2">${product.name}</p>
            ${
              product.decrease
                ? `<div class="group-price">
                                    <p class="price decoration">Giá: ${formatPrice(
                                      product.price
                                    )}</p>
                                    <p class="decrease">Giá: ${formatPrice(
                                      product.decrease
                                    )}</p>
                                  </div>`
                : `<p class="price mb-0">Giá: ${formatPrice(product.price)}</p>`
            }
            <button class="btn" data-product='${JSON.stringify(
              product
            )}'>Thêm vào giỏ hàng</button>
        </div>
    `;
}

function displayProduct(products) {
  const productsHTML = products
    .map((product) => generateProductHTML(product))
    .join("");
  container.innerHTML = productsHTML;

  const btn = container.querySelectorAll(".btn");
  btn.forEach((button, index) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const product = JSON.parse(button.getAttribute("data-product"));
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
            newCartItem.querySelector(".product-quantity").textContent =
              counter;
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
      event.stopPropagation();
    });
  });
  const productContainers = container.querySelectorAll(".product");
  productContainers.forEach((productContainer, index) => {
    productContainer.addEventListener("click", () => {
      const product = JSON.parse(
        productContainer.querySelector(".btn").getAttribute("data-product")
      );

      window.location.href = `detailproduct.html?id=${product.id}`;
    });
  });
}

displayProduct(productsData.newProducts);

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

var cart = {
  item: [],
  totalQuantity: 0,
  totalPrice: 0,
};

var listCart = document.querySelector(".list-cart");
var total = document.querySelector(".total");
var quantity = document.querySelector(".quantity");

function findCartItem(product) {
  return Array.from(listCart.children).find((item) => {
    const itemName = item.querySelector(".product-name");
    return itemName && itemName.textContent === product.name;
  });
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

document.addEventListener("DOMContentLoaded", function () {
  var menuItems = document.querySelectorAll(".menu li");
  var currentCategory = "newProducts";

  menuItems.forEach(function (item) {
    item.addEventListener("click", function () {
      menuItems.forEach(function (innerItem) {
        innerItem.classList.remove("active");
      });

      item.classList.add("active");
      var category = item.dataset.category;

      if (currentCategory !== category) {
        currentCategory = category;
        container.innerHTML = "";
        displayProduct(productsData[currentCategory]);
      }
    });
  });
});
