const { Collection, EmbedBuilder } = require("discord.js");
const { prefix } = require('../settings/config.json')
const client = require("../index");

client.on("messageCreate", async (message) => {
  const nopermsyou = new EmbedBuilder()
  .setColor("RANDOM")
  .setDescription(`**ADVERTENCIA**\nNo **tienes** permisos suficientes.`)
  const noperms = new EmbedBuilder()
  .setColor("RANDOM")
  .setDescription(`**¡ERROR!**\nNo **tengo** permisos suficientes.`)
  let g = new dba.crearDB({ nombre: message.guild.id, carpeta: 'guilds' })
  if (message.author.bot || !message.guild) return;
  if(!message.content.startsWith(prefix)) return;
  let args = message.content.slice(prefix.length).trim().split(/ +/);
  let cmd = args.shift()?.toLowerCase();
  const command = client.mcommands.get(cmd);
  if (!command) return;
  if (command) {
    if (command.userPermissions && !message.member.permissions.has(command.userPermissions)) {
      return message.reply({ embeds: [nopermsyou]});
    } else
      if (command.botPermissions && !message.guild.members.me.permissions.has(command.botPermissions)) {
        return message.reply({ embeds: [noperms]});
      } else
        if (cooldown(message, command)) {
          return message.reply({ content: `Aún cuentas con cooldown, \`${cooldown(message, command).toFixed()}\` segundos`, });
        } else {
          command.run(client, message, args, prefix);
        }
  }
});

function cooldown(message, cmd) {
  if (!message || !cmd) return;
  let { client, member } = message;
  if (!client.cooldowns.has(cmd.name)) {
    client.cooldowns.set(cmd.name, new Collection());
  }
  const now = Date.now();
  const timestamps = client.cooldowns.get(cmd.name);
  const cooldownAmount = cmd.cooldown * 1000;
  if (timestamps.has(member.id)) {
    const expirationTime = timestamps.get(member.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000; //get the lefttime
      //return true
      return timeLeft;
    } else {
      timestamps.set(member.id, now);
      setTimeout(() => timestamps.delete(member.id), cooldownAmount);
      return false;
    }
  } else {
    timestamps.set(member.id, now);
    setTimeout(() => timestamps.delete(member.id), cooldownAmount);
    return false;
  }
}
