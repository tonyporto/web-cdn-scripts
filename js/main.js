/* =============================== *
 * CUSTOM EVENTS
 * =============================== */
function modernizrResize() {

	//MOBILE NAVIGATION VARIABLES
	var nav_li = ".nav-justified > li",
			sub_drop = ".sub-dropdown",
			aria_expanded = {'aria-expanded': 'true'},
			aria_hidden = {'aria-expanded': 'false'};

	//MIN WIDTH
  var min_width;
    if (Modernizr.mq('(min-width: 0px)')) {
      // Browsers that support media queries
      min_width = function (width) {
        return Modernizr.mq('(min-width: ' + width + 'px)');
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

		if (min_width(992)) {

			//REMOVE OPEN MOBILE NAVIGATION TRIGGER & SUBMENU
			if ($(sub_drop).hasClass("open")) {
				$(sub_drop).removeClass("open")
			}

		//END MIN 992PX
		}


		//END MODERNIZR RESIZE WRAPPER
	};
  // Call on every window resize
  jQuery(window).resize(mod);
  mod();


  /* ========================================== *
	 * TAB NAVIGATION
	 * ========================================== */
	$(sub_drop + "> a").on('focus', function() {
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
	jQuery(nav_li + " > ul > li").on('focusout', function() {

		if ($(this).is(nav_li + " > ul > li:not(.sub-dropdown):last-child")) {
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
	jQuery(".nav-justified > li.sub-dropdown").doubleTapToGo();

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

/* ============================================= *
 * APPEND ELEMENTS TO MAIN.BASE
 * ============================================= */
var createEl = document.createElement.bind(document),
		head = document.getElementsByTagName("head")[0],
		
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