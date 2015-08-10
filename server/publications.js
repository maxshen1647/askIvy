// publish the Questions database, allowing the client-side to view them
Meteor.publish('Questions', function() {
  return Questions.find();
});
// only publish the answers that belong to the question being viewed
Meteor.publish('Answers', function(questionId) {
  return Answers.find({ $or: [ { questionId: questionId }, { _id: questionId } ] });
});

// publish relevant user data to the current user
Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId});
  } else {
    this.ready();
  }
});

// only publish unread notifications of the current user 
Meteor.publish('Notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});
