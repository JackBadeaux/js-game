// ! Characters
const mage = {
    name: "Mage",
    hp: 120,
    dmg: 15,
    defence: 1,
}
const warrior = {
    name: "Warrior",
    hp: 160,
    dmg: 8,
    defence: 1,
}
const rogue = {
    name: "Rogue",
    hp: 80,
    dmg: 25,
    defence: 0,
}
const goblin = {
    name: "Goblin",
    hp: 100,
    dmg: 20,
}
const waterSerpent = {
    name: "Water Serpent",
    hp: 100,
    dmg: 20,
}
const player = {}
const battleLog = document.getElementById("battleLog")
const heroButton = document.querySelectorAll(".hero-choice")
const statInfo = document.getElementById("statInfo")
const monsterDisplay = document.getElementById("monsterDisplay");
const locationButton = document.querySelectorAll(".location-button")
let currentMonster = null
const main = document.querySelector("main")
document.getElementById("battleLog").style.display = "none"
document.getElementById("headerBattle").style.display = "none"
document.getElementById("battleButtons").style.display = "none"
document.getElementById("locationSelectPage").style.display = "none"
document.getElementById("customAlert").classList.add("hidden")

// ! Character Select
heroButton.forEach(button => {
    button.addEventListener("click", () => {
        if (button.id === "mage") {
            Object.assign(player, mage);
            statInfo.innerHTML = `
            <div>Name: ${player.name}</div>
            <div id="playerHP">❤️: ${player.hp}</div>
            <div>⚔️: ${player.dmg}</div>
            <div>🛡️: ${player.defence}</div>`

        } else if (button.id === "warrior") {
            Object.assign(player, warrior);
            statInfo.innerHTML = `
            <div>Name: ${player.name}</div>
            <div id="playerHP">❤️: ${player.hp}</div>
            <div>⚔️: ${player.dmg}</div>
            <div>🛡️: ${player.defence}</div>`
        } else if (button.id === "rogue") {
            Object.assign(player, rogue);
            statInfo.innerHTML = `
            <div>Name: ${player.name}</div>
            <div id="playerHP">❤️: ${player.hp}</div>
            <div>⚔️: ${player.dmg}</div>
            <div>🛡️: ${player.defence}</div>`
        }
        document.getElementById("characterSelectPage").style.display = "none"
        document.getElementById("locationSelectPage").style.display = "flex"
        document.getElementById("statInfo").style.display = "none"
    });
});
// ! Location Select 
locationButton.forEach(button => {
    button.addEventListener("click", () => {
        if (button.id === "lake") {
            document.body.style.backgroundColor = "#6699CC";
            document.documentElement.style.backgroundColor = "#6699CC";
            document.querySelector("main").style.backgroundColor = "#6699CC";
            document.getElementById("statInfo").style.display = "block"
            currentMonster = {...waterSerpent}
            

        } else if (button.id === "forest") {
            document.body.style.backgroundColor = "green";
            document.documentElement.style.backgroundColor = "green";
            document.querySelector("main").style.backgroundColor = "green";
            document.getElementById("statInfo").style.display = "block"
            currentMonster = {...goblin}
        }
        document.getElementById("locationSelectPage").style.display = "none";
        document.getElementById("headerWelcome").style.display = "none";
        document.getElementById("battleLog").style.display = "flex";
        document.getElementById("headerBattle").style.display = "block";
        document.getElementById("battleButtons").style.display = "flex";
        monsterDisplay.innerHTML = `<div id="enemyHP"> ${currentMonster.name}'s: HP ${currentMonster.hp} </div>`
    });
});
// ! Battle logic

const attackButton = document.getElementById("attack");
const blockButton = document.getElementById("block");
let playerBlock = false;
let gameOver = false;
function gameOverCheck() {
     if (gameOver) return;
    if (player.hp <= 0) {
        player.hp = 0;
    const message = "You Lose";
    const entry = document.createElement("div");
    entry.textContent = message;
    document.getElementById("playerHP").textContent = `❤️: ${player.hp}`
    battleLog.appendChild(entry)
    gameOver = true
    showCustomAlert(`You have lost`,`Press reset to play again`)
    } else if (currentMonster.hp <= 0 ) {
        currentMonster.hp = 0;
    const message = `You Win`;
    const entry = document.createElement("div");
    entry.textContent = message;
    document.getElementById("playerHP").textContent = `❤️: ${player.hp}`
    battleLog.appendChild(entry);
    gameOver = true 
    showCustomAlert('You have won',`Press reset to play again`)
    }

}
// ! block button
blockButton.addEventListener("click", () =>{

    playerBlock = true   
    enemyTurn()
});
// !attack button
attackButton.addEventListener("click", () => {
  if (gameOver) return; 

  let isCrit = Math.random() < 0.4; 
  let damage = Math.floor(Math.random() * player.dmg) + 5;
  if (isCrit) {
    damage *= 2;
  }

  currentMonster.hp -= damage;
  if (currentMonster.hp < 0) currentMonster.hp = 0;

  let message = `${player.name} attacks and deals ${damage} damage!`;
  if (isCrit) {
    message += " It's a crit!";
  }

  document.getElementById("enemyHP").textContent = `${currentMonster.name}'s: HP ${currentMonster.hp}`;
  const entry = document.createElement("div");
  entry.textContent = message;
  battleLog.appendChild(entry);   

  gameOverCheck(); 

  if (!gameOver) {
    enemyTurn(); // only let enemy go if game isn’t over
  }
});
// ! enemy Turn
function enemyTurn() {
  let baseDamage = Math.floor(Math.random() * currentMonster.dmg) + 5;
  let damage = baseDamage - player.defence;

  if (playerBlock) {
    damage = Math.floor(damage / 2);
  }

  if (damage < 0) damage = 0;

  let isCrit = Math.random() < 0.4;
  if (isCrit) {
    damage *= 2;
  }

  player.hp -= damage;
  if (player.hp < 0) player.hp = 0;
  playerBlock = false;

  let message = `${currentMonster.name} attacks and deals ${damage} damage!`;
  if (isCrit) {
    message += " It's a crit!";
  }

  const entry = document.createElement("div");
  entry.textContent = message;
  document.getElementById("playerHP").textContent = `❤️: ${player.hp}`;
  battleLog.appendChild(entry);

  gameOverCheck();
}

//! custom alert logic
function showCustomAlert(title, text, onClose = null) {
  const customAlert = document.getElementById("customAlert");
  const customAlertTitle = document.getElementById("customAlertTitle");
  const customAlertText = document.getElementById("customAlertText");
  const closeBtn = document.getElementById("customAlertClose");

  customAlertTitle.textContent = title;
  customAlertText.textContent = text;

  customAlert.classList.remove("hidden");
}
//! reset button
document.getElementById("resetButton").addEventListener("click", function () {
    location.reload();
})
