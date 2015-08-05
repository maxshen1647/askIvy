// Start new mongo database for questions
Questions = new Mongo.Collection("questions");

Questions.allow({  
   // only allow inseeting questions into the DB if you are logged in 
  insert: function(userId, doc) {       
    return !! userId;
  },
  update: function(userId, doc) {
    return ownsDocument(userId, doc);
  }
});

Questions.deny({
  update: function(userId, post, fieldNames) {    
    // may only edit the following two fields:    
    return (_.without(fieldNames, 'text').length > 0); 
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
      alert("You weren't able to remove that question");
  }
});
