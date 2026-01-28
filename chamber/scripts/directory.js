const cards = document.querySelector('#cards');
const gridbtn = document.querySelector("#grid");
const listbtn = document.querySelector("#list");

gridbtn.addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
});

listbtn.addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
});

async function getCompanyData() {
    const response = await fetch("./data/members.json");
    const data = await response.json();
    displayCompanies(data.companies);
}

getCompanyData();

const displayCompanies = (companies) => {
    companies.forEach(company => {
        let section = document.createElement("section");
        let name = document.createElement("h2");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let url = document.createElement("a");
        let img = document.createElement("img");
        let member_lv = document.createElement("p")

        name.textContent = `${company.name}`;
        address.textContent = `${company.address}`;
        phone.textContent = `${company.phone}`;

        url.href = `${company.url}`;
        url.textContent = "Website"

        img.setAttribute('src', company.image);
        img.setAttribute('alt', `Image representing ${company.name}`);
        img.setAttribute("loading", "lazy");
        img.setAttribute("width", "320");
        img.setAttribute("height", "320");

        member_lv.textContent = "Standard Member";
        if (company.member_lv == 2) {
            member_lv.textContent = "Silver Member";
        }
        else if (company.member_lv == 3) {
            member_lv.textContent = "Gold Member";
        }

        section.appendChild(name);
        section.appendChild(address);
        section.appendChild(phone);
        section.appendChild(url);
        section.appendChild(img);
        section.appendChild(member_lv);

        cards.appendChild(section);
    });
}