/* ----------------------- *
 * CUSTOM EVENTS
 * ----------------------- */
function modernizrResize() {
	
	
	jQuery(".navbar-bottom li:not(:has(ul))").removeAttr("class data-toggle aria-expanded");
		
	var nav_Li_toggle = jQuery(".navbar-bottom > li:has(ul)"),
		link_clicker = {'class': 'dropdown-toggle', 'data-toggle': 'dropdown'};
	

	//MIN WIDTH
    var min_width;
        if (Modernizr.mq('(min-width: 0px)')) {
          // Browsers that support media queries
          min_width = function (width) {
            return Modernizr.mq('(min-width: ' + width + 'px)');
          };
        }
        else {

              // Fallback for browsers that does not support media queries
              min_width = function (width) {
                return jQuery(window).width() >= width;
              };
            }

			
	/* ========================================================================== *
	 * END MODERNIZR RESIZE *
	 * ========================================================================== */	 
	//MODERNIZR RESIZE WRAPPER
	var mod = function() {


		if (min_width(768)) {
		
			var nav_li = jQuery(".dropdown.menu-dropdown");
			
			if (nav_li.hasClass("open")) {			
				nav_li.removeClass("open")
			}
			
			nav_Li_toggle.find("a:first").removeAttr("class data-toggle");
			

		//END MIN 768PX
		} else {
		
			if (!nav_Li_toggle.hasClass("dropdown-toggle")) {
				nav_Li_toggle.find("a:first").attr(link_clicker)
			}
		}


		

            //END MODERNIZR RESIZE WRAPPER
	};

    // Call on every window resize
    jQuery(window).resize(mod);
    mod();

	//jQuery(window).load(mod);

}

/* ========================================================================== *
 * MENU WCAG FOCUS
 * ========================================================================== */
function wcagKeyboardEvents() {

	var MenuDropdowns = jQuery(".navbar-bottom > li:has(ul)"),
		aria_expanded = {'aria-expanded': 'true'},
		aria_hidden = {'aria-expanded': 'false'};

	
	
	
	//link_clicker = {'class': 'dropdown-toggle', 'data-toggle': 'dropdown'};
	//jQuery(".navbar-bottom > li:has(ul)").find("a:first").attr(link_clicker)

	MenuDropdowns.attr({'role':'menuitem','tabindex' : '0','aria-haspopup' : 'true'})
	
	

	MenuDropdowns.on('focus', function() {
		jQuery(".menu-dropdown").not(jQuery(this).removeClass("open").find("a:first").attr(aria_hidden));
		jQuery(this).addClass("open").find("a:first").attr(aria_expanded);
	});

	jQuery(".menu-dropdown > ul > li:last-child").on('focusout', function() {
		jQuery(this).parent().parent().removeClass("open").find("a:first").attr(aria_hidden);
	});

	

/* ======================================================== *
 * UN-BOOTSTRAP MENU LINKS
 * ======================================================== *
	jQuery(".dropdown.menu-dropdown").on("click", function() {
	
		var navToggle = jQuery(".dropdown.menu-dropdown").not(jQuery(this));

			navToggle.removeClass("open").attr(aria_hidden);
			jQuery(this).toggleClass("open").attr(aria_expanded);
		
			functionGotoItem();
	});
	
	
	function functionGotoItem() {
	
	
		jQuery(".navbar-bottom .dropdown-toggle.open a").on("click", function() {
			
			//e.preventDefault();
if (jQuery(this).parent().hasClass("open") || jQuery(this).parent().parent().parent().hasClass("open")) {
			
			

		
		//jQuery(this).closest(".dropdown-toggle").toggleClass("open");

			window.location = jQuery(this).attr("href");
			
} else { 

	jQuery(".dropdown.menu-dropdown").removeClass("open")
	jQuery(this).closest(".dropdown-toggle").toggleClass("open")
}			
			
			 
		});
		
	}
	
	/*
	jQuery(".menu-dropdown").on("click", function() {

		//jQuery(".menu-dropdown").not(jQuery(this).removeClass("open"))
		var clicked = jQuery(".menu-dropdown").not(jQuery(this));

		clicked.removeClass("open").attr(aria_hidden)

		jQuery(this).toggleClass("open").attr(aria_expanded)

		//.prevAll(".menu-dropdown").removeClass("open").nextAll(".menu-dropdown").removeClass("open");

	});
	*/

}

/* ======================================================== *
 * SITEFINITY SEARCH
 * ======================================================== */
jQuery('.search-wrapper').each(function() {
    var searchWrapper = jQuery(this),
		searchInput = searchWrapper.find('input[name="search"]'),
		searchIndex = searchWrapper.find('input[name="search-index"]'),
		searchButton = searchWrapper.find('button');

    searchButton.on( "click", function (e) {
        e.preventDefault();

        var index = searchIndex.val(),
			value = searchInput.val().trim();

        if (index && value !== '') {

            window.location = '/search-results?indexCatalogue=main-search&searchQuery=' + value + '&wordsMode=0';
        }
    });

    searchInput.keypress(function (e) {
        var key = e.which;

        // the enter key code
        if(key == 13) {
            searchButton.click();
            return false;
        }
    });
});


/* ================================== *
 * SITEFINITY PAGER
 * ==================================*/
function sfPagerNumeric() {
	jQuery(".sf_pagerNumeric").find("a").wrap("<li></li>").parent().wrapAll("<ul class='pagination'></ul>");
	
	
	var nextLink = jQuery(".sf_pagerNumeric + a[id*='_pager']:first");
	
	if (nextLink.length) {
	
		//nextLink.prev("div").find("ul").append("<li class='next'></li>")
		
		nextLink.detach().appendTo(".sf_pagerNumeric .pagination").wrap("<li class='next'></li>")
		
		//nextLink.detach().appendTo(".sf_pagerNumeric .pagination .next").nextAll("li.next").remove()
	}
	
}
/* ================================== *
 * REMOVE EMPTY WIDGET FIELDS
 * ==================================*/
jQuery('.widget_').filter(function () {
    return jQuery.trim(jQuery(this).find('.remove-empty').text()).length == 0;
}).remove();

/* ================================== *
 * DISABLE & REMOVE CSS JUNK
 * ==================================*/
	var minCss = $('link[id*="mincss"]'),
		garbageJS = $('script[src*="/Telerik.Web.UI.WebResource.axd?"]');

if ( (window.location.href.indexOf("/Action/Edit") != -1) && (document.referrer.indexOf("/Sitefinity/Pages") > -1) ) {

	minCss.addClass("Sitefinity-garbage-css");
	garbageJS.addClass("Sitefinity-garbage-js");

} else {

	for (i = 0; i < minCss.length; i++) {
		minCss.prop('disabled', true);
		minCss.remove();
	}

	for (i = 0; i < garbageJS.length; i++) {
		garbageJS.remove();
	}

}


/* ======================================================= *
 * MENU DOUBLE TAP
 *
 * By Osvaldas Valutis, www.osvaldas.info
 * Available for use under the MIT License
 *
 function devicesDoubleTapInit() {

	;(function( $, window, document, undefined ) {
		$.fn.doubleTapToGo = function( params ) {
			if( !( 'ontouchstart' in window ) &&
				!navigator.msMaxTouchPoints &&
				!navigator.userAgent.toLowerCase().match( /windows phone os 7/i ) ) return false;

			this.each( function() {
				var curItem = false;

				$( this ).on( 'click', function( e ) {
					var item = $( this );
					if( item[ 0 ] != curItem[ 0 ] ) {
						e.preventDefault();
						curItem = item;
					}
				});

				$( document ).on( 'click touchstart MSPointerDown', function( e ) {
					var resetItem = true,
						parents	  = $( e.target ).parents();

					for( var i = 0; i < parents.length; i++ )
						if( parents[ i ] == curItem[ 0 ] )
							resetItem = false;

					if( resetItem )
						curItem = false;
				});
			});
			return this;
		};
	})( jQuery, window, document );


	//INIT DOUBLE TAP FUNCTION
	jQuery(".navbar-bottom > li:has(ul)").doubleTapToGo();

}
*/

/* ================================== *
 * MODERNIZR INIT
 * ================================== */
jQuery(function(){

	//Responsive Function
	modernizrResize();
	
	//devicesDoubleTapInit()

});

/* ======================================================== *
 * UN-BOOTSTRAP MENU LINKS
 * ========================================================
jQuery(document).on('click.nav','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).removeClass('in').addClass('collapse');
    }
});
 */
/* ================================== *
 * DOC LOAD
 * ================================== */
jQuery(document).ready(function() {

/*		
	jQuery(".navbar-bottom > li:not(.dropdown-toggle) > a").on("click", function (e) {
		e.preventDefault();
         window.location = jQuery(this).attr("href");
		 
		// alsoDropDownToggle();

	});	
	

function alsoDropDownToggle() {
		
		var action = 1;

		jQuery(".navbar-bottom > li.dropdown-toggle > a").on("click", dropDownToggleGo);

		function dropDownToggleGo() {
		
		
			if ( action == 1 ) {
				
				jQuery(this).closest(".dropdown-toggle").toggleClass("open")
				//$("body").css("background", "red");
				action = 2;
				
			} else {
			

				 window.location = jQuery(this).attr("href");
				action = 1;
			}
		
		
		}
		
	}
*/


	wcagKeyboardEvents()
	
	jQuery('.dropdown-toggle').dropdown()
	
	sfPagerNumeric();

});