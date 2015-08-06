// Start new mongo database for questions
Questions = new Mongo.Collection("questions");

Questions.allow({  
   // only allow inseeting questions into the DB if you are logged in 
  insert: function(userId, doc) {       
    return !! userId;
  },
  // allow updating own question
  update: function(userId, doc) {
    return ownsDocument(userId, doc);
  },
  // allow removing own question
  remove: function(userId, doc) {
    return ownsDocument(userId, doc);
  }
});

Questions.allow({
  // allow anyone to update only the commentsCount field
  update: function(userId, doc, fieldNames) {
    return (_.without(fieldNames, 'commentsCount').length === 0);
  }
});

Questions.deny({
  // deny updates to anything other than text and commentsCount fields
  update: function(userId, question, fieldNames) {    
    // may only edit the following two fields:    
    return (_.without(fieldNames, 'text', 'commentsCount').length > 0); 
  },
  // deny removal of question if it has answers
  remove: function(userId, question) {
    // cannot delete if answered
    return question.commentsCount !== 0;
  }
});