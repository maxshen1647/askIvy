Profiles = new Mongo.Collection('profiles');

Profiles.allow({  
  insert: function(userId, doc) {       
    return !! userId;
  }
});

var Schemas = {};

Schemas.Profiles = new SimpleSchema({
  username: {
    type: String,
    label: 'Full Name'
  },
  school: {
    type: String,
    label: 'Current institution'
  },
  major: {
    type: String,
    label: 'Intended degree and major',
    autoform: {
      placeholder: 'BA, Economics'
    }
  },
  satone: {
    type: String,
    label: 'SAT I Scores',
    autoform: {
      placeholder: 'Example: Math 750, Reading 730, Writing 800'
    }
  },
  admitted: {
    type: String,
    label: 'Admitted Colleges'
  },
  _id: {
    type: String,
    autoform: {type: 'hidden'}
  }
});


Profiles.attachSchema(Schemas.Profiles);