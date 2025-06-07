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
const goblin = {
    name: "Goblin",
    hp: 100,
    dmg: 5,
}
const waterSerpent = {
    name: "Water Serpent",
    hp: 80,
    dmg: 7,
}
const player = {}
const heroButton = document.querySelectorAll(".hero-choice")
const statInfo = document.getElementById("statInfo")
const monsterDisplay = document.createElement("div");
monsterDisplay.id - "monsterDisplay";
const locationButton = document.querySelectorAll(".location-button")
let currentMonster = null
const main = document.querySelector("main")
main.appendChild(monsterDisplay)


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
            document.body.style.backgroundColor = "#6699CC";
            document.documentElement.style.backgroundColor = "#6699CC";
            document.querySelector("main").style.backgroundColor = "#6699CC";
            currentMonster = {...waterSerpent}
            

        } else if (button.id === "forest") {
            document.body.style.backgroundColor = "green";
            document.documentElement.style.backgroundColor = "green";
            document.querySelector("main").style.backgroundColor = "green";
            currentMonster = {...goblin}
        }
        document.getElementById("locationSelectPage").style.display = "none"

        monsterDisplay.innerHTML = `
        <div id="enemyHP"> ${currentMonster.name}'s: HP ${currentMonster.hp} </div>`
    
    });
});
// ! Battle logic
const attackButton = document.getElementById("attack")
const blockButton = document.getElementById("block")
let playerBlock = false
attackButton.addEventListener("click",()=>{
    let damage = currentMonster.dmg
    currentMonster.hp -= player.dmg
     document.getElementById("enemyHP").textContent =`${currentMonster.name}'s: HP ${currentMonster.hp} `
    const message = `${player.name} attacks and deals ${player.dmg} damage!`;
    const entry = document.createElement("div");
    entry.textContent = message;
    battleLog.appendChild(entry);   
    enemyTurn()
});
function enemyTurn(params) {
    let damage = currentMonster.dmg
    if (playerBlock === true) {
        damage = 0
        player.hp -= damage
    }
    player.hp -= damage
    const message = `${currentMonster.name} attacks and deals ${damage} damage!`;
    const entry = document.createElement("div");
    entry.textContent = message;
    battleLog.appendChild(entry);   
}
blockButton.addEventListener("click", () =>{
    playerBlock = true
});