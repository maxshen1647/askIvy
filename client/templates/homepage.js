Template.homepage.helpers({
    // returns all questions in the DB
    questions: function () {
      return Questions.find({status: true}, {sort: {createdAt: -1}});
    },
    // returns the status of the ask anon checkbox
    hideCompleted: function () {
      return Session.get("hideCompleted");
    }
  });

  Template.homepage.events({
     // When the ask form is submitted insert the questions into the DB
    "submit .new-task": function (event) {
      var text = event.target.text.value;

      //check for blank input
      if (text == "")
        return false;

      // if not logged in, display alert. 
      if (Meteor.user() == null){
      alert('Please sign in or register first. Thanks!');
      // if ask anon box is checked, insert question with username as Anonymous
      } else if (Session.get("hideCompleted")){
        Questions.insert({
          text: text,
          createdAt: new Date(),  // timestamp
          userId: Meteor.userId(), // id of logged in user
          username: "Anonymous", // logs the username as anonymous
          status: false // whether question is answered
        }); 
        alert('Thanks! Your question has been submitted. You can check the status of your questions by clicking My Questions on the menu bar.'); 
      // if checked, insert question with actual username
      } else {
        
        Questions.insert({
          text: text,
          createdAt: new Date(),  //timestamp
          userId: Meteor.userId(), // id of logged in user
          username: Meteor.user().username, //|| Meteor.user().services.facebook.name, // username or fb name of logged in user
          verified: isHarvardStudent(), //true if user is a havard student
          status: false // whether question is answered 
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
    }
  });

