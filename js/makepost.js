import { getToken, getApiKey } from "./auth.js";

const token = getToken();
const apiKey = getApiKey();
const createPostForm = document.querySelector("#create-post-form");

createPostForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value;
  const body = document.querySelector("#post-body").value;
  const mediaUrl = document.querySelector("#post-media").value;
  const editingId = createPostForm.dataset.editingId;

  const postData = {
    title: title,
    body: body,
  };

  if (mediaUrl) {
    postData.media = {
      url: mediaUrl,
      alt: title,
    };
  }

  const url = editingId
  ? `https://v2.api.noroff.dev/social/posts/${editingId}`
  : "https://v2.api.noroff.dev/social/posts";

  const method = editingId ? "PUT" : "POST";

  const response = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  const data = await response.json();

  console.log(data);

  if (response.ok) {
    if (editingId) {
    alert("Post created!");
    } else { alert("post created");

    }
    window.location.reload();
  } else {
    alert(data.errors?.[0]?.message || "Could not create post.");
  }
});   

