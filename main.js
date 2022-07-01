let shop = document.getElementById('shop')
let cart = JSON.parse(localStorage.getItem('cartData')) || []


let showItems = () => {

    return (shop.innerHTML = data.map(x => {
        let item = cart.find(y => x.id === y.id)
        return `
        <div class="item">
                    <img src=${x.img} />
                    <div class="info">
                        <h3>${x.name}</h3>
                        <p>${x.desc}</p>
                        <div class="price-quantity">
                            <h2 class="price">$ ${x.price}</h2>
                            <div class="quantity">
                                <i class="bi bi-dash-lg" onClick="decrement(${x.id})"></i>
                                <h4 id=${x.id}> ${item === undefined ? 0 : item.quantity}</h4>
                                <i class="bi bi-plus-lg" onClick="increment(${x.id})" ></i>
                            </div>
                        </div>
                    </div>
                </div>
        `
    }).join("")
    )
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
    if (item == undefined  || item.quantity == 0) {
        return
    }
    else {
        item.quantity -= 1
    }
    update(id)
}

let update = id => {
    let quantity = document.getElementById(id)
    let item = cart.find(x => x.id == id)
    
    if(item) {
        quantity.innerText = Number(item.quantity)
    }
    cart = cart.filter(x => x.quantity > 0)
    updateCart()
}
let updateCart = () => {
    let total = cart.map(x => x.quantity).reduce((x,sum) => x + sum, 0)
    document.getElementById("cart-total").innerText = total
    localStorage.setItem('cartData', JSON.stringify(cart))
}
updateCart()

