const yargs = require('yargs');
const argv = require("process");
const listOfCommands=require("./commands.js");

//imported all the list of commands from command.js file
listOfCommands();

//storing the command typed by user
 const userCommand=yargs.argv._[0];

 //This searches the array of defined commands and determines whether the user's input is valid.
 var definedCommands = ["list-notes", "view-note", "movie-info", "song-info","remove-note","add-note"]
      if (definedCommands.indexOf(userCommand) === -1) {
           //logData("Invalid command.");
           console.log("Please enter a valid command.");
        }

//console.log(userCommand);