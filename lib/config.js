//routing for sign in
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
AccountsTemplates.configureRoute('forgotPwd');

//login with both email and username
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      func: function(email){
        var n = email.indexOf("@");
        var extension = email.substring(n);
        return extension !== "@college.harvard.edu";
      },
      errStr: 'You must register with a Harvard email account.',
  },
  pwd
]);

AccountsTemplates.configure({
    // Behavior
    enablePasswordChange: true,
    sendVerificationEmail: true,
    showForgotPasswordLink: true,
    enforceEmailVerification: true,
    continuousValidation: true,
  negativeValidation: true,
  positiveValidation: true,
  showValidating: true,    
});
