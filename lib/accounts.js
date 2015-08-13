//routing for sign in
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');


//login with both email and username
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "Full Name",
      placeholder: "First Last",
      required: true,
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      placeholder: "Register with your college email to answer questions",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email'
  },
  pwd,
  // require access code to register
  {
      _id: 'accesscode',
      type: 'text',
      required: true,
      showLabels: false,
      displayName: "Registration Access Code",
      placeholder: ' '
  }
]);


AccountsTemplates.configure({
    // Behavior
    enablePasswordChange: true,
    sendVerificationEmail: true,
    showForgotPasswordLink: true,
    enforceEmailVerification: true,
    continuousValidation: true,
    negativeValidation: true,
    negativeFeedback: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,    
    homeRoutePath: '/homepage',
    texts: {
        navSignIn: "Log in/Register",
        navSignOut: "Log out",        
        signInLink_pre: "Already have an account",
        signInLink_link: "Log in",
        signUpLink_link: "Register"
    }
});
