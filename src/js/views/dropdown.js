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
    
    initialize: function(options){
      var self = this;
      this.dropDowns = [];
      this.$el.children('.dropdown').each(function(i, el){
        self.dropDowns.push(new DropdownView({
          el: el,
          parent: self,
          index: i
        }));
      });
    },
    
    expand: function(){
      this.$el.removeClass('page-nav-contracted');
      this.$el.addClass('page-nav-expanded');
    },
    
    contract: function(){
      this.$el.removeClass('page-nav-expanded');
      this.$el.addClass('page-nav-contracted');
    }
    
  });
  
  var DropdownView = Backbone.View.extend({
    
    events: {
      'click': 'toggleDropdown'
    },
    
    initialize: function(options){
      this.setElement(options.el);
      
      this.parent = options.parent;
      this.index = options.index;
      this.height = this.$el.outerHeight();
      this.expandedTop = this.index * this.height;
      
      /* Set initial position */
      this.$el.css({
        top: `calc(${this.index * 80}px)`
      });
      
      this.state = new State();
      this.state.on('change:expanded', function (model, value) {
        if (this.state.get('expanded')) {
          /* Contract all dropdowns */
          this.parent.dropDowns.forEach(function (dropDown) {
            dropDown.contractDropdown();
          });
          /* Set positions of all dropdowns below this one */
          this.parent.dropDowns.slice(this.index+1).forEach(function (dropDown) {
            dropDown.$el.css({
              top: `calc(100% - ${dropDown.index*80}px)`
            });
          });
          this.expandDropdown();
        }
        else {
          this.contractDropdown();
        }
      }, this);
    },
    
    toggleDropdown: function(){
      this.state.set({
        expanded: !this.state.get('expanded')
      });
    },
    
    expandDropdown: function(){
      this.parent.expand();
      this.$el.addClass('nav-button-expanded');
      this.$el.css({
        top: this.expandedTop + 'px'
      });
    },
    
    contractDropdown: function(){
      this.$el.removeClass('nav-button-expanded');
    }
    
  });
  
  new MenuView();
});