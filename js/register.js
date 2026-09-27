

const form = document.querySelector(".registerform");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.querySelector("#user").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const response = await fetch("https://v2.api.noroff.dev/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: username,
      email: email,
      password: password,
    }),
  });

  if (response.ok) {
    console.log("Registration successful!");
  } else {
    console.log("Registration failed");
  }
  const error = await response.json();
  console.log(error);
});
