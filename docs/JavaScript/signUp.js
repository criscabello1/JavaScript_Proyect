
const form = document.getElementById('registrationForm');
const formBtn = document.getElementById('formBtn');


const fields = {
    name: document.getElementById('formName'),
    lastName: document.getElementById('lastName'),
    date: document.getElementById('date'),
    country: document.getElementById('country'),
    city: document.getElementById('city'),
    address: document.getElementById('address'),
    email: document.getElementById('email'),
    confirmEmail: document.getElementById('confirm_email'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirm_password')
};


const errorMessages = {
    name: "*Name is invalid. Only letters and spaces are allowed.",
    lastName: "*Last Name is invalid. Only letters and spaces are allowed.",
    date: "*Date of Birth is required.",
    country: "*Country is invalid. Only letters and spaces are allowed.",
    city: "*City is invalid. Only letters and spaces are allowed.",
    address: "*Address is required.",
    email: "*E-mail is invalid.",
    confirmEmail: "*E-mails do not match.",
    password: "*Password is invalid. It must contain at least 8 characters, including 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character (-_/.#$).",
    confirmPassword: "*Passwords do not match."
};

const regex = {
    name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_/.#$])[A-Za-z\d-_/.#$]{8,}$/
};


function validateField(field, regex, errorMessage) {
    let paragraph = document.createElement("p");
    paragraph.innerText = errorMessage;
    paragraph.classList.add("text-red-500", "text-center", "text-[13px]");

    if (regex.test(field.value.trim())) {
        if (field.nextElementSibling) {
            field.nextElementSibling.remove();
        }
    } else {
        if (!field.nextElementSibling) {
            field.parentNode.insertBefore(paragraph, field.nextSibling);
        }
    }
}


function validateNonRegexField(field, errorMessage){
    let paragraph = document.createElement("p");
    paragraph.innerText = errorMessage;
    paragraph.classList.add("text-red-500", "text-center", "text-[13px]");

    if(field.value.trim()){
        if (field.nextElementSibling) {
            field.nextElementSibling.remove();
        }
    }else{
        if (!field.nextElementSibling) {
            field.parentNode.insertBefore(paragraph, field.nextSibling);
        }
    }
}

function matchField(field, matchField, errorMessage){
    let paragraph = document.createElement("p");
    paragraph.innerText = errorMessage;
    paragraph.classList.add("text-red-500", "text-center", "text-[13px]");

    if(field.value.trim() === matchField.value.trim()){
        if (field.nextElementSibling) {
            field.nextElementSibling.remove();
        }
    }else{
        if (!field.nextElementSibling) {
            field.parentNode.insertBefore(paragraph, field.nextSibling);
        }
    }
}

function isEmailAvailable(){
    let paragraph = document.createElement("p");
    paragraph.innerText = `*Email is already in use`;
    paragraph.classList.add("text-red-500", "text-center", "text-[13px]");
    let users = JSON.parse(localStorage.getItem("users"))
    const emailExists = users.find((user) => user.email === fields.email.value);

    if(emailExists){
        if (!fields.email.nextElementSibling) {
            fields.email.parentNode.insertBefore(paragraph, fields.email.nextSibling);
        }
        return false
    }else{
        if (fields.email.nextElementSibling) {
            fields.email.nextElementSibling.remove();
        }
        return true
    }
}

function isFormValid() {
    let valid = true;
    validateField(fields.name, regex.name, errorMessages.name);
    validateField(fields.lastName, regex.name, errorMessages.lastName);
    validateNonRegexField(fields.date, errorMessages.date);
    validateField(fields.country, regex.name, errorMessages.country);
    validateField(fields.city, regex.name, errorMessages.city);
    validateNonRegexField(fields.address, errorMessages.address);
    validateField(fields.email, regex.email, errorMessages.email);
    matchField(fields.confirmEmail, fields.email, errorMessages.confirmEmail);
    validateField(fields.password, regex.password, errorMessages.password);
    matchField(fields.confirmPassword, fields.password, errorMessages.confirmPassword);

    for (let field in fields) {
        if (fields[field].nextElementSibling && fields[field].nextElementSibling.tagName === "P") {
            valid = false;
        }
    }
    return valid;
}

formBtn.addEventListener("click", () => {
    if (isEmailAvailable() && isFormValid()) {
        let users = JSON.parse(localStorage.getItem("users"));
        users.push({
            userName: fields.name.value,
            password: fields.password.value,
            email: fields.email.value,
            role: "client"
        });
        localStorage.setItem("users", JSON.stringify(users));
        alert("User Created");
        window.location.assign("./logIn.html");
        for (field in fields) {
            fields[field].value = "";
        }
    }
});



updateDateMax();
setInterval(updateDateMax, 86400000);

function updateDateMax(){
let currentDate = new Date();
let formattedDate = currentDate.toISOString().split('T')[0];
date.setAttribute("max", formattedDate);
}


