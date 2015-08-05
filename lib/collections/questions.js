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

Questions.deny({
  update: function(userId, post, fieldNames) {    
    // may only edit the following two fields:    
    return (_.without(fieldNames, 'text').length > 0); 
  }
});