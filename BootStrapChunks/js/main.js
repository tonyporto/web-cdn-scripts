/* =============================== *
 * BROWSER COMPATABILITY TESTS
 * =============================== */
//IOS
Modernizr.addTest('ios', function() {
	return navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
});
//ANDROID
Modernizr.addTest('android', function() {
	return navigator.userAgent.match(/(Android)/g);
});
//IE
Modernizr.addTest('ie',function(){
	return!!navigator.userAgent.match(/MSIE/i)
});
//EDGE
Modernizr.addTest('edge', function() {
  return (/Edge\/\d./i.test(navigator.userAgent));
});

/* =============================== *
 * CUSTOM EVENTS
 * =============================== */
function modernizrResize() {

	//MOBILE NAVIGATION VARIABLES
	var nav_li = ".nav-justified > li",
			menu_dropdown = jQuery(nav_li + " > .dropdown-menu"),
			dropdown_menu = jQuery(nav_li + ":has(ul)"),
			aria_expanded = {'aria-expanded': 'true'},
			aria_hidden = {'aria-expanded': 'false'};

	//REMOVE CLASSES FROM ITEMS WITHOUT UL
	jQuery(nav_li + ":not(:has(ul))").removeAttr("class data-toggle aria-expanded");

	//MIN WIDTH
  var min_width;
    if (Modernizr.mq('(min-width: 0px)')) {
      // Browsers that support media queries
      min_width = function (width) {
        return Modernizr.mq('(min-width: ' + width + 'px)');
      };

    } else {

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

		/* ================================================= *
		 * UN-BOOTSTRAP MOBILE NAVIGATION TO MAKE IT USABLE
		 * ================================================= */
			dropdown_menu.hover(function () {
				jQuery(this).addClass("open").removeClass("hidden").attr(aria_expanded)
			}, function () {
				jQuery(this).removeClass("open").addClass("hidden").attr(aria_hidden);
		  });

		if (min_width(992)) {

			//REMOVE OPEN MOBILE NAVIGATION TRIGGER & SUBMENU
			menu_dropdown.removeClass("hidden")

			if (dropdown_menu.hasClass("open")) {
				dropdown_menu.removeClass("open")
			}

		//END MIN 992PX
		} else {

			//UN-BOOTSTRAP MOBILE NAVIGATION TO MAKE IT USABLE
	    //==================================================
			menu_dropdown.addClass("hidden")

		// END MIN 0 to MAX 767px
		}

		//END MODERNIZR RESIZE WRAPPER
	};

  // Call on every window resize
  jQuery(window).resize(mod);
  mod();

  /* ========================================== *
	 * TAB NAVIGATION
	 * ADD ATTRIBUTES TO MAKE MENU FOCUSABLE
	 * ========================================== */
	dropdown_menu.attr({'role':'menuitem','tabindex' : '0','aria-haspopup' : 'true'})

	dropdown_menu.on('focus', function() {
		jQuery(".menu-dropdown").not(jQuery(this).removeClass("open").find("a:first").attr(aria_hidden));
		jQuery(this).addClass("open").find("a:first").attr(aria_expanded);
	});

	jQuery(nav_li + " > ul > li:last-child").on('focusout', function() {
		jQuery(this).parent().parent().removeClass("open").find("a:first").attr(aria_hidden);
	});

	/* =============================== *
	 * ONE TOUCH CLICK FOR IOS
	 * =============================== */
	if (Modernizr.ios) {

		jQuery(".menu-dropdown > ul > li > a").on("touchend", function(event) {
			window.location.href = $(this).attr("href");
		});

	} //end

}

/* ================================== *
 * ECOMMERCE - BACK ONE PAGE
 * ==================================*/
function backOne() {
	window.history.go(-1);
}

/* ======================================================= *
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
	jQuery(".nav-justified > li.menu-dropdown").doubleTapToGo();

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
 * FOOTER COPYRIGHT YEAR
 * ================================== */
if ($(".copyright-year")[0]){
var thecurrentyear = new Date().getFullYear();
	document.getElementsByClassName('copyright-year')[0].innerHTML= thecurrentyear;
}

/* ================================== *
 * HIDE ORGANIZATION SPECIFIC PRODUCT LIST PAGE
 * ================================== */
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

$("a[id*='orgspecificproducts']").each(function (i, el) {
    if (readCookie("OrgId") == null) {
        $(this).parent().remove();
    }
    else {
        $.get("/api/ProductGroup/GetProductGroupsWithFirstProduct?",
            {
                deptName: '',
                currentPage: 24,
                itemsPerPage: 24,
                sortBy: 'Title',
                reverse: false,
                displayOrgSpecificProducts: true,
                priceFilters: '',
                categoryFilters: ''
            }, false)
            .done(function (result) {
                if (typeof result.count != 'undefined' && result.count <= 0) {
                    el.parentElement.remove();
                }
            })
            .fail(function () {
                el.parentElement.remove();
            });
    }
});

/* ============================================= *
 * APPEND ELEMENTS TO MAIN.BASE
 * ============================================= */
var createEl = document.createElement.bind(document),
		head = document.getElementsByTagName("head")[0],

/* ================================ *
 * FAVICON IF VARIABLE IS DEFINED
 * ================================ */
	//favIco = "/ResourcePackages/Main/assets/Images/favicon.png";
	favIco = "";

	if (favIco.length > 0) {

		var fav = createEl("link");
				fav.rel = "shortcut icon";
				fav.href = favIco;
				head.appendChild(fav);

	}

/* ============================================= *
 * IE FONTAWESOME & FORMS FIX THANKS MICROSOFT
 * ============================================= */
if (Modernizr.ie) {

	var ieCss = createEl("style");
			ieCss.innerHTML = ".form-control{padding-top:0;padding-bottom:0;line-height:32px} select.form-control{padding-right:0} .form-control.input-lg{line-height:44px}";
			head.appendChild(ieCss);

	var fa = createEl("link");
			fa.rel = "stylesheet";
			fa.href = "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
			head.appendChild(fa);

}