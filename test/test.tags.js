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