/* ----------------------------------------------------------- *
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ----------------------------------------------------------- */
+function ($) {
  'use strict';
  function transitionEnd() {
    var el = document.createElement('bootstrap')
    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }
    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
    return false // explicit for ie8 (  ._.)
  }
  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }
  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })
}(jQuery);
/* ----------------------------------------------------------- *
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ----------------------------------------------------------- */
(function($){'use strict';var backdrop='.dropdown-backdrop',toggle='[data-toggle="dropdown"]',Dropdown=function(element){$(element).on('click.bs.dropdown',this.toggle)}
Dropdown.VERSION='3.3.7'
function getParent($this){var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&/#[A-Za-z]/.test(selector)&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=selector&&$(selector)
return $parent&&$parent.length?$parent:$this.parent()}
function clearMenus(e){if(e&&e.which===3)return
$(backdrop).remove()
$(toggle).each(function(){var $this=$(this),$parent=getParent($this),relatedTarget={relatedTarget:this}
if(!$parent.hasClass('open'))return
if(e&&e.type=='click'&&/input|textarea/i.test(e.target.tagName)&&$.contains($parent[0],e.target))return
$parent.trigger(e=$.Event('hide.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$this.attr('aria-expanded','false')
$parent.removeClass('open').trigger($.Event('hidden.bs.dropdown',relatedTarget))})}
Dropdown.prototype.toggle=function(e){var $this=$(this)
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this),isActive=$parent.hasClass('open')
clearMenus()
if(!isActive){if('ontouchstart'in document.documentElement&&!$parent.closest('.navbar-nav').length){$(document.createElement('div')).addClass('dropdown-backdrop').insertAfter($(this)).on('click',clearMenus)}
var relatedTarget={relatedTarget:this}
$parent.trigger(e=$.Event('show.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$this.trigger('focus').attr('aria-expanded','true')
$parent.toggleClass('open').trigger($.Event('shown.bs.dropdown',relatedTarget))}
return false}
Dropdown.prototype.keydown=function(e){if(!/(38|40|27|32)/.test(e.which)||/input|textarea/i.test(e.target.tagName))return
var $this=$(this)
e.preventDefault()
e.stopPropagation()
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this),isActive=$parent.hasClass('open')
if(!isActive&&e.which!=27||isActive&&e.which==27){if(e.which==27)$parent.find(toggle).trigger('focus')
return $this.trigger('click')}
var desc=' li:not(.disabled):visible a',$items=$parent.find('.dropdown-menu'+desc)
if(!$items.length)return
var index=$items.index(e.target)
if(e.which==38&&index>0)index--
if(e.which==40&&index<$items.length-1)index++
if(!~index)index=0
$items.eq(index).trigger('focus')}
function Plugin(option){return this.each(function(){var $this=$(this),data=$this.data('bs.dropdown')
if(!data)$this.data('bs.dropdown',(data=new Dropdown(this)))
if(typeof option=='string')data[option].call($this)})}
var old=$.fn.dropdown
$.fn.dropdown=Plugin
$.fn.dropdown.Constructor=Dropdown
$.fn.dropdown.noConflict=function(){$.fn.dropdown=old
return this}
$(document).on('click.bs.dropdown.data-api',clearMenus).on('click.bs.dropdown.data-api','.dropdown form',function(e){e.stopPropagation()}).on('click.bs.dropdown.data-api',toggle,Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api',toggle,Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api','.dropdown-menu',Dropdown.prototype.keydown)}(jQuery));
/* ----------------------------------------------------------- *
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ----------------------------------------------------------- */
(function($){'use strict';var Collapse=function(element,options){this.$element=$(element)
this.options=$.extend({},Collapse.DEFAULTS,options)
this.$trigger=$('[data-toggle="collapse"][href="#'+element.id+'"],'+'[data-toggle="collapse"][data-target="#'+element.id+'"]')
this.transitioning=null
if(this.options.parent){this.$parent=this.getParent()}else{this.addAriaAndCollapsedClass(this.$element,this.$trigger)}
if(this.options.toggle)this.toggle()}
Collapse.VERSION='3.3.7'
Collapse.TRANSITION_DURATION=350
Collapse.DEFAULTS={toggle:true}
Collapse.prototype.dimension=function(){var hasWidth=this.$element.hasClass('width')
return hasWidth?'width':'height'}
Collapse.prototype.show=function(){if(this.transitioning||this.$element.hasClass('in'))return
var activesData,actives=this.$parent&&this.$parent.children('.panel').children('.in, .collapsing')
if(actives&&actives.length){activesData=actives.data('bs.collapse')
if(activesData&&activesData.transitioning)return}
var startEvent=$.Event('show.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
if(actives&&actives.length){Plugin.call(actives,'hide')
activesData||actives.data('bs.collapse',null)}
var dimension=this.dimension()
this.$element.removeClass('collapse').addClass('collapsing')[dimension](0).attr('aria-expanded',true)
this.$trigger.removeClass('collapsed').attr('aria-expanded',true)
this.transitioning=1
var complete=function(){this.$element.removeClass('collapsing').addClass('collapse in')[dimension]('')
this.transitioning=0
this.$element.trigger('shown.bs.collapse')}
if(!$.support.transition)return complete.call(this)
var scrollSize=$.camelCase(['scroll',dimension].join('-'))
this.$element.one('bsTransitionEnd',$.proxy(complete,this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])}
Collapse.prototype.hide=function(){if(this.transitioning||!this.$element.hasClass('in'))return
var startEvent=$.Event('hide.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
var dimension=this.dimension()
this.$element[dimension](this.$element[dimension]())[0].offsetHeight
this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded',false)
this.$trigger.addClass('collapsed').attr('aria-expanded',false)
this.transitioning=1
var complete=function(){this.transitioning=0
this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse')}
if(!$.support.transition)return complete.call(this)
this.$element
[dimension](0).one('bsTransitionEnd',$.proxy(complete,this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)}
Collapse.prototype.toggle=function(){this[this.$element.hasClass('in')?'hide':'show']()}
Collapse.prototype.getParent=function(){return $(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each($.proxy(function(i,element){var $element=$(element)
this.addAriaAndCollapsedClass(getTargetFromTrigger($element),$element)},this)).end()}
Collapse.prototype.addAriaAndCollapsedClass=function($element,$trigger){var isOpen=$element.hasClass('in')
$element.attr('aria-expanded',isOpen)
$trigger.toggleClass('collapsed',!isOpen).attr('aria-expanded',isOpen)}
function getTargetFromTrigger($trigger){var href
var target=$trigger.attr('data-target')||(href=$trigger.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,'')
return $(target)}
function Plugin(option){return this.each(function(){var $this=$(this),data=$this.data('bs.collapse'),options=$.extend({},Collapse.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data&&options.toggle&&/show|hide/.test(option))options.toggle=false
if(!data)$this.data('bs.collapse',(data=new Collapse(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.collapse
$.fn.collapse=Plugin
$.fn.collapse.Constructor=Collapse
$.fn.collapse.noConflict=function(){$.fn.collapse=old
return this}
$(document).on('click.bs.collapse.data-api','[data-toggle="collapse"]',function(e){var $this=$(this)
if(!$this.attr('data-target'))e.preventDefault()
var $target=getTargetFromTrigger($this),data=$target.data('bs.collapse'),option=data?'toggle':$this.data()
Plugin.call($target,option)})}(jQuery));
/* ----------------------------------------------------------- *
 * OPEN NAV CLOSE SEARCH/ OPEN SEARCH CLOSE NAV
 * ----------------------------------------------------------- */
function beforeJquery(name, callback) {
  window.setTimeout(function() {
    if (window[name]) {
      callback(window[name]);
    } else {
      window.setTimeout(arguments.callee, 90);
    }
  }, 90);
}
beforeJquery("jQuery", function(t) {
	//FUNCTION USING JQUERY
	jQuery("button[data-header-btn=button]").on("click", function() {
		var clicker = jQuery("[data-header-btn=button]").not(jQuery(this));

		jQuery("[data-header-btn]").attr("aria-expanded","false")
		jQuery($(this) , jQuery($(this).attr('data-target'))).attr("aria-expanded","true")
		jQuery(clicker.attr("data-target")).removeClass("in")

		})
});
/* =================================== *
 * Bootstrap: Modal v3.3.7
 * =================================== */
(function($){'use strict';var Modal=function(element,options){this.options=options
this.$body=$(document.body)
this.$element=$(element)
this.$dialog=this.$element.find('.modal-dialog')
this.$backdrop=null
this.isShown=null
this.originalBodyPad=null
this.scrollbarWidth=0
this.ignoreBackdropClick=false
if(this.options.remote){this.$element.find('.modal-content').load(this.options.remote,$.proxy(function(){this.$element.trigger('loaded.bs.modal')},this))}}
Modal.VERSION='3.3.7'
Modal.TRANSITION_DURATION=300
Modal.BACKDROP_TRANSITION_DURATION=150
Modal.DEFAULTS={backdrop:true,keyboard:true,show:true}
Modal.prototype.toggle=function(_relatedTarget){return this.isShown?this.hide():this.show(_relatedTarget)}
Modal.prototype.show=function(_relatedTarget){var that=this
var e=$.Event('show.bs.modal',{relatedTarget:_relatedTarget})
this.$element.trigger(e)
if(this.isShown||e.isDefaultPrevented())return
this.isShown=true
this.checkScrollbar()
this.setScrollbar()
this.$body.addClass('modal-open')
this.escape()
this.resize()
this.$element.on('click.dismiss.bs.modal','[data-dismiss="modal"]',$.proxy(this.hide,this))
this.$dialog.on('mousedown.dismiss.bs.modal',function(){that.$element.one('mouseup.dismiss.bs.modal',function(e){if($(e.target).is(that.$element))that.ignoreBackdropClick=true})})
this.backdrop(function(){var transition=$.support.transition&&that.$element.hasClass('fade')
if(!that.$element.parent().length){that.$element.appendTo(that.$body)}
that.$element.show().scrollTop(0)
that.adjustDialog()
if(transition){that.$element[0].offsetWidth}
that.$element.addClass('in')
that.enforceFocus()
var e=$.Event('shown.bs.modal',{relatedTarget:_relatedTarget})
transition?that.$dialog.one('bsTransitionEnd',function(){that.$element.trigger('focus').trigger(e)}).emulateTransitionEnd(Modal.TRANSITION_DURATION):that.$element.trigger('focus').trigger(e)})}
Modal.prototype.hide=function(e){if(e)e.preventDefault()
e=$.Event('hide.bs.modal')
this.$element.trigger(e)
if(!this.isShown||e.isDefaultPrevented())return
this.isShown=false
this.escape()
this.resize()
$(document).off('focusin.bs.modal')
this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal')
this.$dialog.off('mousedown.dismiss.bs.modal')
$.support.transition&&this.$element.hasClass('fade')?this.$element.one('bsTransitionEnd',$.proxy(this.hideModal,this)).emulateTransitionEnd(Modal.TRANSITION_DURATION):this.hideModal()}
Modal.prototype.enforceFocus=function(){$(document).off('focusin.bs.modal').on('focusin.bs.modal',$.proxy(function(e){if(document!==e.target&&this.$element[0]!==e.target&&!this.$element.has(e.target).length){this.$element.trigger('focus')}},this))}
Modal.prototype.escape=function(){if(this.isShown&&this.options.keyboard){this.$element.on('keydown.dismiss.bs.modal',$.proxy(function(e){e.which==27&&this.hide()},this))}else if(!this.isShown){this.$element.off('keydown.dismiss.bs.modal')}}
Modal.prototype.resize=function(){if(this.isShown){$(window).on('resize.bs.modal',$.proxy(this.handleUpdate,this))}else{$(window).off('resize.bs.modal')}}
Modal.prototype.hideModal=function(){var that=this
this.$element.hide()
this.backdrop(function(){that.$body.removeClass('modal-open')
that.resetAdjustments()
that.resetScrollbar()
that.$element.trigger('hidden.bs.modal')})}
Modal.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove()
this.$backdrop=null}
Modal.prototype.backdrop=function(callback){var that=this
var animate=this.$element.hasClass('fade')?'fade':''
if(this.isShown&&this.options.backdrop){var doAnimate=$.support.transition&&animate
this.$backdrop=$(document.createElement('div')).addClass('modal-backdrop '+animate).appendTo(this.$body)
this.$element.on('click.dismiss.bs.modal',$.proxy(function(e){if(this.ignoreBackdropClick){this.ignoreBackdropClick=false
return}
if(e.target!==e.currentTarget)return
this.options.backdrop=='static'?this.$element[0].focus():this.hide()},this))
if(doAnimate)this.$backdrop[0].offsetWidth
this.$backdrop.addClass('in')
if(!callback)return
doAnimate?this.$backdrop.one('bsTransitionEnd',callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callback()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass('in')
var callbackRemove=function(){that.removeBackdrop()
callback&&callback()}
$.support.transition&&this.$element.hasClass('fade')?this.$backdrop.one('bsTransitionEnd',callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callbackRemove()}else if(callback){callback()}}
Modal.prototype.handleUpdate=function(){this.adjustDialog()}
Modal.prototype.adjustDialog=function(){var modalIsOverflowing=this.$element[0].scrollHeight>document.documentElement.clientHeight
this.$element.css({paddingLeft:!this.bodyIsOverflowing&&modalIsOverflowing?this.scrollbarWidth:'',paddingRight:this.bodyIsOverflowing&&!modalIsOverflowing?this.scrollbarWidth:''})}
Modal.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:'',paddingRight:''})}
Modal.prototype.checkScrollbar=function(){var fullWindowWidth=window.innerWidth
if(!fullWindowWidth){var documentElementRect=document.documentElement.getBoundingClientRect()
fullWindowWidth=documentElementRect.right-Math.abs(documentElementRect.left)}
this.bodyIsOverflowing=document.body.clientWidth<fullWindowWidth
this.scrollbarWidth=this.measureScrollbar()}
Modal.prototype.setScrollbar=function(){var bodyPad=parseInt((this.$body.css('padding-right')||0),10)
this.originalBodyPad=document.body.style.paddingRight||''
if(this.bodyIsOverflowing)this.$body.css('padding-right',bodyPad+this.scrollbarWidth)}
Modal.prototype.resetScrollbar=function(){this.$body.css('padding-right',this.originalBodyPad)}
Modal.prototype.measureScrollbar=function(){var scrollDiv=document.createElement('div')
scrollDiv.className='modal-scrollbar-measure'
this.$body.append(scrollDiv)
var scrollbarWidth=scrollDiv.offsetWidth-scrollDiv.clientWidth
this.$body[0].removeChild(scrollDiv)
return scrollbarWidth}
function Plugin(option,_relatedTarget){return this.each(function(){var $this=$(this)
var data=$this.data('bs.modal')
var options=$.extend({},Modal.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data)$this.data('bs.modal',(data=new Modal(this,options)))
if(typeof option=='string')data[option](_relatedTarget)
else if(options.show)data.show(_relatedTarget)})}
var old=$.fn.modal
$.fn.modal=Plugin
$.fn.modal.Constructor=Modal
$.fn.modal.noConflict=function(){$.fn.modal=old
return this}
$(document).on('click.bs.modal.data-api','[data-toggle="modal"]',function(e){var $this=$(this)
var href=$this.attr('href')
var $target=$($this.attr('data-target')||(href&&href.replace(/.*(?=#[^\s]+$)/,'')))
var option=$target.data('bs.modal')?'toggle':$.extend({remote:!/#/.test(href)&&href},$target.data(),$this.data())
if($this.is('a'))e.preventDefault()
$target.one('show.bs.modal',function(showEvent){if(showEvent.isDefaultPrevented())return
$target.one('hidden.bs.modal',function(){$this.is(':visible')&&$this.trigger('focus')})})
Plugin.call($target,option,this)})
actualHeight()
}(jQuery));
/* ----------------------------------------------------------- *
 *! Copyright 2012, Ben Lin (http://dreamerslab.com/)
 * Version: 1.0.18
 * ----------------------------------------------------------- */
function actualHeight() {
$.fn.addBack=$.fn.addBack||$.fn.andSelf;
$.fn.extend({actual:function(method,options){if(!this[method]){throw'$.actual => The jQuery method "'+method+'" you called does not exist';}
var defaults={absolute:false,clone:false,includeMargin:false,display:'block'};var configs=$.extend(defaults,options);var $target=this.eq(0);var fix,restore;if(configs.clone===true){fix=function(){var style='position: absolute !important; top: -1000 !important; ';$target=$target.clone().attr('style',style).appendTo('body');};restore=function(){$target.remove();};}else{var tmp=[];var style='';var $hidden;fix=function(){$hidden=$target.parents().addBack().filter(':hidden');style+='visibility: hidden !important; display: '+configs.display+' !important; ';if(configs.absolute===true)style+='position: absolute !important; ';$hidden.each(function(){var $this=$(this);var thisStyle=$this.attr('style');tmp.push(thisStyle);$this.attr('style',thisStyle?thisStyle+';'+style:style);});};restore=function(){$hidden.each(function(i){var $this=$(this);var _tmp=tmp[i];if(_tmp===undefined){$this.removeAttr('style');}else{$this.attr('style',_tmp);}});};}
fix();var actual=/(outer)/.test(method)?$target[method](configs.includeMargin):$target[method]();restore();return actual;}});
//INIT CENTER MODAL
setTimeout(function(){centerModal();},200);
}

//GET SCROLLBAR WIDTH
function scrollbarWidth() {
  var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    document.body.appendChild(outer);

  var widthNoScroll = outer.offsetWidth;
    outer.style.overflow = "scroll";

  // add innerdiv
  var inner = document.createElement("div");
			inner.style.width = "100%";
			outer.appendChild(inner);

  var widthWithScroll = inner.offsetWidth;
			outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}
/* ----------------------------------------------------------- *
 * MODAL OUTSIDE SCROLLING & KEYBOARD
 * ----------------------------------------------------------- */
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventScrolling(e) {
  e = e || window.event;
	if (e.preventScrolling)
			e.preventScrolling(); e.returnValue = false;
}

function preventScrollingForScrollKeys(e) {
	if (keys[e.keyCode]) {
		preventScrolling(e); return false;
	}
}

function disableScroll() {
  if (window.addEventListener) // older FF
	window.addEventListener('DOMMouseScroll', preventScrolling, false);
  window.onwheel = preventScrolling; // modern standard
  window.onmousewheel = document.onmousewheel = preventScrolling; // older browsers, IE
  window.ontouchmove  = preventScrolling; // mobile
  document.onkeydown  = preventScrollingForScrollKeys;
}

function enableScroll() {
	if (window.removeEventListener)
	window.removeEventListener('DOMMouseScroll', preventScrolling, false);
	window.onmousewheel = document.onmousewheel = null;
	window.onwheel = null;
	window.ontouchmove = null;
	document.onkeydown = null;
}

/* ----------------------------------------------------------- *
 * MAKE MODAL APPEAR ON CENTER OF SCREEN
 * ----------------------------------------------------------- */
function centerModal() {

	if (jQuery(".modal_click").length) {

		var modalClosedCss = {
				'transition':'all 0.4s ease 0.1s','-webkit-transition':'all 0.4s ease 0.1s', 'height':'auto',
				'position':'','bottom':'auto','left':'auto','right':'auto', 'top':'auto','margin-top':'auto'
		},
		mDialog = ".modal-dialog";

		//SET TRANSITION STYLE
		$(mDialog).css(modalClosedCss)

		//SCROLLBARS & OVERFFLOW PROPERTIES FOR MODAL TALLED THAN SCREEN HEIGHT
		var dialogCss = ".modal-open .header-modal{display:none}.modal-dialog{overflow-y: auto;}.modal-dialog.fixed{overflow-y: hidden;}.modal-content{border-radius:0}.modal-dialog::-webkit-scrollbar{width:10px}"
			+ ".modal-dialog::-webkit-scrollbar-thumb{background:rgb(187,187,187);-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.5)}.modal-close{top:3%; right:3%; font-size:3rem; line-height:1}.modal-close:before {content:'\\2573'}"
			+ ".modal-dialog::-webkit-scrollbar-track:enabled { background-color: #ddd }.modal-dialog::-webkit-scrollbar-thumb:window-inactive{background:rgb(187,187,187)}";

			if (!$("[data-css=dialog]").length) { $('head').append("<style data-css='dialog'>" +dialogCss+ "</style>"); }

			$(".modal_click").each(function() {
				if ($(this)[0].hasAttribute("data-btn") && !$("."+ $(this).attr("data-target") + " .modal-close").length) {
					$("."+ $(this).attr("data-target")).prepend('<span class="modal-close color-white absolute displa-block top-right pointer" data-dismiss="modal"></span>');
				}
			})

		$(".modal_click").on("click", function() {

			var modalWindowId = $(this).attr("data-target");

				$(".modal" + "."+modalWindowId).modal().attr("aria-hidden","false")

				//DISABLE SCROLL
				disableScroll()

				if ($(this)[0].hasAttribute("data-backdrop")) { $("body").addClass("modal-body-backdrop"); }

			$(mDialog).each(function() {

				var modalHeight = "-" + $(this).actual('height') / 2,
						child = $("." +modalWindowId+ " > " +mDialog),
						parent = $("." +modalWindowId).actual("height"),
						modCss = "position:fixed;bottom:0;left:0;right:0;";

					//IF MODAL CONTENT BIGGER THAN WINDOW
					if (child.actual("height") >= parent) {

						var modalHcss = modCss + "top:1.5vh;margin-top:auto;height:90vh";
							child.attr("data-child","resize").attr("style", modalHcss)

							//RE-ENABLE SCROLLING
							enableScroll()

						} else {

						//IF DIALOG CONTENT NOT TALLER THEN MODAL WINDOW
						var modalHcss = modCss + "top:50%;margin-top:"+ modalHeight +"px";

						if (!$(this)[0].hasAttribute("data-child")) { $(this).attr("style", modalHcss) }

					}

				//CLOSE ON ANY CLICK OUTSIDE ON CONTENT AREA
				$(document).on('click', 'html', function(e){

					if ($(e.target).is("[data-dismiss=modal],div:not(.modal-dialog *)")) {

						//CLOSE MODAL & RE-ENABLE SCROLLING
						if (!$(".modal-body-backdrop").length) {

							var modl = ".modal";
									$(".modal").modal('hide').attr("aria-hidden","true");
									if (!$("[data-modal-lock]").length) { enableScroll(); }

						} else {

							var modl = ".modal[data-backdrop]";
									$("[data-dismiss=modal]").click(function() { enableScroll(); })
						}

						setTimeout(function(){
							if(!$(modl).hasClass("in")) {
									$(modl + " > " +mDialog).css(modalClosedCss)
									$("body").removeAttr("style").removeClass("modal-body-backdrop");
									enableScroll();
							}
						},500);

					}
					//DOCUMENT CLICK

				});
				//CLOSE ON ANY OUTSIDE CLICK

			})
			//END EACH

		});
	}
}

//MODAL REALIGN ON RESIZE
$(window).resize(function() {
	if ($(".modal").hasClass("in")) {

		var md = $(".modal.in > .modal-dialog > div"),
				mdAdjHeight = "-" + md.actual('height') / 2;
				md.parent().css("margin-top", mdAdjHeight + "px");
	}
	$(".modal-dialog").removeAttr("data-child")
})

//MODAL LOCK PREVENT CLOSING
$('.modal[data-modal-lock]').on('hide.bs.modal', function (e) {
	e.preventDefault(); e.stopPropagation();
	return false;
})
/* ----------------------------------------------------------- *
 * Bootstrap: ALERT DISMISS v3.3.7
 * ----------------------------------------------------------- */
jQuery(".alert-dismissable .close").on("click", function() {
	jQuery(this).closest(".alert-dismissable").remove()
});