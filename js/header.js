const token = localStorage.getItem("accessToken");

const authHead = document.querySelector(".authhead");

if (token) {
  authHead.innerHTML = `
    <a href="./pages/profile.html">Profile</a>
  `;
} else {
  authHead.innerHTML = `
    <a href="./pages/login.html">Login</a>
    <a href="./pages/register.html">Register</a>
  `;
}