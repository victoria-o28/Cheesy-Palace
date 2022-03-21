if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-checkout')[0].addEventListener('click', checkoutClicked)
}

function checkoutClicked() {
      var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement //Goes to shop item then selects the main div which allows ys to selet div's inside
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText //Selectiong the title of the item 
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText //Selecting price of the item
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}
//add item to the cart
function addItemToCart(title, price, imageSrc) {
    //var that creates a div
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) { //Loop to check cart items so as not to add an item to cart instead increase the quantity
            alert('This item is already added to the cart')
            return
        }
    }
    //adding div to cart
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>` //The ' indicates it's an html element gettin inputted
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
        //Adding event listeners to remove button and adding quntity to inc or decrease price
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}
//Updating the total showing on the cart
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i] //Checks the number of items in a row
        var priceElement = cartRow.getElementsByClassName('cart-price')[0] //Selects the 1st item on row i.e cash price
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0] //Selects the 1st item on quantity
        var price = parseFloat(priceElement.innerText.replace('ksh', '')) //Getting the currency and making it null before asigning it later
        var quantity = quantityElement.value
        total = total + (price * quantity) //Multiplying quantity with the price on the cart
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'ksh' + total //Asigning the ksh
}

document.querySelectorAll(
    'input[type=radio][name=delivery]').forEach((elem) => {
  elem.addEventListener('click', allowUncheck);
  // only needed if elem can be pre-checked
  elem.previous = elem.checked;
});

function allowUncheck(e) {
  if (this.previous) {
    this.checked = false;
  }
  // need to update previous on all elements of this group
  // (either that or store the id of the checked element)
  document.querySelectorAll(
      `input[type=radio][name=${this.name}]`).forEach((elem) => {
    elem.previous = elem.checked;
  });
}



