Template.notifications.helpers({
  // pull all unread notifications that belong to current user
  notifications: function() {
    return Notifications.find({userId: Meteor.userId(), read: false});
  },
  // count unread notification sthat belong to current user
  notificationCount: function(){
      return Notifications.find({userId: Meteor.userId(), read: false}).count();
  }
});

Template.notificationItem.helpers({
  // check whether the notification is about an answer
  answer: function(){
    return this.type === 'answer';
  },
  // return the link to the question that was ansered
  notificationPostPath: function() {
    return Router.routes.answerpage.path({_id: this.questionId});
  }
});

Template.notificationItem.events({
  // mark a notification as read when clicked
  'click a': function() {
    Notifications.update(this._id, {$set: {read: true}});
  }
});