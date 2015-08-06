Template.answerpage.helpers({  
	// returns all of the answers on the current question
	answers: function() {    
		return Answers.find({questionId: this._id});  
	}
});