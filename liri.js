// require("dotenv").config();???
const axios = require("axios");

// Store all of the arguments in an array
const nodeArgs = process.argv;

// Create an empty variable for holding the movie name
let movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (let i   in nodeArgs) {

  if (i > 1  ) {
    movieName = movieName + "+" + nodeArgs[i];
  }
  else if(i===1){
    movieName += nodeArgs[i];

  }
}
// console.log(movieName);
// Then run a request with axios to the OMDB API with the movie specified
let queryUrl = `http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=trilogy`;

// This line is just to help us debug against the actual URL.
// console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.Ratings[0].Value);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  }
);