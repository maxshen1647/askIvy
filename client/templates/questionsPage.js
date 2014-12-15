Template.answerPage.helpers({
    // returns all questions in the DB
    questions: function () {
      return Questions.find({status: false}, {sort: {createdAt: -1}});
    }
  });

  

