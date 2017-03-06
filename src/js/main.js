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
    'views/app',
    'views/dropdown'
  ],
  function(){
    console.log('Views loaded.');
  }
);