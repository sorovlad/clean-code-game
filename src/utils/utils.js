import $ from 'jquery';

module.exports.animate = function(comp, effect){
	if (!comp) return;
	var $el = $(comp.getDOMNode());
	$el.addClass("animated-fast " + effect);
	$el.one(
		'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
		function(){$el.removeClass("animated " + effect)}
		);
};

module.exports.animate$ = function($el, effect, callback){
	$el.addClass("animated-fast " + effect);
	$el.one(
		'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
		function(){
			$el.removeClass("animated " + effect);
			callback();
		}
	);
};

module.exports.initUpToLike = function(){
	$("#uptolikescript").remove();
	var s = document.createElement('script');
	s.id="uptolikescript";
	s.type = 'text/javascript'; s.charset='UTF-8'; s.async = true;
	s.src = ('https:' === window.location.protocol ? 'https' : 'http')  + '://w.uptolike.com/widgets/v1/uptolike.js';
	document.getElementsByTagName('body')[0].appendChild(s);
};

module.exports.escapeRe = function(str) {
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};

