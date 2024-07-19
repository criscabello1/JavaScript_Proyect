let products = JSON.parse(localStorage.getItem("products")) || [];
let localCart = JSON.parse(localStorage.getItem("cart")) || [];
let localUser = JSON.parse(localStorage.getItem("currentUser")) || {}
const productsGrid = document.getElementById("productsGrid");
const productForm = document.getElementById("productForm");
const formProduct = document.getElementById("formProduct");
const btnCreateProduct = document.getElementById("btnCreateProduct");
const btnSaveProduct = document.getElementById("btnSaveProduct");
const btnCancelProduct = document.getElementById("btnCancelProduct");
let productId = document.getElementById("productId")
let productName = document.getElementById("productName")
let productDescription = document.getElementById("productDescription")
let productPrice = document.getElementById("productPrice")
let productStock = document.getElementById("productStock")
let productImage = document.getElementById("productImage")
let productImagePreview = document.getElementById("productImagePreview");
const groupId = document.getElementById("groupId")

const errorMessages = {
    name: "*Name is invalid. Only letters and spaces are allowed.",
    description: "*Description is invalid.",
    price: "*Price is invalid. It must contain at least 8 characters, including 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character (-_/.#$).",
    stock: "*Stock is invalid. Only numbers and dots are allowed.",
};

const regex = {
    name: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s()-]+$/,
    description:/[a-zA-Z0-9\s\n\-.,]+/,
    price: /^\d{1,2}(,|.)\d{2}$/,
    stock: /^[0-9]+$/
};


function validateField(input, regex, errorMessage) {
    let paragraph = document.createElement("p");
    paragraph.classList.add("text-red-500", "text-center", "text-[13px]");
    paragraph.innerText = errorMessage;

    if (regex.test(input.value.trim())) {
        if (input.nextElementSibling) {
            input.nextElementSibling.remove();
            return true;
        }else{
            return true;
        }
    } else {
        if (!input.nextElementSibling) {
            input.parentNode.insertBefore(paragraph, input.nextSibling);
            return false;
        }
        else{
            return false;
        }
    }
}



function loadProducts() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = products.map((group, groupIndex) =>
        group.map((product, index) => `
            <tr>
                <td class="border px-4 py-2 font-semibold text-[18px]">${product.name}</td>
                <td class="border px-4 py-2 text-[18px]">${product.description}</td>
                <td class="border px-4 py-2 text-[18px] font-bold text-green-700">$${product.price}</td>
                <td class="border px-4 py-2 text-[18px] font-bold">${product.stock}</td>
                <td class="border px-4 py-2 text-[18px]">
                    <button class="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700" onclick="editProduct(${groupIndex}, ${index})">Edit</button>
                    <button class="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 ml-2" onclick="deleteProduct(${groupIndex}, ${index})">Delete</button>
                </td>
            </tr>
        `).join('')
    ).join('');
}


productImage.addEventListener("change", ()=>{
    const productImageFile = document.getElementById("productImage").files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        productImagePreview.src = event.target.result;
    };
    reader.readAsDataURL(productImageFile);
});

function showProductForm(groupIndex, productIndex) {
    formProduct.reset();
    formProduct.classList.remove("hidden");
    productForm.showModal();
    const product = products[groupIndex][productIndex];
    groupId.value = groupIndex  || "";
    productId.value = productIndex  || "";
    productName.value = product.name || "";
    productDescription.value = product.description || "";
    productPrice.value = product.price || "";
    productStock.value = product.stock || "";
    if (product.img) {
        productImagePreview.src = product.img;
    } else {
        productImagePreview.src = "";
    }
}

btnSaveProduct.addEventListener('click', () => {
    const groupId = +(document.getElementById("groupId").value);
    const productId = +(document.getElementById("productId").value);
    const isNameInputValid = validateField(productName, regex.name, errorMessages.name);
    const isDescriptionInputValid = validateField(productDescription, regex.description, errorMessages.description);
    const isPriceInputValid = validateField(productPrice, regex.price, errorMessages.price);
    const isStockInputValid = validateField(productStock, regex.stock, errorMessages.stock);
    const productImageFile = document.getElementById("productImage").files[0];
    
    if (isNameInputValid && isDescriptionInputValid && isPriceInputValid && isStockInputValid) {
        if (!products[groupId]) {
            products[groupId] = [];
        }
        let newProduct = {
            name: productName.value,
            description: productDescription.value,
            price: productPrice.value,
            stock: productStock.value,
            img: products[groupId][productId] ? products[groupId][productId].img : "" // Mantener la imagen actual si no se carga una nueva
        };

        if (productImageFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                newProduct.img = event.target.result;

                if (productId >= 0 && productId < products[groupId].length) {
                    products[groupId][productId] = newProduct;
                } else {
                    products[groupId].push(newProduct);
                }

                localStorage.setItem("products", JSON.stringify(products));
                loadProducts();
                productForm.close();
                productForm.classList.add('hidden');
                window.location.reload();
            };
            reader.readAsDataURL(productImageFile);
        } else {
            if (productId >= 0 && productId < products[groupId].length) {
                products[groupId][productId] = newProduct;
            } else {
                products[groupId].push(newProduct);
            }

            localStorage.setItem("products", JSON.stringify(products));
            loadProducts();
            productForm.close();
            productForm.classList.add('hidden');
            window.location.reload();
        }
    }
});



btnCancelProduct.addEventListener('click', () => {
    productForm.close();
    productForm.classList.add('hidden');
    window.location.reload();
});


function editProduct(groupIndex, productIndex) {
    showProductForm(groupIndex, productIndex);
}

function deleteProduct(groupIndex, productIndex) {
    if(confirm("Do you really want to delete this product")){
        products[groupIndex].splice(productIndex, 1);
        localStorage.setItem("products", JSON.stringify(products));
        loadProducts();
    }else{
        return;
    }
}

btnCreateProduct.addEventListener('click', () => {
        formProduct.reset();
        formProduct.classList.remove("hidden");
        document.getElementById("groupIdLabel").classList.replace("hidden", "block");
        document.getElementById("productIdLabel").classList.replace("hidden", "block");
        document.getElementById("pGroupId").classList.replace("hidden", "block");
        groupId.setAttribute("type", "number");
        productId.setAttribute("type", "number");
        productForm.showModal();
        showProductForm(+groupId.value, +productId.value)
    });

    document.addEventListener('DOMContentLoaded', function() {

    });

        window.onload = () => {
            if(localUser.role !== "admin"){
                document.body.innerHTML = ""
                window.location.assign("./../../../index.html")
            }
            loadProducts();
            if(!localStorage.getItem("cart")){
                localStorage.setItem("cart", JSON.stringify([]));
            }
            if(!document.cookie){
                localCart = [];
                localStorage.setItem("cart", JSON.stringify(localCart));
                cart.setAttribute("data-quantity", 0);
            }else{
                cart.setAttribute("data-quantity", localCart.length);
            }
        };