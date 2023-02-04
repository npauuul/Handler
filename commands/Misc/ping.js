const { PermissionFlagsBits} = require("discord.js");
module.exports = {
  name: "test",
  description: "",
  userPermissions: PermissionFlagsBits.Administrator,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Misc",
  cooldown: 5,
  run: async (client, message, args) => {
      message.channel.send({ content: 'Pong!'})
  },
};
