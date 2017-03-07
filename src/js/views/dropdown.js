define(['jquery', 'backbone'], function($, Backbone){
  var timeTo;
  var regTime;
  (function(){
    var d = new Date();
    var time = 0;
    timeTo = function(task){
      console.log(`[${task}]:${d.getTime()-time}`);
    };
    regTime = function(){
      time = d.getTime();
    }
  });
  
  var State = Backbone.Model.extend({
    expanded: false
  });
  
  var MenuView = Backbone.View.extend({
    
    el: '#page-nav',
    
    initialize: function (options) {
      var self = this;
      this.state = new State();
      
      /* Set up State listener */
      this.state.on('change:expanded', function (model, value) {
        console.log(model);
      });
      
      /* Set up Dropdowns */
      this.dropdowns = [];
      this.$el.children('.dropdown').each(function(i, el){
        var dropdown = new DropdownView({
          el: el,
          parent: self,
          index: i
        });
        /* Set initial position */
        dropdown.$el.css({
          top: `calc(${dropdown.index * 80}px)`
        });
        /* Set up CLICK event handler */
        dropdown.on('click', function (clicked) {
          var expanded = !clicked.state.get('expanded');
          clicked.state.set({expanded: expanded});
          
          /* Contract all dropdowns except clicked */
          self.dropdowns.forEach(function (dd) {
            if (dd !== clicked) {
              dd.state.set({expanded: false});
            }
          });
          if (expanded) {  
            /* Set positions of all dropdowns below clicked */
            self.dropdowns.slice(clicked.index+1).forEach(function (dd) {
              dd.$el.css({
                top: `calc(100% - ${dd.index*80}px)`
              });
            });
            /* Set position of clicked */
            clicked.$el.css({
              top: clicked.index*clicked.height + 'px'
            });            
            /* Change state */
            self.state.set({expanded: true});
          }
          else {            
            /* Change state */
            self.state.set({expanded: false});
          }
        });
        self.dropdowns.push(dropdown);
      });
    },
    
    expand: function () {
      this.$el.removeClass('page-nav-contracted');
      this.$el.addClass('page-nav-expanded');
    },
    
    contract: function () {
      this.$el.removeClass('page-nav-expanded');
      this.$el.addClass('page-nav-contracted');
    }
    
  });
  
  var DropdownView = Backbone.View.extend({
    
    events: {
      'click': 'click'
    },
    
    click: function (e) {
      this.trigger('click', this);
    },
    
    initialize: function(options){
      this.setElement(options.el);
      
      this.index = options.index;
      this.height = this.$el.outerHeight();
      
      this.state = new State();
      this.state.on('change:expanded', function (model, value) {
        if (this.state.get('expanded')) {
          this.expand();
        }
        else {
          this.contract();
        }
      }, this);
    },
    
    toggleDropdown: function(){
      this.state.set({
        expanded: !this.state.get('expanded')
      });
    },
    
    expand: function(){
      this.$el.addClass('nav-button-expanded');
    },
    
    contract: function(){
      this.$el.removeClass('nav-button-expanded');
    }
    
  });
  
  new MenuView();
});