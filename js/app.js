const player = {}
const battleLog = document.getElementById("battleLog")
const heroButton = document.querySelectorAll(".hero-choice")
const statInfo = document.getElementById("statInfo")
const monsterDisplay = document.getElementById("monsterDisplay");
const locationButton = document.querySelectorAll(".location-button")
let currentMonster = null
let venomCheck = null
let burnCheck = null
const main = document.querySelector("main")
document.getElementById("battleLog").style.display = "none"
document.getElementById("headerBattle").style.display = "none"
document.getElementById("battleButtons").style.display = "none"
document.getElementById("locationSelectPage").style.display = "none"
document.getElementById("customAlert").classList.add("hidden")
let specialMoveDisplay = document.getElementById("specialMove")
let winCount = 0
let loseCount = 0
const winCountDisplay = document.getElementById("winCount")
const loseCountDisplay = document.getElementById("loseCount")
let speicalMoveCount = 0 
// ! Battle logic
const attackButton = document.getElementById("attack");
const blockButton = document.getElementById("block");
const specialButton = document.getElementById("special")
let playerBlock = false;
let gameOver = false;
function updateHPDisplay() {
  document.getElementById("playerHP").textContent = `❤️: ${player.hp}`;
  document.getElementById("enemyHP").textContent = `${currentMonster.name}'s HP ${currentMonster.hp}`;
}

function winorlose(winorlosetext,entity,winorlose){
        entity.hp = 0;
        const message = winorlosetext;
        const entry = document.createElement("div");
        entry.textContent = message;
        document.getElementById("playerHP").textContent = `❤️: ${player.hp}`
        battleLog.appendChild(entry)
        gameOver = true
}
function gameOverCheck() {
    if (gameOver) return;
    if (player.hp <= 0) {
        loseCount++
        winorlose("You Lose",player,loseCount)
        loseCountDisplay.textContent = loseCount
        showCustomAlert(`You have lost`, `Press reset to play again`)
    } else if (currentMonster.hp <= 0) {
        winCount++
        winorlose("You Win",currentMonster.hp,winCount)
        winCountDisplay.textContent = winCount
        showCustomAlert('You have won', `Press reset to play again`)
    }

}
// ! Characters
const mage = {
    name: "Mage",
    hp: 120,
    dmg: 15,
    defence: 1,
    specialAttack: () => {
        let damage = 25
        currentMonster.hp -= damage
        let message = `${player.name} cast Fireball deals ${damage} damage!`;
        const entry = document.createElement("div");
        entry.textContent = message;
        document.getElementById("enemyHP").textContent = `${currentMonster.name}'s HP ${currentMonster.hp}`;
        battleLog.appendChild(entry)
    }
}
const warrior = {
    name: "Warrior",
    hp: 160,
    dmg: 10,
    defence: 3,
    specialAttack: () => {
        let heal = 25
        player.hp += heal
        if (player.hp > 160) {
            player.hp = 160
        }
        let message = `${player.name} cast Heal and restores ${heal} HP!`;
        const entry = document.createElement("div");
        entry.textContent = message;
        battleLog.appendChild(entry)
    }
}
const rogue = {
    name: "Rogue",
    hp: 80,
    dmg: 22,
    defence: 0,
    specialAttack: () => {
        let damage = 35
        currentMonster.hp -= damage
        if (currentMonster.hp < 0) {
            currentMonster.hp = 0
        }
        let message = `${player.name} uses their daggers and cast Shadow Blade! and deals ${damage} damage!`;
        const entry = document.createElement("div");
        entry.textContent = message;
        document.getElementById("enemyHP").textContent = `${currentMonster.name}'s HP ${currentMonster.hp}`;
        battleLog.appendChild(entry)
    }
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
            specialMoveDisplay.textContent = "Fireball"

        } else if (button.id === "warrior") {
            Object.assign(player, warrior);
            statInfo.innerHTML = `
            <div>Name: ${player.name}</div>
            <div id="playerHP">❤️: ${player.hp}</div>
            <div>⚔️: ${player.dmg}</div>
            <div>🛡️: ${player.defence}</div>`
            specialMoveDisplay.textContent = "Heal"

        } else if (button.id === "rogue") {
            Object.assign(player, rogue);
            statInfo.innerHTML = `
            <div>Name: ${player.name}</div>
            <div id="playerHP">❤️: ${player.hp}</div>
            <div>⚔️: ${player.dmg}</div>
            <div>🛡️: ${player.defence}</div>`
            specialMoveDisplay.textContent = "Shadow Blade"
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
            currentMonster = { ...waterSerpent }


        } else if (button.id === "forest") {
            document.body.style.backgroundColor = "green";
            document.documentElement.style.backgroundColor = "green";
            document.querySelector("main").style.backgroundColor = "green";
            document.getElementById("statInfo").style.display = "block"
            currentMonster = { ...goblin }
        }
        document.getElementById("locationSelectPage").style.display = "none";
        document.getElementById("headerWelcome").style.display = "none";
        document.getElementById("battleLog").style.display = "flex";
        document.getElementById("headerBattle").style.display = "block";
        document.getElementById("battleButtons").style.display = "flex";
        monsterDisplay.innerHTML = `<div id="enemyHP"> ${currentMonster.name}'s HP ${currentMonster.hp} </div>`
        document.querySelector(".stats").style.display = "grid"
    });
});

// ! special button
specialButton.addEventListener("click", () => {
specialButton.addEventListener("click", () => {
    if (gameOver) return;

    // 🔍 check cooldown
    if (specialCooldown > 0) {
        showCustomAlert("Special on cooldown", `Ready in ${specialCooldown} turn(s)`);
        return;
    }

    // 🚀 perform the special
    player.specialAttack();

    // ⏱️ set cooldown (3 turns)
    specialCooldown = 3;

    // 🐉 enemy turn
    if (!gameOver) enemyTurn();

    // 🔥 apply DOT burn if needed
    if (!burnCheck && player.name === "Mage") {
        DOTdamageBurn();
    }

    gameOverCheck();
});
})
// ! block button
blockButton.addEventListener("click", () => {
    if (gameOver) return;
    playerBlock = true
    if (!gameOver) {
        enemyTurn();
    }
    gameOverCheck()
});
// !attack button
attackButton.addEventListener("click", () => {
    if (gameOver) return;

    let isCrit = Math.random() < 0.25;
    let damage = Math.floor(Math.random() * player.dmg) + 1;
    if (isCrit) {
        damage *= 2;
    }

    currentMonster.hp -= damage;
    if (currentMonster.hp < 0) currentMonster.hp = 0;

    let message = `${player.name} attacks and deals ${damage} damage!`;
    if (isCrit) {
        message += " It's a crit!";
    }

    document.getElementById("enemyHP").textContent = `${currentMonster.name}'s HP ${currentMonster.hp}`;
    const entry = document.createElement("div");
    entry.textContent = message;
    battleLog.appendChild(entry);

    gameOverCheck();

    if (!gameOver) {
        enemyTurn();
    }
    
});
// ! water serpant special 
function waterSerpentSpecial() {
    let baseDamage = 5;
    let damage = baseDamage;
    let isCrit = Math.random() < 0.25;

    if (isCrit) {
        damage *= 2;
    }

    if (playerBlock) {
        damage = Math.floor(damage / 2);
    }

    if (damage < 0) damage = 0;

    let message = `${currentMonster.name} spits venom and deals ${damage} damage!`;
    if (isCrit) {
        message += " It's a crit!";
    }
    if (playerBlock) {
        message = `${player.name} blocks and ${currentMonster.name} spits venom and deals ${damage} damage!`
    }
    player.hp -= damage;
    if (player.hp < 0) player.hp = 0;
    const entry = document.createElement("div");
    entry.textContent = message;
    document.getElementById("playerHP").textContent = `❤️: ${player.hp}`;
    battleLog.appendChild(entry);
    venomCheck = true
     updateHPDisplay()
}
// ? Damage over time for water serpant special
function DOTdamagePoison() {
    let DOTdamage = Math.floor(Math.random() * 3) + 1;
    let damage = DOTdamage
    if (damage < 0) damage = 0;
    let message = `You are posioned and take ${damage} damage!`;
    player.hp -= damage;
    if (player.hp < 0) player.hp = 0;
    const entry = document.createElement("div");
    entry.textContent = message;
    document.getElementById("playerHP").textContent = `❤️: ${player.hp}`;
    battleLog.appendChild(entry);
     updateHPDisplay()
}
function DOTdamageBurn() {


        burnCheck = true
        let DOTdamage = Math.floor(Math.random() * 3) + 1;
        let damage = DOTdamage
        if (damage < 0) damage = 0;
        let message = `You have burned the enemy and deal ${damage} damage!`;
        currentMonster.hp -= damage;
        if (currentMonster.hp < 0) currentMonster.hp = 0;
        const entry = document.createElement("div");
        entry.textContent = message;
        document.getElementById("enemyHP").textContent = `${currentMonster.name}'s HP ${currentMonster.hp}`;
        battleLog.appendChild(entry);
         updateHPDisplay()
    

}
// ! goblin special attack
function goblinSpecial() {
    let damage = goblin.dmg;
    let isCrit = Math.random() < 0.25;

    if (isCrit) {
        damage *= 2;
    }
    if (damage < 0) damage = 0;

    let message = `${currentMonster.name} bites and ingores defence and deals ${damage} damage!`;
    if (isCrit) {
        message += " It's a crit!";
    }
    if (playerBlock) {
        message = `${player.name} blocks and ${currentMonster.name} ingores it and bites and deals ${damage} damage!`;
    }

    // apply damage to player
    player.hp -= damage;
    if (player.hp < 0) player.hp = 0;

    // update the player HP display
    document.getElementById("playerHP").textContent = `❤️: ${player.hp}`;

    // log the action
    const entry = document.createElement("div");
    entry.textContent = message;
    battleLog.appendChild(entry);
 updateHPDisplay()
    playerBlock = false;
}

// ! enemy attack
function enemyAutoAttack() {
    let baseDamage = Math.floor(Math.random() * currentMonster.dmg) + 2;
    let damage = baseDamage - player.defence;

    if (playerBlock) {
        damage = Math.floor(damage / 2);
    }

    if (damage < 0) damage = 1;

    let isCrit = Math.random() < 0.25;

    if (isCrit) {
        damage *= 2;
    }

    player.hp -= damage;
    if (player.hp < 0) player.hp = 0;


    let message = `${currentMonster.name} attacks and deals ${damage} damage!`;
    if (playerBlock) {
        message = `${player.name} blocks and ${currentMonster.name} attacks and deals ${damage} damage!`
    }
    if (isCrit) {
        message += " It's a crit!";
    }
    playerBlock = false;
    const entry = document.createElement("div");
    entry.textContent = message;
    document.getElementById("playerHP").textContent = `❤️: ${player.hp}`;
    battleLog.appendChild(entry);
     updateHPDisplay()
}
// ! enemy turn
function enemyTurn() {
    
    if (currentMonster.name === "Goblin") {
        let attackRoll = Math.random() < .25;
        if (attackRoll) {
            goblinSpecial()
        } else if(!attackRoll){
            enemyAutoAttack()
        }
    } else if (currentMonster.name === "Water Serpent") {
        if (venomCheck) {
            DOTdamagePoison();
        }

        let attackRoll = Math.random() < 0.45;
        if (attackRoll && !venomCheck) {
            waterSerpentSpecial();
        } else {
            enemyAutoAttack();
        }
    }
    console.log('enemyTurn');
    
    if (player.name === "Mage") {
        if (burnCheck) {
            DOTdamageBurn()
        }

    }
     updateHPDisplay()
    gameOverCheck();
}

//! custom alert logic
function showCustomAlert(title, text, onClose = null) {
    const customAlert = document.getElementById("customAlert");
    const customAlertTitle = document.getElementById("customAlertTitle");
    const customAlertText = document.getElementById("customAlertText");


    customAlertTitle.textContent = title;
    customAlertText.textContent = text;

    customAlert.classList.remove("hidden");
}
//! reset button
document.getElementById("resetButton").addEventListener("click", function () {
    resetGame()
})
// ! reset function
function resetGame() {
    const customAlert = document.getElementById("customAlert");
    const start = document.querySelectorAll(".start")
    const battle = document.querySelectorAll(".battle")
    start.forEach(start => {
        start.style.display = "block"
    })
    battle.forEach(battle => {
        battle.style.display = "none"
    })
    venomCheck = false;
    burnCheck = false;
    playerBlock = false;
    gameOver = false
    document.body.style.backgroundColor = "grey";
    document.documentElement.style.backgroundColor = "grey";
    document.querySelector("main").style.backgroundColor = "grey";
    customAlert.classList.add("hidden");
    battleLog.innerHTML = "";
}