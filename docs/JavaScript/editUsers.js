let localUsers = JSON.parse(localStorage.getItem("users")) || []
let localUser = JSON.parse(localStorage.getItem("currentUser")) || {}
const localCart = JSON.parse(localStorage.getItem("cart")) || []
const cart = document.getElementById("cart")
const usersGrid = document.getElementById("usersGrid")
const usersForm = document.getElementById("usersForm")
const formUser = document.getElementById("formUser")
const btnSaveUser = document.getElementById("btnSaveUser")
const btnCancelUser = document.getElementById("btnCancelUser")
const btnCreatelUser = document.getElementById("btnCreateUser")
let userName = document.getElementById("userName");
let userPassword = document.getElementById("userPassword");
let userEmail = document.getElementById("userEmail");

const errorMessages = {
    name: "*Name is invalid. Only letters and spaces are allowed.",
    email: "*Email is invalid.",
    password: "*Price is invalid. It must contain at least 8 characters, including 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character (-_/.#$).",
};

const regex = {
    name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_/.#$])[A-Za-z\d-_/.#$]{8,}$/
}


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



function loadUsers() {
    localUsers.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class=" border text-xl">${user.userName}</td>
            <td class=" border text-xl">${user.email}</td>
            <td class=" border text-xl">${user.password}</td>
            <td class=" border text-xl">${user.role}</td>
            <td class=" border text-xl">
                ${user.role !== "admin" ? `
                    <button class="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700" onclick="editUser(${index})">Edit</button>
                    <button class="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 ml-2" onclick="deleteUser(${index})">Delete</button>
                ` : ''}
            </td>
        `;
        document.querySelector('tbody').appendChild(row);
    });
}


function showUsersForm(user = {}) {
    formUser.reset();
    formUser.classList.remove("hidden")
    usersForm.showModal();
    userId.value = user.id || '';
    userName.value = user.userName || '';
    userEmail.value = user.email || '';
    userPassword.value = user.password || '';
}

btnSaveUser.addEventListener('click', () => {
    const userIdValue = userId.value;
    const userNameValue = userName.value;
    const userEmailValue = userEmail.value;
    const userPasswordValue = userPassword.value;
    const isNameInputValid = validateField(userName, regex.name, errorMessages.name);
    const isEmailInputValid = validateField(userEmail, regex.email, errorMessages.email);
    const isPasswordInputValid = validateField(userPassword, regex.password, errorMessages.password);
if(isNameInputValid && isEmailInputValid && isPasswordInputValid){
    if (userIdValue) {
        localUsers[userIdValue] = {
            userName: userNameValue,
            email: userEmailValue,
            password: userPasswordValue,
            role: "client"
        };
    } else {
        localUsers.push({
            userName: userNameValue,
            email: userEmailValue,
            password: userPasswordValue,
            role: "client"
        });
    }
    localStorage.setItem("users", JSON.stringify(localUsers));
    loadUsers();
    usersForm.close();
    usersForm.classList.add('hidden');
    window.location.reload()
}
});

btnCancelUser.addEventListener('click', () => {
    usersForm.close();
    usersForm.classList.add('hidden');
    window.location.reload()
});


function editUser(index) {
    showUsersForm({ ...localUsers[index], id: index });
}


function deleteUser(index) {
    if(confirm(`Are you sure you want to delete the user ${localUsers[index].userName}?`)){
        localUsers.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(localUsers));
        loadUsers();
        window.location.reload();
    }else{
        return
    }
}


btnCreateUser.addEventListener('click', () => showUsersForm());


window.onload = () => {
    if(localUser.role !== "admin"){
        window.location.assign("./../../../index.html")
    }
    loadUsers()
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