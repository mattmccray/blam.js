describe('blam.noConflict()', function(){
  
  beforeEach(function(){
    window._blam= blam; //.noConflict()
  })
  
  afterEach(function(){
    window.blam= window._blam
  })

  it('should remove blam from the global scope', function(){
    var b= blam.noConflict()
    expect(window.blam).to.be.undefined
  })

  it('should return the blam object/function', function(){
    var b= blam.noConflict()
    expect(b).to.be.a.function
  })
  
  it('returned function should still be usable', function(){
    var b= blam.noConflict()
    expect(b).to.be.a.function
    expect(b(function(){ return html(); }))
      .to.equal('<html></html>')
      expect(b.compile(function(){ return html(); }))
        .to.be.a.function
  })

})
