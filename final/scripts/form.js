const formInfo = new URLSearchParams(window.location.search);

results = document.querySelector("#results");

results.innerHTML = `<p>Thank you for your message! We will reach out to you as soon as possible.</p>
<p>Name: ${formInfo.get("fname")}</p>
<p>Email: ${formInfo.get("email")}</p>
<p>Message: ${formInfo.get("message")}</p>`;