// checks whether current user is registered with a college.harvard.edu email
isHarvardStudent = function(){
    var email = Meteor.user().emails[0].address;
    var n = email.indexOf("@");
    var extension = email.substring(n);
    return extension === "@college.harvard.edu";
  }
  