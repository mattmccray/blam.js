if(!blam && require){
  var blam= require('../blam.js').blam;
  var expect= require('chai').expect;
}

var global= this;

describe('blam.noConflict()', function(){
  
  it('should remove blam from the global scope', function(){
    var b= blam.noConflict()
    
    expect(global.blam).to.be.undefined

    global.blam= b;
  })

  it('should return the blam object/function', function(){
    var b= blam.noConflict()
    expect(b).to.be.a.function

    global.blam= b;
  })

  describe('disconnected blam function', function(){

    it('returned function should still be usable', function(){
      var b= blam.noConflict()
      expect(b).to.be.a.function
      expect(b(function(){ return html(); }))
        .to.equal('<html></html>')
        expect(b.compile(function(){ return html(); }))
          .to.be.a.function

      global.blam= b;
    })

  })
  

})
