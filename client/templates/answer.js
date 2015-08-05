Template.answer.helpers({
  // checks whether the answer belongs to current user
  ownAnswer: function(){
    return this.userId === Meteor.userId();
  },
  // returns the time of submission
  timestamp: function() {
    return this.submitted.toUTCString();
  },
  // returns the status of the upvote button
  upvotedClass: function() {    
    var userId = Meteor.userId();    
    if (userId && !_.include(this.upvoters, userId)) {      
      return 'btn-primary upvotable';    
    } else {      
      return 'btn-primary unvotable';    
    }  
  },
  //checks whether answerer is a harvard student
  harvardStudent: function(){
    return this.verified;
  }
});

Template.answer.events({
  // calls upvote method if upvote button is clicked
  "click .upvotable": function(e) {   
    e.preventDefault();    
    Meteor.call('upvote', this._id);  
  },
  "click .unvotable": function(e) {   
    e.preventDefault();    
    Meteor.call('unvote', this._id);  
  }
});