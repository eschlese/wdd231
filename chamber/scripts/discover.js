import { attractions } from "../data/attractions.mjs";

const cards = document.querySelector('#discoverCards');

function getCards(discoverList) {
    discoverList.forEach(attraction => {
        let section = document.createElement("section");
        let title = document.createElement("h2");
        let fig = document.createElement("figure");
        let img = document.createElement("img")
        let address = document.createElement("address");
        let desc = document.createElement("p");
        let btn = document.createElement("button");

        title.textContent = attraction["name"];

        img.setAttribute("src", attraction["img"]);
        img.setAttribute("alt", `Picture of the ${attraction["name"]}`);
        img.setAttribute("loading", "lazy");
        img.setAttribute("width", "300");
        fig.appendChild(img);

        address.textContent = attraction["address"];

        desc.textContent = attraction["desc"];

        btn.textContent = "Learn more";

        section.appendChild(title);
        section.appendChild(fig);
        section.appendChild(address);
        section.appendChild(desc);
        section.appendChild(btn);

        cards.appendChild(section);
    });
}

getCards(attractions);