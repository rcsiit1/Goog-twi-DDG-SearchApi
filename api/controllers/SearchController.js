const google = require('google');
const ddg = require('ddg');
var Twitter = require('twitter');
var search = (req, res) => {
  var result = [];
  var searchText = req.query.q;
  google.resultsPerPage = 45;
  google(searchText, (err, res) => {
    if (err) {
      console.error(err);
    }
    for (var i = 0; i < 1; ++i) {
      var link = res.links[i];
      result.push({
        'Google': {
          title: link.title,
          href: link.href
        }
      });
    }
  });
  ddg.query(searchText, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data.length > 0) {
      result.push({
        'Duck Duck Go': {
          title: data.RelatedTopics[0].Text,
          href: data.RelatedTopics[0].FirstURL
        }
      });
    }
  });
  var client = new Twitter({
    consumer_key: 'ldcZqWf66J6zQk4XdDTo8LGxC',
    consumer_secret: 'a4PnXYSDN9X9D1NNnhA6OqJIfR2UN4laEuk1iYryCVQLLYrCc9',
    access_token_key: '588161115-hbDsW0EpoOHv0uXmzoYrzEYMF0PMDvgO9pHPxsDc',
    access_token_secret: 'LLwnmOcbqFkLzCQSM8niCU2kUbVxluZYIA9K9jMSmx77T'
  });

  var params = { screen_name: searchText };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (tweets.length > 0) {
      result.push({
        'Twitter': {
          title: tweets[0].text,
          Username: tweets[0].user.screen_name,
          Url: tweets[0].user.url,
        }
      });
    }

  });

  setTimeout(exit, 3000);
  function exit() {
    res.json({ 'results': result });
  };
};


module.exports = {
  search: search
};

