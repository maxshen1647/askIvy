// start new mongo db for user notifications
Notifications = new Mongo.Collection("notifications");

Notifications.allow({
  // only allow inserting notifications if logged in
  insert: function(userId, doc) {       
    return !! userId;
  },
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) && 
      _.without(fieldNames, 'read').length === 0;
  } 
});

createAnswerNotification = function(answer) {
  var question = Questions.findOne(answer.questionId);
  if (answer.userId !== question.userId) {
    Notifications.insert({
      type: "answer",
      userId: question.userId,
      questionId: question._id,
      answerId: answer._id,
      answerAuthor: answer.author,
      read: false
    });
  }
};

createUpvoteNotification = function(answerId, authorId) {
    Notifications.insert({
      type: "upvote",
      userId: authorId,
      read: false
    });
};