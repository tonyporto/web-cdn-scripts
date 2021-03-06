/* ----------------------- *
 * CUSTOM EVENTS
 * ----------------------- */
function modernizrResize() {

	jQuery(".navbar-bottom li:not(:has(ul))").removeAttr("class data-toggle aria-expanded");

	//MOBILE NAVIGATION VARIABLES
	var menu_dropdown = jQuery(".navbar-bottom > li > .dropdown-menu"),
		dropdown_menu = jQuery(".navbar-bottom > li:has(.dropdown-menu)");


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

			//REMOVE OPEN MOBILE NAVIGATION TRIGGER & SUBMENU
			menu_dropdown.removeClass("hidden")
			jQuery("#main-nav-toggle").removeClass("in")

			if (dropdown_menu.hasClass("open")) {
				dropdown_menu.removeClass("open")
			}

		//END MIN 768PX
		} else {

		    /* ========================================================================== *
			 * UN-BOOTSTRAP MOBILE NAVIGATION TO MAKE IT USABLE
			 * ========================================================================== */
			menu_dropdown.addClass("hidden")

			dropdown_menu.hover(function () {
				jQuery(this).addClass("open").find(".dropdown-menu").removeClass("hidden");
			}, function () {
				jQuery(this).removeClass("open").find(".dropdown-menu").addClass("hidden");
		    });

		// END MIN 0 to MAX 767px
		}

		//END MODERNIZR RESIZE WRAPPER

	};

    // Call on every window resize
    jQuery(window).resize(mod);
    mod();

}

/* ========================================================================== *
 * MENU WCAG FOCUS
 * ========================================================================== */
function wcagKeyboardEvents() {

	var MenuDropdowns = jQuery(".navbar-bottom > li:has(ul)"),
		aria_expanded = {'aria-expanded': 'true'},
		aria_hidden = {'aria-expanded': 'false'};


	MenuDropdowns.attr({'role':'menuitem','tabindex' : '0','aria-haspopup' : 'true'})

	MenuDropdowns.on('focus', function() {
		jQuery(".menu-dropdown").not(jQuery(this).removeClass("open").find("a:first").attr(aria_hidden));
		jQuery(this).addClass("open").find("a:first").attr(aria_expanded);
	});

	jQuery(".menu-dropdown > ul > li:last-child").on('focusout', function() {
		jQuery(this).parent().parent().removeClass("open").find("a:first").attr(aria_hidden);
	});


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

		nextLink.detach().appendTo(".sf_pagerNumeric .pagination").wrap("<li class='next'></li>")

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
 * MENU DOUBLE TAP
 *
 * By Osvaldas Valutis, www.osvaldas.info
 * Available for use under the MIT License
 * ======================================================= */
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
	jQuery(".navbar-bottom > li.menu-dropdown").doubleTapToGo();

}

/* ================================== *
 * MODERNIZR INIT
 * ================================== */
jQuery(function(){

	//Responsive Function
	modernizrResize()
	devicesDoubleTapInit();

});


/* ================================== *
 * DOC LOAD
 * ================================== */
jQuery(document).ready(function() {

	wcagKeyboardEvents()
	sfPagerNumeric();

});