Template.question.events({
  // remove question and attached answers if delete button is clicked
  "click .delete": function () {
    Questions.remove(this._id);
    Answers.remove({questionId: this._id}); 
  }
});


Template.question.helpers({
  // checks whether question belongs to the current user
  ownQuestion: function(){
    return this.userId === Meteor.userId();
  },
  // counts the number of answers on the current question
  commentsCount: function() {   
  	return Answers.find({questionId: this._id}).count();  
  }
});
