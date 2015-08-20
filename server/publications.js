// publish the Questions database, allowing the client-side to view them
Meteor.publish('Answered', function(options) {  
  check(options, {    
    sort: Object,    
    limit: Number  
  });  
  return Questions.find({$and: [{commentsCount: {$gt: 0}}, {private: false}]}, options);
});

Meteor.publish('SingleQuestion', function(id) {
  check(id, String)  
  return Questions.find(id);
});

Meteor.publish('Unanswered', function(options) {  
  check(options, {    
    sort: Object,    
    limit: Number  
  });  
  return Questions.find({commentsCount: 0}, options);
});

Meteor.publish('MyQuestions', function(options) {  
  check(options, {    
    sort: Object,    
    limit: Number  
  });  
  return Questions.find({userId: this.userId}, options);
});

// only publish the answers that belong to the question being viewed
Meteor.publish('Answers', function(questionId) {
  return Answers.find({ $or: [ { questionId: questionId }, { _id: questionId } ] });
});

// publish relevant user data to the current user
Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find(this.userId);
  } else {
    this.ready();
  }
});
// relevant profile info to the current user
Meteor.publish('Profile', function() {
  if (this.userId) 
    return Profiles.find(this.userId);
  else
    this.ready();
});

// only publish unread notifications of the current user 
Meteor.publish('Notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});
