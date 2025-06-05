// ! Characters
const mage = {
    name: "Mage",
    hp: 100,
    dmg: 15,
    defence: 2,
}
const warrior = {
    name: "Warrior",
    hp: 150,
    dmg: 12,
    defence: 4,
}
const rogue = {
    name: "Rogue",
    hp: 70,
    dmg: 20,
    defence: 0,
}
const player = {}
const heroButton = document.querySelectorAll(".hero-choice")
const statInfo = document.getElementById("statInfo")

const locationButton = document.querySelectorAll(".location-button")



// ! Character Select
heroButton.forEach(button => {
    button.addEventListener("click", () => {
        if (button.id === "mage") {
            Object.assign(player, mage);
            statInfo.innerHTML = `
            <div>Name: ${player.name}</div>
            <div>❤️: ${player.hp}</div>
            <div>⚔️: ${player.dmg}</div>
            <div>🛡️: ${player.defence}</div>`;

        } else if (button.id === "warrior") {
            Object.assign(player, warrior);
                       statInfo.innerHTML = `
            <div>Name: ${player.name}</div>
            <div>❤️: ${player.hp}</div>
            <div>⚔️: ${player.dmg}</div>
            <div>🛡️: ${player.defence}</div>`;
        } else if (button.id === "rogue") {
            Object.assign(player, rogue);
            statInfo.innerHTML = `
            <div>Name: ${player.name}</div>
            <div>❤️: ${player.hp}</div>
            <div>⚔️: ${player.dmg}</div>
            <div>🛡️: ${player.defence}</div>`;
        }
        document.getElementById("characterSelectPage").style.display = "none"
    });
});
// ! Location Select 
locationButton.forEach(button => {
    button.addEventListener("click", () => {
        if (button.id === "lake") {
            document.body.style.backgroundColor = "blue";
            document.documentElement.style.backgroundColor = "blue";
            document.querySelector("main").style.backgroundColor = "blue";
        } else if (button.id === "forest") {
            document.body.style.backgroundColor = "green";
            document.documentElement.style.backgroundColor = "green";
            document.querySelector("main").style.backgroundColor = "green";
        }
        document.getElementById("locationSelectPage").style.display = "none"
    });
});