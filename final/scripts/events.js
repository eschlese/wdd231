const savedButton = document.querySelector("#saved")
const grid = document.querySelector(".grid")

const events = [
    {
        name: "Knox Mountain Downhill",
        location: "Knox Mountain, Kelowna, BC",
        link: "https://knoxmountaindh.ca/index.html",
        imgURL: "https://knoxmountaindh.ca/img/h-about.png",
        date: "May 31 - June 1, 2025",
    },
    {
        name: "Giants Head Freeride",
        location: "Giants Head Mountain, Summerland, BC",
        link: "https://giantsheadfreeride.ca",
        imgURL: "https://giantsheadfreeride.ca/cdn/shop/files/GHF-Logo-256_6ba5f801-1ef6-4c15-b3d8-a0779d05c8d4.png?v=1736719937&width=823",
        date: "June 6 - June 8, 2025"
    },
    {
        name: "Learn to Slide Clinic",
        location: "Traders Cove, West Kelowna, BC",
        date: "June 19, 2025"
    },
    {
        name: "Kelowna Waterfront Cruise",
        location: "Waterfront Park, Kelowna, BC",
        link: "https://www.facebook.com/events/1346964799684623/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22home%22%7D%2C%7B%22mechanism%22%3A%22search_results%22%2C%22surface%22%3A%22search%22%7D]%2C%22ref_notif_type%22%3Anull%7D",
        imgURL: "https://scontent.fyka1-1.fna.fbcdn.net/v/t39.30808-6/494638499_1306400224570206_985088600222719670_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=111&ccb=1-7&_nc_sid=75d36f&_nc_ohc=R0-20MJj_0kQ7kNvwEPXLlq&_nc_oc=Adk9owVGBaW9fi-I2aIHV6mUpCdCcKMFq07AxZVnY18UI61MfIGNNtdRO5X2uESWbaytLCRyAWUt1xr9CG6s5bR1&_nc_zt=23&_nc_ht=scontent.fyka1-1.fna&_nc_gid=VBG2v9Q2KFweqpkiHRcAwQ&oh=00_AfNrsgddjSQc3SMMwrJ8eqWv6AeInJ4G-OhkF4UKAZQMzw&oe=68595EEC",
        date: "June 29, 2025"
    }
]

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