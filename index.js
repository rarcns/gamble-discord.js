const { Client, GatewayIntentBits } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require('fs');

const token = "anytoken";
const clientId = "anyclientid";
const commands = [
  {
    name: "cardgame",
    description: "dealer vs user cardgame.rule:if you hand number is bigger than dealerhand,you win the game",
    options: [
        {
            name: "bet",
            description: "bet(number)",
            type: 10, //number
            required: true,
        },
    ],
  },
  {
    name: "slot",
    description: "very cheap slot game,rule is /slotrule",
    options: [
        {
            name: "bet",
            description: "bet(number)",
            type: 10, //number
            required: true,
        },
    ],
  },
  {
    name: "slotrule",
    description: "slot rule",
  },

];

const rest = new REST({ version: "9" }).setToken(token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});
client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isCommand() && !interaction.isButton()) return;

    if (interaction.isCommand()) {
      const { commandName, options } = interaction;
      const bet = options.getNumber("bet");


    if (commandName === "cardgame") {
        const dealerhand = Math.floor(Math.random() * 10) + 1;
        const userhand = Math.floor(Math.random() * 10) + 1;
        let result;
        let result_math;
        const userId = interaction.user.id;
        const userData = require('./value.json');
        const userValue = userData[userId] ? userData[userId].value : null;
        if (!interaction.user || !interaction.user.id) {
          return interaction.reply({ content: 'ユーザー情報が見つかりません。', ephemeral: true });
      }
        if(userValue > bet){
        if (dealerhand > userhand) {
                    result = `ディーラーの手札 ${dealerhand} がユーザーの手札 ${userhand} より大きいです。`;
                    result_math = 0 - bet;
        } else if (userhand > dealerhand) {
                    result = `ユーザーの手札 ${userhand} がディーラーの手札 ${dealerhand} より大きいです。`;
                    
                    result_math = bet * 1.2;
        } else {
                    result = 'ディーラーとユーザーの手札は同じ';
                    result_math = bet;
        }
        const embed = {
          title: "CardGame",
          description: `result: ${result} \nyour coin +- = ${result_math} \ndealerhand is ${dealerhand} \nyour hand is ${userhand}`,
        image:{
          url: "https://th.bing.com/th/id/OIP.5J-NkcmlArdqPAPp6LFANwHaGD?rs=1&pid=ImgDetMain",
        },
      };
        interaction.reply({ embeds: [embed] });
    }
    else {
      const fail = {
        title: "CardGame",
        description: `You can't play the game because the amount you bet is more than the number of coins:(`,
      image:{
        url: "https://th.bing.com/th/id/OIP.5J-NkcmlArdqPAPp6LFANwHaGD?rs=1&pid=ImgDetMain",
      }
    }
      interaction.reply({ embeds: [fail] });
    }
    }else if (commandName === "slotrule") {
        const embed = {
          title: "slot rule",
          description: `:boom:か:woman_bowing:か:woman_facepalming:か:blush:か:writing_hand:が三つそろう：bet×1.01\n:wastebasket:がそろうbet×0.9\n:sparkles:がそろうbet×1.1\n:o:がそろうbet×1.05\nそれ以外ははずれ。ほかの柄がそろってもはずれです`,
          image:{
            url: "https://hiyokoyarou.com/wp-content/uploads/2017/02/memoruhiyoko.png",
          },
          
      };

        interaction.reply({ embeds: [embed] });
      }else if (commandName === "slot") {
        const randomhandnumber = Math.floor(Math.random() * 13) + 1;
        const randomhandnumber2 = Math.floor(Math.random() * 13) + 1;
        const randomhandnumber3 = Math.floor(Math.random() * 13) + 1;
        let one; 
        let two;
        let thr;
        if(randomhandnumber == 1){
            one = ":boom:";
        };
        if(randomhandnumber == 2){
            one = ":innocent:";
        };
        if(randomhandnumber == 3){
            one = ":face_with_monocle:";
        };
        if(randomhandnumber == 4){
            one = ":eight_pointed_black_star:";
        };
        if(randomhandnumber == 5){
            one = ":rofl:";
        };
        if(randomhandnumber == 6){
            one = ":wastebasket:";
        };
        if(randomhandnumber == 7){
            one = ":o:";
        };
        if(randomhandnumber == 8){
            one = ":writing_hand:";
        };
        if(randomhandnumber == 9){
            one = ":blush:";
        };
        if(randomhandnumber == 10){
            one = ":woman_facepalming:";
        };
        if(randomhandnumber == 11){
            one = ":wave_tone1:";
        };
        if(randomhandnumber == 12){
            one = ":woman_bowing:";
        };
        if(randomhandnumber == 13){
            one = ":sparkles:";
        };
        //two
        if(randomhandnumber2 == 1){
            two = ":boom:";
        };
        if(randomhandnumber2 == 2){
            two = ":innocent:";
        };
        if(randomhandnumber2 == 3){
            two = ":face_with_monocle:";
        };
        if(randomhandnumber2 == 4){
            two = ":eight_pointed_black_star:";
        };
        if(randomhandnumber2 == 5){
            two = ":rofl:";
        };
        if(randomhandnumber2 == 6){
            two = ":wastebasket:";
        };
        if(randomhandnumber2 == 7){
            two = ":o:";
        };
        if(randomhandnumber2 == 8){
            two = ":writing_hand:";
        };
        if(randomhandnumber2 == 9){
            two = ":blush:";
        };
        if(randomhandnumber2 == 10){
            two = ":woman_facepalming:";
        };
        if(randomhandnumber2 == 11){
            two = ":wave_tone1:";
        };
        if(randomhandnumber2 == 12){
            two = ":woman_bowing:";
        };
        if(randomhandnumber2 == 13){
            two = ":sparkles:";
        }
        //thr
        if(randomhandnumber3 == 1){
            thr = ":boom:";
        };
        if(randomhandnumber3 == 2){
            thr = ":innocent:";
        };
        if(randomhandnumber3 == 3){
            thr = ":face_with_monocle:";
        };
        if(randomhandnumber3 == 4){
            thr = ":eight_pointed_black_star:";
        };
        if(randomhandnumber3 == 5){
            thr = ":rofl:";
        };
        if(randomhandnumber3 == 6){
            thr = ":wastebasket:";
        };
        if(randomhandnumber3 == 7){
            thr = ":o:";
        };
        if(randomhandnumber3 == 8){
            thr = ":writing_hand:";
        };
        if(randomhandnumber3 == 9){
            thr = ":blush:";
        }
        if(randomhandnumber3 == 10){
            thr = ":woman_facepalming:";
        };
        if(randomhandnumber3 == 11){
            thr = ":wave_tone1:";
        };
        if(randomhandnumber3 == 12){
            thr = ":woman_bowing:";
        };
        if(randomhandnumber3 == 13){
            thr = ":sparkles:";
        };
        let resultslot;
        if(randomhandnumber === 1 && randomhandnumber2 === 1 && randomhandnumber3 === 1) {
            resultslot = bet * 1.01;
        } else if(randomhandnumber === 6 && randomhandnumber2 === 6 && randomhandnumber3 === 6) {
            resultslot = bet * 0.9;
        } else if(randomhandnumber === 13 && randomhandnumber2 === 13 && randomhandnumber3 === 13) {
            resultslot = bet * 1.1;
        } else if(randomhandnumber === 7 && randomhandnumber2 === 7 && randomhandnumber3 === 7) {
            resultslot = bet * 1.05;
        } else if(randomhandnumber === 12 && randomhandnumber2 === 12 && randomhandnumber3 === 12) {
            resultslot = bet * 1.01;
        } else if(randomhandnumber === 10 && randomhandnumber2 === 10 && randomhandnumber3 === 10) {
            resultslot = bet * 1.01;
        } else if(randomhandnumber === 9 && randomhandnumber2 === 9 && randomhandnumber3 === 9) {
            resultslot = bet * 1.01;
        } else if(randomhandnumber === 8 && randomhandnumber2 === 8 && randomhandnumber3 === 8) {
            resultslot = bet * 1.01;
        } else {
            resultslot = 0 - bet;
        }
        const embed = {
            title: "slot result",
            description: "> ## "+`your hand\n> ${one} ${two} ${thr}\n> ## result = ${resultslot}\n> ## thx play!`,
          image:{
            url: "https://th.bing.com/th/id/OIP.5J-NkcmlArdqPAPp6LFANwHaGD?rs=1&pid=ImgDetMain",
          },
        };
        interaction.reply({ embeds: [embed]});
      }

      // Add more command conditions if needed
    }
  } catch (error) {
    console.error("Interaction processing error", error);
  }
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token);
