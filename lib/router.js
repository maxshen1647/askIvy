Router.configure({
  // loads layout.html on every single page
  layoutTemplate: 'layout',
  // routes to notFound.html if user enters invalid url
  notFoundTemplate: 'notFound',
  // allows client to obtain data from the main database
  waitOn: function() { return [Meteor.subscribe('Questions'), Meteor.subscribe('Answers'), Meteor.subscribe("userData")];}
});

// route for mainpage.html 
Router.route('/', {name: 'mainpage'});
// route for homepage.html
Router.route('/homepage', {name: 'homepage'});
//route for questionsPage.html
Router.route('/unanswered', {name: 'unanswered'});
// route for myQuestions.html
Router.route('/myquestions', {name: 'myQuestions'});
//dynamic route to a distinct url for each question's own page
Router.route('/answer/:_id', {  
	name: 'answerpage',
	data: function() { return Questions.findOne(this.params._id); }
});

// routes to notFound.html if user goes to /answer/:_id where :_id is invalid
Router.onBeforeAction('dataNotFound', {only: 'answerpage'});

