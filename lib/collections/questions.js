// Start new mongo database for questions
Questions = new Mongo.Collection("questions");

Questions.allow({  
   // only allow inseeting questions into the DB if you are logged in 
  insert: function(userId, doc) {       
    return !! userId;
  },
  update: function(userId, doc) {
    return ownsDocument(userId, doc);
  },
  remove: function(userId, doc) {
    return ownsDocument(userId, doc);
  }
});

Questions.allow({
  update: function(userId, doc, fieldNames) {
    return (_.without(fieldNames, 'commentsCount').length === 0);
  }
});

Questions.deny({
  update: function(userId, question, fieldNames) {    
    // may only edit the following two fields:    
    return (_.without(fieldNames, 'text', 'commentsCount').length > 0); 
  },
  remove: function(userId, question) {
    // cannot delete if answered
    return question.commentsCount !== 0;
  }
});