// BLAM! v0.4 by Matt McCray (https://github.com/darthapo/blam.js)
;(function(global){
  var old_blam= global.blam;
  
  var blam= function(){
    var args= slice.call(arguments),
        block= args.pop(),
        fn= blam.compile(block);
    return fn.apply(blam.tags, args);
  };
  
  blam.version= '0.4';
  
  blam.tags= {
    '_': function(){
      var args=slice.call(arguments,0), html = '';
      for(var i=0, l=args.length; i< l; i++) {
        var child= args[i],
            value= (typeof(child) == 'function') ? child() : child;
        if(value) { // Ignore falsy values
          html+= value;
        }
      }
      return html;
    },
    'each': function(arr, block){
      var html= '', value= null;
      for(var i=0, l=arr.length; i<l; i++) {
        value= block(arr[i], i);
        if(value) { // Ignore falsy values
          html+= value;
        }
      }
      return html;
    }
  };
  
  blam.define= function(tag, callback, compile) {
    if(compile !== false) {
      callback= blam.compile(callback)
    }
    blam.tags[tag]= callback;
  };
  
  blam._compile_nonfancy= function(block) {
    with(blam.tags) {
      var fn= eval('('+ block.toString() +')');
    } 
    return fn;
  };

  blam._compile_fancy= function(block) {
    // There Be Dragons: This isn't supported (correctly) in all browsers
    // so use with caution. (I'm looking at you Internet Explorer)
    var fns= block.toString().replace(css_matcher, function(src, tagName, classes, hash, empty){
      var result= src.replace(classes, ''),
          classNames= (classes || "").split(' ').join('').split('.').splice(1).join(' ');
      if(!blam.tags[tagName]) {
        result= src;
      } else if(classNames !== "") {
        if(hash) {
          result= tagName+ '({"class":"'+ classNames +'", '+ result.substring((result.indexOf('{') + 1));
        } else if(empty) {
          result= tagName+ '({"class":"'+ classNames +'"})';
        } else {
          result= tagName+ '({"class":"'+ classNames +'"},'+ result.substring((result.indexOf('(') + 1));
        }
      } 
      return result;
    });
    with(blam.tags) {
      var fn= eval('('+ fns +')');
    } 
    return fn;
  }

  blam.compile= blam._compile_nonfancy

  blam.fancy= function() {
    if(arguments.length > 0) {
      if(arguments[0]) {
        blam.compile= blam._compile_fancy;
      } else {
        blam.compile= blam._compile_nonfancy;
      }
    }
    return (blam.compile == blam._compile_fancy);
  }
  
  blam.noConflict = function(){
    global.blam = old_blam;
    return blam;
  };
  
  var _build_tag= function(tag, args) {
    var html= '<', atts= '',
        hash= '',  key= '';
    if(typeof(args[0]) == 'object') {
      hash= args.shift();
      for(key in hash) {
        if(hasOwn.call(hash, key)) {
          atts += ' '+ key +'="'+ hash[key] +'"';
        }
      }
    }
    html += tag + atts +'>';
    for(var i=0, l=args.length; i< l; i++) {
      var child= args[i];
      html += (typeof(child) == 'function') ? child() : child;
    }
    html += '</'+ tag + '>';
    return html;
  };
  
  var css_matcher= /(\w*)(\.[\.a-zA-Z0-9_\- ]*)*\s*\((\s*\{[^\}]*\})?(\s*\))?/gi,
      slice= Array.prototype.slice,
      hasOwn= Object.prototype.hasOwnProperty,
      taglist= "a abbr address area article aside audio b base bdi bdo blockquote body br button canvas caption cite code col colgroup command data datalist dd del details dfn div dl dt em embed eventsource fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link mark map menu meta meter nav noscript object ol optgroup option output p param pre progress q ruby rp rt s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr".split(' ');
  
  for (var i=0, l=taglist.length; i < l; i++){
    var tag= taglist[i];
    blam.define(tag, (function(tag, build){
      return function() {
        return build(tag, slice.call(arguments,0));
      }
    })(tag, _build_tag), false);
  };
  
  taglist= null;
    
  if(global.exports) {
    global.exports.blam= blam;
  } else if(global.define) {
    define(function(){ return blam; });
  } else {
    global.blam= blam;
  };

  // If this js env correctly supports fancy mode, enable it.
  ("div.it.works()").replace(css_matcher, function(s, t, c, h, e){ 
    if(t == 'div' && c == ".it.works") {
      blam.fancy(true);
    }
    return s; 
  })
  
})(this);