// Start new mongo database for answers
Answers = new Mongo.Collection('answers');

Answers.allow({  
   // only allow updating your own questions
  update: function(userId, doc) {
    return ownsDocument(userId, doc);
  },
  // only allow removing your own answers
  remove: function(userId, doc) {
    return ownsDocument(userId, doc);
  }
});

Answers.deny({  
  // does not allow updating any other than answer body
  update: function(userId, post, fieldNames) {    
    // may only edit the following two fields:    
    return (_.without(fieldNames, 'body').length > 0); 
  }
});

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
    // update question with number of answers
		Questions.update(answerAttributes.questionId, {$inc: {commentsCount: 1} }); 
    // create the answer, save the id
    answer._id = Answers.insert(answer);
    // create notification
    createAnswerNotification(answer);
		return answer._id;
	},
  // method for upvoting an answer
	upvote: function(answerId, authorId) {
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
    else 
      // if successfully upvoted, create notification
      createUpvoteNotification(answerId, authorId);
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
