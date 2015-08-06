Template.unanswered.helpers({
    // returns all questions in the DB
    questions: function () {
      return Questions.find({commentsCount: 0}, {sort: {createdAt: -1}});
    }
});

  

