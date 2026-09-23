const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

const token = localStorage.getItem("accessToken");
const apiKey = "bf7ba992-9ca9-4810-93b1-04b5226b2717";

const response = await fetch(
  `https://v2.api.noroff.dev/social/posts/${postId}`,
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  },
);

const data = await response.json();

const post = data.data;

const postContainer = document.querySelector("#post");

postContainer.innerHTML = `
  <h1>${post.title}</h1>
  <p>${post.body || ""}</p>

  ${
    post.media
      ? `<img src="${post.media.url}" alt="${post.media.alt || post.title}">`
      : ""
  }

  <p>Created: ${new Date(post.created).toLocaleDateString()}</p>
`;