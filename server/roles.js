// set the role of the user when it is created
Accounts.onCreateUser(function(options, user){
  user.profile = options.profile;
  var isHarvard = function(email){
    var n = email.indexOf("@");
    var extension = email.substring(n);
    return extension === "@college.harvard.edu";
  };   
  var role;
  if (isHarvard(options.email))
    role = 'harvard';
  else
    role = 'company';
   
  Meteor.setTimeout(function () {
     Roles.addUsersToRoles(user._id, role);
  }, 10);
  return user;
});
