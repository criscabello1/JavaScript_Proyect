const logIn = document.getElementById("logIn");
const signUp = document.getElementById("signUp");
const header = document.getElementById("header");
const main = document.getElementById("main");
const productsGrid = document.getElementById("productsGrid");
const cart = document.getElementById("cart");
const productView = document.getElementById("productView");
let localCart = JSON.parse(localStorage.getItem("cart")) || [];
let localUser = JSON.parse(localStorage.getItem("currentUser"))
let localProducts = JSON.parse(localStorage.getItem("products")) || []
let btnEditProducts = document.getElementById("btnEditProducts");
if (document.cookie) {
    logIn.innerText = "Home";
    signUp.innerText = "Log Out";
    logIn.href = "./../../../index.html";
    signUp.href = "#"; 
    function eraseCookie(name) {
        document.cookie = name + '=; Max-Age=-99999999; path=/';
    }
    signUp.addEventListener("click", () => {
        localStorage.removeItem("currentUser")
        eraseCookie("token");
        window.location.reload();
    });
}


const products = [[ 
    { name: 'Resistance Bands Set', price: '19.99', img: 'https://static.wixstatic.com/media/79426f_ffa5c16e5ab040b1a7541a5639f9774d~mv2.png/v1/fill/w_692,h_940,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/Resistance%20Bands.png', stock: "35", id: "1", quantity: "1", description: "A versatile set of resistance bands ideal for a wide range of exercises to strengthen and tone your muscles." },
    { name: 'Yoga Mat with Carry Strap', price: '24.99', img: 'https://fortesting.myshopify.com/cdn/shop/products/extra_thick_exercise_yoga_mat_with_carry_strap_1.png', stock: "20", id: "2", quantity: "1", description: "Comfortable and durable yoga mat with a carry strap for easy transportation, perfect for yoga and other floor exercises." },
    { name: 'Adjustable Dumbbells (Pair)', price: '39.99', img: 'https://corehomefitness.com/cdn/shop/products/Dumbells-setoftwo-transparentbkg-860576_740x.png?v=1684448701', stock: "25", id: "3", quantity: "1", description: "A pair of adjustable dumbbells that allow you to customize your weight training, suitable for various strength exercises." },
    { name: 'Exercise Ball with Pump', price: '19.99', img: 'https://throwdown.com/cdn/shop/products/throwdown-industries-fitness-accessories-stability-balls-17559602266166_700x700.png?v=1639090450', stock: "15", id: "4", quantity: "1", description: "High-quality exercise ball with a pump included, great for core strengthening, stability exercises, and stretching." }
], 
[
    { name: 'Jump Rope with Digital Counter', price: '14.99', img: 'https://kinzo.org/wp-content/uploads/2020/09/Hb0a8dd4ec11e48168a99de582f1a3a09Q-removebg-preview.png', stock: "27", id: "5", quantity: "1", description: "Jump rope with a built-in digital counter to track your jumps and improve your cardio workouts." },
    { name: 'Foldable Treadmill', price: '299.99', img: 'https://au.walkingpad.com/cdn/shop/files/KWTM-G1_media-01.png?v=1718947243', stock: "6", id: "6", quantity: "1", description: "Compact and foldable treadmill perfect for home workouts, featuring multiple speed settings and an easy-to-store design." },
    { name: 'Portable Elliptical Trainer', price: '199.99', img: 'https://www.cubii.com/media/catalog/product/cache/dccac05cb786ee50b145cbded12c4990/g/o/goaquaside_1.png', stock: "5", id: "7", quantity: "1", description: "Mini portable elliptical trainer ideal for home use, offering a low-impact cardiovascular workout." },
    { name: 'High-Speed Jump Rope', price: '9.99', img: 'https://bearkomplex.com/cdn/shop/files/Untitleddesign_12_7f54ec37-0e27-4453-b2b6-cfaf3c2f0fe4_1024x1024.png?v=1706119671', stock: "28", id: "8", quantity: "1", description: "High-speed jump rope designed for quick and efficient cardio workouts, enhancing speed and endurance." }
], 
[
    { name: 'Kettlebell Set (5-30 lbs)', price: '49.99', img: 'https://www.americanfitness.net/images/products/detail/KBV105.png', stock: "15", id: "9", quantity: "1", description: "Set of kettlebells ranging from 5 to 30 lbs, perfect for various strength and conditioning exercises." },
    { name: 'Adjustable Weight Bench', price: '149.99', img: 'https://cdn.shopify.com/s/files/1/0574/1215/7598/t/16/assets/acf.AB3002-Blue.png?v=1666736816', stock: "5", id: "10", quantity: "1", description: "Sturdy and adjustable weight bench ideal for different angles and positions, enhancing your weight training routine." },
    { name: 'Pull-Up Bar with Multiple Grip Positions', price: '39.99', img: 'https://img1.beachbodyimages.com/teambeachbody/image/upload/f_auto,q_auto:eco,w_auto/Teambeachbody/shared_assets/Shop/Gear/Chin-Up-Bar/PDP/Product/chin-up-bar-pdp-930-960-us-english-061316.png.png', stock: "10", id: "11", quantity: "1", description: "Pull-up bar offering multiple grip positions for a versatile upper body workout, easy to mount and use." },
    { name: 'Weighted Vest (20 lbs)', price: '49.99', img: 'https://dotmarfitness.com/cdn/shop/products/CFXPWV20_COREFX_Weighted_Vest_20lb.png?v=1620142336', stock: "10", id: "12", quantity: "1", description: "20 lbs weighted vest designed to intensify your workouts, providing additional resistance for strength training and cardio exercises." }
],
[
    { name: 'Foam Roller for Muscle Massage', price: '24.99', img: 'https://scontent01.fabfitfun.com/ecom/images/2022/11/948000000-jupitergear-2-in-1-foam-roller-for-deep-tissue-massage-and-muscle-relaxation-with-carry-bag-snd-fi-006-ds-sf-1.png', stock: "20", id: "13", quantity: "1", description: "Foam roller for deep tissue massage and muscle relaxation, helping to relieve muscle soreness and improve flexibility." },
    { name: 'Massage Gun with Multiple Attachments', price: '89.99', img: 'https://images.ctfassets.net/sa0xzxw55dr7/30I0LMd85FUKkxauEzNrAl/c7fa6ea07ac1eadfae1434ef85302dd3/hypervolt-2-pro-heat-pack-whats-included.png', stock: "18", id: "14", quantity: "1", description: "High-performance massage gun with multiple attachments for targeted muscle relief and recovery." },
    { name: 'Stretching Strap with Loops', price: '14.99', img: 'https://d2b8wt72ktn9a2.cloudfront.net/mediocre/image/upload/c_pad,f_auto,h_600,q_auto,w_600/esvt305hadoh1pbirrav.png', stock: "30", id: "15", quantity: "1", description: "Stretching strap with loops to assist in various stretches and flexibility exercises, ideal for all fitness levels." },
    { name: 'Hot and Cold Therapy Pack', price: '19.99', img: 'https://cdn-edpba.nitrocdn.com/aWDCNAZpQddZTyHGiULKwMZAETvCWtDE/assets/images/optimized/rev-71f71e4/playmakar.com/wp-content/uploads/2019/05/Hot-and-cold-therapy-packs-hero-image-transparent-500-x-500.png', stock: "25", id: "16", quantity: "1", description: "Versatile hot and cold therapy pack to soothe sore muscles and reduce inflammation, reusable and easy to apply." }
],
[
    { name: 'Smart Fitness Tracker', price: '49.99', img: 'https://itouchwearables.com/cdn/shop/files/FitnessTrackerJM.6.png?v=1685104249&width=3840', stock: "15", id: "17", quantity: "1", description: "Smart fitness tracker to monitor your activity, heart rate, and sleep, helping you stay on top of your fitness goals." },
    { name: 'Hydration Backpack for Running', price: '29.99', img: 'https://shop.sportsbasement.com/cdn/shop/products/100243257-CHARCOAL-1_grande.png?v=1709249656', stock: "20", id: "18", quantity: "1", description: "Lightweight hydration backpack designed for runners, featuring a water reservoir and multiple storage compartments." },
    { name: 'Bluetooth Earbuds for Workouts', price: '39.99', img: 'https://i0.wp.com/garegear.com/wp-content/uploads/2024/03/2-5-e1710424720361.png?fit=640%2C640&ssl=1', stock: "10", id: "19", quantity: "1", description: "Wireless Bluetooth earbuds designed for workouts, offering high-quality sound and a secure fit for active lifestyles." },
    { name: 'Sweat-Wicking Headbands (Pack of 3)', price: '12.99', img: './../../../assets/images/headBands.png', stock: "30", id: "20", quantity: "1", description: "Pack of 3 sweat-wicking headbands to keep you dry and comfortable during workouts, made from breathable and stretchy material." }
]];

    
    function visualizeProducts(obj, title) {
        let flex = document.createElement("div");
        let grid = document.createElement("div");
        let sectionTitle = document.createElement("h3");
        sectionTitle.innerText = title;
        sectionTitle.classList.add("text-2xl", "font-bold", "mb-4", "text-center", "text-[#212121]", "tracking-[1.5px]");
    
        obj.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add("hover:cursor-pointer", "hover:scale-105", "transition-transform", "w-full", "bg-[#eee]", "rounded-lg", "shadow-lg", "p-6", "flex", "flex-col", "items-center", "justify-between");
            productElement.setAttribute('data-product', JSON.stringify(product));
            
            productElement.innerHTML = `
                <img class="w-48 h-48 mb-4" src="${product.img}" alt="${product.name}">
                <h4 class="text-lg font-bold mb-2 max-w-[200px] text-center">${product.name}</h4>
                <p class="text-green-800 font-bold mb-4">$${product.price}</p>
                <p class="text-gray-800 font-bold mb-4">Stock:${product.stock}</p>
                <button class="bg-[#0B44AE] text-white py-2 px-4 rounded-full hover:bg-[#0a3d98] hover:text-[#e8e8e8] hover:scale-105 transition-transform add-to-cart">Add to Cart</button>
            `;
            grid.appendChild(productElement);
    
            productElement.addEventListener('click', () => {
                viewProduct(product);
            });
        });
    
        grid.classList.add("grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-4", "gap-8", "p-8");
        flex.classList.add("flex", "w-full", "justify-evenly", "flex-col", "items-center");
        flex.appendChild(sectionTitle);
        flex.appendChild(grid);
        productsGrid.appendChild(flex);
    
        const addToCartButtons = flex.querySelectorAll(".add-to-cart");
        addToCartButtons.forEach((button, index) => {
            button.addEventListener("click", (event) => {
                event.stopPropagation(); 
                addToCart(obj[index]);
            });
        });
    }

function addToCart(product) {
    if(document.cookie){
        localCart.push(product);
        let counter = localCart.length;
        cart.setAttribute("data-quantity", counter);
        localStorage.setItem("cart", JSON.stringify(localCart));
    }else{
        alert("You need to have an account to add items to the cart");
    }
}

let productDiv = document.createElement("div");
function viewProduct(product){
    productDiv.innerHTML = ""
    productDiv.classList.remove("hidden")
    productDiv.classList.add("bg-[#eee]", "rounded-xl","w-auto", "h-auto", "flex", "flex-col", "items-center", "justify-center", "rounded-lg", "p-8","m-4" );
    productDiv.innerHTML = `
    <div  class=w-full flex  justify-start">
    <button class="hover:bg-red-800 hover:text-[#d8d8d8] transition-all btnCloseProduct text-center bg-red-700 rounded text-white py-1 px-3">X</button>
    </div>
                <div class=rounded-lg shadow-lg w-full p-6 flex flex-col items-center justify-between">
                <div class="w-full flex justify-center">
                <img class="w-auto h-48" src="${product.img}" alt="${product.name}">
                </div>
                    <h4 class="text-center text-2xl font-bold mb-2 letter">${product.name}</h4>
                    <p class="text-center text-gray-800 py-2 px-4 font-bold max-w-[800px] lg:max-w-[500px]" text-[]>${product.description}</p>
                    <p class="text-center text-green-800 font-bold mb-4">$${product.price}</p>
                    <p class="text-center text-gray-800 font-bold mb-4">Stock:${product.stock}</p>
                    </div>
                    `;
                    productView.appendChild(productDiv)
                    productView.showModal()
        const btnCloseProduct = productDiv.querySelectorAll(".btnCloseProduct");
        btnCloseProduct.forEach(button=>{
            button.addEventListener("click", closeProduct)
        })

}

function closeProduct(){
    productDiv.classList.add("hidden")
    productView.close()
}



const sectionTitles = ["Workout Essentials", "Cardio Gear", "Strength Training", "Recovery Tools", "Fitness Accessories"];

window.onload = (()=>{
    if (localUser){
        if(localUser.role === "admin"){
            btnEditProducts.classList.remove("hidden")
            signUp.classList.remove("w-[40%]")
            signUp.classList.add("w-[25%]")
            logIn.classList.remove("w-[40%]")
            logIn.classList.add("w-[25%]")
        }
    }
    if(!localStorage.getItem("products")){
        localStorage.setItem("products", JSON.stringify(products));
    }
    if(!localStorage.getItem("cart")){
        const cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));   
    }
    if(!document.cookie){
        localStorage.removeItem("currentUser")
        let localCart = JSON.parse(localStorage.getItem("cart"));
        localCart = [];
        localStorage.setItem("cart", JSON.stringify(localCart));
        cart.setAttribute("data-quantity", 0);
    }else{
        cart.setAttribute("data-quantity", JSON.parse(localStorage.getItem("cart")).length);
    }
    localProducts.forEach((productSection, index) => {
        visualizeProducts(productSection, sectionTitles[index]);
    });
});


