const searchForm = document.querySelector("form");
let searchQuery = "";
const APP_ID =  '4ce59e10';
const APP_KEY = 'd6f19364bd63e6972430a0f4d8c80002';
const login_button = document.querySelector(".login");
const nav_links = document.querySelector(".nav_links");
const directions = document.querySelector(".directions");
window.onload = function () {
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
    };
    xhr.send();
}
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector("input").value
    url = 'http://localhost/Yummy/src/recipes.html?search=' + encodeURIComponent(searchQuery);
    document.location.href = url;
});

// async function fetchAPI() {
//     const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=20`;
//     const response = await fetch(baseURL);
//     const data = await response.json();
//     generateHTML(data.hits);
//     console.log(data);
// }


// function generateHTML(data) {
//     let generatedHTML = "";
//     data.map((result) => {
//         generatedHTML += `
//         <div class="item">
//             <img src="${result.recipe.image}" alt="img">
//             <div class="flex-container">
//             <h1 class="title">${result.recipe.label}</h1>
//             <a class="view-btn" target="_blank" href="${
//                 result.recipe.url
//             }">View Recipe</a>
//             </div>
//             <p class="item-data">Calories: ${Math.round(result.recipe.calories)}</p>
//             <p class="item-data">Diet label: ${
//             result.recipe.dietLabels.length > 0
//                 ? result.recipe.dietLabels
//                 : "No Data Found"
//             }</p>
//         </div>
//         `;
//     });
//     searchResultDiv.innerHTML = generatedHTML;
// }

