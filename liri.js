require("dotenv").config();
const axios = require("axios");

const keys = require("./keys.js")

//calls spotify json package to use their API
const Spotify = require("node-spotify-api")
// stores spotify keys/secret
const spotify = new Spotify(keys.spotify);
// stores Bands in Town api key
// const BITAPI = new BITAPI(keys.bandsInTown);

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

const bandsInTownRequest = (artistName) => {
  let queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

  axios.get(queryUrl).then(
    function (response) {
      console.log(`Venue Name: ${response.data[1].venue.name}`);
      console.log(`Venue Location: ${response.data[1].venue.city}, ${response.data[1].venue.region} ${response.data[1].venue.country}`)
      console.log(`Date of the Event: ${response.data[1].datetime}`) 
      // console.log(VenueData.required);
      // console.log(EventData.required.datetime)
      console.log("you are searching for a band")
    }
  )
};
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
