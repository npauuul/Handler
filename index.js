const { Client, Partials, Collection, GatewayIntentBits } = require("discord.js");
const { token } = require("./settings/config.json");
const client = new Client({
  intents: 3276799,
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
  ],
  failIfNotExists: false,
  allowedMentions: {
    parse: ["everyone", "roles", "users"],
    users: [],
    roles: [],
    repliedUser: false,
  },
});

// global variables
client.scommands = new Collection();
client.mcommands = new Collection();
client.cooldowns = new Collection();
client.events = 0;

module.exports = client;

// handlers
["event_handler", "slash_handler", "cmd_handler"].forEach((file) => {
  require(`./handlers/${file}`)(client);
});

// login bot
client.login(token);
