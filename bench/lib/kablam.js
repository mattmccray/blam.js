// KABLAM! v0.2 by Matt McCray (https://github.com/darthapo/blam.js)
// Experimental version of blam that creates DOM Elements instead of an HTML String
;(function(global){
  
  var kablam= function(){
    var args= slice.call(arguments),
        block= args.pop(),
        fn= kablam.compile(block);
    return fn.apply(kablam.tags, args);
  };
  
  kablam.version= '0.2';
  
  kablam.tags= {
    '_': function(){
      return slice.call(arguments,0);
    },
    'each': function(arr, block){
      var results= [], value= null;
      for(var i=0, l=arr.length; i<l; i++) {
        value= block(arr[i], i);
        if(value) { // Ignore falsy values
          results.push(value);
        }
      }
      return results;
    }
  };
  
  kablam.define= function(tag, callback, compile) {
    if(compile !== false) {
      callback= kablam.compile(callback)
    }
    kablam.tags[tag]= callback;
  };
  
  kablam.compile= function(block) {
   with(kablam.tags) {
     var fn= eval('('+ block.toString() +')');
   } 
   return fn;
  };
  
  kablam.noConflict = function(){
    delete global.kablam;
    return kablam;
  };

  var _add_children= function(node, children) {
    for(var i=0, l=children.length; i< l; i++) {
      var child= children[i];
      child= (typeof(child) == 'function') ? child() : child;
      if(isArray(child)) {
        _add_children(node, child);
      } else if(typeof(child) == 'object'){
        // Assume it's a node?
        node.appendChild( child );
      } else {
        node.appendChild( document.createTextNode(child) );
      }
    }
  }
  
  var _build_tag= function(tag, args) {
    var node= document.createElement(tag), hash='', key='';
    if(args.length && isObject(args[0])) {
      hash= args.shift();
      for(key in hash) {
        if(hasOwn.call(hash, key)) {
          node.setAttribute(key, hash[key]);
        }
      }
    }
    _add_children(node, args)
    return node;
  };
  
  var slice= Array.prototype.slice,
      objProto= Object.prototype,
      toString= objProto.toString,
      hasOwn= objProto.hasOwnProperty,
      isArray= Array.isArray,
      isObject= function(obj){ return obj.constructor.prototype == objProto},
      taglist= "a abbr address area article aside audio b base bdi bdo blockquote body br button canvas caption cite code col colgroup command data datalist dd del details dfn div dl dt em embed eventsource fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link mark map menu meta meter nav noscript object ol optgroup option output p param pre progress q ruby rp rt s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr".split(' ');
  
  for (var i=0, l=taglist.length; i < l; i++){
    var tag= taglist[i];
    kablam.define(tag, (function(tag, build){
      return function() {
        return build(tag, slice.call(arguments,0));
      }
    })(tag, _build_tag), false);
  };
  
  taglist= null;
  
  if(!isArray) {
    isArray= function isArray(obj) {
      return (toString.call( obj ) === '[object Array]');
    }
  }
    
  if(global.exports) {
    global.exports.kablam= kablam;
  } else if(global.define) {
    define(function(){ return kablam; });
  } else {
    global.kablam= kablam;
  };
  
})(this);
