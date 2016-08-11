//fetch('http://localhost:8000/setupTheme.js').then(r => r.text()).then(r => eval(r))/ 2016-08-10
// based on code from:
//  http://stackoverflow.com/questions/3219758/detect-changes-in-the-dom
//
//fetch('http://localhost:8000/setupListener2.js').then(r => r.text()).then(r => eval(r))
//

var VT_HELPER = {
  dummy : function () {
    return "howdy pardner";
  },

  getActiveFileForEditor : function ($editorNode) {
     var $tabs = $editorNode.find('.tabs-container').children();

     console.log('getActiveFileForEditor: $tabs=' + $tabs);
    //  $tabs.each(function (i,v) {
    //    if( $(this).attr('aria-selected') === 'true' ) {
    //       return $(this).attr('title');
    //    }
    //  });
    for(var i=0; i < $tabs.length; i++) {
      if( $($tabs[i]).attr('aria-selected') === 'true' ) {
        return $($tabs[i]).attr('title');
      }
    }
  },

};

// end helper methods

var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback){
        if( MutationObserver ){
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                    callback();
            });
            // have the observer observe foo for changes in children
            obs.observe( obj, { childList:true, subtree:true });
        }
        else if( eventListenerSupported ){
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    }
})();

console.log('setupListener2: entered');
console.log('setupListener2: VT.dummy says ' + VT_HELPER.dummy());
//console.log('setupListener2: VT.dummy says hi');
// Observe a specific DOM element:
//observeDOM( document.getElementById('workbench.editors.stringEditor') ,function(){
observeDOM( document.getElementById('workbench.editors.files.textFileEditor') ,function(){
    console.log('dom changed');
    var $node= $('#workbench\\.editors\\.files\\.textFileEditor').children().first();
    //var $node = $('.editor-left').find('.editor-container');
    console.log('$node.class=' + $node.attr('class'));

    if (typeof $node != "undefined" ) {

      var nodeClass = $node.attr('class');

      redThemeClass = 'vscode-theme-red-themes-red-tmTheme';
      solarizedDarkThemeClass = 'vscode-theme-solarized-dark-themes-Solarized-dark-tmTheme';
      var newThemeClass = 'vscode-theme-kimbie-dark-themes-Kimbie_dark-tmTheme';

      if (!nodeClass.match(new RegExp(newThemeClass)) ) {

        var newNodeClass;

//        if(VT_HELPER.getActiveFileForEditor($node.parent().match(/monadutils/)) {
        var $nodeBase = $('#workbench\\.editors\\.files\\.textFileEditor')
          .first();

        var activeFile = VT_HELPER.getActiveFileForEditor($nodeBase.parent());
        console.log("activeFile=" + activeFile);

        if(activeFile.match(new RegExp('monadutils'))) {
          //console.log('found monadutils.js so would set red theme here');
          console.log('found monadutils.js so would set solarizedDark theme here');
          //newNodeClass = nodeClass.replace(/vscode-theme.*\b/, redThemeClass);
          newNodeClass = nodeClass.replace(/vscode-theme.*\b/, solarizedDarkThemeClass);

          // overflow-guard.scrollable-element
          var scrollableClass = $('.editor-left').find('.overflow-guard')
            .children('.monaco-scrollable-element').attr('class');
          var newScrollableClass = scrollableClass.replace(/vscode-theme.*\b/, redThemeClass);
          $('.editor-left').find('.overflow-guard')
          .children('.monaco-scrollable-element')
          .attr('class', newScrollableClass);

          var bodyClass = $('body').attr('class');

          var newBodyClass = bodyClass.replace(/vscode-theme.*\b/, redThemeClass);

          $('body').attr('class', newBodyClass);
        }
//        if (VT_HELPER.getActiveFileForEditor($nodeBase.parent())
//            .match(new RegExp('monadutils') ))
//        {
//            console.log('found monadutils.js so would set red theme here');
//        }
        else {
          newNodeClass = nodeClass.replace(/vscode-theme.*\b/, newThemeClass);
        }
        $node.attr('class', newNodeClass);
      }
    }

});
