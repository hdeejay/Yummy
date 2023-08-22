const login_button = document.querySelector(".login");
const nav_links = document.querySelector(".nav_links");
const body = document.querySelector(".body");
window.onload = function() {
    row();
};

function row() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "authenication.php", true);
    xhr.onload = function () {
        if(xhr.responseText == "sucess") {
            login_button.remove();
            const li = document.createElement("li");
            const href = document.createElement("a");
            href.setAttribute("href", "edit-profile.html");
            let t = document.createTextNode("Edit Profile");
            href.appendChild(t);
            li.appendChild(href);
            nav_links.appendChild(li);
            
            const li2 = document.createElement("li");
            const href2 = document.createElement("a");
            href2.setAttribute("href", "inbox.html");
            let t2 = document.createTextNode("Inbox");
            href2.appendChild(t2);
            li2.appendChild(href2);
            nav_links.appendChild(li2);

            const li1 = document.createElement("li");
            const href1 = document.createElement("a");
            href1.setAttribute("href", "logout.php");
            let t1 = document.createTextNode("Logout");
            href1.appendChild(t1);
            li1.appendChild(href1);
            nav_links.appendChild(li1);
        }
        else {
            window.location.replace("http://localhost/Yummy/src/login.html");
        }
    };
    xhr.send();
}