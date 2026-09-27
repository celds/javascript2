import { getToken, getApiKey } from "./auth.js";

const token = getToken();
const apiKey = getApiKey();
const params = new URLSearchParams(window.location.search);
const searchTerm = params.get("search");

let url = "https://v2.api.noroff.dev/social/posts?_author=true";
if (searchTerm) {
  url = `https://v2.api.noroff.dev/social/posts/search?q=${encodeURIComponent(searchTerm)}&_author=true`;
}

const response = await fetch(url, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": apiKey,
  },
});

const data = await response.json();

const postContainer = document.querySelector("#posts");

data.data.forEach((post) => {
  const postElement = document.createElement("article");

  postElement.innerHTML = `
  <a href="pages/profile.html?name=${encodeURIComponent(post.author.name)}">
  @${post.author.name}</a>
  <p class="post-time">${new Date(post.created).toLocaleString()}</p>
  <h2>${post.title}</h2>
  <p>${post.body || ""}</p>

    ${
      post.media
        ? `<img src="${post.media.url}" alt="${post.media.alt || post.title}">`
        : ""
    }
    <p>Comments: ${post._count.comments}</p>
    <p>Reactions: ${post._count.reactions}</p>
  `;
  postElement.addEventListener("click", () => {
  window.location.href = `pages/post.html?id=${post.id}`;
});

  postContainer.appendChild(postElement);
});

