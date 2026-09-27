import { getToken, getApiKey } from "./auth.js";

const params = new URLSearchParams(window.location.search);
const profileName = params.get("name");
const isOwnProfile = !profileName;
const username = profileName || localStorage.getItem("username");
const token = getToken();
const apiKey = getApiKey();

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

const postsData = await postsResponse.json();;

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

const followButton = document.querySelector("#follow");

if (isOwnProfile) {
  followButton.style.display = "none";
} else {
  followButton.textContent = "Follow";

  followButton.addEventListener("click", async () => {
    const isFollowing = followButton.textContent === "Following";

    const action = isFollowing ? "unfollow" : "follow";

    const response = await fetch(
      `https://v2.api.noroff.dev/social/profiles/${username}/${action}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
      },
    );

    if (response.ok) {
      followButton.textContent = isFollowing ? "Follow" : "Following";
    } else {
      const data = await response.json();
      console.log(data);
      alert("Something went wrong.");
    }
  });
}

const postsContainer = document.querySelector("#my-posts");
const createPostSection = document.querySelector("#create-post");

if (!isOwnProfile) {
  createPostSection.style.display = "none";
}

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
    <p>Comments: ${post._count?.comments ?? 0}</p>
    <p>Reactions: ${post._count?.reactions ?? 0}</p>
  
     ${
       isOwnProfile
         ? `
            <button class="edit-post" data-id="${post.id}">
              Edit
            </button>

            <button class="delete-post" data-id="${post.id}">
              <img src="../icons/delete.png" alt="trashcan icon">
            </button>
          `
         : ""
     }
  `;
    postsContainer.appendChild(postElement);

    if (isOwnProfile) {
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
    }
  });
} else {
  postsContainer.innerHTML += "<p>no posts yet</p>";
}

const logoutButton = document.querySelector("#logout");

if (!isOwnProfile) {
  logoutButton.style.display = "none";
} else {
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");

    window.location.href = "../index.html";
  });
}
