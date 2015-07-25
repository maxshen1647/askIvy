// Start new mongo database for questions
Questions = new Mongo.Collection("questions");

Questions.allow({  
   // only allow inseeting questions into the DB if you are logged in 
  insert: function(userId, doc) {       
    return !! userId;
  }
});

Meteor.methods({  
  //method for removing a question from DB
  removeQuestion: function(questionId){
    check(this.userId, String);
    check(questionId, String);
    //remove answer with this id 
    var affected = Questions.remove({_id: questionId, userId: this.userId});
    //if not such answer exists, throw error
    if (!affected)
      alert("You weren't able to remove that post");
  }
});
