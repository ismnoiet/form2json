senderDetails = {};
var globalPort;

// 'save' function, credits go to:
// https://github.com/bgrins/devtools-snippets/blob/master/snippets/console-save/console-save.js
function save(data,filename){

	filename = (filename) ? filename : 'formInput.json';

	if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
}

chrome.browserAction.onClicked.addListener(function(tab){
	
	if(!globalPort){
		alert('Make sure to refresh your web page before you click this extension icon');
	}else{
		globalPort.postMessage({command:'getFormsValues'});	
	}
	
});


chrome.runtime.onConnect.addListener(function(port){

	globalPort = port;

	port.onMessage.addListener(function(msg,port){	
		if(msg && msg.type == 'answer'){
			save(msg.data);
		}
	})

})





