Template.question.events({
  // remove question if delete button is clicked
  "click .delete": function () {
    Meteor.call('removeQuestion', this._id); 
  }
});


Template.question.helpers({
  // checks whether question is allowed to be deleted
  deletable: function(){
    return (this.userId === Meteor.userId() && Answers.find({questionId: this._id}).count() === 0);
  },
  // checks whether question belongs to current user
  ownPost: function(){
    return this.userId === Meteor.userId();
  },
  // counts the number of answers on the current question
  commentsCount: function() {   
  	return Answers.find({questionId: this._id}).count();  
  },
  // returns the time of submission
  timestamp: function() {
    return this.createdAt.toUTCString();
  },
  //checks whether asker is a harvard student
  harvardStudent: function(){
    return this.verified;
  }
});
