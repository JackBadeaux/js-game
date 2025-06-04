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
    defence: 5,
}
const rogue = {
    name: "rogue",
    hp: 70,
    dmg: 20,
    defence: 0,
}
debugger
const heroButton = document.querySelectorAll(".hero-choice")

heroButton.forEach(button => {
    button.addEventListener("click", () => {
        console.log("clicked button", button.id);
        
    });
});