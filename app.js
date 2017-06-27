var TwitterPackage = require('twitter');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var secret = {
  consumer_key: 'gVHf3LcfleMvGCFVb1YGRoOsB',
  consumer_secret: '4JEAxA0zU9qwOpOk52oK11FPoifZ434W716V64QVFUL5xCZLLb',
  access_token_key: '120516404-U7hYSJ0VIJJd7XN6Ym7FxUYv6DXJhAKJ0BBoxwT1',
  access_token_secret: 'VcaW4JBTHzoQd7N3w4P0F6vZ0qoEjqkbmWdVgN8KaJ8HE'
}

var Twitter = new TwitterPackage(secret);
var Post = mongoose.model('Post', { text: String });

Twitter.stream('statuses/filter', {track: 'Câmara'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);

    var ultimoPost = new Post({ text: tweet.text });

    ultimoPost.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Post salvo no banco.");
      }
    });
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});