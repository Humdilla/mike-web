require.config({
  paths: {
    jquery: 'lib/jquery-3.1.1',
    backbone: 'lib/backbone',
    underscore: 'lib/underscore'
  },
  shim: {
  }
});

/* Load views */
require(
  [
    'views/hamburger'
  ],
  function(Hamburger){
    new Hamburger({
      button: '#hamburger-button',
      content: '#hamburger-content',
      buttonOpenClass: 'hamburger-button-open',
      buttonClosedClass: 'hamburger-button-closed',
      contentOpenClass: 'hamburger-content-open',
      contentClosedClass: 'hamburger-content-closed'
    });
    
    console.log('Views loaded.');
  }
);