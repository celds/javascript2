const token = localStorage.getItem("accessToken");
const apiKey = "bf7ba992-9ca9-4810-93b1-04b5226b2717";
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
console.log(data.data[0]);

const postContainer = document.querySelector("#posts");

data.data.forEach((post) => {
  const postElement = document.createElement("article");

  postElement.innerHTML = `
  <p>@${post.author.name}</p>
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

  postContainer.appendChild(postElement);
});

console.log(data.data);
