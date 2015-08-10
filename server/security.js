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

AccessCodes = new Mongo.Collection("accessCodes");

