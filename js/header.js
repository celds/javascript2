const token = localStorage.getItem("accessToken");
const authHead = document.querySelector(".authhead");
const inPagesFolder = window.location.pathname.includes("/pages/");

if (token) {
  authHead.innerHTML = `
    <a href="${inPagesFolder ? "./profile.html" : "./pages/profile.html"}">Profile</a>
  `;
} else {
  authHead.innerHTML = `
    <a href="${inPagesFolder ? "./login.html" : "./pages/login.html"}">Login</a>
    <a href="${inPagesFolder ? "./register.html" : "./pages/register.html"}">Register</a>
  `;
}

const searchForm = document.querySelector("#search-form");
/**
 * Searches for posts.
 * @param {SubmitEvent} event - the form submission event.
 * @returns {void} finish the search.
 */

function searchPosts(event) {
  event.preventDefault();

  const searchInput = document.querySelector("#search-input");
  const searchTerm = searchInput.value.trim();

  if (searchTerm) {
    window.location.href = inPagesFolder
      ? `../index.html?search=${encodeURIComponent(searchTerm)}`
      : `./index.html?search=${encodeURIComponent(searchTerm)}`;
  }
}

searchForm.addEventListener("submit", searchPosts);
