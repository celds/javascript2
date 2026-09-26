console.log("its working yuh");

const token = localStorage.getItem("accessToken");
const apiKey = "bf7ba992-9ca9-4810-93b1-04b5226b2717";
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

