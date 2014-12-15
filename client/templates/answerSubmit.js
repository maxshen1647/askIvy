// error checking for the answer submit form
Template.answerSubmit.created = function() {
  Session.set('answerSubmitErrors', {});
}

Template.answerSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('answerSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('answerSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.answerSubmit.events({
   // calls the method answerInsert to insert the answer when form is submitted
  'submit form': function(e, template) {
    e.preventDefault();

    // acquire user inputs and put into the answer object when form is submitted
    var $body = $(e.target).find('[name=body]');
    var answer = {
      body: $body.val(),
      questionId: template.data._id
    };

    var errors = {};
    // checks that there is content in the answer
    if (! answer.body) {
      errors.body = "Please write some content";
      return Session.set('answerSubmitErrors', errors);
    }
    // call the method answerInsert (defined server side), which inserts the answer into database
    Meteor.call('answerInsert', answer, function(error, answerId) {
      if (error){
        throwError(error.reason);
      } else {
        $body.val('');
      }
    });
  }
});