function responsiveTables() {

	//TABLE PLUGIN VARIABLES
	var thead = ".table-break > thead",
			tbody_tr = "tbody > tr";
		
		jQuery(".table-break "+ tbody_tr).each(function() {
		
			//ADD COUNTER'S TO TD'S
		  jQuery(this).find("td").addClass(function(i){
		    return 'title-' +(i+1);
		  })
		    
		  //TAG EMPTY TD's
		  jQuery(this).addClass("tr-rows").find("td:empty").addClass("td-empty")
		  jQuery(this).find("td").prepend("<div class='hidden-sm'/>")
		
			//ADD COUNTER'S TO TD > DIV
		  jQuery(this).find("td > div").addClass(function(i){
		      return 'title-' +(i+1);
		  })
		
		});
	
		//STRUCTIURE THEAD TITLE
		jQuery(thead +" > tr").each(function() {
	
			//ADD SPAN
			jQuery(this).find("span").wrapInner("<span />")
			//ADD COUNTER'S TO THEAD SPAN
			jQuery(this).find("span > span").addClass(function(i){
		      return 'title-' +(i+1);
		  })
		});
	
		//ADD TO THEAD TITLE TO EACH TD
		jQuery(tbody_tr+ " > td").each(function() {
	
			var i,
		      thlen = jQuery(thead +" > tr > th > span > span").length;
	
		      for(i = 0; i < thlen; i ++) {
	
						var thtext = jQuery(thead +" > tr > th > span > span.title-" +(i+1)).text();
	
				      tt = thtext;
				      thdivCls = "title-" +(i+1);
		          jQuery(this).slice(0,1).find("div."+thdivCls).append(tt)
	
		      }
	
		});
	
		/* MODERNIZR RESIZE WRAPPER
		 * ================================ */
		var tables = function() {
	
			if (Modernizr.mq('(max-width: 767px)')) {
			
					//ADD HIDDEN CLASS & REMOVE EMPTY
					jQuery(thead+"," + tbody_tr+ " > .td-empty").addClass("hidden-xs")
					jQuery(tbody_tr+ " > .td-empty > div").remove()		
					jQuery(".table-break tr:not(thead > tr), .table-break tr > td").addClass("center-xs-block")
				
					//TITLE STYLES
					jQuery(tbody_tr+ " > td:not(.td-empty) > div").css({
				    'padding-bottom' : '6px',
				    'text-align' : 'center',
				    'margin' : '0 -10px',
				    'border-bottom' : '1px solid #d3d3d3',
				    'font-size' : '14px',
				    'font-weight' : 'bold',
				    'color' : '#444',
					});			
					jQuery(tbody_tr+ " > .td-empty").css({
				    'padding' : '0',
				    'margin' : '-1px'
					});
			
				// END MIN 0 to MAX 767px
				} else {
	
					//REMOVE STYLES
					jQuery(tbody_tr+ " > .td-empty").removeAttr("style")
	
			// END MIN 768px
			}
	
			//END MODERNIZR RESIZE WRAPPER
		};
	
	    // Call on every window resize
	    jQuery(window).resize(tables);
	    tables();

}

/* INIT SCRIPT WHEN MODERNIZER AVAILABLE
 * ======================================== */
function whenAvailable(name, callback) {
 
    var interval = 10; // ms
 
    window.setTimeout(function() {
        if (window[name]) {
            callback(window[name]);
        } else {
            window.setTimeout(arguments.callee, interval);
        }
    }, interval);
}
 
//WAIT FOR MODERNIZER TO BE DEFINED
whenAvailable("Modernizr", function(t) {
 
    //INIT TABLES
    responsiveTables()
     
});