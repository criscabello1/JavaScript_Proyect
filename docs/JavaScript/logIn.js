const formBtn = document.getElementById("formBtn");
const email = document.getElementById("email");
const password = document.getElementById("password");
const finalDiv = document.getElementById("finalDiv");
const check = document.getElementById("check");

const ErrorParagraph = document.createElement("p");
ErrorParagraph.classList.add("text-center", "text-red-500", "text-[13px]", "mb-[12px]");
ErrorParagraph.innerText = `*The email and password must match the ones in the registration form`;

const createdUsers = JSON.parse(localStorage.getItem("users") || '[]');

formBtn.addEventListener("click", () => {

    const localUser = createdUsers.find((user) => user.password === password.value && user.email === email.value);

    if (!localUser) {
        if (!ErrorParagraph.parentElement) {
            finalDiv.parentNode.insertBefore(ErrorParagraph, finalDiv); 
        }
    } else {
        localStorage.setItem("currentUser", JSON.stringify(localUser))
        if (ErrorParagraph.parentElement) {
            ErrorParagraph.parentNode.removeChild(ErrorParagraph);
        }
        
        if (check.checked) {
            let date = new Date();
            date.setTime(date.getTime() + 86400000);
            document.cookie = `token=${localUser.userName}; expires=${date.toUTCString()}; path=/;`;
        } else {
            document.cookie = `token=${localUser.userName}; path=/;`;
        }
        window.location.assign("./../Product/products.html");
        
        email.value = "";
        password.value = "";
    }
});