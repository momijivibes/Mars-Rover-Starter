
class Command {
   constructor(commandType, value) {
     this.commandType = commandType;
     if (!this.validateCommandType(commandType)) {
       throw Error("Valid command type required.");
     }
     this.value = value;
   }


   validateCommandType(commandType) {
       if (!commandType) {
           return false;
       } else if (!(commandType === 'MOVE' || commandType === 'STATUS_CHECK' || commandType === 'MODE_CHANGE')) {
           return false;
       } else {
           return true;
       }
   }
 }
 
 module.exports = Command;