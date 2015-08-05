Template.answerEdit.events({
  // update answer and redirect to answerpage
  'submit form': function(e) {
    e.preventDefault();
    var questionId = this.questionId;
    var currentAnswerId = this._id;
    var answerProperties = { body: $(e.target).find('[name=body]').val()}
     // check for blank
    if (answerProperties.body == "")
        return false;
    
    Answers.update(currentAnswerId, {$set: answerProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Router.go('answerpage', {_id: questionId});
      }
    });
  },
  // remove answer if delete button is clicked
 'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Are you sure you want to delete this answer?")) {
      Answers.remove(this._id);
      Router.go('answerpage', {_id: this.questionId});
    }
  }
});


