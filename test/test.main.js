if(!blam && require){
  var blam= require('../blam.js').blam;
  var expect= require('chai').expect;
}


describe('blam()', function(){

  it('should exist', function(){
    expect(blam).to.not.be.undefined;
  })
  
  it('should create a nested html string', function(){
    expect(blam(function(){ return html(div('Hello')) }))
      .to.equal('<html><div>Hello</div></html>')
  })

  it('should create attributes from object literal', function(){
    expect(blam(function(){ return html(div({ id:'my-div'}, 'Hello')) }))
      .to.equal('<html><div id="my-div">Hello</div></html>')
  })

  it('should pass through initial arguments to markup block', function(){
    expect(blam({ name:'Matt' }, function(user){ return html(div('Hello ', user.name)) }))
      .to.equal('<html><div>Hello Matt</div></html>')

    expect(blam({ name:'My App' }, { name:'Matt' }, function(app, user){ return html(h1(app.name), div('Hello ', user.name)) }))
      .to.equal('<html><h1>My App</h1><div>Hello Matt</div></html>')
  })
  
  it('call inline functions when generating html', function(){
    var template= blam.compile(function(){
      return article({ "class":"container" },
        section(
          (function(){
            return "TESTING"
          })
        )
      );
    });
    expect(template())
      .to.equal('<article class="container"><section>TESTING</section></article>')
  })

  it('inline functions should have access to data', function(){
    var template= blam.compile(function(user){
      return article({ "class":"container" },
        section(
          (function(){
            return "Hello "+ user.name;
          })
        )
      );
    });
    expect(template({ name:'Matt' }))
      .to.equal('<article class="container"><section>Hello Matt</section></article>')
  })
  
  
})
