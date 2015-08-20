// automatically feeds current user information to autoform, which automatically includes it when creating the profile
Template.profileInsert.helpers({
    'userData': function(ownerID) {
        return Meteor.users.findOne();
    }
});

// alerts user if profile already exists
// redirects to the profile page on successful form submission
AutoForm.addHooks(['insertProfile'], {
  after: {
    insert: function(error, result) {
      if (error) {
        alert('Profile already exists');
      } else {
        Router.go('/profile/' + this.docId);
      }
    },
  }
});
