//routing for sign in
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
//AccountsTemplates.configureRoute('forgotPwd');

//login with both email and username
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "Name",
      placeholder: "First Last",
      showLabels: true,
      required: true,
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "Harvard Email",
      placeholder: "example@college.harvard.edu",
      showLabels: true, 
      func: function(email){
        var n = email.indexOf("@");
        var extension = email.substring(n);
        return extension !== "@college.harvard.edu";
      },
      errStr: 'You must register with a Harvard email account.',
  },
  pwd,
  {
      _id: 'gradyear',
      type: 'select',
      required: true,
      displayName: "Graduating Year",
      showLabels: true,
      select: [
        {
            text: "2016",
            value: 2016,
        },
        {
            text: "2017",
            value: 2017,
        },
        {
            text: "2018",
            value: 2018,
        },
        {
            text: "2019",
            value: 2019,
        },
      ],
  },
  {
      _id: 'concentration',
      type: 'text',
      required: true,
      displayName: "Degree and Concentration",
      showLabels: true,
      placeholder: "Bachelor of Arts, Economics"
  },
  {
      _id: 'linkedin',
      type: 'text',
      displayName: "LinkedIn Profile",
      showLabels: true,
      placeholder: "url"
  }
]);

AccountsTemplates.configure({
    // Behavior
    enablePasswordChange: true,
    sendVerificationEmail: true,
    //showForgotPasswordLink: true,
    enforceEmailVerification: true,
    continuousValidation: true,
  negativeValidation: true,
  positiveValidation: true,
  showValidating: true,    
});
