
(function() {

  // 'getFormsData' function, credits go to:
  // https://github.com/bgrins/devtools-snippets/tree/master/snippets/formcontrols

  function getFormsData(){
      var forms = document.querySelectorAll("form");


      // credits to :
      // https://github.com/bgrins/devtools-snippets/blob/master/snippets/formcontrols/formcontrols.js

      for (var i = 0, len = forms.length; i < len; i++) {
        var tab = [ ];
        ["input", "textarea", "select"].forEach(function (control) {
          [].forEach.call(forms[i].querySelectorAll(control), function (node) {
            tab.push({
              "element": node,
              "type": node.type,
              "name": node.name,
              "value": node.value,
              "prettyValue": (isNaN(node.value) || node.value === "" ? node.value : parseFloat(node.value))
            });
          });
        });

        return tab;
      }
  }

// use connect for a long-time messaging.

var port = chrome.runtime.connect({name: "formToJSON"});

port.onMessage.addListener(function(msg) {

  // background script is looking for forms data.
  if(msg.command && msg.command == 'getFormsValues'){
    var date = new Date();

    data = {
      link:window.location.href,
      timestamp: date.getTime(),
      day: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
      data: getFormsData(),

    }
    port.postMessage({type:'answer',data});

  }

});

})();
