let localCart = JSON.parse(localStorage.getItem("cart"));
const main = document.getElementById("main");
const header = document.getElementById("header");
const error = document.getElementById("error");
const btnEmpty = document.getElementById("btnEmpty");
const totalItems = document.getElementById("totalItems");
const totalAmount = document.getElementById("totalAmount");
const divTotalItems = document.getElementById("divTotalItems");
const divTotalAmount = document.getElementById("divTotalAmount");
const centralDiv = document.getElementById("centralDiv");
const payment_form = document.getElementById("payment-form");
const cardNumber = document.getElementById("cardNumber");
const expiryDate = document.getElementById("expiryDate");
const cvv = document.getElementById("cvv");
const cardName = document.getElementById("cardName");
const formBtn = document.getElementById("formBtn");
const continueShopping = document.getElementById("continueShopping");
let totalAmountValue = 0;
let totalQuantityValue = 0;
let uniqueProducts = []


const regex = {
    name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
    cardNumber: /^(\d{4}\s?){4}$/,
    date: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
    cvv: /^[0-9]{3}$/
};

const errors = {
    name: "*Name is invalid. Only letters and spaces are allowed.",
    cardNumber: "*The card number is invalid. Only digits are allowed.",
    date: "*Date is invalid. Only digits are allowed.",
    cvv: "*CVV is invalid. Only digits are allowed."
};

let flex = document.createElement("div");
flex.classList.add("overflow-auto", "flex", "flex-col", "w-[100%]", "h-auto", "justify-center", "items-center", "gap-8");

function createCart() {
    flex.innerHTML = "";
    totalAmountValue = 0;
    totalQuantityValue = 0;
    if (localCart.length !== 0){
        uniqueProducts.forEach((product) => {
            if (product.quantity <= product.stock) {
                totalAmountValue += product.price * product.quantity;
                totalQuantityValue += +product.quantity;

                flex.innerHTML += `
                    <div class="w-[100%] bg-[#eee] rounded-lg shadow-lg flex md:flex-row flex-col items-center justify-evenly">
                        <div class="flex flex-col items-center justify-between">
                            <h4 class="text-lg font-bold mb-2 max-w-[200px] text-center">${product.name}</h4>
                            <p class="text-green-800 font-bold mb-4">$${(product.price * product.quantity).toFixed(2)}</p>
                            <div class="flex items-center justify-between gap-4">
                                <button onclick="addProduct('${product.id}')" class="add rounded-full text-2xl font-bold bg-[#d8d8d8] px-[12px] py-1 hover:bg-[#b8b8b8]">+</button>
                                <p class="text-gray-800 font-bold">Quantity: ${product.quantity}</p>
                                <button onclick="substractProduct('${product.id}')" class="substract rounded-full text-2xl font-bold bg-[#d8d8d8] px-[14px] py-1 hover:bg-[#b8b8b8]">-</button>
                            </div>
                            <p class="text-gray-800 font-bold mb-4">Stock: ${product.stock}</p>
                        </div>
                        <img class="object-contain min-w-[12] w-full max-w-48 h-auto mb-4" src="${product.img}" alt="${product.name}">
                    </div>` ;
                    
            } else {
                alert("Product stock cannot be exceeded");
                localCart = localCart.filter(item => item.id !== product.id);
                localStorage.setItem("cart", JSON.stringify(localCart));
                window.location.reload();
            }
            
        });            
        error.classList.add("hidden");
        main.appendChild(flex);
        totalItems.innerText = `Total Items (${totalQuantityValue})`;
        totalAmount.innerText = ` $${totalAmountValue.toFixed(2)}`;
        cart.setAttribute("data-quantity", totalQuantityValue);
    }else {
        main.classList.remove("grid");
        centralDiv.classList.remove("w-[60%]");
        centralDiv.classList.add("w-full");
        error.classList.remove("hidden");
        divTotalAmount.classList.add("hidden");
        divTotalItems.classList.add("hidden");
        payment_form.classList.add("hidden");
    }

    if (localCart.length > 2) {
        main.classList.add("overflow-y-scroll", "custom-scrollbar");
    }}


btnEmpty.addEventListener("click", () => {
    localCart = [];
    localStorage.setItem("cart", JSON.stringify(localCart));
    window.location.reload();
});

function addProduct(id) {
    const product = uniqueProducts.find(item => item.id === id);
    const cartItem = localCart.find(item => item.id === id);
    
    if (product.quantity + 1 > product.stock) {
        alert("Product stock cannot be exceeded");
        return;
    }

    if (cartItem) {
        product.quantity += 1;
        localCart.push({...product, quantity: 1});
    }

    localStorage.setItem("cart", JSON.stringify(localCart));
    createUniqueProducts();
    createCart();
    console.log(uniqueProducts);
    console.log(localCart)
}

function substractProduct(id) {
    let uniqueProduct = uniqueProducts.find((item)=>{ 
        if(item.id == id){
            return item
        };
    });
    uniqueProduct.quantity--;
    let indexProduct = localCart.findIndex((item)=> item.id == uniqueProduct.id)
    console.dir({"indice ":indexProduct})
    console.dir({"producto ":uniqueProduct});
    // splice(inicio, cantidad de elementos a eliminar, elementos a agregar)
    localCart.splice(indexProduct, 1);
    console.dir({"carrito ":localCart})
    localStorage.setItem("cart", JSON.stringify(localCart));
    createUniqueProducts();
    createCart();
    if(!flex.hasChildNodes()){
    flex.remove();
    window.location.reload()
    }
    // console.log(uniqueProducts);
}

function createUniqueProducts(){
    uniqueProducts = []
    if (localCart && localCart.length !== 0) {
        localCart.forEach(item => {
            const existingProduct = uniqueProducts.find(product => product.id === item.id);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                uniqueProducts.push({ ...item });
            }
        });
}}

window.onload = () => {
    createUniqueProducts();
    createCart();
    if (!document.cookie) {
        continueShopping.classList.add("hidden");
        let localCart = JSON.parse(localStorage.getItem("cart"));
        localCart = [];
        localStorage.setItem("cart", JSON.stringify(localCart));
        cart.setAttribute("data-quantity", 0);
    } else {
        cart.setAttribute("data-quantity", JSON.parse(localStorage.getItem("cart")).length);
    }
};

window.onscroll = function() {
    if (window.scrollY === 0) {
        header.style.top = "0";
    } else {
        header.style.top = "-85px";
    }
};
function validateCard(input, regex, error) {
    let paragraph = document.createElement("p");
    paragraph.innerText = error;
    paragraph.classList.add("text-red-500", "text-center", "text-[13px]");
    if (regex.test(input.value.trim())) {
        if (input.nextElementSibling) {
            input.nextElementSibling.remove();
        }
        return true; 
    } else {
        if (!input.nextElementSibling) {
            input.parentNode.insertBefore(paragraph, input.nextSibling);
        }
        return false; 
    }
}
function formatCardNumber(input) {
    let value = input.value.replace(/\s/g, '');
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    input.value = value;
}

function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
    }
    input.value = value;
}
        
formBtn.addEventListener("click", () => {
    const finalDiv = []
    const isNameValid = validateCard(cardName, regex.name, errors.name);
    const isCardNumberValid = validateCard(cardNumber, regex.cardNumber, errors.cardNumber);
    const isExpiryDateValid = validateCard(expiryDate, regex.date, errors.date);
    const isCvvValid = validateCard(cvv, regex.cvv, errors.cvv);
    localCart.forEach(item=>{
        finalDiv.push("-"+item.name+"\n");
    })
    const finalDivString = finalDiv.join("\n");

    if (isNameValid && isCardNumberValid && isExpiryDateValid && isCvvValid) {
        alert(`Successful payment!. \nYour cart has this products: \n${finalDivString} `);
        localCart = [];
        localStorage.setItem("cart", JSON.stringify(localCart));
        window.location.assign("./../../../index.html"); 
    }
});
