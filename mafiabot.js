const Discord = require("discord.js");
const client = new Discord.Client();
const token = "XXXXXXX" //replace X's with bot token
let gameOpen = false
let players = []
let roles = []
let innocent = false
let traitor = false

client.on('ready', () => {
  console.log('connected');
});

client.on('error', console.error);

client.on('message', (msg) => {
    if(msg.content.toLowerCase() === "/opengame" && msg.member.roles.find("name", "moderator") && gameOpen === false) { //replace moderator with the name of a role you want to have the ability to open and close games
        gameOpen = true
        players = []
        msg.channel.send("A game has been opened. Do the command /join to join.")
    }
    else if(msg.content.toLowerCase() === "/join" && gameOpen === true) {
        players.push(msg.author)
        msg.channel.send(msg.author.tag + " has joined the game.")
    }
    else if(msg.content.toLowerCase() === "/closegame" && msg.member.roles.find("name", "moderator") && gameOpen === true) { //replace moderator here too
        gameOpen = false
        while (innocent === false || traitor === false) {
            roles = []
            for (i = 0; i < players.length; i++) {
                let randomise = Math.floor(Math.random() * 2)
                if (randomise === 0) {
                    roles.push("Innocent")
                    innocent = true
                } else {
                    roles.push("Traitor")
                    traitor = true
                }
            } 
        }
        for (i = 0; i < players.length; i++) {
            players[i].send("Your role is: " + roles[i])
        }
        msg.channel.send("The game is closed to new participants. All players have been assigned roles.")
    }
});

client.login(token);