var friendData = require('../data/friend.js');

module.exports = function(app) {

  app.get('/api/friends', function (req, res) {
    res.json(friendData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a survey request... this data is then sent to the server...
  // Then the server saves the data to the friendData array)
  // ---------------------------------------------------------------------------
  app.post('/api/friends', function(req, res) {
    //grabs the current friend's scores to compare with friends in friend.js 
    console.log("Post ");
    // var newFriendScores = req.body.scores;
    var newFriendScores = req.body.scores;
    var scoresArray = [];
    var friendCount = 0;
    var bestMatch = 0;

    console.log("friendData.length " + friendData.length)
    console.log("newFriendScores.length " + newFriendScores.length)
    for (var i = 0; i <  friendData.length; i++) {
      var scoresDiff = 0;
      //run through scores to compare friends
      for (var j = 0; j < newFriendScores.length; j++) {
        scoresDiff += (Math.abs(parseInt( friendData[i].scores[j]) - parseInt(newFriendScores[j])));
      }

      //push results into scoresArray
      scoresArray.push(scoresDiff);
    }

     //after all friends are compared, find best match
     for(var i=0; i<scoresArray.length; i++){
      if(scoresArray[i] <= scoresArray[bestMatch]){
        bestMatch = i;
      }
    }

    var yourMatch =  friendData[bestMatch];
    

    //pushes new submission into the friend array
    friendData.push(req.body);
    
    res.json(yourMatch);
    // }
  });
} 