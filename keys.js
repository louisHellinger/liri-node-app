//console.log('keys is loaded');

var twitter = require('twitter');

var client = new twitter ({
  consumer_key: 'e1uKZ4Z2njLbAXHrNbxObhEgZ',
  consumer_secret: 'OT6wUSv5AFZMt13iBBs8SzqqfYvjQwFowXCz9RdV5Ivm6qPv6P',
  access_token_key: '819534179574644736-6N1S6HOKRaL3oRjqCAL419zKk2FEe2K',
  access_token_secret: 'NwTZKuIagpu5T4h58laXUlbGT8sCyjM3W2v1Shqg8YbaR',

});

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: '1a4f95d2c958451db266ee7568315ae3',
  secret: '93fb143e040c44c3bb8ddedfeeabc068'
});



module.exports = {
	client: client,
	spotify: spotify
}





