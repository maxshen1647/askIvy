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
      userId: question.userId, // user that receives the notification (owns the question)
      questionId: question._id, // id of the question that was answered
      answerAuthor: answer.author, // name of answerer
      read: false, 
      createdAt: new Date()
    });
  }
};

createUpvoteNotification = function(authorId, questionId, upvoter) {
    Notifications.insert({
      type: "upvote",
      userId: authorId, // user that receives the notification
      questionId: questionId, // id of the question that is linked to the upvoted answer
      upvoter: upvoter, // name of the upvoter
      read: false,
      createdAt: new Date()
    });
};