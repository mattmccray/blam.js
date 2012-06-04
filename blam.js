;// BLAM! v0.2 by Matt McCray (https://github.com/darthapo/blam.js)
;(function(global){
  
  var blam= function(){
    var args= slice.call(arguments),
        block= args.pop(),
        fn= blam.compile(block);
    return fn.apply(blam.tags, args);
  };
  
  blam.version= '0.2';
  
  blam.tags= {
    '_': function(){
      var args=slice.call(arguments,0),
          html = '';
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
  
  blam.compile= function(block) {
   with(blam.tags) {
     var fn= eval('('+ block.toString() +')');
   } 
   return fn;
  };
  
  blam.noConflict = function(){
    delete global.blam;
    return blam;
  };
  
  var _build_tag= function(tag, args) {
    var html= '<',
        atts= '',
        hash= '',
        key= '';
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
  
  var slice= Array.prototype.slice,
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
  
})(this);