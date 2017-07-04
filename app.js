var TwitterPackage = require('twitter');
var mongoose = require('mongoose');

mongoose.connect('mongodb://user8:123456@ds139942.mlab.com:39942/kopteste');

var secret = {
  consumer_key: 'gVHf3LcfleMvGCFVb1YGRoOsB',
  consumer_secret: '4JEAxA0zU9qwOpOk52oK11FPoifZ434W716V64QVFUL5xCZLLb',
  access_token_key: '120516404-U7hYSJ0VIJJd7XN6Ym7FxUYv6DXJhAKJ0BBoxwT1',
  access_token_secret: 'VcaW4JBTHzoQd7N3w4P0F6vZ0qoEjqkbmWdVgN8KaJ8HE'
}

var Twitter = new TwitterPackage(secret);
var Post = mongoose.model(
  'Post', { 
    created_at: String, 
    text: String, 
    user: {
      name: String,
      screen_name: String  
    },
    entities: {
      user_mentions: [{
        screen_name: String,        
      }]
    }
  });

Twitter.stream('statuses/filter', {track: 'skybrasil'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log("Nome: ", tweet.user.screen_name, "\n",tweet.text, "\nData:", 
      tweet.created_at, "\n Mencionado: ", tweet.entities.user_mentions,screen_name[0]);

    var ultimoPost = new Post(
      { 
        username: tweet.user.screen_name,
        created_at: tweet.created_at, 
        text: tweet.text,
        user: tweet.user.screen_name,
        mention: tweet.entities.user_mentions.screen_name
    });

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