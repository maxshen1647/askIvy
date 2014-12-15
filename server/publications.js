// publish the Questions and Answers databases, allowing the client-side to view them

Meteor.publish('Questions', function() {
  return Questions.find();
});

Meteor.publish('Answers', function() {
  return Answers.find();
});