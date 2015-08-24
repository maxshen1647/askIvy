Profiles = new Mongo.Collection('profiles');

Profiles.allow({  
  insert: function(userId, doc) {       
    return !! userId;
  },
  update: function(userId, doc) {
    return userId === doc._id;
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
    label: 'School and class year',
    autoform: {
      placeholder: "Ex. Harvard Class of 2018"
    }
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
      placeholder: 'Ex. Math 750, Reading 730, Writing 800'
    }
  },
  sattwo: {
    type: String,
    label: 'SAT Subject Test Scores',
    autoform: {
      placeholder: 'Ex. Chemistry 780, Math II 800, US History 750'
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