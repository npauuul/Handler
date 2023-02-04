const { InteractionType, EmbedBuilder } = require("discord.js");
const client = require("../index");

client.on("interactionCreate", async (interaction) => {
  if (interaction.type == InteractionType.ApplicationCommand) {
    const nopermsyou = new EmbedBuilder()
      .setColor("RANDOM")
      .setDescription(`**ADVERTENCIA**\nNo **tienes** permisos suficientes.`)
    const noperms = new EmbedBuilder()
      .setColor("RANDOM")
      .setDescription(`**¡ERROR!**\nNo **tengo** permisos suficientes.`)
    // code
    const command = client.scommands.get(interaction.commandName);
    if (!command) {
      return; //interaction.reply({ content: `\`${interaction.commandName}\` is not valid command !!`, ephemeral: true, });
    } else {
      if (command.userPermissions && !interaction.member.permissions.has(command.userPermissions)) {
        return interaction.reply({ embeds: [nopermsyou], ephemeral: true });
      } else if (
        command.botPermissions &&
        !interaction.guild.members.me.permissions.has(command.botPermissions)
      ) {
        return interaction.reply({ embeds: [noperms], ephemeral: true });
      } else {
        command.run(client, interaction);
      }
    }
  }
});
