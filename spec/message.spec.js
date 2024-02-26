const Message = require("../message");
const Command = require("../command");
const assert = require("assert");

describe("Message class", function() {
    it("throws error if a name is NOT passed into the constructor as the first parameter", function () {
       expect (function () {
           new Message();
       }).toThrow(new Error("name was not passed"));
    });

    it("constructor sets name", function () {
        let message = new Message('Name');
        assert(message.name === 'Name');
    });

    it("contains a commands array passed into the constructor as the 2nd argument", function () {
        const commands = [new Command('MOVE', 8)];
        let message = new Message('Move over rover', commands);
        assert(message.commands.length === 1);
    })
});




