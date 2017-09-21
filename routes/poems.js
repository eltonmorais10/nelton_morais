var express = require('express');
var router = express.Router();
// var FB = require('fb');
var client_token="EAACYwZAPgvqkBAPgQoli10lrBvU7PKPxIhvyOpzo6bQgU9ZCCQ0T42hu42ILjZAPkfVnp0rckHjMBnM2RheFAiJhuwEzvZAKdJZAGAg5t1vPvOFiWWYuTZCmZAdVNYu0ZA5OqLICOWn2yq0zgsbwWdsZApA4bN45FLTUd54xTPe1JCYjzaF0C6UgMduGVVZBoZCtu0ZD";
var token_access_to_feed="EAACYwZAPgvqkBAEAeTvveLyTSc1J4kuILTVQw54aBFZCAkSx5rxBrZBIbvpolkcrNcxGgi59SEICZB1Vm3D37IEApiX6ncTJXDRmxH6YZCtgHq2edXZA2N28K458FtqMRiTgVoAuMFMoZCBeZCQaO444L5I2vHFDVyDnBGK1KvQIxT4LMKh5ogUtgut0Xa3BxS7h0WuOrHs9lAZDZD";
var client_id="167957177089705";
var client_secret="5ff2ebe2dd6bd1eaac6fc195e826db9e";
var request = require('request');
var OAuth2 = require('oauth').OAuth2;
var oauth2 = new OAuth2(
	client_id,client_secret,
    "", 
    "https://www.facebook.com/dialog/oauth",
    "https://graph.facebook.com/oauth/access_token",
    null
);

router.get('/', function(req, res, next) {
	var poems = [];
	oauth2.get("https://graph.facebook.com/me/feed?fields=attachments", token_access_to_feed, function(err, data ,response) {
	  	if (err) {
	   		console.error(err);
	   		res.send(err);
	  	} else {
	   		var posts = JSON.parse(data);
	   		posts["data"].forEach(function(element) {
	   			if (typeof element.attachments !== "undefined") {
		   			var data = element.attachments["data"][0],
		   				text = data.description,
		   				image = data.media.image.src,
		   				id = data.target.id,
		   				type = data.type,
		   				title = data.title;

		   			if (type == "note") {
		   				poems.push({
		   					id: id,
		   					title: title,
		   					text: text.replace(/\n/g, "<br />"),
		   					image: image,
		   					type: type,
		   				});
		   			}
	   			}
			})

   			res.json(poems);
		}
	});


	// FB.setAccessToken(client_token);
	// FB.api("poemasdeneltonmorais", function (res) {
	// 	if(!res || res.error) {
	//    		console.warn(!res ? 'error occurred' : res.error);
	//    		return;
	//   	}
	//   	console.warn(res);
	// });

	// And insert something like this instead:
	// res.json([{
	//   	title: "APASASK AKSAK S",
	//   	text: "samsepi0l"
	// }, {
	//   	title: "EEEE E E ",
	//   	text: "samsepi0l"
	// }]);
});

module.exports = router;