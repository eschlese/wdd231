const message = document.querySelector("#lastVisit");
const lastVisitJSON = localStorage.getItem("lastVisit");
const msToDays = 86400000;
const currentTime = Date.now()

if (lastVisitJSON) {
    let lastVisit = JSON.parse(lastVisitJSON);
    let daysSinceVisit = (currentTime - lastVisit) / msToDays;

    if (daysSinceVisit < 1) {
        message.textContent = "Back so soon! Awesome!";
    }

    else if (Math.round(daysSinceVisit) == 1) {
        message.textContent = "You last visited 1 day ago.";
    }

    else {
        message.textContent =  `You last visited ${Math.round(daysSinceVisit)} days ago.`;
    }
}
else {
    message.textContent = "Welcome! Let us know if you have any questions.";
}

let newVisit = JSON.stringify(currentTime)
localStorage.setItem("lastVisit", newVisit);