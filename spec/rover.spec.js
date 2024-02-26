const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');
const assert = require("assert");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!

  //test 7 
    it("constructor sets position and default values for mode and generatorWatts", function () {
        let rover = new Rover(2);

        assert(rover.position === 2);
        assert(rover.mode === 'NORMAL');
        assert(rover.generatorWatts === 110);
    });
    
    //test 8: “response returned by receiveMessage contains the name of the message”
    it("response returned by receiveMessage contains the name of the message", function () {
        let rover = new Rover(2);
        let commands = [new Command('MOVE', 5), new Command('STATUS_CHECK')];
        let message = new Message('Message Passed In', commands);

        let receiveMessage = rover.receiveMessage(message);
        assert(receiveMessage.message === 'Message Passed In');
    });

    //test 9
    it("Response returned by receiveMessage includes two results if two commands are sent in the message", function () {
        let rover = new Rover(2);
        let commands = [new Command('MOVE', -5), new Command('STATUS_CHECK')];
        let message = new Message('Message Passed In', commands);

        let receiveMessage = rover.receiveMessage(message);
        assert(receiveMessage.results.length === 2);
    });

    it("responds correctly to the status check command", function() {
        let position = 1300;
        let rover = new Rover(position);
        let commands = [new Command('STATUS_CHECK')];
        let message = new Message('CHECK THE STATUS', commands);

        let receiveMessage = rover.receiveMessage(message);
        assert(receiveMessage.message === 'CHECK THE STATUS');
        assert(receiveMessage.results[0].roverStatus.mode === 'NORMAL');
        assert(receiveMessage.results[0].roverStatus.generatorWatts === 110);
        assert(receiveMessage.results[0].roverStatus.position === position);
    });

    it("responds correctly to the mode change command", function() {
        let position = 0;
        let rover = new Rover(position);
        let commands = [
            new Command('MODE_CHANGE', 'LOW_POWER'),
            new Command('STATUS_CHECK')
        ];
        let message = new Message('CHECK THE STATUS', commands);

        let receiveMessage = rover.receiveMessage(message);
        assert(receiveMessage.results[0].completed === true);
        assert(receiveMessage.results[1].roverStatus.mode === 'LOW_POWER');
    });

    it("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
        let position = 0;
        let rover = new Rover(position);
        let commands = [
            new Command('MODE_CHANGE', 'LOW_POWER'),
            new Command('MOVE', 2)
        ];
        let message = new Message('try to move in low power mode', commands);

        let receiveMessage = rover.receiveMessage(message);
        assert(receiveMessage.results[1].completed === false);
    });

    //test 13
    it("responds with the position for the move command", function () {
        let position = 2;
        let rover = new Rover(position);
        let commands = [
            new Command('MOVE', 10),
            new Command('STATUS_CHECK')
        ];

        let message = new Message('testing movement', commands);
        let receiveMessage = rover.receiveMessage(message);
        assert(receiveMessage.results[1].roverStatus.position === 10);

    });

});
