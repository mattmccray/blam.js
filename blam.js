// BLAM! v0.5.3 by Matt McCray (https://github.com/darthapo/blam.js)
;(function(global, undef){

  var VERSION= "0.5.3",
      slice= Array.prototype.slice,
      old_blam= global.blam || undef,
      hasOwn= Object.prototype.hasOwnProperty,
      quote_matcher= /"/g,
      char_matcher= /\W/g,
      css_matcher= /(\w*)(\.[\.a-zA-Z0-9_\- ]*)*\s*\((\s*\{[^\}]*\})?(\s*\))?/gi,
      simple_matcher= /(\([a-zA-Z0-9\-_\.]*)/g,
      taglist= "a abbr address area article aside audio b base bdi bdo blockquote body br button canvas caption cite code col colgroup command data datalist dd del details dfn div dl dt em embed eventsource fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link mark map menu meta meter nav noscript object ol optgroup option output p param pre progress q ruby rp rt s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr".split(' '), i, l;


  var tagset= {
    _: function(){
      var args=slice.call(arguments), html = '', i, j, l, child, value;
      for(i=0, l=args.length; i< l; i++) {
        child= args[i], value= (typeof(child) === 'function') ? child() : child;
        if(value) { // Ignore falsy values
          html+= value;
        }
      }
      return html;
    },
    __: function(){ // Expect 1 or more arrays as parameters
      var args=slice.call(arguments), html= '', value, i, l, j, jl;
      for(i=0, l=args.length; i<l; i++) {
        value= args[i];
        if(value && value.length) { // Ignore falsy values
          for(j=0, jl=value.length; j<jl; j++){
            html+= tagset._( value[j] );
          }
        }
      }
      return html;
    },
    each: function(arr, block){
      var html= '', value, i, l;
      for(i=0, l=arr.length; i<l; i++) {
        value= block(arr[i], i);
        if(value) { // Ignore falsy values
          html+= value;
        }
      }
      return html;
    },
    h: function(text) {
      // Not the most exhaustive, but it's better than nothing.
      return String(text).replace(char_matcher, function (chr) {
        return '&#' + chr.charCodeAt(0) + ';';
      });
    }
  };

  //@ Deprecated: This will probably go away soon...
  //  Instead use: blam.compile( block, ctx )
  function set_scope(ctx){
    if(!ctx) ctx= {}; // Did throw exception...
    var scoped_blam= function(){
      var args= slice.call(arguments), block= args.pop();
      return blam.compile(block, ctx).apply(tagset, args);
    };
    scoped_blam.compile= function(block){
      return blam.compile(block, ctx);
    };
    scoped_blam.simple= function(text){
      return blam.simple(text, ctx);
    };
    return scoped_blam;
  };
  
  function define_tag(tag, callback, compile_block) {
    if(compile_block !== false) {
      callback= blam.compile(callback);
    }
    tagset[tag]= callback;
  };

  function simple(text, scope) {
    var oc, cc, diff, fn_body, count;
    if( (oc=( (text.match(/\(/g) || []).length )) > (cc= ((text.match(/\)/g) || []).length)) ) {
      // Autobalance trailing parens...
      diff= oc - cc;
      count= 0;
      while(count < diff) {
        text += ")";
        count++;
      }
    }
    fn_body= text.replace(simple_matcher, function(src, simple, i, full){
      return simple.substring(1)+ '(';
    });
    // console.log("Transpiled body", fn_body)
    return blam.compile(fn_body, scope)
  }

  function compile_scope(block, scope) {
    var fn, fns= block.toString(), tags= tagset;
    fns= (fns.indexOf('function') < 0) ? "(function(){ return "+ fns +";})" : "("+ fns +")";
    if(scope) {
      with(scope) {
        with(tags) {
          fn= eval(fns);
        } 
      }
    } else {
      with(tags) {
        fn= eval(fns);
      } 
    }
    return fn;
  };
  
  // There Be Dragons: This isn't supported (correctly) in all browsers
  // so use with caution. (I'm looking at you Internet Explorer)
  function compile_fancy(block, scope) {
    var fns= block.toString().replace(css_matcher, function(src, tag_name, classes, hash, empty){
      var result= src.replace(classes, ''), tag_start,
          classNames= (classes || "").split(' ').join('').split('.').splice(1).join(' ');
      if(!tagset[tag_name]) {
        result= src;
      } else if(classNames !== "") {
        tag_start= tag_name +'({"class":"'+ classNames +'"';
        if(hash) {
          result= tag_start +', '+ result.substring((result.indexOf('{') + 1));
        } else if(empty) {
          result= tag_start +'})';
        } else {
          result= tag_start +'},'+ result.substring((result.indexOf('(') + 1));
        }
      } 
      return result;
    });
    return compile_scope(fns, scope);
  };

  function build_attrs(hash, base_name) {
    var atts= '', key, value, type;
    if(base_name !== '') {
      base_name +=  '-';
    }
    for(key in hash) {
      // if(hasOwn.call(hash, key)) {
        value= hash[key];
        type= typeof(value);
        if(type === 'object') {
          atts += build_attrs(value, base_name + key);
        } else if(type !== 'function') {
          atts += ' '+ base_name + key +'="'+ value.toString().replace(quote_matcher, '&quot;') +'"';
        }
      // }
    }
    return atts;
  };
  
  function build_tag(tag, args) {
    var html= '', child, i, l, 
        atts= (typeof(args[0]) === 'object') ? build_attrs(args.shift(), '') : '';
    for(i=0, l=args.length; i< l; i++) {
      child= args[i];
      html += (typeof(child) === 'function') ? child() : child;
    }
    return '<'+ tag + atts +'>'+ html + '</'+ tag + '>';
  };

  function tag_closure(tagName, builder){
    define_tag(tagName, function() { 
      return builder(tagName, slice.call(arguments));
    }, false);
  };

  for (i=0, l=taglist.length; i < l; i++){
    tag_closure(taglist[i], build_tag);
  };
  
  taglist= null;

  function blam(){
    var args= slice.call(arguments), block= args.pop();
    return blam.compile(block).apply(tagset, args);
  };
  
  blam.version= VERSION;
  blam.compile= compile_scope;
  blam.define= define_tag;
  blam.scope= set_scope;
  blam.simple= simple;

  blam.tags= function(){
    return tagset;
  };

  blam.fancy= function() {
    if(arguments.length > 0) {
      blam.compile = (arguments[0]) ? compile_fancy : compile_scope;
    }
    return (blam.compile === compile_fancy);
  };
  
  blam.noConflict = function(){
    global.blam = old_blam;
    return blam;
  };
    
  if(global.exports) {
    global.exports.blam= blam;
  } else if(global.define) {
    define(function(){ return blam; });
  } else {
    global.blam= blam;
  };

  // If this js env correctly supports fancy mode, enable it.
  ("div.it.works()").replace(css_matcher, function(s, t, c, h, e){ 
    blam.fancy( (t === 'div' && c === ".it.works") );
    return s; 
  });
  
})(this);