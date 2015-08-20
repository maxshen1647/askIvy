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

// user accounts options
AccountsTemplates.configure({
    // Behavior
    enablePasswordChange: true,
    sendVerificationEmail: true,
    showForgotPasswordLink: true,
    enforceEmailVerification: true,
    showResendVerificationEmailLink: true,
    continuousValidation: true,
    negativeValidation: true,
    positiveValidation: true,
    showValidating: true,    
    texts: {
        navSignIn: "Log in/Register",
        navSignOut: "Log out",        
        signInLink_pre: "Already have an account",
        signInLink_link: "Log in",
        signUpLink_link: "Register"
    }
});

//routing 
AccountsTemplates.configureRoute('signIn', {
    redirect: '/homepage',
    template: 'loginForm'
});
AccountsTemplates.configureRoute('signUp', {template: 'loginForm'});
AccountsTemplates.configureRoute('verifyEmail', {template: 'loginForm', redirect: '/create-profile'});
AccountsTemplates.configureRoute('forgotPwd', {template: 'loginForm'});
AccountsTemplates.configureRoute('resetPwd', {template: 'loginForm'});