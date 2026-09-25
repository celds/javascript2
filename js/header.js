const token = localStorage.getItem("accessToken");

const authHead = document.querySelector(".authhead");

const inPagesFolder = window.location.pathname.includes("/pages/");


if (token) {
  authHead.innerHTML = `
    <a href="${inPagesFolder ?"./profile.html" : "./pages/profile.html"}">Profile</a>
  `;
} else {
  authHead.innerHTML = `
    <a href="${inPagesFolder ? "./login.html" :"./pages/login.html"}">Login</a>
    <a href="${inPagesFolder ? "./register.html" : "./pages/register.html"}">Register</a>
  `;
}

/*søker*/