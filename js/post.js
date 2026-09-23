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

const reactionsContainer = document.querySelector("#reactions");
const commentsContainer = document.querySelector("#comments");

if (post.reactions && post.reactions.lenght > 0) {
  post.reactions.forEach((reaction) => {
    const reactionElement = document.createElement("span");

    reactionElement.textContent = `${reaction.symbol} ${reaction.count}`;

    reactionsContainer.appendChild(reactionElement);
  });
}

if (post.comments) {
  commentsContainer.innerHTML = "<h2>Comments</h2>";

  post.comments.forEach((comment) => {
    const commentElement = document.createElement("article");

    commentElement.innerHTML = `
      <p><strong>${comment.author.name}</strong></p>
      <p>${comment.body}</p>
    `;

    commentsContainer.appendChild(commentElement);
  });
}
