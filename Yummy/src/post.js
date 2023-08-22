const login_button = document.querySelector(".login");
const nav_links = document.querySelector(".nav_links");
const body = document.querySelector(".body");
const left_side = document.querySelector(".left-post");
const right_side = document.querySelector(".right-post");
const posts = document.querySelector(".post");
let all_posts;
let post_count = 0;
window.onload = function () {
    row();
    post();
};
function post() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "post.php", true);
    xhr.onload = function () {
        if (xhr.responseText == "Error: post") {
            posts.innerHTML = "Error: No posts";
        }
        else {
            let data = JSON.parse(xhr.responseText);
            all_posts = data
            console.log(all_posts)
            generate_posts();
        }
    }
    xhr.send();
}
function generate_posts() {
    let left_html = "";
    let right_html = "";
    let posts = all_posts.length - post_count;
    if (posts > 20) {
        for (let i = 0; i < 20; i++) {
            url = 'http://localhost/Yummy/src/view_post.html?id=' + encodeURIComponent(all_posts[i].id);
            let description = all_posts[i].recipe.slice(0, 16);
            let date = new Date(all_posts[i].date);
            if (i % 2 == 0) {
                left_html += `
                <div class="left-posts">
            <a class="view_post" href="${url}"> 
            <h3 class="left-name"> ${all_posts[i].name}</h3> 
            <h4 class="left-username"> Recipe By: ${all_posts[i].username}</h4>
            <h5 class="left-description"> ${description} </h5>
            <h6 class="left-date"> Uploaded on ${string}</h6>
            </a>
            </div>
                `;
            }
            else {
                right_html += `
                <div class="right-posts">
                <a class="view_post" href="${url}"> 
                <h3 class="right-name"> ${all_posts[i].name}</h3> 
                <h4 class="right-username"> Recipe By: ${all_posts[i].username}</h4>
                <h5 class="right-description"> ${description} </h5>
                <h6 class="right-date"> Uploaded on ${string}</h6>
                </a>
                </div>
                    `;
            }
        }
        post_count = 20;
    }
    else {
        for (let i = 0; i < all_posts.length; i++) {
            url = 'http://localhost/Yummy/src/view_post.html?id=' + encodeURIComponent(all_posts[i].id);
            let description = all_posts[i].recipe.slice(0, 16);
            let date = new Date(all_posts[i].date);
            let string = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
            description += "...";
            if (i % 2 == 0) {
                left_html += `
            <div class="left-posts">
            <a class="view_post" href="${url}"> 
            <h3 class="left-name"> ${all_posts[i].name}</h3> 
            <h4 class="left-username"> Recipe By: ${all_posts[i].username}</h4>
            <h5 class="left-description"> ${description} </h5>
            <h6 class="left-date"> Uploaded on ${string}</h6>
            </a>
            </div>
            `;
            }
            else {
                right_html += `
                <div class="right-posts">
            <a class="view_post" href="${url}"> 
            <h3 class="right-name"> ${all_posts[i].name}</h3> 
            <h4 class="right-username"> Recipe By: ${all_posts[i].username}</h4>
            <h5 class="right-description"> ${description} </h5>
            <h6 class="right-date"> Uploaded on ${string}</h6>
            </a>
            </div>
                `;
            }
        }
    }
    right_side.innerHTML = right_html;
    left_side.innerHTML = left_html;
}
function load_more() {
    let left_html = "";
    let right_html = "";
    let posts = all_posts.length - post_count;
    if (posts >= 20) {
        let additonal_post = post_count + 20;
        for (let i = post_count; i < additonal_post; i++) {
            url = 'http://localhost/Yummy/src/view_post.html?id=' + encodeURIComponent(all_posts[i].id);
            let description = all_posts[i].recipe.slice(0, 16);
            let date = new Date(all_posts[i].date);
            if (i % 2 == 0) {
                left_html += `
                <div class="left-posts">
            <a class="view_post" href="${url}"> 
            <h3 class="left-name"> ${all_posts[i].name}</h3> 
            <h4 class="left-username"> Recipe By: ${all_posts[i].username}</h4>
            <h5 class="left-description"> ${description} </h5>
            <h6 class="left-date"> Uploaded on ${string}</h6>
            </a>
            </div>
                `;
            }
            else {
                right_html += `
                <div class="right-posts">
                <a class="view_post" href="${url}"> 
                <h3 class="right-name"> ${all_posts[i].name}</h3> 
                <h4 class="right-username"> Recipe By: ${all_posts[i].username}</h4>
                <h5 class="right-description"> ${description} </h5>
                <h6 class="right-date"> Uploaded on ${string}</h6>
                </a>
                </div>
                    `;
            }
        }
        post_count += 20;
    }
    else {
        for (let i = post_count; i < all_posts.length; i++) {
            url = 'http://localhost/Yummy/src/view_post.html?id=' + encodeURIComponent(all_posts[i].id);
            let description = all_posts[i].recipe.slice(0, 16);
            let date = new Date(all_posts[i].date);
            if (i % 2 == 0) {
                left_html += `
                <div class="left-posts">
            <a class="view_post" href="${url}"> 
            <h3 class="left-name"> ${all_posts[i].name}</h3> 
            <h4 class="left-username"> Recipe By: ${all_posts[i].username}</h4>
            <h5 class="left-description"> ${description} </h5>
            <h6 class="left-date"> Uploaded on ${string}</h6>
            </a>
            </div>
                `;
            }
            else {
                right_html += `
                <div class="right-posts">
                <a class="view_post" href="${url}"> 
                <h3 class="right-name"> ${all_posts[i].name}</h3> 
                <h4 class="right-username"> Recipe By: ${all_posts[i].username}</h4>
                <h5 class="right-description"> ${description} </h5>
                <h6 class="right-date"> Uploaded on ${string}</h6>
                </a>
                </div>
                    `;
            }
        }
    }
}
function row() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "authenication.php", true);
    xhr.onload = function () {
        if (xhr.responseText == "sucess") {
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