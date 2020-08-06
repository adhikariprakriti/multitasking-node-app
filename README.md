# multitasking-node-app

## About This Application

This application performs various tasks on the basis of user commands entered into the terminal utilizing Node.js.Basically it adds,list out and delete the notes entered by user and provide the movie and song info on the basis of title entered by user.

The commands and output are logged to a text file named notes.json.

## How To Use It

Users type in their commands by first typing node, the name of the Javascript file (in this case, app.js), and then one of the following commands:

1.movie-info --title=<MOVIE_NAME> =  This command will access the OMBD API to return       information about a specific movie.
for example: node app.js movie-info --title="light between oceans"
This will return the information about the movie light between oceans.

2.song-info --title=<SONG_NAME>= This command will access the Spotify API to return information about a song. 
for example: node app.js song-info --title="all of me"
This will return the information about the song all of me.Using the preview link in the result we can preview the song in browser.

3.add-note --title=<NOTE_TITLE> --body=<NOTE_BODY> =This command helps to add the note
for example: node app.js add-note --title="a" --body="abcd"

4.remove-note --title=<NOTE_TITLE>  =This command helps to remove the note on the basis of title
for example: node app.js remove-note --title="a"

5.list-notes  =This command helps to list out all the available notes.
for example: node app.js list-notes 

6.view-note --title=<NOTE_TITLE>  =This command helps to view the specific note on the basis of title.
for example: node app.js view-note --title="a"


