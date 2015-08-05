Template.layout.helpers({
    /**
    // returns number of questions in database
    questionsCount: function () {
      return Questions.find().count();
    },   
    // returns number of answers in database
    answersCount: function () {
      return Answers.find().count();
    },
    **/
    // checks whether current user is registered with a college.harvard.edu email
    harvardStudent: function(){
      return isHarvardStudent();
    }
  });