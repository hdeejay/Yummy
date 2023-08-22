const login_button = document.querySelector(".login");
const sign_up = document.querySelector(".logins");
const nav_links = document.querySelector(".nav_links");
const directions = document.querySelector(".directions");
const tables = document.querySelector(".emails");
const email = document.querySelector(".email");
const go_back_btn = document.querySelector(".go_back");
const name = document.querySelector(".names");
const subject = document.querySelector(".subjects");
const important = document.querySelector(".importants");
let new_id = 0;
let all_data;
let sent_data;
window.onload = function () {
    row()
    emails()
    sent_emails();
};
function emails() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "inbox.php", true);
    xhr.onload = function () {
        if (xhr.responseText == "error: no messages") {
            console.log(xhr.responseText);
            all_data = "No messages are available.";
        }
        else {
            let data = JSON.parse(xhr.response);
            all_data = data;
            generate_html(data);
        }
        
    }
    xhr.send();
}
function Mark_Important_email(){
    let values = new Array;
    const selected = document.getElementsByName("email")
    for (let i = 0; i < selected.length; i++) {
        if(selected[i].checked) {
            values.push(selected[i].value);
        }
    }
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "important_emails.php", true);
    xhr.onload = function () {
        if (xhr.responseText == "Error") {
            console.log(xhr.responseText);
        }
        else {
            emails();
        }
        
    }
    xhr.send(JSON.stringify({"important": values}));
}
function generate_html(data) {
    tables.style.setProperty("--hidden", "visible");
    tables.style.setProperty("--none", "block");
    important.style.setProperty("--hidden", "visible");
    important.style.setProperty("--none", "block");
    email.style.setProperty("--hidden", "invisible");
    email.style.setProperty("--none", "none");
    let html = "";
    if(data == "No messages are available.") {
        tables.innerHTML = "No messages are available.";
    }
    else {
        for (let i = 0; i < data.length; i++) {
            if (data[i].seen == "0") {
                if (data[i].important == "0") {
                    html += `
                    <div class="email-row">
                        <div class="items">
                        <input type="checkbox" name="email" value=${data[i].id} />
                            <a class="message" href="javascript:void(0);" onclick="display_email(${data[i].id})">
                                <h5 class="name">${data[i].sender_name}</h5>
                                <h5 class="subject">${data[i].subject}</h5>
                                <h5 class="message">- ${data[i].message.slice(0, 20)}...</h5>
                                <h5 class="time">${data[i].sent_time.slice(0, 10)}</h5>   
                            </a>
                        </div>
                    </div>
                    `;
                }
                else if (data[i].important == "1") {
                    html += `
                    <div class="email-row">
                        <div class="items">
                        <input type="checkbox" name="email" value=${data[i].id} />
                            <a class="message" href="javascript:void(0);" onclick="display_email(${data[i].id})">
                                <h5 class="name">${data[i].sender_name}</h5>
                                <h5 class="subject">${data[i].subject}</h5>
                                <h5 class="message">- ${data[i].message.slice(0, 20)}...</h5>
                                <h5 class="time">${data[i].sent_time.slice(0, 10)}</h5> 
                                <h5 class="important">Important!</h5>
                            </a>
                        </div>
                    </div>
                    `;
                }
            }
        }
    }
    tables.innerHTML = html;
}
function sent_emails() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "sent_emails.php", true);
    xhr.onload = function () {
        if (xhr.responseText == "error: no messages") {
            console.log(xhr.responseText);
        }
        else {
            let data = JSON.parse(xhr.response);
            sent_data = data;
        }
    }
    xhr.send();
}
function generate_sent_emails() {
    console.log(sent_data);
    tables.style.setProperty("--hidden", "visible");
    tables.style.setProperty("--none", "block");
    important.style.setProperty("--hidden", "visible");
    important.style.setProperty("--none", "block");
    email.style.setProperty("--hidden", "invisible");
    email.style.setProperty("--none", "none");
    let html = "";
    if (sent_data.length == 0) {
        tables.innerHTML = "No messages sent.";
        
    }
    for (let i = 0; i < sent_data.length; i++) {
        html += `
            <div class="email-row">
                <div class="items">
                <input type="checkbox" name="email" value=${sent_data[i].id} />
                    <a class="message" href="javascript:void(0);" onclick="display_sent_email(${sent_data[i].id})">
                        <h5 class="name">${sent_data[i].receiver_name}</h5>
                        <h5 class="subject">${sent_data[i].subject}</h5>
                        <h5 class="message">- ${sent_data[i].message.slice(0, 20)}...</h5>
                        <h5 class="time">${sent_data[i].sent_time.slice(0, 10)}</h5>   
                    </a>
                </div>
            </div>
            `;
    }
    tables.innerHTML = html;    
}
function new_message() {
    let html = `
        <form action="new_message.php" method="POST">
            <input type="text" class="usernames" placeholder="example" name="username">            
            <input type="text" class="subjects" placeholder="subject" name="subject">
            <textarea type="text" class="messages" placeholder="message" name="message"> </textarea>
            <button type="submit" class="submit" onclick="verify_new_message()">Send</> 
        </form>
    `;
    tables.innerHTML = html;
}

function verify_new_message() {
    const username = document.querySelector(".username");
    const subject = document.querySelector(".subject");
    const message = document.querySelector(".message");
    if(username.length > 0 && subject.length > 0 && message.length > 0) {
        document.querySelector("form").submit();
    }
}
function display_sent_email(id) {
    go_back_btn.style.setProperty("--hidden", "visible");
    go_back_btn.style.setProperty("--none", "block");
    important.style.setProperty("--hidden", "invisible");
    important.style.setProperty("--none", "none");
    tables.style.setProperty("--hidden", "invisible");
    tables.style.setProperty("--none", "none");
    const result = sent_data.find(({ id }) => id === id);
    email.style.setProperty("--hidden", "visible");
    email.style.setProperty("--none", "block");
    let message = result.message.replace(/\r\n/gi, "<br>");
    let html = `
        <h3 class="sender">Reciever: ${result.receiver}</h3>
        <h3 class="sender_name">Receiver Name: ${result.receiver_name} </h3> 
        <h3 class="sent_time">${result.sent_time.slice(0, 10)}</h3> 
        <h3 class="subjects">${result.subject}</h3>
        
        <h3 class="messages">${message}</h3>
        <button type="button" class="go_back" onclick="generate_sent_emails()"> Go Back</button>`;
    email.innerHTML = html;
}
function all_mails() {
    tables.style.setProperty("--hidden", "visible");
    tables.style.setProperty("--none", "block");
    important.style.setProperty("--hidden", "visible");
    important.style.setProperty("--none", "block");
    email.style.setProperty("--hidden", "invisible");
    email.style.setProperty("--none", "none");
    let html = "";
    console.log(all_data);
    for (let i = 0; i < all_data.length; i++) {
        if (all_data[i].important == "0") {
            html += `
            <div class="email-row">
                <div class="items">
                <input type="checkbox" name="email" value=${all_data[i].id} />
                    <a class="message" href="javascript:void(0);" onclick="display_email(${all_data[i].id})">
                        <h5 class="name">${all_data[i].sender_name}</h5>
                        <h5 class="subject">${all_data[i].subject}</h5>
                        <h5 class="message">- ${all_data[i].message.slice(0, 20)}...</h5>
                        <h5 class="time">${all_data[i].sent_time.slice(0, 10)}</h5>   
                    </a>
                </div>
            </div>
            `;
        }
        else if (all_data[i].important == "1") {
            html += `
            <div class="email-row">
                <div class="items">
                <input type="checkbox" name="email" value=${all_data[i].id} />
                    <a class="message" href="javascript:void(0);" onclick="display_email(${all_data[i].id})">
                        <h5 class="name">${all_data[i].sender_name}</h5>
                        <h5 class="subject">${all_data[i].subject}</h5>
                        <h5 class="message">- ${all_data[i].message.slice(0, 20)}...</h5>
                        <h5 class="time">${all_data[i].sent_time.slice(0, 10)}</h5> 
                        <h5 class="important">Important!</h5>
                    </a>
                </div>
            </div>
            `;
        }
    }
    tables.innerHTML = html;
}
function Important_email() {
    tables.style.setProperty("--hidden", "visible");
    tables.style.setProperty("--none", "block");
    email.style.setProperty("--hidden", "invisible");
    email.style.setProperty("--none", "none");
    go_back_btn.style.setProperty("--hidden", "invisible");
    go_back_btn.style.setProperty("--none", "none");
    important.style.setProperty("--hidden", "visible");
    important.style.setProperty("--none", "block");
    let html = "";
    for (let i = 0; i < all_data.length; i++) {
        if (all_data[i].important == "1") {
            html += `
            <div class="email-row">
            <div class="items">
            <input type="checkbox" name="email" value=${all_data[i].id}>
                <a class="message" href="javascript:void(0);" onclick="display_email(${all_data[i].id})">
                    <h5 class="name">${all_data[i].sender_name}</h5>
                    <h5 class="subject">${all_data[i].subject}</h5>
                    <h5 class="message">- ${all_data[i].message.slice(0, 20)}...</h5>
                    <h5 class="time">${all_data[i].sent_time.slice(0, 10)}</h5> 
                    <h5 class="important">Important!</h5>
                </a>
            </div>
        </div>
        `;
        }
    }
    tables.innerHTML = html;    
}
function display_email(id) {
    
    important.style.setProperty("--hidden", "invisible");
    important.style.setProperty("--none", "none");
    go_back_btn.style.setProperty("--hidden", "visible");
    go_back_btn.style.setProperty("--none", "block");
    tables.style.setProperty("--hidden", "invisible");
    tables.style.setProperty("--none", "none");
    let result = all_data.find(e => e.id  === id);
    email.style.setProperty("--hidden", "visible");
    let message = result.message.replace(/\r\n/gi, "<br>");
    email.style.setProperty("--none", "block");
    let html = `
        <h3 class="sender">Sender: ${result.sender}</h3>
        <h3 class="sender_name">Sender Name: ${result.sender_name} </h3> 
        <h3 class="sent_time">${result.sent_time.slice(0, 10)}</h3> 
        <h3 class="subjects">${result.subject}</h3>
        <h3 class="messages">${message}</h3>
        <button type="button" class="go_back" onclick="generate_all_mails()"> Go Back</button>`;
        
    email.innerHTML = html;
    if(result.seen == 0) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "seen_email.php", true);
        xhr.onload = function () {
            if (xhr.responseText == "success") {
                    for (let i = 0; i < all_data.length; i++) {
                        if(all_data[i].id == id) {
                            all_data[i].seen = 1;
                        }
                    }
            }  
        }
        xhr.send(JSON.stringify({ "id": id }));
    }
}
function back_page() {
    go_back_btn.style.setProperty("--hidden", "invisible");
    go_back_btn.style.setProperty("--none", "none");
    important.style.setProperty("--hidden", "visible");
    important.style.setProperty("--none", "block");
    tables.style.setProperty("--hidden", "visible");
    tables.style.setProperty("--none", "block");
    email.style.setProperty("--hidden", "invisible");
    email.style.setProperty("--none", "none");
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
        else {
            window.location.href = "login.html"
        }
    };
    xhr.send();
}