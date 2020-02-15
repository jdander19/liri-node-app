require("dotenv").config();

var command = process.argv[2];
var artist = process.argv.slice(3).join("+");
var song = process.argv.slice(3).join("+");
var title = process.argv.slice(3).join("+");

var keys = require("./key.js");

var Spotify = require("node-spotify-api")

var spotify = new Spotify(keys.spotify);

var fs = require("fs");

var bandsUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

const axios = require('axios');

var ombdUrl = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";

var moment = require("moment")





switch (command) {
    case "concert-this":
        concertThis(artist);
        break;
    case "spotify-this-song":
        spotifySong(song);
        break;
    case "movie-this":
        movieThis(title);
        break;
    case "do-what-it-says":
        doThis;
        break;
};

function concertThis(artist) {
    if (!artist) {
        artist = "Celine Dion";
    }
    axios.get(bandsUrl)
        .then(function (response) {
            for (var x = 0; x < response.data.length; x++) {

                var concertResults = {
                "Venue Name": response.data[x].venue.name,
                "Venue Location": response.data[x].venue.city,
                "Date": moment(response.data[x].datetime).format("MM/DD/YYYY"),
                }
                console.log(concertResults);
            }
        })
}

function spotifySong(song) {
    if (!song) {
        song = "The Sign";
    }
    spotify
        .search({ type: 'track', query: song })
        .then(function (response) {
            for (var x = 0; x < 5; x++) {
                var spotifyResults =
                    "Artist(s): " + response.tracks.items[x].artists[0].name;
                "Song Name: " + response.tracks.items[x].name;
                "Album Name: " + response.tracks.items[x].album.name;
                "Preview Link: " + response.tracks.items[x].preview_url;

                console.log(spotifyResults);
            }
        });
}
function movieThis(title) {
    if (!title) {
        title = "mr nobody";
    }
    axios.get(ombdUrl)
        .then(function (response) {
            var movieResults = {
                "Movie Title": response.data.Title,
                "Year of Release": response.data.Year,
                "IMDB Rating": response.data.imdbRating,
                "Rotten Tomatoes Rating": response.data.Ratings[1],
                "Country Produced": response.data.Country,
                "Language": response.data.Language,
                "Plot": response.data.Plot,
                "Actors": response.data.Actors,
            }
            console.log(movieResults);

        })
};
function doThis() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(',');
        spotifySong(dataArr[0], dataArr[1]);
    })
};