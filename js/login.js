/**
 * Saves the user's login information in local storage
 * @param {string} accessToken - the user's access token
 * @param {string} username - the user's username
 * @returns {void} saves the login information
 */
function saveLogin(accessToken, username) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("username", username);
}

const form = document.querySelector(".loginform");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const response = await fetch("https://v2.api.noroff.dev/auth/login", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  const data = await response.json();

  if (response.ok) {
    console.log("Login successful!");

    saveLogin(data.data.accessToken, data.data.name);

    window.location.href = "../index.html";
  } else {
    console.log("Login failed");
  }
});
