// set up smtp for email verification
Meteor.startup(function () {
  smtp = {
    username: 'askharvard@gmail.com',   // eg: server@gentlenode.com
    password: 'tarzanboy',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.gmail.com',  // eg: mail.gandi.net
    port: 25
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

// configure verification email 
Meteor.startup(function() {
  
  Accounts.emailTemplates.from = 'askHarvard <askharvard@gmail.com>';

  Accounts.emailTemplates.siteName = 'askHarvard';

  // subject line of the email.
  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Confirm Your Email Address';
  };
  // takes a user object and a url, and returns the body text for the email.
  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return "Dear " + user.username + ",\n\n" +  
    "Welcome to askHarvard, Harvard's open Q & A platform to the world. The website is entirely run by current Harvard undergraduates. Please click on the following link to verify your email address:\n\n" + url + "\n\n" + "Cheers,\naskHarvard Team";
  };
});
