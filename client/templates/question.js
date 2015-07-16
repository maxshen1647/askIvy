Template.question.events({
  // remove question and attached answers if delete button is clicked
  "click .delete": function () {
    Questions.remove(this._id); 
  }
});


Template.question.helpers({
  // checks whether question is allowed to be dmeteleted
  deletable: function(){
    //add stuff here!!!!!
    return (this.userId === Meteor.userId() && Answers.find({questionId: this._id}).count() === 0);
  },
  // counts the number of answers on the current question
  commentsCount: function() {   
  	return Answers.find({questionId: this._id}).count();  
  }
});
