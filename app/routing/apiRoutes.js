var friendArray = require('../data/friends');

module.exports =function(app){

    app.get('/api/friends',function(req , res){
        res.json(friendsArray);
    });
    app.post('/api/friends', function(req,res){
        var scrores =req.body.scrores;

        var friendScore =[];
        var matchedFriend ={};
        var currentScore = 0;
        var winningScore = '';
        for (var i=0; i<friendsArray.length; i++){
            console.log(`Matching ${req.body.name} with ${friendsArray[i].name}`);
            friendScore = friendArray[i].scores;
            currentScore =0;
            for (var j=0; j<friendArray.length; j++){
                currentScore =parseInt(curretScore)+ difference(friendScore[j],scores[j]);
            }
            if (winningScore ==""){
                winningScore= currentScore;
                matchFriend =friendsArray[i];
            }else if(winningScore>curretnScore){
                console.log(`${friendArray[i].name} is now matched with ${req.body.name}`);
            }
        }
    })
}