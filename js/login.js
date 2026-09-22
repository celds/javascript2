

const form = document.querySelector(".loginform");

form.addEventListener("submit", async(event)=> {
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

    if (response.ok) {
  console.log("Login successful!");
} else {
  console.log("Login failed");
}
});