let cart = JSON.parse(localStorage.getItem('cartData')) || []
let shop = document.getElementById('shop')

let getTotalCost = () => {
    let cost = 0

    for(let item of cart) {
        let {id, quantity} = item
        let search = data.find(x => x.id == id)
        console.log(search)
        cost += search.price * quantity
    }
    if (cost > 0) {
        document.getElementById('cart-total-cost').innerHTML = `
        <h3>Total cost is ${cost} </h3>
        <button onClick="clearCart()" id="clear-btn">Clear Cart</button>
    `
    }
    else {
        document.getElementById('cart-total-cost').innerHTML = ''
    }
    
}


let showItems = () => {
    getTotalCost()
    if(cart.length == 0) {
        console.log(document.getElementById("cart-total").innerText)
        shop.innerHTML = `
            <div id="cart-empty">
                <h3>Cart is Empty</h3>
                <a href="index.html"><button>Go To Home</button><a>
            </div>
        ` 
    } else {
    return (
        shop.innerHTML = cart.map(x => {
        let item = data.find(y => x.id === y.id)
        return `
            <div class="cart-item">
                    <img src=${item.img} class="cart-img"/>
                    <div class="cart-info">
                        <div class="title-price-x" >
                            <div class="title-price">
                                <h3>${item.name}</h3>
                                <h4 class="cart-price">$ ${item.price}</h4>
                            </div>
                            <i class="bi bi-x-lg" onClick="removeItem(${x.id})"></i>
                        </div>
                        <div class="total-price" > $ ${item.price * x.quantity}</div>
                        <div class="quantity">
                            <i class="bi bi-dash-lg" onClick="decrement(${x.id})"></i>
                            <p id=${x.id}> ${x.quantity}</p>
                            <i class="bi bi-plus-lg" onClick="increment(${x.id})" ></i>
                        </div>
                    </div>
            </div>
        `
    }).join(""))}
}

showItems()



let increment = (id) => {
    let item = cart.find(x => x.id == id)
    if (item == undefined) {
        cart.push({
            "id": id,
            "quantity": 1
        })
    } else {
        item.quantity += 1
    }
    update(id)
}
let decrement = (id) => {
    let item = cart.find(x => x.id == id)
    if (item == undefined || item.quantity == 0) {
        return
    } else {
        item.quantity -= 1
    }
    update(id)
}

let update = id => {
    let quantity = document.getElementById(id)
    quantity.innerText = cart.find(x => x.id == id).quantity
    cart = cart.filter(x => x.quantity > 0)
    getTotalCost()
    updateCart()
}
let updateCart = () => {

    let total = cart.map(x => x.quantity).reduce((x,sum) => x + sum, 0)
    document.getElementById("cart-total").innerText = total
    localStorage.setItem('cartData', JSON.stringify(cart))
    showItems()
}
updateCart()

let  removeItem = id => {
    cart = cart.filter(x => x.id != id)
    updateCart()
}

let clearCart = () => {
    cart = []
    updateCart()
}



