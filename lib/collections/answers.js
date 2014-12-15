// Start new mongo database for answers
Answers = new Mongo.Collection('answers');

//allows removal of answers if logged in
Answers.allow({  
  remove: function(userId, doc) {    
    return !! userId;
  }
});

// methods that are performaed server side but called on the client side
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
			submitted: new Date(), // timestamp
			upvoters: [], 
			votes: 0    
		});   
		Questions.update(answerAttributes.questionId, {$set: {status: true}}); 
		return Answers.insert(answer);  
	},
    // method for upvoting an answer
	upvote: function(questionId) {
		check(this.userId, String);
		check(questionId, String);
    
        var affected = Answers.update({      
          _id: questionId,       
          upvoters: {$ne: this.userId}    
        }, {      
          $addToSet: {upvoters: this.userId}, // add current username to the array upvoters     
          $inc: {votes: 1}    }); // increment votes by 1
    if (! affected)      
      alert("You weren't able to upvote that post");
	}	
});
