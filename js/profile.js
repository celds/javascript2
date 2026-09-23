const username = localStorage.getItem("username");
const token = localStorage.getItem("accessToken");
const apiKey = "bf7ba992-9ca9-4810-93b1-04b5226b2717";

const response = await fetch(
  `https://v2.api.noroff.dev/social/profiles/${username}`,
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  },
);

const data = await response.json();

console.log(data);

const profile = data.data;

const profileContainer = document.querySelector("#profile");

profileContainer.innerHTML = `
  <h1>${profile.name}</h1>
  <p>${profile.email}</p>
  <p>${profile.bio || "No bio yet."}</p>

  ${
    profile.avatar
      ? `<img src="${profile.avatar.url}" alt="${profile.avatar.alt || profile.name}">`
      : ""
  }

  <p>Posts: ${profile._count.posts}</p>
  <p>Followers: ${profile._count.followers}</p>
  <p>Following: ${profile._count.following}</p>
`;

const postsContainer = document.querySelector("#my-posts");

profile.posts.forEach((post) => {
  const postElement = document.createElement("article");

  postElement.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.body || ""}</p>

    ${
      post.media
        ? `<img src="${post.media.url}" alt="${post.media.alt || post.title}">`
        : ""
    }

    <p>Created: ${new Date(post.created).toLocaleDateString()}</p>
  `;

  postsContainer.appendChild(postElement);
});