let searchQuery = "";
const APP_ID =  '4ce59e10';
const APP_KEY = 'd6f19364bd63e6972430a0f4d8c80002';
let new_id;
let old_id;
let input_id;
let searchResultDiv = document.querySelector(".search-result")
const login_button = document.querySelector(".login");
const nav_links = document.querySelector(".nav_links");

window.onload = function () {
    row();
    let url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (let i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }

    let search = data.search.replace(/%20/gi, " ")
    searchQuery = search;
    lookDB();
}
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
    };
    xhr.send();
}
    
async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data.hits);
    insertDB(data.hits);
}
function lookDB() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "recipes.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if(xhr.responseText == "empty data") {
            fetchAPI()
        }
        else {
            let data = JSON.parse(xhr.responseText)
            generateHTML(data)
        }
    };

    xhr.send(JSON.stringify({'name': searchQuery}));
}
function insertDB(data) {
    let xhr = new XMLHttpRequest();

    xhr.open("POST", "insert_DB.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
        }
    };
    
    xhr.send(JSON.stringify({"data": data, "searchQuery": searchQuery}));

}
function view_qrcode(id) {
    new_id = id;
    let view_qrcode = document.querySelectorAll(".view-qrcode");
    let qrcode = document.querySelectorAll('.qrcode');
    
    qrcode[new_id].style.setProperty('--hidden', 'visible');
    qrcode[new_id].style.setProperty('--none', 'block');
    view_qrcode[new_id].setAttribute('onclick', "hide_qrcode(new_id)");

}
function hide_qrcode(id) {
    old_id = id;
    let view_qrcode = document.querySelectorAll(".view-qrcode");
    let qrcode = document.querySelectorAll('.qrcode');
    qrcode[old_id].style.setProperty('--hidden', 'invisible');
    qrcode[old_id].style.setProperty('--none', 'none');
    view_qrcode[old_id].setAttribute('onclick', "view_qrcode(old_id)");
}
function copy(id) {
    input_id = id;
    let link = document.querySelectorAll(".link");
    link[input_id].select();
    console.log(link[input_id].value);

    // Copy the text inside the text field
    navigator.clipboard.writeText(link[input_id].value);
 
}

function generateHTML(data) {
    let count = 0;
    console.log(data);
    let generatedHTML = "";
    data.map((result) => {
        generatedHTML += `
        <div class="item">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
        <h1 class="title">${result.recipe.label}</h1>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${result.recipe.url}" alt="img" class="qrcode">
            <a class="view-btn" target="_blank" href="${
                result.recipe.url
            }">View Recipe</a>
            <input type="hidden" class="link" value="${result.recipe.url}">
            <button class="view-qrcode" onclick="view_qrcode(${count})"> Share With QR code</button>
            <button class="view-qrcode" onclick="copy(${count})"> Share With Link</button>
            </div>
            <p class="item-data">Calories: ${Math.round(result.recipe.calories)}</p>
            <p class="item-data">Diet label: ${
            result.recipe.dietLabels.length > 0
                ? result.recipe.dietLabels
                : "No Data Found"
            }</p>
        </div>
        `;
        count++;
    });
    searchResultDiv.innerHTML = generatedHTML;
}
