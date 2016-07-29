/* $.noConflict(); */
(function(){
  //jQuery(document).ready(function() {
	jQuery(window).load(function () {

	jQuery(".input-group input[type='text']").each(function () {

	/* START CPHT DATEPICKER
	 * ------------------------------------------------------------------ *
	 * ------------------------------------------------------------------ */
	jQuery(".cpht-datepicker .renew-datepicker").datepicker({

			changeYear: true,
			yearRange: "-22:+2",
			dateFormat:"yy-mm-dd",

			onSelect: function() {

			var howManyExpired = jQuery(".input-group .form-control.expired").length;

			 var date = jQuery(this).datepicker("getDate");
			 var today = new Date();
				if((new Date(today.getFullYear(), today.getMonth(), today.getDate() - 90))>date) {
					 //Do somthing here..
					 jQuery(this).removeClass("valid cpht-valid").removeClass("not-renewable cpht-not-renewable").addClass("expired cpht-expired");

				} else {
					jQuery(this).removeClass("expired cpht-expired").removeClass("not-renewable cpht-not-renewable").addClass("valid cpht-valid");
				}

				if((new Date(today.getFullYear(), today.getMonth(), today.getDate() - 365.242))>date) {
					//Do somthing here..
					jQuery(this).removeClass("valid cpht-valid").removeClass("expired cpht-expired").addClass("not-renewable cpht-not-renewable");
				} else {

					jQuery(this).removeClass("not-renewable cpht-not-renewable");
				}


			},


			onClose: function(dateText){
				if( !dateText ){

				//jQuery(".noneSelected").show();

				jQuery(this).addClass("alert-error");
				jQuery(this).next("span").addClass("field-errors");



				} else {

					var howManyExpired = jQuery(".input-group .form-control.expired").lenght;

					//jQuery(".noneSelected").hide();
					jQuery(this).removeClass("alert-error");
					jQuery(this).next("span").removeClass("field-errors");


				if (jQuery(this).hasClass("valid cpht-valid")) {


					jQuery(this).addClass("date-selected");

						jQuery(".cpht-expired-cost").hide();

						jQuery(".cpht-ce-req").show();
						
						
						//jQuery(".cert-renew-ce").hide();
						//jQuery(".expired-cost").hide();

					
/*
						if(howManyExpired >= 1) {

						//jQuery(".cpht-cost, .cphtLateWcert").show();
						jQuery(".regular-cost, .expired-cost").hide();

						} else {

						jQuery(".cphtWcert").show();
						jQuery(".expired-cost, .cphtLateWcert").hide();

					}
*/

				}
				if (jQuery(this).hasClass("expired cpht-expired")) {

					jQuery(this).addClass("date-selected");

						jQuery(".cpht-expired-cost, .cpht-ce-req").show();

						
/*
						//jQuery(".cert-renew-ce").hide();
	
	
                        if(howManyExpired > 1) {

                           //jQuery(".cphtLateOnly").hide();
                          //jQuery(".cpht-cost, .cpht-expired-cost, .cphtLateWcert").show();
						   jQuery(".cpht-expired-cost").show();
                        }

					   //jQuery(".regular-cost, .cphtWcert").hide();
					   //jQuery(".cpht-cost, .cpht-expired-cost, .cphtLateWcert").show();
					   //jQuery(".cpht-cost, .cpht-expired-cost, .cphtLateWcert").show();
*/					   
					   
					   
					   

				}
				if (jQuery(this).hasClass("not-renewable cpht-not-renewable")) {

					jQuery(this).addClass("date-selected");

					jQuery(".non-renewable-renew-qa").hide();
					jQuery("#CertificateNoneRenewable").show();


				}

				//END ELSE

				}

			}

	});

	/* END CPHT DATEPICKER
	 * ------------------------------------------------------------------ */

	/* ALL CERTIFICATIONS DATEPICKER
	 * ------------------------------------------------------------------ *
	 * ------------------------------------------------------------------ */
	jQuery(".input-group:not('.cpht-datepicker') .renew-datepicker").datepicker({

			changeYear: true,
			yearRange: "-22:+2",
			dateFormat:"yy-mm-dd",

			onSelect: function(){

			var expdCerts = jQuery( ".input-group:not('.cpht-datepicker') .form-control.expired").length;

			 var date = jQuery(this).datepicker("getDate");
			 var today = new Date();

				if((new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30))>date) {
					 //Do somthing here..
					 jQuery(this).removeClass("valid").removeClass("not-renewable").addClass("expired");

				} else {
					jQuery(this).removeClass("expired").removeClass("not-renewable").addClass("valid");
				}

				if((new Date(today.getFullYear(), today.getMonth(), today.getDate() - 365.242))>date) {
					//Do somthing here..
					jQuery(this).removeClass("valid").removeClass("expired").addClass("not-renewable");

				} else {

					jQuery(this).removeClass("not-renewable");
				}

			},


			onClose: function(dateText){
				if( !dateText ){

				//jQuery(".noneSelected").show();

				jQuery(this).addClass("alert-error");
				jQuery(this).next("span").addClass("field-errors");

				} else {

					//jQuery(".noneSelected").hide();
					jQuery(this).removeClass("alert-error");
					jQuery(this).next("span").removeClass("field-errors");

				if (jQuery(this).hasClass("valid")) {

					jQuery(this).addClass("date-selected");
					jQuery(".cert-renew-ce").show();
					
					
				if (jQuery(".input-group:not('.cpht-datepicker') .form-control").hasClass("expired")) {
					
						
						jQuery(".valid-ce-req").hide();
						jQuery(".expired-ce-req").show();
					
					} else {
					
						jQuery(".expired-ce-req").hide();
						jQuery(".valid-ce-req").show();
					
				}
					


				}
				if (jQuery(this).hasClass("expired")) {

					jQuery(this).addClass("date-selected");

					jQuery(".valid-ce-req").hide();
					jQuery(".reincert-expired-cost, .cert-renew-ce, .expired-ce-req").show();

		
/*				
				if(jQuery(".form-control").hasClass("cpht-valid")) {



						jQuery(".expired-cost").hide();

						//jQuery(".cpht-cost, .cphtWcertMultiLate").show();
						//jQuery(".regular-cost, .cphtWcert, .cphtLateWcertMultiLate").hide();
						
						jQuery(".regular-cost, .cphtWcert, .cphtLateWcertMultiLate").hide();

					} else {



						//jQuery(".regular-cost").hide();
						jQuery(".reincert-expired-cost").show();

					}
*/

				}

				if (jQuery(this).hasClass("not-renewable")) {

					jQuery(this).addClass("date-selected");

					jQuery(".non-renewable-renew-qa").hide();
					jQuery("#CertificateNoneRenewable").show();

				}


				//else
				}

			}

	});


	/* END DATEPICKER
	 * ------------------------------------------------------------------ */


	});
	//END EACH LOOP



    });
})(jQuery);