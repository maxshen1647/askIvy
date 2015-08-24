Template.layout.helpers({
  profileUrl: function (){
    return ('/profile/' + Meteor.userId());
  }
});