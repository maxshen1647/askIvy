// alerts user if profile already exists
// redirects to the profile page on successful form submission
AutoForm.addHooks(['profileInsert', 'profileEdit'], {
  after: {
    insert: function(error, result) {
      if (error) {
        alert('Profile already exists');
        console.log(error);
      } 
      Router.go('/profile/' + this.docId);
    },
    update: function(error, result) {
      if (error) {
        alert('Cannot be updated');
        console.log(error);
      }
      Router.go('/profile/' + this.docId);
    }
  }
});
