Template.unanswered.helpers({
    // returns all questions in the DB
    questions: function () {
      return Questions.find({commentsCount: 0}, {sort: {createdAt: -1}});
    },
    // checks whether current user is registered with a college.harvard.edu email
    harvardStudent: function(){
      var email = Meteor.user().emails[0].address;
      var n = email.indexOf("@");
      var extension = email.substring(n);
      return extension === "@college.harvard.edu";
    }
  });

  

