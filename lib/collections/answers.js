// Start new mongo database for answers
Answers = new Mongo.Collection('answers');

// methods that are performed server side but called on the client side
Meteor.methods({  
	// method for inserting answer into DB
	answerInsert: function(answerAttributes) {    
		check(this.userId, String);    
		check(answerAttributes, {      
			questionId: String,      
			body: String    
		});    
		var user = Meteor.user();    
		var question = Questions.findOne(answerAttributes.questionId); 
		// checks that the answer is being applied to an existing question   
		if (!question)      
			alert('You must answer a question');    
		answer = _.extend(answerAttributes, {      
			userId: user._id, // id of the user
			author: user.username, // username of the user 
      verified: isHarvardStudent(), //whether user is a harvard student
			submitted: new Date(), // timestamp
			upvoters: [], 
			votes: 0    
		});   
		Questions.update(answerAttributes.questionId, {$set: {status: true}}); 
		return Answers.insert(answer);  
	},
  //method for removing an answer from DB
  removeAnswer: function(answerId){
    check(this.userId, String);
    check(answerId, String);
    //remove answer with this id 
    var affected = Answers.remove({_id: answerId, userId: this.userId});
    //if not such answer exists, throw error
    if (!affected)
      alert("You weren't able to remove that post");
  },
  // method for upvoting an answer
	upvote: function(answerId) {
		check(this.userId, String);
		check(answerId, String);
        //update answer with this id and upvoter in the following way:
        var affected = Answers.update({      
          _id: answerId,       
          upvoters: {$ne: this.userId}    
        }, {      
          $addToSet: {upvoters: this.userId}, // add current username to the array upvoters     
          $inc: {votes: 1}    }); // increment votes by 1
    //if no such answers exist, throw error
    if (! affected)      
      alert("You weren't able to upvote that post");
	},
    // method for unvoting an answer
	unvote: function(answerId) {
		check(this.userId, String);
		check(answerId, String);
        //update answer with this id and upvoter in the following way:
        var affected = Answers.update({      
          _id: answerId,       
          upvoters: this.userId    
        }, {      
          $pull: {upvoters: this.userId}, // remove current username from array of voters    
          $inc: {votes: -1}    }); // increment votes by 1
    //if no such answers exist, throw error
    if (! affected)      
      alert("You weren't able to unvote that post");
	}	
});
