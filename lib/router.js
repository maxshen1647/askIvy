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
// route for about.html 
Router.route('/about', {name: 'about'});
// route for insertProfile.html
Router.route('/profile/create', {
  name: 'profileInsert',
});

// route for page that displays current user profile
Router.route('/profile/:userId', {
  name: 'profile',
  waitOn: function () {
    return Meteor.subscribe('Profiles', this.params.userId)
  },
  data: function() { return Profiles.findOne(this.params.userId); }
});

HomepageController = RouteController.extend({  
  template: 'homepage',  
  increment: 5,   
  questionLimit: function() {     
    return parseInt(this.params.questionLimit) || this.increment;   
  },  
  findOptions: function() {    
    return {sort: {createdAt: -1}, limit: this.questionLimit()};  
  }, 
  subscriptions: function() {    
    this.questionSub = Meteor.subscribe('Answered', this.findOptions());  
  },
  questions: function() {    
    return Questions.find({$and: [{commentsCount: {$gt: 0}}, {private: false}]}, this.findOptions());  
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
Router.route('/homepage/:questionLimit?', {name: 'homepage'});

UnansweredController = HomepageController.extend({
  template: 'unanswered',
  subscriptions: function() {
    this.questionSub = Meteor.subscribe('Unanswered', this.findOptions());
  },
  questions: function() {
    return Questions.find({commentsCount: 0}, this.findOptions());
  }
});
//route for unanswered.html
Router.route('/unanswered/:questionLimit?', {name: 'unanswered'});

MyQuestionsController = HomepageController.extend({
  template: 'myQuestions',
  subscriptions: function() {
    this.questionSub = Meteor.subscribe('MyQuestions', this.findOptions());
  },
  questions: function() {
    return Questions.find({userId: Meteor.userId()}, this.findOptions());
  }
})
// route for myQuestions.html
Router.route('/myquestions/:questionLimit?', {name: 'myQuestions'});

//dynamic route to a distinct url for each question's own page
Router.route('/question/:_id', {  
  name: 'answerpage',
  waitOn: function() {
    return [Meteor.subscribe('Answers', this.params._id), Meteor.subscribe('SingleQuestion', this.params._id)]
  },
  data: function() { return Questions.findOne(this.params._id); }
});

// route for editing question page
Router.route('/question/:_id/edit', {
  name: 'questionEdit',
  waitOn: function() {
    return Meteor.subscribe('SingleQuestion', this.params._id);
  },
  data: function() { return Questions.findOne(this.params._id); }
});
// route for editing answer page
Router.route('/answer/:_id/edit', {
  name: 'answerEdit',
  waitOn: function() {
    return Meteor.subscribe('Answers', this.params._id)
  },
  data: function() { return Answers.findOne(this.params._id); }
});

// routes to notFound.html if user goes to a route where data is not found
Router.onBeforeAction('dataNotFound');


