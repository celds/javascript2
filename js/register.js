

const form = document.querySelector(".registerform");

form.addEventlistener("submit", async (event) => {
    event.PreventDefault();

    const username = document.querySelector("user").value;
    const email = document.querySelector("email").value;
    const password = document.querySelector("password").value;
});