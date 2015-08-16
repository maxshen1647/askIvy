Template.question.helpers({
  // checks whether question belongs to current user
  ownQuestion: function(){
    return this.userId === Meteor.userId();
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
