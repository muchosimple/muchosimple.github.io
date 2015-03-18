// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/*! Lazy Load 1.9.1 - MIT license - Copyright 2010-2013 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);

/*
 * By Osvaldas Valutis, www.osvaldas.info
 * http://osvaldas.info/image-lightbox-responsive-touch-friendly
 * Available for use under the MIT License
*/

;(function(e,t,n,r){"use strict";var i=function(){var e=n.body||n.documentElement,e=e.style;if(e.WebkitTransition=="")return"-webkit-";if(e.MozTransition=="")return"-moz-";if(e.OTransition=="")return"-o-";if(e.transition=="")return"";return false},s=i()===false?false:true,o=function(e,t,n){var r={},s=i();r[s+"transform"]="translateX("+t+")";r[s+"transition"]=s+"transform "+n+"s linear";e.css(r)},u="ontouchstart"in t,a=t.navigator.pointerEnabled||t.navigator.msPointerEnabled,f=function(e){if(u)return true;if(!a||typeof e==="undefined"||typeof e.pointerType==="undefined")return false;if(typeof e.MSPOINTER_TYPE_MOUSE!=="undefined"){if(e.MSPOINTER_TYPE_MOUSE!=e.pointerType)return true}else if(e.pointerType!="mouse")return true;return false};e.fn.imageLightbox=function(r){var r=e.extend({selector:'id="imagelightbox"',allowedTypes:"png|jpg|jpeg|gif",animationSpeed:250,preloadNext:true,enableKeyboard:true,quitOnEnd:false,quitOnImgClick:false,quitOnDocClick:true,onStart:false,onEnd:false,onLoadStart:false,onLoadEnd:false},r),i=e([]),l=e(),c=e(),h=0,p=0,d=0,v=false,m=function(t){return e(t).prop("tagName").toLowerCase()=="a"&&(new RegExp(".("+r.allowedTypes+")$","i")).test(e(t).attr("href"))},g=function(){if(!c.length)return true;var n=e(t).width()*.8,r=e(t).height()*.9,i=new Image;i.src=c.attr("src");i.onload=function(){h=i.width;p=i.height;if(h>n||p>r){var s=h/p>n/r?h/n:p/r;h/=s;p/=s}c.css({width:h+"px",height:p+"px",top:(e(t).height()-p)/2+"px",left:(e(t).width()-h)/2+"px"})}},y=function(t){if(v)return false;t=typeof t==="undefined"?false:t=="left"?1:-1;if(c.length){if(t!==false&&(i.length<2||r.quitOnEnd===true&&(t===-1&&i.index(l)==0||t===1&&i.index(l)==i.length-1))){w();return false}var n={opacity:0};if(s)o(c,100*t-d+"px",r.animationSpeed/1e3);else n.left=parseInt(c.css("left"))+100*t+"px";c.animate(n,r.animationSpeed,function(){b()});d=0}v=true;if(r.onLoadStart!==false)r.onLoadStart();setTimeout(function(){c=e("<img "+r.selector+" />").attr("src",l.attr("href")).load(function(){c.appendTo("body");g();var n={opacity:1};c.css("opacity",0);if(s){o(c,-100*t+"px",0);setTimeout(function(){o(c,0+"px",r.animationSpeed/1e3)},50)}else{var u=parseInt(c.css("left"));n.left=u+"px";c.css("left",u-100*t+"px")}c.animate(n,r.animationSpeed,function(){v=false;if(r.onLoadEnd!==false)r.onLoadEnd()});if(r.preloadNext){var a=i.eq(i.index(l)+1);if(!a.length)a=i.eq(0);e("<img />").attr("src",a.attr("href")).load()}}).error(function(){if(r.onLoadEnd!==false)r.onLoadEnd()});var n=0,u=0,p=0;c.on(a?"pointerup MSPointerUp":"click",function(e){e.preventDefault();if(r.quitOnImgClick){w();return false}if(f(e.originalEvent))return true;var t=(e.pageX||e.originalEvent.pageX)-e.target.offsetLeft;l=i.eq(i.index(l)-(h/2>t?1:-1));if(!l.length)l=i.eq(h/2>t?i.length:0);y(h/2>t?"left":"right")}).on("touchstart pointerdown MSPointerDown",function(e){if(!f(e.originalEvent)||r.quitOnImgClick)return true;if(s)p=parseInt(c.css("left"));n=e.originalEvent.pageX||e.originalEvent.touches[0].pageX}).on("touchmove pointermove MSPointerMove",function(e){if(!f(e.originalEvent)||r.quitOnImgClick)return true;e.preventDefault();u=e.originalEvent.pageX||e.originalEvent.touches[0].pageX;d=n-u;if(s)o(c,-d+"px",0);else c.css("left",p-d+"px")}).on("touchend touchcancel pointerup pointercancel MSPointerUp MSPointerCancel",function(e){if(!f(e.originalEvent)||r.quitOnImgClick)return true;if(Math.abs(d)>50){l=i.eq(i.index(l)-(d<0?1:-1));if(!l.length)l=i.eq(d<0?i.length:0);y(d>0?"right":"left")}else{if(s)o(c,0+"px",r.animationSpeed/1e3);else c.animate({left:p+"px"},r.animationSpeed/2)}})},r.animationSpeed+100)},b=function(){if(!c.length)return false;c.remove();c=e()},w=function(){if(!c.length)return false;c.animate({opacity:0},r.animationSpeed,function(){b();v=false;if(r.onEnd!==false)r.onEnd()})};e(t).on("resize",g);if(r.quitOnDocClick){e(n).on(u?"touchend":"click",function(t){if(c.length&&!e(t.target).is(c))w()})}if(r.enableKeyboard){e(n).on("keyup",function(e){if(!c.length)return true;e.preventDefault();if(e.keyCode==27)w();if(e.keyCode==37||e.keyCode==39){l=i.eq(i.index(l)-(e.keyCode==37?1:-1));if(!l.length)l=i.eq(e.keyCode==37?i.length:0);y(e.keyCode==37?"left":"right")}})}e(n).on("click",this.selector,function(t){if(!m(this))return true;t.preventDefault();if(v)return false;v=false;if(r.onStart!==false)r.onStart();l=e(this);y()});this.each(function(){if(!m(this))return true;i=i.add(e(this))});this.switchImageLightbox=function(e){var t=i.eq(e);if(t.length){var n=i.index(l);l=t;y(e<n?"left":"right")}return this};this.quitImageLightbox=function(){w();return this};return this}})(jQuery,window,document);

/*
 Sticky-kit v1.1.1 | WTFPL | Leaf Corcoran 2014 | http://leafo.net
*/
(function(){var k,e;k=this.jQuery||window.jQuery;e=k(window);k.fn.stick_in_parent=function(d){var v,y,n,p,h,C,s,G,q,H;null==d&&(d={});s=d.sticky_class;y=d.inner_scrolling;C=d.recalc_every;h=d.parent;p=d.offset_top;n=d.spacer;v=d.bottoming;null==p&&(p=0);null==h&&(h=void 0);null==y&&(y=!0);null==s&&(s="is_stuck");null==v&&(v=!0);G=function(a,d,q,z,D,t,r,E){var u,F,m,A,c,f,B,w,x,g,b;if(!a.data("sticky_kit")){a.data("sticky_kit",!0);f=a.parent();null!=h&&(f=f.closest(h));if(!f.length)throw"failed to find stick parent";
u=m=!1;(g=null!=n?n&&a.closest(n):k("<div />"))&&g.css("position",a.css("position"));B=function(){var c,e,l;if(!E&&(c=parseInt(f.css("border-top-width"),10),e=parseInt(f.css("padding-top"),10),d=parseInt(f.css("padding-bottom"),10),q=f.offset().top+c+e,z=f.height(),m&&(u=m=!1,null==n&&(a.insertAfter(g),g.detach()),a.css({position:"",top:"",width:"",bottom:""}).removeClass(s),l=!0),D=a.offset().top-parseInt(a.css("margin-top"),10)-p,t=a.outerHeight(!0),r=a.css("float"),g&&g.css({width:a.outerWidth(!0),
height:t,display:a.css("display"),"vertical-align":a.css("vertical-align"),"float":r}),l))return b()};B();if(t!==z)return A=void 0,c=p,x=C,b=function(){var b,k,l,h;if(!E&&(null!=x&&(--x,0>=x&&(x=C,B())),l=e.scrollTop(),null!=A&&(k=l-A),A=l,m?(v&&(h=l+t+c>z+q,u&&!h&&(u=!1,a.css({position:"fixed",bottom:"",top:c}).trigger("sticky_kit:unbottom"))),l<D&&(m=!1,c=p,null==n&&("left"!==r&&"right"!==r||a.insertAfter(g),g.detach()),b={position:"",width:"",top:""},a.css(b).removeClass(s).trigger("sticky_kit:unstick")),
y&&(b=e.height(),t+p>b&&!u&&(c-=k,c=Math.max(b-t,c),c=Math.min(p,c),m&&a.css({top:c+"px"})))):l>D&&(m=!0,b={position:"fixed",top:c},b.width="border-box"===a.css("box-sizing")?a.outerWidth()+"px":a.width()+"px",a.css(b).addClass(s),null==n&&(a.after(g),"left"!==r&&"right"!==r||g.append(a)),a.trigger("sticky_kit:stick")),m&&v&&(null==h&&(h=l+t+c>z+q),!u&&h)))return u=!0,"static"===f.css("position")&&f.css({position:"relative"}),a.css({position:"absolute",bottom:d,top:"auto"}).trigger("sticky_kit:bottom")},
w=function(){B();return b()},F=function(){E=!0;e.off("touchmove",b);e.off("scroll",b);e.off("resize",w);k(document.body).off("sticky_kit:recalc",w);a.off("sticky_kit:detach",F);a.removeData("sticky_kit");a.css({position:"",bottom:"",top:"",width:""});f.position("position","");if(m)return null==n&&("left"!==r&&"right"!==r||a.insertAfter(g),g.remove()),a.removeClass(s)},e.on("touchmove",b),e.on("scroll",b),e.on("resize",w),k(document.body).on("sticky_kit:recalc",w),a.on("sticky_kit:detach",F),setTimeout(b,
0)}};q=0;for(H=this.length;q<H;q++)d=this[q],G(k(d));return this}}).call(this);

/*! fixto - v0.3.1 - 2014-08-07
* http://github.com/bbarakaci/fixto/*/
var fixto=function(t,i,e){function o(){this._vendor=null}function n(){var t=!1,i=e.createElement("div"),o=e.createElement("div");i.appendChild(o),i.style[c]="translate(0)",i.style.marginTop="10px",i.style.visibility="hidden",o.style.position="fixed",o.style.top=0,e.body.appendChild(i);var n=o.getBoundingClientRect();return n.top>0&&(t=!0),e.body.removeChild(i),t}function s(i,e,o){this.child=i,this._$child=t(i),this.parent=e,this.options={className:"fixto-fixed",top:0},this._setOptions(o)}function r(t,i,e){s.call(this,t,i,e),this._replacer=new p.MimicNode(t),this._ghostNode=this._replacer.replacer,this._saveStyles(),this._saveViewportHeight(),this._proxied_onscroll=this._bind(this._onscroll,this),this._proxied_onresize=this._bind(this._onresize,this),this.start()}function h(t,i,e){s.call(this,t,i,e),this.start()}var l=function(){var t={getAll:function(t){return e.defaultView.getComputedStyle(t)},get:function(t,i){return this.getAll(t)[i]},toFloat:function(t){return parseFloat(t,10)||0},getFloat:function(t,i){return this.toFloat(this.get(t,i))},_getAllCurrentStyle:function(t){return t.currentStyle}};return e.documentElement.currentStyle&&(t.getAll=t._getAllCurrentStyle),t}(),p=function(){function i(t){this.element=t,this.replacer=e.createElement("div"),this.replacer.style.visibility="hidden",this.hide(),t.parentNode.insertBefore(this.replacer,t)}i.prototype={replace:function(){var t=this.replacer.style,i=l.getAll(this.element);t.width=this._width(),t.height=this._height(),t.marginTop=i.marginTop,t.marginBottom=i.marginBottom,t.marginLeft=i.marginLeft,t.marginRight=i.marginRight,t.cssFloat=i.cssFloat,t.styleFloat=i.styleFloat,t.position=i.position,t.top=i.top,t.right=i.right,t.bottom=i.bottom,t.left=i.left,t.display=i.display},hide:function(){this.replacer.style.display="none"},_width:function(){return this.element.getBoundingClientRect().width+"px"},_widthOffset:function(){return this.element.offsetWidth+"px"},_height:function(){return this.element.getBoundingClientRect().height+"px"},_heightOffset:function(){return this.element.offsetHeight+"px"},destroy:function(){t(this.replacer).remove();for(var i in this)this.hasOwnProperty(i)&&(this[i]=null)}};var o=e.documentElement.getBoundingClientRect();return o.width||(i.prototype._width=i.prototype._widthOffset,i.prototype._height=i.prototype._heightOffset),{MimicNode:i,computedStyle:l}}();o.prototype={_vendors:{webkit:{cssPrefix:"-webkit-",jsPrefix:"Webkit"},moz:{cssPrefix:"-moz-",jsPrefix:"Moz"},ms:{cssPrefix:"-ms-",jsPrefix:"ms"},opera:{cssPrefix:"-o-",jsPrefix:"O"}},_prefixJsProperty:function(t,i){return t.jsPrefix+i[0].toUpperCase()+i.substr(1)},_prefixValue:function(t,i){return t.cssPrefix+i},_valueSupported:function(t,i,e){try{return e.style[t]=i,e.style[t]===i}catch(o){return!1}},propertySupported:function(t){return void 0!==e.documentElement.style[t]},getJsProperty:function(t){if(this.propertySupported(t))return t;if(this._vendor)return this._prefixJsProperty(this._vendor,t);var i;for(var e in this._vendors)if(i=this._prefixJsProperty(this._vendors[e],t),this.propertySupported(i))return this._vendor=this._vendors[e],i;return null},getCssValue:function(t,i){var o=e.createElement("div"),n=this.getJsProperty(t);if(this._valueSupported(n,i,o))return i;var s;if(this._vendor&&(s=this._prefixValue(this._vendor,i),this._valueSupported(n,s,o)))return s;for(var r in this._vendors)if(s=this._prefixValue(this._vendors[r],i),this._valueSupported(n,s,o))return this._vendor=this._vendors[r],s;return null}};var a,d,f=new o,c=f.getJsProperty("transform"),u=f.getCssValue("position","sticky"),_=f.getCssValue("position","fixed"),g="Microsoft Internet Explorer"===navigator.appName;g&&(d=parseFloat(navigator.appVersion.split("MSIE")[1])),s.prototype={_mindtop:function(){var t=0;if(this._$mind)for(var i,e,o=0,n=this._$mind.length;n>o;o++)if(i=this._$mind[o],e=i.getBoundingClientRect(),e.height)t+=e.height;else{var s=l.getAll(i);t+=i.offsetHeight+l.toFloat(s.marginTop)+l.toFloat(s.marginBottom)}return t},stop:function(){this._stop(),this._running=!1},start:function(){this._running||(this._start(),this._running=!0)},destroy:function(){this.stop(),this._destroy(),this._$child.removeData("fixto-instance");for(var t in this)this.hasOwnProperty(t)&&(this[t]=null)},_setOptions:function(i){t.extend(this.options,i),this.options.mind&&(this._$mind=t(this.options.mind)),this.options.zIndex&&(this.child.style.zIndex=this.options.zIndex)},setOptions:function(t){this._setOptions(t),this.refresh()},_stop:function(){},_start:function(){},_destroy:function(){},refresh:function(){}},r.prototype=new s,t.extend(r.prototype,{_bind:function(t,i){return function(){return t.call(i)}},_toresize:8===d?e.documentElement:i,_onscroll:function(){if(this._scrollTop=e.documentElement.scrollTop||e.body.scrollTop,this._parentBottom=this.parent.offsetHeight+this._fullOffset("offsetTop",this.parent)-l.getFloat(this.parent,"paddingBottom"),this.fixed){if(this._scrollTop>this._parentBottom||this._scrollTop<this._fullOffset("offsetTop",this._ghostNode)-this.options.top-this._mindtop())return void this._unfix();this._adjust()}else{var t=l.getAll(this.child);this._scrollTop<this._parentBottom&&this._scrollTop>this._fullOffset("offsetTop",this.child)-this.options.top-this._mindtop()&&(this.options.viewportHeight?!0:this._viewportHeight>this.child.offsetHeight+l.toFloat(t.marginTop)+l.toFloat(t.marginBottom))&&(this._fix(),this._adjust())}},_adjust:function(){var t=0,i=this._mindtop(),e=0,o=l.getAll(this.child),n=null;a&&(n=this._getContext(),n&&(t=Math.abs(n.getBoundingClientRect().top))),e=this._parentBottom-this._scrollTop-(this.child.offsetHeight+l.toFloat(o.marginBottom)+i+this.options.top),e>0&&(e=0),this.child.style.top=e+i+t+this.options.top-l.toFloat(o.marginTop)+"px"},_fullOffset:function(t,i,e){for(var o=i[t],n=i.offsetParent;null!==n&&n!==e;)o+=n[t],n=n.offsetParent;return o},_getContext:function(){for(var t,i,o=this.child,n=null;!n;){if(t=o.parentNode,t===e.documentElement)return null;if(i=l.getAll(t),"none"!==i[c]){n=t;break}o=t}return n},_fix:function(){var t=this.child,i=t.style,o=l.getAll(t),n=t.getBoundingClientRect().left,s=o.width;if(this._saveStyles(),e.documentElement.currentStyle&&(s=t.offsetWidth-(l.toFloat(o.paddingLeft)+l.toFloat(o.paddingRight)+l.toFloat(o.borderLeftWidth)+l.toFloat(o.borderRightWidth))+"px"),a){var r=this._getContext();r&&(n=t.getBoundingClientRect().left-r.getBoundingClientRect().left)}i.left=n-l.toFloat(o.marginLeft)+"px",i.width=s,this._replacer.replace(),i.position="fixed",i.top=this._mindtop()+this.options.top-l.toFloat(o.marginTop)+"px",this._$child.addClass(this.options.className),this.fixed=!0},_unfix:function(){var t=this.child.style;this._replacer.hide(),t.position=this._childOriginalPosition,t.top=this._childOriginalTop,t.width=this._childOriginalWidth,t.left=this._childOriginalLeft,this._$child.removeClass(this.options.className),this.fixed=!1},_saveStyles:function(){var t=this.child.style;this._childOriginalPosition=t.position,this._childOriginalTop=t.top,this._childOriginalWidth=t.width,this._childOriginalLeft=t.left},_onresize:function(){this.refresh()},_saveViewportHeight:function(){this._viewportHeight=i.innerHeight||e.documentElement.clientHeight},_stop:function(){this._unfix(),t(i).unbind("scroll",this._proxied_onscroll),t(this._toresize).unbind("resize",this._proxied_onresize)},_start:function(){this._onscroll(),t(i).bind("scroll",this._proxied_onscroll),t(this._toresize).bind("resize",this._proxied_onresize)},_destroy:function(){this._replacer.destroy()},refresh:function(){this._saveViewportHeight(),this._unfix(),this._onscroll()}}),h.prototype=new s,t.extend(h.prototype,{_start:function(){var t=l.getAll(this.child);this._childOriginalPosition=t.position,this._childOriginalTop=t.top,this.child.style.position=u,this.refresh()},_stop:function(){this.child.style.position=this._childOriginalPosition,this.child.style.top=this._childOriginalTop},refresh:function(){this.child.style.top=this._mindtop()+this.options.top+"px"}});var m=function(t,i,e){return u&&!e||u&&e&&e.useNativeSticky!==!1?new h(t,i,e):_?(void 0===a&&(a=n()),new r(t,i,e)):"Neither fixed nor sticky positioning supported"};return 8>d&&(m=function(){return"not supported"}),t.fn.fixTo=function(i,e){var o=t(i),n=0;return this.each(function(){var s=t(this).data("fixto-instance");if(s){var r=i;s[r].call(s,e)}else t(this).data("fixto-instance",m(this,o[n],e));n++})},{FixToContainer:r,fixTo:m,computedStyle:l,mimicNode:p}}(window.jQuery,window,document);
