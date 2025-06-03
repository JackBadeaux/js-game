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
const player = {} 
const heroButton = document.querySelectorAll(".hero-choice")

heroButton.forEach(button => {
    button.addEventListener("click", () => {
 if(button.id === "mage"){
    Object.assign(player,mage)
 } else if (button.id === "warrior"){
    Object.assign(player, warrior)
 } else if (button.id === "rogue"){
    Object.assign(player,rogue)
 };
console.log(player);

 
    });
});