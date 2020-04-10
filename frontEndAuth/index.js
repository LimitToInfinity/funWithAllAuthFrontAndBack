const loginForm = document.querySelector(".login");
const getUsers = document.querySelector(".get-users");
const authHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${ localStorage.token }`
};

loginForm.addEventListener("submit", handleLogin);
getUsers.addEventListener("click", handleGetUsers);

function handleGetUsers() {
    console.log("token", localStorage.token);

    fetch("http://localhost:3000/users", {
        headers: authHeaders
    })
        .then(response => response.json())
        .then(console.log);
}

function handleLogin(event) {
    event.preventDefault();

    const loginFormData = new FormData(event.target);
    const username = loginFormData.get("username");
    const password = loginFormData.get("password");

    console.log("username", username);
    console.log("password", password);

    const loginBody = { username, password };

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( loginBody )
    })
        .then(response => response.json())
        .then(result => {
            console.log(result.token);
            localStorage.setItem("token", result.token);
        })

    event.target.reset();
}