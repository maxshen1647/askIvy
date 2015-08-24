//checks whether given email is from harvard
isHarvard = function(email){
    var n = email.indexOf("@");
    var extension = email.substring(n);
    return extension === "@college.harvard.edu";
  };

// checks validity of registration code
isValidCode = function(code) {
           // try to find the code in the db
           var codeDoc = AccessCodes.findOne({_id: code, valid: true});
           // if not found, return false; if found, return true and set code to be expired
           if (!codeDoc)
             return false;
           AccessCodes.update(code, {$set: {valid: false}});
           return true;
           };

// // checks code and set the role of the user when it is created
Accounts.onCreateUser(function(options, user){
  var code = options.profile.accesscode;
  
  if (!isHarvard(options.email) && !isValidCode(code)) {
    throw new Meteor.Error('code', 'Incorrect or expired registration code ');
  } else {
    Meteor.setTimeout(function () {
    if (isHarvard(options.email))
      Roles.addUsersToRoles(user._id, 'ivy');
    else
      Roles.addUsersToRoles(user._id, 'consulting');
    }, 10);
  }  
  
  user.profile = options.profile;
  return user;
});


// make sure the same account cannot be signed in at two different locations, unless ivy student 
Accounts.validateLoginAttempt(function(attempt) { 
  if (!attempt.allowed){
    return false;
  } else if (Roles.getGroupsForUser(attempt.user._id)[0] === 'ivy') { 
    return true;
  } else {
    var loginAttemptIp = attempt.connection.clientAddress;
    var sameUser = UserStatus.connections.find({userId: attempt.user._id, ipAddr: {$ne: loginAttemptIp}}).count();
    return sameUser === 0;
  }
});

// create db for access codes
AccessCodes = new Mongo.Collection("accessCodes");
// insert test codes (comment out if you are not testing the accounts system in order to avoid db conflicts)
//AccessCodes.insert({_id: 'a', valid: true});
//AccessCodes.insert({_id: 'b', valid: true});
//AccessCodes.insert({_id: 'c', valid: true});

