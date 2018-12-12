require("dotenv").config();
const axios = require("axios");

const keys = require("./keys.js")

// stores spotify keys/secret
const Spotify = require("node-spotify-api")

const spotify = new Spotify(keys.spotify);

// const moment = require("moment");

// Store all of the arguments in an array
const nodeArgs = process.argv;

// Create an empty variable for holding the movie name
let userRequest = nodeArgs.splice(3).join("+");
let methodToRun = process.argv[2];



const omdbRequest = (movieName) => {
  // Then run a request with axios to the OMDB API with the movie specified
  let queryUrl = `http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=trilogy`;
  // This line is just to help us debug against the actual URL.
  // console.log(queryUrl);

  axios.get(queryUrl).then(
    function (response) {
      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.Ratings[0].Value);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    }

  )
};

const bandsInTownRequest = (bandName) => {
  console.log("you are looking up a band");
}
const spotifyRequest = (songName) => {
  spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    else {
      console.log("Song Title: " + data.tracks.items[0].name);
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Album: " + data.tracks.items[0].album.name);
      if (data.tracks.items[0].preview_url === null) {
        ("Spotify Preview: Unavailable ")
      }
      else {
        console.log("Spotify Preview: " + data.tracks.items[0].preview_url);
      }
    }
  });
  // console.log("you are looking up a song");
}
const doWhatItSaysRequest = (requestName) => {
  console.log("you are looking what it says to do");
}
switch (methodToRun) {
  case "movie-this":
    omdbRequest(userRequest);
    break;
  case "concert-this":
    bandsInTownRequest(userRequest);
    break;
  case "spotify-this-song":
    spotifyRequest(userRequest);
    break;
  case "do-what-it-says":
    doWhatItSaysRequest(userRequest)
    break;
  default:
    console.log("not supported")
}
// const 