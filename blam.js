// BLAM! v0.5.1 by Matt McCray (https://github.com/darthapo/blam.js)
;(function(global, undef){
  
  var blam= function(){
    var args= slice.call(arguments),
        block= args.pop(),
        fn= blam.compile(block);
    return fn.apply(blam.tags, args);
  };
  
  blam.version= '0.5.1';
  
  blam.tags= {
    '_': function(){
      var args=slice.call(arguments,0), html = '', i= 0, j=0, l=0, child=null, value=null;
      for(i=0, l=args.length; i< l; i++) {
        child= args[i], value= (typeof(child) == 'function') ? child() : child;
        if(value) { // Ignore falsy values
          html+= value;
        }
      }
      return html;
    },
    '__': function(){ // Expect 1 or more arrays as parameters
      var args=slice.call(arguments,0), html= '', value= null, i= 0, l= 0, j= 0, jl= 0;
      for(i=0, l=args.length; i<l; i++) {
        value= args[i];
        if(value && value.length) { // Ignore falsy values
          for(j=0, jl=value.length; j<jl; j++){
            html+= blam.tags._( value[j] );
          }
        }
      }
      return html;
    },
    'each': function(arr, block){
      var html= '', value= null, i= 0, l= 0;
      for(i=0, l=arr.length; i<l; i++) {
        value= block(arr[i], i);
        if(value) { // Ignore falsy values
          html+= value;
        }
      }
      return html;
    }
  };

  blam.scope= function(ctx){
    if(!ctx) throw 'Context object required to create scope!';
    var custom_blam= function(){
      var args= slice.call(arguments),
          block= args.pop(),
          fn= blam.compile(block, ctx);
      return fn.apply(blam.tags, args);
    };
    custom_blam.compile= function(block){
      return blam.compile(block, ctx);
    };
    return custom_blam;
  };
  
  blam.define= function(tag, callback, compile) {
    if(compile !== false) {
      callback= blam.compile(callback);
    }
    blam.tags[tag]= callback;
  };

  blam._do_compile= function(block, scope) {
    var fn= null, fns= block.toString();
    fns= fns.indexOf('function') < 0 ? "(function(){ return "+ fns +";})" : "("+ fns +")";
    if(scope) {
      var tags= blam.tags, fn= null;
      with(scope) {
        with(tags) {
          fn= eval(fns);
        } 
      }
    } else {
      with(blam.tags) {
        fn= eval(fns);
      } 
    }
    return fn;
  };
  
  blam._compile_nonfancy= function(block,scope) {
    return blam._do_compile(block, scope);
  };

  blam._compile_fancy= function(block, scope) {
    // There Be Dragons: This isn't supported (correctly) in all browsers
    // so use with caution. (I'm looking at you Internet Explorer)
    var fn= null, fns= block.toString().replace(css_matcher, function(src, tagName, classes, hash, empty){
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
    return blam._do_compile(fns, scope);
  };

  blam.compile= blam._compile_nonfancy;

  blam.fancy= function() {
    if(arguments.length > 0) {
      if(arguments[0]) {
        blam.compile= blam._compile_fancy;
      } else {
        blam.compile= blam._compile_nonfancy;
      }
    }
    return (blam.compile == blam._compile_fancy);
  };
  
  blam.noConflict = function(){
    global.blam = old_blam;
    return blam;
  };
  
  var _build_tag= function(tag, args) {
    var html= '<', atts= '', child= null, hash= null, key= null, i= 0, l= 0;
    if(typeof(args[0]) == 'object') {
      hash= args.shift();
      for(key in hash) {
        if(hasOwn.call(hash, key)) {
          atts += ' '+ key +'="'+ hash[key] +'"';
        }
      }
    }
    html += tag + atts +'>';
    for(i=0, l=args.length; i< l; i++) {
      child= args[i];
      html += (typeof(child) == 'function') ? child() : child;
    }
    html += '</'+ tag + '>';
    return html;
  };
  
  var css_matcher= /(\w*)(\.[\.a-zA-Z0-9_\- ]*)*\s*\((\s*\{[^\}]*\})?(\s*\))?/gi,
      slice= Array.prototype.slice,
      old_blam= global.blam || undef,
      hasOwn= Object.prototype.hasOwnProperty,
      taglist= "a abbr address area article aside audio b base bdi bdo blockquote body br button canvas caption cite code col colgroup command data datalist dd del details dfn div dl dt em embed eventsource fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link mark map menu meta meter nav noscript object ol optgroup option output p param pre progress q ruby rp rt s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr".split(' '), i= 0, l= 0, tag=null;
  
  for (i=0, l=taglist.length; i < l; i++){
    tag= taglist[i];
    blam.define(tag, (function(tag, build){
      return function() {
        return build(tag, slice.call(arguments,0));
      }
    })(tag, _build_tag), false);
  };
  
  taglist= tag= null;
    
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
  });
  
})(this);