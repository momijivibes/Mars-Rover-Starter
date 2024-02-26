const Command = require('../command.js');
const assert = require("assert");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Valid command type required.'));
  });

  it("constructor sets command type", function () {
    let command = new Command('MOVE');
    assert(command.commandType === 'MOVE');
  });

  it("constructor sets a value passed in as the 2nd argument", function() {
    let command = new Command('STATUS_CHECK', 'VALUE');
    assert(command.commandType === 'STATUS_CHECK');
    assert(command.value === 'VALUE');
  })
});

