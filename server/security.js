// make sure the same account cannot be signed in at two different locations 
Accounts.validateLoginAttempt(function(attempt) {
  if (!attempt.allowed){
    return false;
  } else {    
    var loginAttemptIp = attempt.connection.clientAddress;
    var sameUser = UserStatus.connections.find({userId: attempt.user._id, ipAddr: {$ne: loginAttemptIp}}).count();
    return sameUser === 0;
  }
});

AccessCodes = new Mongo.Collection("accessCodes");
