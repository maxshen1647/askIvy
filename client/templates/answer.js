Template.answer.helpers({
  // checks whether the answer belongs to current user
  ownAnswer: function(){
    return this.userId === Meteor.userId();
  },
  // returns the time of submission
  timestamp: function() {
    return this.submitted.toDateString();
  },
  // returns the status of the upvote button
  upvotedClass: function() {    
    var userId = Meteor.userId();    
    if (userId && !_.include(this.upvoters, userId)) {      
      return 'btn-primary upvotable';    
    } else {      
      return 'disabled';    
    }  
  }
});

Template.answer.events({
  // remove answer if delete button is clicked
  "click .delete": function () {
    Answers.remove(this._id);
  },
  // calls upvote method if upvote button is clicked
  "click .upvotable": function(e) {   
    e.preventDefault();    
    Meteor.call('upvote', this._id);  
  }
});