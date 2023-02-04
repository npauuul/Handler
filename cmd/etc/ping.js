const { CommandInteraction, ApplicationCommandType, PermissionFlagsBits, Client, EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, } = require("discord.js");
let color = '0x2F3136';
module.exports = {
  name: "ping",
  description: 'Visualiza el avatar de un usuario o el tuyo.',
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.EmbedLinks,
  category: "etc",
  type: ApplicationCommandType.ChatInput,
  required: true,
  run: async (client, interaction) => {
    interaction.reply({ content: 'Pong!'});
  },
};
