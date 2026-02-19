import { events } from "../data/events.mjs";
const savedButton = document.querySelector("#saved")
const grid = document.querySelector(".grid")

function CreateEventCard(event) {
    let card = document.createElement("section");
    let name = document.createElement("h3");
    let location = document.createElement("p");
    let date = document.createElement("p");
    let link = document.createElement("a");
    let img = document.createElement("img");
    let saveButton = GetSaveButton(event.name);

    name.textContent = event.name;
    location.textContent = event.location;
    date.textContent = event.date;

    if ("link" in event) {
        link.setAttribute("href", event.link);
    }
    else {
        link.setAttribute("href", "contact-us.html");
    }

    if ("imgURL" in event) {
        img.setAttribute("src", event.imgURL);
        img.setAttribute("alt", `A poster or related picture for the ${event.name} event.`);
    }
    else {
        img.setAttribute("src", "images/placeholder.webp");
        img.setAttribute("alt", "A placeholder image of a group of longboarders pushing on a road in the mountains.");
    }
    img.setAttribute("loading", "lazy");

    link.appendChild(img);
    link.appendChild(name);
    link.appendChild(location);
    link.appendChild(date);

    card.appendChild(link);
    card.appendChild(saveButton);

    return card;
}

function FillGrid(eventArray) {
    grid.innerHTML = ""
    eventArray.forEach(event => { grid.appendChild(CreateEventCard(event)) });
}

function GetSaveButton(eventName) {
    let saveButton = document.createElement("button");
    let savedEventsStr = localStorage.getItem("savedEvents") || "[]";
    let savedEvents = JSON.parse(savedEventsStr);

    saveButton.setAttribute("type", "button");
    saveButton.setAttribute("aria-label", `Save button for ${eventName}`);

    if (savedEvents.includes(eventName)) {
        saveButton.classList.add("saved");
    };

    saveButton.addEventListener("click", () => {
        let savedEventsStr = localStorage.getItem("savedEvents") || "[]";
        let savedEvents = JSON.parse(savedEventsStr);

        saveButton.classList.toggle("saved");

        if (saveButton.classList.contains("saved")) {
            savedEvents.push(`${eventName}`);
        }
        else {
            savedEvents = savedEvents.filter(name => name !== eventName);
        }

        let newSavedEvents = JSON.stringify(savedEvents);
        localStorage.setItem("savedEvents", newSavedEvents);
    });

    return saveButton;
}

FillGrid(events);

savedButton.addEventListener("click", () => {
    savedButton.classList.toggle("saved");

    if (savedButton.classList.contains("saved")) {
        let savedEventsStr = localStorage.getItem("savedEvents") || "[]";
        let savedEvents = JSON.parse(savedEventsStr);

        if (savedEvents.length > 0) {
            FillGrid(events.filter(event => savedEvents.includes(event.name)));
        }
        else {
            grid.innerHTML = "<p>You have no saved events!</p>";
        }
    }
    else {
        FillGrid(events);
    }
});