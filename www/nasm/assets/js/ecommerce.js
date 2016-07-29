
function backOne() {
	window.history.go(-1);
}

/* ====================================================================
 * ADDING TO SHOPPING CART WIDGET BUTTON
 ==================================================================== */
(function ($) {

/**
* @function
* @property {object} jQuery plugin which runs handler function once specified element is inserted into the DOM
* @param {function} handler A function to execute at the time when the element is inserted
* @param {bool} shouldRunHandlerOnce Optional: if true, handler is unbound after its first invocation
* @example $(selector).waitUntilExists(function);
*/

$.fn.waitUntilExists	= function (handler, shouldRunHandlerOnce, isChild) {
	var found	= 'found';
	var $this	= $(this.selector);
	var $elements	= $this.not(function () { return $(this).data(found); }).each(handler).data(found, true);

	if (!isChild)
	{
		(window.waitUntilExists_Intervals = window.waitUntilExists_Intervals || {})[this.selector] =
			window.setInterval(function () { $this.waitUntilExists(handler, shouldRunHandlerOnce, true); }, 500)
		;
	}
	else if (shouldRunHandlerOnce && $elements.length)
	{
		window.clearInterval(window.waitUntilExists_Intervals[this.selector]);
	}

	return $this;
}

}(jQuery));


/*
jQuery(".sfFocused").waitUntilExists(function() {

	jQuery(".comments-textarea").on("focus", function() {


})


jQuery(".sfcommentsSubmitBtn").on("click", function() {
	
	
	
})*/

jQuery(".comments-textarea .sfError").waitUntilExists(function() {

	jQuery(this).each(function() {

		jQuery(this).parent().addClass("form-error");
		
	})

});

/*
function commentsFormFocus() {

	jQuery('fieldset .form-control-textarea').focusin(function(){
		jQuery(this).addClass('form-control-focus');
	});
	jQuery('fieldset .form-control-textarea').focusout(function(){
		jQuery(this).removeClass('form-control-focus');
	});
}



jQuery(document).ready(function() {

	jQuery(".nasm-sfcomments-name input").attr("placeholder", "Name");
	jQuery(".nasm-sfcomments-email input").attr("placeholder", "Email");

});
*/