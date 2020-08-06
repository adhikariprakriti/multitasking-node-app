const yargs = require('yargs');
const actions=require("./actions.js")

//object destructuring
const{songInfo,movieInfo,addNotes,removeNote,listNotes,readNote}=actions

//creating commands to perform different tasks
const listOfCommands=()=>{
    //command to read note
    yargs.command({
        command: "add-note",
        describe: "add a new note",
        builder:{
            title:{
                describe:"Note title",
                demandOption: true,
                type:"string"
   
            },
            body:{
                describe:"Note body",
                demandOption: true,
                type:"string"
            }
        },
        handler: (argv) => {
             addNotes( argv.title,argv.body);
        }
    })

    //command to remove note
    yargs.command({
        command: "remove-note",
        describe: "add a new note",
        builder:{
            title:{
                describe:"Note title",
                demandOption: true,
                type:"string"
    
            },
         },
        handler: (argv) => {
            removeNote( argv.title);
    
        }
    
    })


    //command to list notes
    yargs.command({
        command: "list-notes",
        describe: "list out all the notes",
        handler: () => {
              listNotes();
        }
    
    })


    //command to view particular note
    yargs.command({
        command: "view-note",
        describe: "view the selected note",
        builder:{
            title:{
                describe:"Note title",
                demandOption: true,
                type:"string"
    
            }
         }, 
        handler: (argv) => {
            readNote(argv.title);
        }
    
    })


    //command to get movie-info
    yargs.command({
        command: "movie-info",
        describe: "get movie information",
        builder:{
            title:{
                describe:"Song title",
                demandOption: true,
                type:"string"
    
            },
         },
         handler: (argv) => {
              movieInfo(argv.title);
        }
    })


    //command to get song-info
    yargs.command({
        command: "song-info",
        describe: "get song information",
        builder:{
            title:{
                describe:"Song title",
                demandOption: true,
                type:"string"
    
            },
         },
        handler: (argv) => {
            songInfo(argv.title);
        }
    })


    
}
module.exports=listOfCommands
