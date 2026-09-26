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

const profile = Array.isArray(data.data) ? data.data[0] : data.data;

const postsResponse = await fetch(
  `https://v2.api.noroff.dev/social/profiles/${username}/posts`,
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  },
);

const postsData = await postsResponse.json();

console.log("MY POSTS:", postsData);

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

if (postsData.data && postsData.data.length > 0) {
  postsData.data.forEach((post) => {
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
    <p>Comments: ${post._count.comments}</p>
    <p>Reactions: ${post._count.reactions}</p>
    
    <button class="edit-post" data-id="${post.id}">Edit</button>

      <button class="delete-post" data-id="${post.id}">
    <img src="../icons/delete.png" alt="trashcan icon"> </button>

  
  `;
    postsContainer.appendChild(postElement);

    const deleteButton = postElement.querySelector(".delete-post");

    deleteButton.addEventListener("click", async () => {
      const postId = deleteButton.dataset.id;

      const response = await fetch(
        `https://v2.api.noroff.dev/social/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": apiKey,
          },
        },
      );

      if (response.ok) {
        alert("Post deleted!");
        window.location.reload();
      } else {
        alert("Could not delete post.");
      }
    });
const editButton = postElement.querySelector(".edit-post");

editButton.addEventListener("click", () => {
  const createPostForm = document.querySelector("#create-post-form");

  createPostForm.dataset.editingId = post.id;

  document.querySelector("#post-title").value = post.title;
  document.querySelector("#post-body").value = post.body || "";
  document.querySelector("#post-media").value = post.media?.url || "";

  createPostForm.scrollIntoView({
    behavior: "smooth",
  });
});
  });
} else {
  postsContainer.innerHTML += "<p>You have no posts</p>";
}

const logoutButton = document.querySelector("#logout");

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("username");

  window.location.href = "../index.html";
});
