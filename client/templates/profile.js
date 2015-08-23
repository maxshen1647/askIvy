// alerts user if profile already exists
// redirects to the profile page on successful form submission
AutoForm.addHooks(['profileInsert', 'profileEdit'], {
  after: {
    insert: function(error, result) {
      if (error) {
        alert('Unable to create profile. Make sure all required fields are filled and that you do not already have a profile');
        console.log(error);
      } 
      Router.go('/profile');
    },
    update: function(error, result) {
      if (error) {
        alert('Cannot be updated');
        console.log(error);
      }
      Router.go('/profile');
    }
  }
});

Template.profile.helpers({
  ownProfile: function() {
    return this._id === Meteor.userId();
  }
});
