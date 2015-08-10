// set the role of the user when it is created
Accounts.onCreateUser(function(options, user){
  user.profile = options.profile;
  var isHarvard = function(email){
    var n = email.indexOf("@");
    var extension = email.substring(n);
    return extension === "@college.harvard.edu";
  };   
  Meteor.setTimeout(function () {
    if (isHarvard(options.email))
      Roles.addUsersToRoles(user._id, 'harvard', 'ivy');
    else
      Roles.addUsersToRoles(user._id, 'student', 'ivy100');
  }, 10);
  
  return user;
});
