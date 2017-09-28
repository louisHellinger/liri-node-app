//spotify client ID 1a4f95d2c958451db266ee7568315ae3
// spotify secret 93fb143e040c44c3bb8ddedfeeabc068

// OMDB API Key 40e9cece

var fs = require("fs");
var keys = require("./keys.js");
var action = process.argv[2];

var request = require("request");

var title = createTitle();

function createTitle() {

    var x = process.argv[3];

    if (process.argv.length > 3) {

        for (i = 4; i < process.argv.length; i++) {

            //console.log(process.argv[i]);
            x = x + "+" + process.argv[i];
        }

        return x;
        title = x;

    } else if (process.argv.length === 3) {
        title = "";
    } else {
        title = process.argv[3];
        // console.log("the Else title is " + title);
        return title;
    }

	 //console.log("the title is getting hit");
}

function runSwitch() {

    switch (action) {
        case "my-tweets":
            myTweets();
            break;

        case "spotify-this-song":
            spotifyThisSong();
            break;

        case "movie-this":
            movieThis();
            break;

        case "do-what-it-says":
            doWhat();
            break;

    }

}


function myTweets() {
    //load last 20 tweets and when they were created
    //console.log("twitter is working");

    var params = {
        screen_name: 'botus'
    };

    keys.client.get('statuses/user_timeline', params, function(error, tweets, response) {

        if (error) {
            console.log("you got a error in here");

        }

        if (!error) {
            for (var i = 0; i < 20; i++) {

                console.log("");

                console.log(params.screen_name + " " + (i + 1));
                console.log(tweets[i].text);
                console.log("");
                console.log("======================================================================");

        var logTweets =  "\n\r============================================" + "\n\r" + params.screen_name + "\n" + (i + 1) + (tweets[i].text);
 
        fs.appendFile("log.txt", logTweets, function(err) {

			  // If an error was experienced we say it.
			  if (err) {
			    console.log(err);
			  }

			});

            }
        }

    });
}


function spotifyThisSong() {
    //if no song entered play The Sign by Ace of base
    //console.log("Spotify is loaded");
    //var songTitle = process.argv[3];

    if (title === undefined) {

        return keys.spotify
            .request('https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc')
            .then(function(data) {
                //console.log(JSON.stringify(data, null, 2)); 

                console.log("\n======================================================\n");


                console.log("Artist: " + data.album.artists[0].name);
                console.log("Song: " + data.name);

                console.log("Preview URL: " + data.preview_url);

                console.log("Album: " + data.album.name);


                var logSpotify = "\n\r==============================================\n\r" + "\nArtist: " + data.album.artists[0].name + "\nSong: " + data.name + "\nPreview URL: " + data.preview_url + "\nAlbum: " + data.album.name;
 
        		fs.appendFile("log.txt", logSpotify, function(err) {

			  // If an error was experienced we say it.
			  if (err) {
			    console.log(err);
			  }

			});

            })

        //console.log("no song entered");


    }

    //console.log("Song Title = " + title);
    else {

        keys.spotify.search({
            type: "track",
            query: title,
            limit: 1
        }, function(err, data) {

            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            //console.log(JSON.stringify(data, null, 2));

            console.log("\n==========================================\n");

            //console.log("length of the array = " + data.tracks.items.length);

            console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);

            console.log("Preview URL: " + data.tracks.items[0].preview_url);

            console.log("Album: " + data.tracks.items[0].album.name);

            //this adds the data to the log file

            var logSpotify = "\n\r==============================================\n\r" + "\nArtist: " + data.tracks.items[0].album.artists[0].name + "\nSong: " + data.tracks.items[0].name + "\nPreview URL: " + data.tracks.items[0].preview_url + "\nAlbum: " + data.tracks.items[0].album.name;
 
        		fs.appendFile("log.txt", logSpotify, function(err) {

			  // If an error was experienced we say it.
			  if (err) {
			    console.log(err);
			  }

			}); //end add to log file




        });

    }

};


function movieThis() {
    //title, year, IMBD rating, Rotten tomatoes Rating, country, language, plot and actors

    //console.log("movie this is loaded");

    if (title === undefined) {

        console.log("\n\rIf you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/");

        console.log("\n\rIt's on Netflix!\n\r");

             //this adds the data to the log file

            var logMovie = "\n\r==================================================================================" + "\n\rIf you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/" + " \n\rIt's on Netflix!";
 
        		fs.appendFile("log.txt", logMovie, function(err) {

			  // If an error was experienced we say it.
			  if (err) {
			    console.log(err);
			  }

			}); //end add to log file


    } else {

        request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

            if (error) {
                console.log('Error occurred: ' + err);
                return;
            }

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {
                //gets the entire JSON for the request, like in our API examples

                //console.log(JSON.parse(body));
                console.log("\n=======================================================================================\n");
                console.log("Title: " + JSON.parse(body).Title) + "\n";
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating) + "\n";

                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value) + "\n";
                console.log("Country: " + JSON.parse(body).Country) + "\n";
                console.log("Plot: " + JSON.parse(body).Plot) + "\n";
                console.log("Actors: " + JSON.parse(body).Actors) + "\n";
                console.log("\n=======================================================================================\n");

             //this adds the data to the log file

            var logMovie = "\n=======================================================================================\n" + "Title: " + JSON.parse(body).Title + "\n" + "IMDB Rating: " + JSON.parse(body).imdbRating + "\n" + "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\n" + "Country: " + JSON.parse(body).Country + "\n" + "Plot: " + JSON.parse(body).Plot + "\n" + "Actors: " + JSON.parse(body).Actors + "\n";
 
        		fs.appendFile("log.txt", logMovie, function(err) {

			  // If an error was experienced we say it.
			  if (err) {
			    console.log(err);
			  }

			}); //end add to log file        
            }
        });

    }
};


function doWhat() {

    fs.readFile("random.txt", "utf8", function(error, txtdata) {

        //console.log("this is the random.txt data = " + txtdata);

        var dataArr = txtdata.split(",");

        action = dataArr[0];
        title = dataArr[1];

        runSwitch();

    });


};

runSwitch();