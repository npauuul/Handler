const { Client } = require("discord.js");
const { readdirSync } = require("fs");

/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
  try {
    readdirSync("./commands/").forEach((dir) => {
      const commands = readdirSync(`./commands/${dir}`).filter((f) =>
        f.endsWith(".js")
      );

      for (const cmd of commands) {
        const command = require(`../commands/${dir}/${cmd}`);
        if (command.name) {
          client.mcommands.set(command.name, command);
        } else {
          console.log(`${cmd} is not ready`);
        }
      }
    });
    console.log(`> ${client.mcommands.size} Message Commands Loaded !!`);
  } catch (error) {
    console.log(error);
  }
};
