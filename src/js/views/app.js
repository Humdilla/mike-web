define(['jquery', 'backbone'], function($, Backbone){
  var NavView = Backbone.View.extend({
    
    el: '#page-nav',
    
    initialize: function (obj) {
      var self = this;
    },
    
    
  });
  
  var AppView = Backbone.View.extend({
    
    el: '#app',
    
    events: {
      'click #page-nav .nav-button.dropdown': 'toggleDropdown'
    },
    
    initialize: function(obj){
      this.navView = new NavView();
    },
    
    render: function(){
    },
    
  });
  new AppView();
});