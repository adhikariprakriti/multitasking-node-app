const fs=require("fs");
require("dotenv").config();
const chalk = require('chalk');
const Spotify = require('node-spotify-api');
const axios=require("axios");
const key=process.env.Movie_API

//action to be performed by song-info command
const songInfo=(title)=>{
   console.log(title);
   const spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });

   spotify.search({ type: 'track', query: title }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }else if (data.tracks.items.length === 0) {
        console.log("Sorry, no songs matched the search terms you provided.");
    }        else {
        var sLineBreak = "---------SONG INFO---------";
        console.log(sLineBreak);
        var artist = "Artist(s): " + data.tracks.items[0].artists[0].name;
        console.log(artist);
        var songName = "Song Name: " + data.tracks.items[0].name;
        console.log(songName);
        if (data.tracks.items[0].preview_url === null) {
            var previewMessage = "Preview Link: No preview is available for this song";
            console.log(previewMessage);
        }
        else {
            var previewLink = "Preview Link: " + data.tracks.items[0].preview_url;
            console.log(previewLink);
        }
        var albumInfo = "Album: " + data.tracks.items[0].album.name;
        console.log(albumInfo);
    }
  });
}

//action to be performed by movie-info command
const movieInfo=(title)=>{
    console.log("Movie Title : " + title);
    axios.get("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey="+key)
    .then(response=>response)
    .then(response=>{
        if (response.status !== 200) {
            console.log("Sorry, your movie was not found. Please check that the title is spelled correctly and try again.");
        }
        // If the request is successful (i.e. if the response status code is 200)
        else if ( response.status === 200) {
                 return response.data 
        }
    })
    .then(data=>{
        var mLineBreak = "---------MOVIE INFO---------";
               console.log(mLineBreak);
                var mTitle = "Title: " + data.Title;
                console.log(mTitle);
                var mYear = "Year Released: " + data.Year;
                console.log(mYear);
                var iRating = "IMDB Rating: " + data.Ratings[0].Value;
                console.log(iRating);
               // var rRating = "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value;
               // console.log(rRating);
                var mCountry = "Country: " + data.Country;
                console.log(mCountry);
                var mLanguage = "Language: " + data.Language;
                console.log(mLanguage);
                var mPlot = "Plot: " + data.Plot;
                console.log(mPlot);
                var mActors = "Actors: " + data.Actors;
                console.log(mActors);
               
    })
    .catch(err=>console.log(err.message));
}

//read the available note from the file named notes.json and if the file is empty then returns an empty array
const loadNotes=() => {
    try{
    const dataBuffer=fs.readFileSync("notes.json")
    const dataJSON=dataBuffer.toString()
    return JSON.parse(dataJSON);
}catch(e){
    return [];
}   
}

//saves notes along with title and body to the file in json format
const saveNotes=(notes) => {
    const dataJSON=JSON.stringify(notes)
      fs.writeFileSync("notes.json",dataJSON)
}


//add notes
const addNotes=(title,body) => {
    const notes=loadNotes();
   // const duplicateNotes=notes.filter((note) =>  note.title===title)
    const duplicateNote=notes.find((note) =>  note.title===title)

    //run if the note has not been added previously
    if(!duplicateNote){
    notes.push({
        title:title,
        body:body
    })
    console.log("**********************Note Added***********************")
    console.log("Title :" + title);
    console.log("Body :" + body);
   
    saveNotes(notes);

} 
//run if the note we are trying to add is already present in the list of notes
    else{
        console.log("********please add new note.This has already been added***********");
    }

    
}


//action performed by remove-note command
const removeNote=(title)=>{
    const notes=loadNotes();
    const notesToKeep=notes.filter((note) => note.title!==title)
    if(notes.length>notesToKeep.length){
        console.log("*********Note removed**************")
    }else{
        console.log("**********No Note found************")
    }
   saveNotes(notesToKeep);
}


//display the available notes in command line
const listNotes=()=>{
    const notes=loadNotes();
    console.log("****************list of your Notes******************")
    notes.forEach((note,id) => {
        console.log((id=1) +": "+ note.title)
    });

}


//read the desired note
const readNote=(title)=>{
    const notes=loadNotes();
   const note =notes.find((note)=> note.title===title)
   if(note){
       console.log(chalk.inverse("Title : " + note.title))
       console.log("Body : " + note.body)

   }else{
       console.log("*******************Note not found*****************");
   }

}



module.exports={
    songInfo:songInfo,
    movieInfo:movieInfo,
    addNotes:addNotes,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote

    
}