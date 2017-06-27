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
// FIREFOX
Modernizr.addTest('firefox', function () {
 return !!navigator.userAgent.match(/firefox/i);
});
// IE10
Modernizr.addTest('ie10', function() {
  return (/*@cc_on!@*/false && document.documentMode === 10);
});
// IE11
Modernizr.addTest('ie11', function() {
  return (!!document.documentMode && !document.all &&
    (!!window.matchMedia || !!window.msMatchMedia) && !Modernizr.websqldatabase && !Modernizr.cssreflections);
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

	/* ================================== *
	 * KEEP FOOTER @ BOTTOM
	 * ================================== *
	  var footy = $(".footer-wrapper");

    if ((footy.offset().top + footy.height()) >= $(window).height()) {
			footy.css('position', 'inherit');
		} else {
			footy.css({position: 'fixed', bottom: '0px', left: '0px'});
		}
		//END FOOTER @ BOTTOM */

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
	    //==========================================================================
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

/* ========================================================================== *
 * UA LOGIN WIDGET
 *
 * MultiSiteCartLink & UaLoginWidget
 * ========================================================================== *
function openCartLink() {
	window.location.href = nasmCartUrl;
}

function sucessCartCount(data) {
	$(".countlabel").text("(" + data.CartCount + ")");
}

function UaLoginWidget() {

  $.ajax({
		url: window.location.protocol + "//" + window.location.host + '/UAInterrogator.aspx/LoginCheck',
		type: "POST",
		dataType: "json",
		data: '{name:"test"}',
		contentType: 'application/json; charset=utf-8',
		cache: false,
		success: function (data) {

			if ((typeof data.d != 'undefined') && data.d) {
					$('.messageLabel').html(data.d);
					$('.loginPanel').addClass("hidden hidden-sm hidden-xs");
					$('.logoutPanel').removeClass("hidden hidden-sm hidden-xs")

				} else {
					$('.loginPanel').removeClass("hidden hidden-sm hidden-xs")
					$('.logoutPanel').addClass("hidden hidden-sm hidden-xs");

			};

			},
			error: function (xhr) {}
  });

}

function GetCartItemCount() {

	$.getJSON(shopUrlHostname + '/api/OrderManager/GetCartItemCount?callback=?',
		function (data) {
			sucessCartCount(data);
			return false;
		});

}

*/

/*HEADER NAV & SEARCH TOGGLE
function headerSearchOrNav() {

	jQuery("button[data-header-btn='button']").on("click", function() {

		var clicker = jQuery("[data-header-btn=button]").not(jQuery(this)),
				dataTarget = clicker.attr("data-target");

				jQuery(dataTarget).removeClass("in")

	});

}


/* ================================== *
 * ECOMMERCE - BACK ONE PAGE
 * ==================================*/
function backOne() {
	window.history.go(-1);
}
/* ================================== *
 * REMOVE EMPTY WIDGET FIELDS
 * ==================================
jQuery('.widget_').filter(function () {
    return jQuery.trim(jQuery(this).find('.remove-empty').text()).length == 0;
}).remove();
*/
/* ================================== *
 * DISABLE & REMOVE CSS JUNK
 * ==================================
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
*/
/* ======================================================= *
 * MENU DOUBLE TAP
 *
 * By Osvaldas Valutis, www.osvaldas.info
 * Available for use under the MIT License
 *
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

/* ================================== *
 * IE FONTAWESOME, THANKS MICROSOFT
 * ==================================
if (Modernizr.ie10 || Modernizr.ie11) {

	var head = document.getElementsByTagName('head')[0];

	var fa = document.createElement('link');
	    fa.type = 'text/css';
	    fa.rel = 'stylesheet';
	    fa.href = 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
	    head.appendChild(fa);
	    
	var formControlCss = document.createElement('style');
			formControlCss.innerHTML = "select.form-control {padding-top: 0; padding-right: 0; padding-bottom: 0;}";
			head.appendChild(formControlCss);

}
 */