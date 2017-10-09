const express = require('express');
const router = express.Router();
const client_id = "167957177089705";
const client_secret = "5ff2ebe2dd6bd1eaac6fc195e826db9e";
const request = require('request');
const OAuth2 = require('oauth').OAuth2;
const mysql = require('mysql');
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tchunass",
  database : "nelton_morais"
});
const dateTime = require('node-datetime');

function poemIsSaved(fbId, callback) {
	con.query("SELECT id FROM poems WHERE fb_id = ? ;", [fbId], function (err, result) {
		var response = false;
	    if (!err) {
			if (result.length > 0) {
				response = true;
			}
	    } else {
			console.warn("err!", err);
	    }
		
		callback(response);
	});
}

router.get('/sync', function(req, res, next) {
	clientToken = req.query.clientToken;
	const oauth2 = new OAuth2(
		client_id,
        client_secret,
		"", 
		"https://www.facebook.com/dialog/oauth",
       	"https://graph.facebook.com/oauth/access_token",
       	null
    );

	oauth2.get("https://graph.facebook.com/poemasdeneltonmorais/feed?fields=attachments,created_time", clientToken, function(err, data ,response) {
	  	if (err) {
	   		console.error(err);
	   		res.send(err);
	  	} else {
	   		const posts = JSON.parse(data);
	   		const poems = [];

			const requests = posts["data"].map((element) => {
			    return new Promise((resolve) => {
			      if (typeof element.attachments !== "undefined") {
			   			poemIsSaved(element.id, function(result) {
			   				if (!result) {
				   				const data = element.attachments["data"][0],
					   				text = data.description,
					   				id = data.target.id,
					   				type = data.type,
					   				title = data.title,
					   				fbId = element.id,
					   				created_time = element.created_time;

					   			if (data.media) {
									const image = data.media.image.src;
					   			}
					   			if (type == "note") {
					   				poems.push({
					   					id: id,
					   					title: title,
					   					text: text.replace(/\n/g, "<br />"),
					   					image: image,
					   					type: type,
					   					created_time: created_time,
					   					fbId: fbId,
					   				});
					   			}
			   				}

			   				resolve();
			   			});
		   			}
			    });
			})

			Promise.all(requests).then(() => {
				res.json(poems);
			});
		}
	});
});


router.post('/saveToDB', function(req, res, next) {
	const poem = req.body.poem;

	const dt = dateTime.create();
	const now_formatted = dt.format('Y-m-d H:M:S');
	const created_time_dt = dateTime.create(poem.created_time);
	const created_time_formatted = created_time_dt.format('Y-m-d H:M:S');
	
	const query = "INSERT INTO poems (fb_id, title, message, img, published_date, fetched_date) VALUES (?, ?, ?, ?, ?, ?);";
	const values = [
		poem.fbId,
		poem.title,
		poem.text,
		poem.image,
		created_time_formatted,
		now_formatted,
	];

	con.query(query, values, function (err, result) {
	    if (err) {
			console.warn("err!", err);
	    }
	});

	res.json(true);
});

module.exports = router;