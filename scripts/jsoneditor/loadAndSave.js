editor.set(json);
var json = editor.get(json);

// Load a JSON document
FileReaderJS.setupInput(document.getElementById('loadDocument'), {
    readAsDefault: 'Text',
    on: {
      load: function (event, file) {
        editor.setText(event.target.result);
      }
    }
});

// Save a JSON document
document.getElementById('saveDocument').onclick = function () {
  var blob = new Blob([editor.getText()], {type: 'application/json;charset=utf-8'});
    
	var filename = location.href.substr(location.href.lastIndexOf('/') + 1).split('.')[0];
  saveAs(blob, filename+".json");
};


$(window).bind("load",function() {
	$(".jsoneditor-value.jsoneditor-array").parent("td")
	.prev("td").prev("td").prev("td").addClass("color-array-btn").find("button").addClass("color-array")
})