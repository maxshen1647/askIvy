Router.configure({
  // loads layout.html on every single page
  layoutTemplate: 'layout',
  // routes to notFound.html if user enters invalid url
  notFoundTemplate: 'notFound',
  // sets default loading template
  loadingTemplate: 'loading',
  // allows client to obtain data from the main database
  waitOn: function() { return [Meteor.subscribe("userData"), Meteor.subscribe('Notifications')];}
});

// route for mainpage.html 
Router.route('/', {name: 'mainpage'});
HomepageController = RouteController.extend({  
  template: 'homepage',  
  increment: 5,   
  questionLimit: function() {     
    return parseInt(this.params.questionLimit) || this.increment;   
  },  
  findOptions: function() {    
    return {sort: {submitted: -1}, limit: this.questionLimit()};  
  }, 
  subscriptions: function() {    
    this.questionSub = Meteor.subscribe('Questions', this.findOptions());  
  },
  questions: function() {    
    return Questions.find({}, this.findOptions());  
  }, 
  data: function() {    
    var hasMore = this.questions().count() === this.questionLimit();    
    var nextPath = this.route.path({questionLimit: this.questionLimit() + this.increment});    
    return {      
      questions: this.questions(),     
      ready: this.questionSub.ready,
      nextPath: hasMore ? nextPath : null    
    };  
  }
});
// route for homepage.html
Router.route('/homepage/:questionLimit?', {name: 'homepage',});

//route for questionsPage.html
Router.route('/unanswered', {name: 'unanswered'});
// route for myQuestions.html
Router.route('/myquestions', {name: 'myQuestions'});
//dynamic route to a distinct url for each question's own page
Router.route('/question/:_id', {  
  name: 'answerpage',
  waitOn: function() {
    return [Meteor.subscribe('Answers', this.params._id), Meteor.subscribe('SingleQuestion', this.params._id)]
  },
  data: function() { return Questions.findOne(this.params._id); }
});
Router.route('/question/:_id/edit', {
  name: 'questionEdit',
  waitOn: function() {
    return Meteor.subscribe('SingleQuestion', this.params._id);
  },
  data: function() { return Questions.findOne(this.params._id); }
});
Router.route('/answer/:_id/edit', {
  name: 'answerEdit',
  waitOn: function() {
    return Meteor.subscribe('Answers', this.params._id)
  },
  data: function() { return Answers.findOne(this.params._id); }
});

// routes to notFound.html if user goes to /answer/:_id where :_id is invalid
Router.onBeforeAction('dataNotFound', {only: 'answerpage'});

