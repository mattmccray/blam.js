if(!blam && require){
  var blam= require('../blam.js').blam;
  var expect= require('chai').expect;
}

describe('blam.compile()', function(){
  
  it('should return a compiled function', function(){
    var template= blam.compile(function(){
      return article(
        section("TESTING")
      );
    });
    expect(template).to.be.a.function
  })

  it('returned function should generate html', function(){
    var template= blam.compile(function(){
      return article({ "class":"container" },
        section("TESTING")
      );
    });
    expect(template())
      .to.equal('<article class="container"><section>TESTING</section></article>')
  })

  it('returned function should accept data arguments', function(){
    var template= blam.compile(function(user){
      return article(
        section("Hello ", user.name)
      );
    });
    expect(template({ name:'Bob' }))
      .to.equal("<article><section>Hello Bob</section></article>")
  })
  
})