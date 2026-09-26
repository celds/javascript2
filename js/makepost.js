console.log("its working yuh");

const token = localStorage.getItem("accessToken");
const apiKey = "bf7ba992-9ca9-4810-93b1-04b5226b2717";

const createPostForm = document.querySelector("#create-post-form");

createPostForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value;
  const body = document.querySelector("#post-body").value;
  const mediaUrl = document.querySelector("#post-media").value;

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

  const response = await fetch("https://v2.api.noroff.dev/social/posts", {
    method: "POST",
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
    alert("Post created!");
    window.location.reload();
  } else {
    alert(data.errors?.[0]?.message || "Could not create post.");
  }
});