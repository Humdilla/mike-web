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
    open: false
  });
  
  var HamburgerView = Backbone.View.extend({
    events: {
      'click': 'click'
    },
    
    initialize: function (options) {
      var self = this;
      this.state = new State();
      
      /* Set up State listener */
      this.state.on('change:open', function (model, value) {
        var open = model.changed.open;
        if (open) {
          self.open();
        }
        else {
          self.close();
        }
      });
      
      this.setElement(options.button);
      this.$content = $(options.content);
      this.buttonOpenClass = options.buttonOpenClass;
      this.buttonClosedClass = options.buttonClosedClass;
      this.contentOpenClass = options.contentOpenClass;
      this.contentClosedClass = options.contentClosedClass;
      
      this.close();
    },
    
    open: function () {
      this.$el.removeClass(this.buttonClosedClass);
      this.$el.addClass(this.buttonOpenClass);
    },
    
    close: function () {
      this.$el.removeClass(this.buttonOpenClass);
      this.$el.addClass(this.buttonClosedClass);
    },
    
    click: function (e) {
      this.state.set({open: !this.state.get('open')});
    }
  });
  
  return HamburgerView;
});