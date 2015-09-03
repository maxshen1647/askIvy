Template.homepage.helpers({
    // returns the status of the ask anon checkbox
    hideCompleted: function () {
      return Session.get("hideCompleted");
    },
    private: function () {
      return Session.get("private");
    },
  });

  Template.homepage.events({
     // When the ask form is submitted insert the questions into the DB
    "submit .new-task": function (event) {
      var text = event.target.text.value;

      //check for blank input
      if (text == "") {
        alert("Please type a question before submitting!");
        return false;
      }
      // if ask anon box is checked, insert question with username as Anonymous
      if (Session.get("hideCompleted")) 
        var username = 'Anonymous'
      else
        var username = Meteor.user().username;
      if (Session.get("private")) 
        var private = true;
      else
        var private = false;
      // if not logged in, display alert. 
      if (!Meteor.userId()) {
        alert('Please sign in or register first. Thanks!');
      } else {        
        Questions.insert({
          text: text,
          createdAt: new Date(),  //timestamp
          userId: Meteor.userId(), // id of logged in user
          username: username, // username, or anonymous if checked
          verified: Roles.userIsInRole(Meteor.userId(), 'ivy'), //true if user is a havard student
          private: private, // whether private box is checked
          commentsCount: 0 // number of answers
        });
        alert('Thanks! Your question has been submitted. You can check the status of your questions by clicking My Questions on the menu bar.'); 
      }

      // Clear form
      event.target.text.value = "";

      // Prevent default form submit
      return false;
    },
    // when anonymous box is is checked/unchecked, change the session variable
    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    },
    "change .private input": function (event) {
      Session.set("private", event.target.checked);
    }
  });

