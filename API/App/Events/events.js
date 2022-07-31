const event = require("events");
const myEvent = new event.EventEmitter();

//listener. Yo sunera basirakhnu parxa first mai.
myEvent.on("registerEvent", (data) => {
  console.log("Our data on registration:data received ");
});

module.exports = myEvent;
