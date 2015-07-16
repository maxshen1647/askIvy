Template.answerpage.helpers({  
	// returns all of the answers on the current question
	answers: function() {    
		return Answers.find({questionId: this._id});  
	},
	// checks whether current user is registered with a college.harvard.edu email
 	harvardStudent: function(){
	  	return isHarvardStudent();
  	}
});