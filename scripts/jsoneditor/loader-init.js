function whenAvailable(name, callback) {
  window.setTimeout(function() {
    if (window[name]) {
      callback(window[name]);
    } else {
      window.setTimeout(arguments.callee, 20);
    }
  }, 20);
}
//WAIT FOR MODERNIZER TO BE DEFINED
whenAvailable("jQuery", function(t) {
 
	$(window).bind("load",function() {
		$(".jsoneditor-value.jsoneditor-array").parent("td")
		.prev("td").prev("td").prev("td").addClass("color-array-btn").find("button").addClass("color-array")
	})
 
});