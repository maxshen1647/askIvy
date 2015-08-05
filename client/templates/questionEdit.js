Template.questionEdit.events({
  // update question and redirect to question page
  'submit form': function(e) {
    e.preventDefault();
    var currentQuestionId = this._id;
    var questionProperties = { text: $(e.target).find('[name=text]').val()}
    // check for blank
    if (questionProperties.text == "")
        return false;

    Questions.update(currentQuestionId, {$set: questionProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Router.go('answerpage', {_id: currentQuestionId});
      }
    });
  },
  // remove question if delete button is clicked
 'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Are you sure you want to delete this question?")) {
      Questions.remove(this._id);
      Router.go('homepage');
    }
  }
});

Template.questionEdit.helpers({
   // checks whether question is allowed to be deleted
   deletable: function(){
    return (this.userId === Meteor.userId() && Answers.find({questionId: this._id}).count() === 0);
  }
});


