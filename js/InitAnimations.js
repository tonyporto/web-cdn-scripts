function animatecss(){

	url = 'http://cdn.jsdelivr.net/animatecss/3.4.0/animate.css'; 
	if (document.createStyleSheet) { 
		document.createStyleSheet(url); 
		
		} else { 
		
		$('<link rel="stylesheet" type="text/css" href="' + url + '" />').appendTo('head'); 
		
	}

}

function onScrollAnimationInit(){

            function onScrollInit( items, trigger ) {
                items.each( function() {
                var osElement = $(this),
                    osAnimationClass = osElement.attr('data-os-animation'),
                    osAnimationDelay = osElement.attr('data-os-animation-delay');
                  
                    osElement.css({
                        '-webkit-animation-delay':  osAnimationDelay,
                        '-moz-animation-delay':     osAnimationDelay,
                        'animation-delay':          osAnimationDelay
                    });
                    var osTrigger = ( trigger ) ? trigger : osElement;
                    
                    osTrigger.waypoint(function() {
                        osElement.addClass('animated').addClass(osAnimationClass);
                        },{
                            triggerOnce: true,
                            offset: '90%'
                    });
                });
            }
            onScrollInit( $('.os-animation') );
            onScrollInit( $('.staggered-animation'), $('.staggered-animation-container') );
}