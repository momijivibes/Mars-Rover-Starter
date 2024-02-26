class Rover {
    // Write code here!
    constructor(position) {
        this.position = position;
        this.mode = 'NORMAL';
        this.generatorWatts = 110;
    }

    receiveMessage(message) {
        let results = [message.commands.length];

        for (let i = 0; i < message.commands.length; i++) {
            let command = message.commands[i];

            if (command.commandType === 'STATUS_CHECK') {
                results[i] = {
                    completed: true,
                    roverStatus: {
                        mode: this.mode,
                        generatorWatts: this.generatorWatts,
                        position: this.position
                    }
                }
            } else if (command.commandType === 'MODE_CHANGE') {
                this.mode = command.value;
                results[i] = {
                    completed: true
                }
            } else if (command.commandType === 'MOVE') {
                if (this.mode === 'LOW_POWER') {
                    results[i] = {
                        completed: false
                    }
                } else {
                    results[i] = {
                        completed: true
                    }
                    this.position = command.value;
                }
            } else {
                results[i] = {
                    completed: true
                }
            }
        }

        return {
            message: message.name,
            results: results
        }
    }
}

module.exports = Rover;