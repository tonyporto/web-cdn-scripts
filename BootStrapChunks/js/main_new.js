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
	return (!!navigator.userAgent.match(/MSIE/i) || !!navigator.userAgent.match(/Trident\/7\./));
});

//SAFARI
Modernizr.addTest('safari', function() {
	return (/Safari\/\d./i.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor));
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
	var nav_li = ".nav-justified:not(.touch)",
			sub_drop = ".menu-dropdown",
			aria_expanded = {'aria-expanded': 'true'},
			aria_hidden = {'aria-expanded': 'false'};

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

		// UN-BOOTSTRAP MOBILE NAVIGATION TO MAKE IT USABLE
			$(sub_drop + "> a").hover(function () {
				jQuery(this).attr(aria_expanded).parent().addClass("open")
			}, function () {
				jQuery(this).attr(aria_hidden).parent().removeClass("open")
		  });

		//MIN WIDTH 992px
		if (min_width(992)) {

			//REMOVE OPEN MOBILE NAVIGATION TRIGGER & SUBMENU
			$(".nav-justified").removeClass("touch")
			
			if ($(sub_drop).hasClass("open")) {
				$(sub_drop).removeClass("open")
			}
			
		//END MIN 992PX
		} else {
			$(".nav-justified").addClass("touch")
		}

		//END MODERNIZR RESIZE WRAPPER
	};

  // Call on every window resize
  jQuery(window).resize(mod);
  mod();

  /* ========================================== *
	 * TAB NAVIGATION
	 * ========================================== */
	$(nav_li + " " + sub_drop + "> a").on('focus', function() {
		if (($(this).is(":focus")) && ($(this).parent().has(sub_drop).length > 0)) {
			$(sub_drop + "> ul > " + sub_drop + "> a").on('focus', function() {
				$(this).attr(aria_expanded).parent().addClass("open")

			})
		}

		$(sub_drop + "> a").not($(this).attr(aria_hidden).parent().removeClass("open"));
		$(this).attr(aria_expanded).parent().addClass("open")

	});

	/* NAVIGATION ON FOCUSOUT
	 * ============================================ */
	$(nav_li + " li > ul > li").on('focusout', function() {

		if ($(this).is(nav_li + " li > ul > li:not("+sub_drop+"):last-child")) {
			$(this).parent().parent().removeClass("open").find("a:first").attr(aria_hidden);

		} else {

			if ($(this).has(sub_drop)) {
				$(sub_drop + "> ul > " + sub_drop + " > ul > li:last-child").on('focusout', function() {
					$(this).parent().parent().removeClass("open").find("a:first").attr(aria_hidden);
					$(this).closest(sub_drop).parent().parent()
						.removeClass("open").find("a:first").attr(aria_hidden);
				})
			}
		}

	});

	/* ============================================ *
	 * BACK TO TOP AFTER FOCUSOUT FROM LAST LINK
	 * ============================================ */
	jQuery(".footer-wrapper a:last").on('focusout', function() {
		if ($(".header-container-top a").length > 0){
			jQuery("html, body").animate({
				scrollTop: jQuery(".header-container-top").offset().top
			}, 800);
		} else {
			jQuery("html, body").animate({
				scrollTop: jQuery(".header-container-bottom a:first").offset().top
			}, 800);
		}
	});

	/* =============================== *
	 * ONE TOUCH CLICK FOR IOS
	 * =============================== */
	if (Modernizr.ios) {
		jQuery(sub_drop + " > ul > li > a").on("touchend", function(event) {
			window.location.href = $(this).attr("href");
		});
	} //end

	/* ============================================= *
	 * DEVICE CLICK
	 * ============================================= */	
	if (Modernizr.touchevents) {
	
		var aria_expanded = {'aria-expanded': 'true'},
				aria_hidden = {'aria-expanded': 'false'};
		/*
		sub_drop.on("hover", function() {
			sub_drop.not($(this).removeClass("open"))
			$(this).addClass("open")
		})
		*/
		$(".menu-dropdown").on("click", function() {
		
			$(".menu-dropdown").not($(this).prev("ul > li.open").removeClass("open").next("a").attr(aria_hidden))
			$(this).addClass("open").next("a").attr(aria_expanded)

		})

	}
 /* ================================= *
  * MENU DOUBLE TAP
  * ================================= */
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
	setTimeout(function(){
		jQuery(sub_drop + "," + sub_drop +">ul>"+ sub_drop).doubleTapToGo();
	},100);

}

/* ================================== *
 * ECOMMERCE - BACK ONE PAGE
 * ==================================*/
function backOne() {
	window.history.go(-1);
}

/* ================================== *
 * MODERNIZR INIT
 * ================================== */
jQuery(function(){

	//Responsive Function
	modernizrResize()

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
        $.get("/api/ProductList/GetPrimaryProducts?",
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
	favIco = "/ResourcePackages/Main/assets/Images/favicon.png";

	if (!$("link[rel*=shortcut]").length) {

		var fav = createEl("link");
				fav.rel = "shortcut icon";
				fav.href = favIco;
				head.appendChild(fav);

	}

/* ============================================= *
 * IE FONTAWESOME,FORMS, FLEXBOX FIX
 * ============================================= */
if (Modernizr.ie) {

	var ieCss = createEl("style");
			ieCss.innerHTML = ".form-control{padding-top:0;padding-bottom:0;line-height:32px} select.form-control{padding-right:0} .form-control.input-lg{line-height:44px}"
			+ "main[role], [class*=-flex-column] {-ms-flex-direction: column;}[class*=display-flex] {display: -ms-flexbox;}[class*=-flex-center] {-ms-flex-align: center;}[class*=-flex-stretch] {-ms-align-items: stretch;}.flex-wrapper {-ms-flex: 1 0 auto;}"
			+ "@media (min-width:768px) {.flex-reverse-sm {-ms-flex-direction:row-reverse;}}";
			head.appendChild(ieCss);

		//IF IE 11
		if (!!navigator.userAgent.match(/Trident\/7\./)) {
			var ie11Css = createEl("style");
					ie11Css.innerHTML = "[class*=-flex-column] {-ms-flex-flow: row wrap;}"
					head.appendChild(ie11Css);
		}

	var fa = createEl("link");
			fa.rel = "stylesheet";
			fa.href = "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
			head.appendChild(fa);

}

/* =============================== *
 * SAFARI FLEXBOX THANKS APPLE
 * =============================== */
if (Modernizr.safari && !Modernizr.flexbox) {
	var sflxLCss = createEl("style");
			sflxLCss.innerHTML = ".main[role] {-webkit-box-orient: vertical;}.display-flex-center{display:-webkit-box;-webkit-box-align:center;}.flex-wrapper {-webkit-box-flex: 1;}";
			head.appendChild(sflxLCss);

}

/* =============================== *
 * IOS & IPADS THANKS APPLE
 * =============================== */
if (Modernizr.ios) {
	var iosCss = createEl("style");
			iosCss.innerHTML = "[class*=display-flex]:before, [class*=display-flex]:after{display: none;}";
			head.appendChild(iosCss);
}