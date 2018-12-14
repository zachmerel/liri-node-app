require("dotenv").config();
// Core node package for reading and writing files
const fs = require("fs");
//node package to use APIs
const axios = require("axios");
//intializes the use of whats in the keys.js file
const keys = require("./keys.js")

//calls spotify json package to use their API
const Spotify = require("node-spotify-api")
// stores spotify keys/secret
const spotify = new Spotify(keys.spotify);
// stores Bands in Town api key
// const BITAPI = new BITAPI(keys.bandsInTown);

const moment = require("moment");

// Store all of the arguments in an array
const nodeArgs = process.argv;

// Create an empty variable for holding the movie name
let userRequest = nodeArgs.splice(3).join("+");
let methodToRun = process.argv[2];
//Switch statement hold logic and calls functions based on user input
const switchStatement = () => {
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
}
//omdb function
const omdbRequest = (movieName) => {

  let queryUrl = `http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=trilogy`;

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
//bands in town function
const bandsInTownRequest = (artistName) => {
  let queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

  axios.get(queryUrl).then(
    function (response) {
      console.log(`Venue Name: ${response.data[1].venue.name}`);
      console.log(`Venue Location: ${response.data[1].venue.city}, ${response.data[1].venue.region} ${response.data[1].venue.country}`)
      var date = new Date(response.data[1].datetime);
      formatedDate = moment(date).format("MM-DD-YYYY");
      console.log(`Date of the Event: ${formatedDate}`)
    }
  )
};
//spotify function
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
        console.log("Spotify Preview: Unavailable ")
      }
      else {
        console.log("Spotify Preview: " + data.tracks.items[0].preview_url);
      }
    }
  });
}
//do what it says function, reads from the random.txt file
const doWhatItSaysRequest = (requestName) => {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    let dataArr = data.split(",");
    methodToRun = dataArr[0];
    userRequest = dataArr[1];
    switchStatement();
  });
}
//if statement to default if no user request entered for movie-this
if (methodToRun === "movie-this" && userRequest === "") {
  userRequest = "Mr.Nobody";
  omdbRequest(userRequest);
}
if (methodToRun === "spotify-this-song" && userRequest === "") {
  userRequest = "Ace of Base";
  spotifyRequest(userRequest);
} 








