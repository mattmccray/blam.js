describe('blam.tags', function(){
  
  describe('_', function(){
    it('should stitch together elements without adding to output', function(){
      expect(blam(function(){ return _( div("A"), div("B")) }))
        .to.equal('<div>A</div><div>B</div>')
    })
    it('should swallow falsy values', function(){
      expect(blam(function(){ return _( div("A"), null, div("B"),function(){}, false)}))
        .to.equal('<div>A</div><div>B</div>')
    })
  })

  describe('__', function(){
    it('should stitch together function arguments/arrays without adding to output', function(){
      expect(blam(function(){ 
        return __([p('HELLO'), 'all'], div("A"), div("B")) 
      }))
        .to.equal('<p>HELLO</p>all<div>A</div><div>B</div>')
    })
    it('should swallow falsy values', function(){
      expect(blam(function(){ return _( div("A"), null, div("B"),function(){}, false)}))
        .to.equal('<div>A</div><div>B</div>')
    })
    it('should output function arguments from custom tag', function(){
      blam.define('my_test_tag', function(){
        return div.container(__(arguments))
      });
      expect(blam(function(){ 
        return my_test_tag(p("Hi")) 
      }))
        .to.equal('<div class="container"><p>Hi</p></div>')
    })
  })
  
  
  describe('each', function(){
    
    it('should iterate over array values', function(){
      var users= [
        'Matt', 'Dan', 'Sam'
      ];
      expect(blam(users, function(users){ return ul( each(users, function(user){ return li(user)})); }))
        .to.equal('<ul><li>Matt</li><li>Dan</li><li>Sam</li></ul>')
    })
    
  })
})