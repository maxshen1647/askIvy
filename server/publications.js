// publish the Questions and Answers databases, allowing the client-side to view them

Meteor.publish('Questions', function() {
  return Questions.find();
});

Meteor.publish('Answers', function() {
  return Answers.find();
});
// publish user data to the current user
Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId});
  } else {
    this.ready();
  }
});