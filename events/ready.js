const client = require("../index");

client.on("ready", () => {
  console.log(client.user.username + ": " + "En línea y funcionando correctamente.");
});
