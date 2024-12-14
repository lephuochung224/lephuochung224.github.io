var openShoppingCart = document.querySelector(".cart");
var shoppingCart = document.querySelector(".shopping-cart");
var closeShoppingCart = document.querySelector(".close-shopping-cart");

openShoppingCart.addEventListener("click", () => {
    shoppingCart.classList.add("active");
});

closeShoppingCart.addEventListener("click", () => {
    shoppingCart.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", function() {
    const productId = new URLSearchParams(window.location.search).get("id");
    const product = findProductById(productId);

    if (product) {
        displayProductDetails(product);
    }
});

function findProductById(productId) {
    const allProducts = [...productsData.newProducts];
    return allProducts.find((product) => product.id === parseInt(productId));
}

function displayProductDetails(product) {
    let quantity = 1;
    const productDetailsContainer = document.querySelector(".product-details");
    productDetailsContainer.innerHTML = `
        <div class="product-detail d-flex justify-content-center">
            <div class="img">
                <img src="../img/${product.image}" class="w-100">    
            </div>
            <div class="product-infomation m-4">
                <h1>${product.name}</h1>
                <p class="price">Giá: ${formatPrice(product.price)} VNĐ</p>
                <h3 style="color: red;">Hãy nhớ kiểm tra đơn hàng của bạn !</h3>
                <p >Nếu sản phẩm nhận được không đúng với mô tả, thiếu hàng,hoặc hư hỏng, vui lòng gửi yêu cầu trả hàng/ Hoàn Tiền trong vòng 15 ngày kể từ ngày nhận sản phẩm.</p>
                <div class="size d-flex justify-content-around align-items-center text-center mt-3">
                    
                
                </div>
                <h3>Số lượng:</h3>
                <div class="quantity d-flex justify-content-around text-center align-items-center">
                    <p class="subtract" onclick="subtract()">-</p>
                    <p id="quantityValue">${quantity}</p>
                    <p class="add" onclick="add()">+</p>
                </div>
                <br>
                <div class="button">
                    <button class="btn btn-primary">Thêm vào giỏ hàng</button>
                    <button class="btn btn-primary buy">Mua ngay</button>
                </div>
            </div>
        </div>
    `;
}

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

document.addEventListener("DOMContentLoaded", function() {
    var menuItems = document.querySelectorAll(".size p");

    menuItems.forEach(function(item) {
        item.addEventListener("click", function() {
            menuItems.forEach(function(innerItem) {
                innerItem.classList.remove("active");
            });

            item.classList.add("active");
        });
    });
});

function subtract() {
    const quantityElement = document.getElementById("quantityValue");
    let quantity = parseInt(quantityElement.textContent);

    if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;
    }
}

function add() {
    const quantityElement = document.getElementById("quantityValue");
    let quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;
}

document.addEventListener("DOMContentLoaded", function() {
    const addToCartButton = document.querySelector(".btn-primary");
    addToCartButton.addEventListener("click", addToCart);
});

function addToCart() {
    const productId = new URLSearchParams(window.location.search).get("id");
    const product = findProductById(productId);

    if (product) {
        const quantity = parseInt(
            document.getElementById("quantityValue").textContent
        );

        const existingCartItem = findCartItem(product.id);

        if (existingCartItem) {
            updateCartItemQuantity(existingCartItem, quantity);
        } else {
            addToCartList(product, quantity);
        }

        updateCartIconQuantity(quantity);
        updateTotalPrice();
    }
}

function addToCartList(product, quantity) {
    const listCart = document.querySelector(".list-cart");

    const cartItem = document.createElement("li");
    cartItem.className = "item";
    cartItem.setAttribute("data-product-id", product.id);

    cartItem.innerHTML = `
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
                <span class="product-quantity">${quantity}</span>
                <span class="add-product">+</span>
            </div>
        </div>
    `;

  listCart.appendChild(cartItem);
}

function updateCartIconQuantity() {
  const listCart = document.querySelector(".list-cart");
  const cartQuantity = document.querySelector(".quantity");
  let totalQuantity = 0;

  listCart.querySelectorAll(".item").forEach((item) => {
    totalQuantity += parseInt(
      item.querySelector(".product-quantity").textContent
    );
  });

  cartQuantity.textContent = totalQuantity;
}

document.addEventListener("DOMContentLoaded", function () {
  const listCart = document.querySelector(".list-cart");

  listCart.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("subtraction")) {
      updateCartItemQuantity(target, -1);
    } else if (target.classList.contains("add-product")) {
      updateCartItemQuantity(target, 1);
    }
  });
});

function updateCartItemQuantity(target, change) {
  const listItem = target.closest(".item");
  const quantityElement = listItem.querySelector(".product-quantity");
  let quantity = parseInt(quantityElement.textContent);

  if (quantity + change > 0) {
    quantity += change;
    quantityElement.textContent = quantity;
    updateTotalPrice();
    updateCartIconQuantity(quantity);
  } else if (quantity + change === 0) {
    listItem.parentNode.removeChild(listItem);
    updateTotalPrice();
    if (quantity === 1) {
      quantity = 0;
      updateCartIconQuantity(quantity);
    }
  }
}

function updateTotalPrice() {
  const cartItems = document.querySelectorAll(".item");
  let total = 0;

  cartItems.forEach(function (item) {
    const priceElement =
      item.querySelector(".decrease") || item.querySelector(".price");
    const quantity = parseInt(
      item.querySelector(".product-quantity").textContent
    );
    const price = priceElement.textContent.replace(/[^\d]/g, "");

    total += price * quantity;
  });

  const totalPriceElement = document.querySelector(".total");
  if (total > 0) {
    totalPriceElement.textContent = `Tổng tiền: ${formatPrice(total)} VNĐ`;
  } else {
    totalPriceElement.textContent = "";
  }
}

function findCartItem(productId) {
  const listCart = document.querySelector(".list-cart");
  const existingCartItem = listCart.querySelector(
    `.item[data-product-id="${productId}"]`
  );
  return existingCartItem;
}