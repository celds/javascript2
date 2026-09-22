





const token = localStorage.getItem("accessToken");
const apiKey = "bf7ba992-9ca9-4810-93b1-04b5226b2717";

const response = await fetch("https://v2.api.noroff.dev/social/posts", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": apiKey,
  },
});

const data = await response.json();

const postContainer = document.querySelector("#posts");

data.data.forEach((post)=> {
  const postElement = document.createElement("article");

  postElement.innerHTML = `
  <h2>${post.title}</h2>
  <p>${post.body || ""}</p>

    ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt || post.title}">` : ""}
  `;

  postContainer.appendChild(postElement);
})

console.log(data.data);
