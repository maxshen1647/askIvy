Template.profileInsert.helpers({
    'userData': function(ownerID) {
        return Meteor.users.findOne();
    }
});
