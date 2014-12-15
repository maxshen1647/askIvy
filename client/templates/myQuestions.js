Template.myQuestions.helpers({
    // returns all questions in the DB
    questions: function () {
      return Questions.find({userId: Meteor.userId()}, {sort: {createdAt: -1}});
    }
  });

  

