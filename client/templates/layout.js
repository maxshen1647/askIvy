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
    },
    // checks whether current user is registered with a college.harvard.edu email
    harvardStudent: function(){
      var email = Meteor.user().emails[0].address;
      var n = email.indexOf("@");
      var extension = email.substring(n);
      return extension === "@college.harvard.edu";
    }
  });