// 2016-08-09
// Setup a mutation listener on the class attribute of certain divs
// fetch('http://localhost:8000/setupListener.js').then(r => r.text()).then(r => eval(r))
//
//fetch('http://191.168.1.133:8000/setupListener.js').then(function(r) {return r.text()}).then(function(r){ eval(r) })
// set up a mutation listener on the class attribute of the the altered divs
$(function() {
  console.log("setupListener: entered");
  (function($) {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    $.fn.attrchange = function(callback) {
      console.log('attrchange: entered');
      if (MutationObserver) {
        var options = {
          subtree: false,
          attributes: true
        };

        var observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(e) {
            callback.call(e.target, e.attributeName);
          });
        });


        return this.each(function() {
          observer.observe(this, options);
        });

      }
    }
  })(jQuery);

  //Now you need to append event listener

  //$('body *').attrchange(function(attrName) {
  $('.editor-left').find('.monaco-editor:eq(0)').attrchange(function(attrName) {

    if(attrName=='class'){
      console.log('class changed');
    }else if(attrName=='id'){
      console.log('id changed');
    }else{
      //OTHER ATTR CHANGED
    }

  });

  $('vt-div').attrchange(function(attrName) {

    if(attrName=='class'){
      console.log('class2 changed');
    }else if(attrName=='id'){
      console.log('id2 changed');
    }else{
      //OTHER ATTR CHANGED
    }

  });
});
