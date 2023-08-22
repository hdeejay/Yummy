let username = document.querySelector(".username")
let password = document.querySelector(".password")



function error_checking() {
    let error_message = document.querySelector(".errors")
    let usernames = username.value;
    let passwords = password.value;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "login.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.responseText == "error") {
            error_message.innerHTML = "Incorrect username or password";
        }
        else if (xhr.responseText == "success") {
            window.location.replace("http://localhost/Yummy/src/homepage.html");
        }
    };
    xhr.send(JSON.stringify({"username": usernames, "password": passwords}));
}