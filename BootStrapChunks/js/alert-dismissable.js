
jQuery(".alert-dismissable button").on("click", function() {
	jQuery(this).parent(".alert-dismissable").remove()
})