// enable username and email for login
Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  });

Template.layout.helpers({
    // returns number of questions in database
    questionsCount: function () {
      return Questions.find().count();
    },   
    // returns number of answers in database
    answersCount: function () {
    return Answers.find().count();
    }
  });