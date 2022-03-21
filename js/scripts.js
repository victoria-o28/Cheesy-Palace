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
    let text;
    let location = prompt("Please enter your delivery Location:", "");
    if (location == null || location == "") {
        text = "Please fill in your address delivery location where your order will be delivered";
    } else {
        text = "Hello,Your order will be processed and delivered to " + location + ".Thank you for ordering at Cheesy Palace!";
    }
    document.getElementById("delivery").innerHTML = text;

}