class Message {
    constructor(name, commands) {
        if (!name) {
            throw Error("name was not passed");
        }

        this.commands = commands;
        this.name = name;
    }
   // Write code here!
}

module.exports = Message;