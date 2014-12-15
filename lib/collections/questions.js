// Start new mongo database for questions
Questions = new Mongo.Collection("questions");

Questions.allow({  
   // only allow inseeting questions into the DB if you are logged in 
  insert: function(userId, doc) {       
    return !! userId;
  },
   // only allow deleting questions if you are logged in  
  remove: function(userId, doc) {      
    return !! userId;
  }
});
