const localCart = JSON.parse(localStorage.getItem("products")) || [];
        const productsArray = localCart.flat();
        let counter = 0;

        const nxtBtn = document.getElementById("nxtBtn");
        const prevBtn = document.getElementById("prevBtn");
        const cart = document.getElementById("cart");
        const productName = document.getElementById("productName");
        const productPrice = document.getElementById("productPrice");
        const productImg = document.getElementById("imgProduct");

        nxtBtn.addEventListener("click", () => {
            counter = (counter + 1) % productsArray.length;
            updateProductDisplay();
        });

        prevBtn.addEventListener("click", () => {
            counter = (counter - 1 + productsArray.length) % productsArray.length;
            updateProductDisplay();
        });

        
        function updateProductDisplay() {
            const product = productsArray[counter];
            productImg.src = product.img;
            productPrice.innerText = `$${product.price}`;
            productName.innerText = product.name;
        }

        const signUp = document.getElementById("signUp");
        const logIn = document.getElementById("logIn");

        if (document.cookie) {
            signUp.innerText = "Log Out";
            logIn.innerText = "Products";
            signUp.href = "";
            logIn.href = "./docs/HTMl/Product/products.html";

            function eraseCookie(name) {
                document.cookie = `${name}=; Max-Age=-99999999; path=/`;
            }

            signUp.addEventListener("click", () => {
                localStorage.removeItem("currentUser")
                eraseCookie("token");
                window.location.reload();
            });
        }

        window.onscroll = function() {
            const header = document.getElementById("header");
            header.style.top = (window.scrollY === 0) ? "0" : "-85px";
        };

        window.onload = function() {
            if (!localStorage.getItem("users")) {
                let users =[{email: "admin@gmail.com", userName: "admin", password: "admin123$", role: "admin"}]
                localStorage.setItem("users", JSON.stringify(users));
            }
            if (!document.cookie) {
                localStorage.setItem("cart", JSON.stringify([]));
                cart.setAttribute("data-quantity", 0);
            } else {
                cart.setAttribute("data-quantity", JSON.parse(localStorage.getItem("cart")).length);
            }
        };
