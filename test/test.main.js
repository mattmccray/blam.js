if(!blam && require){
  var blam= require('../blam.js').blam;
  var expect= require('chai').expect;
}


describe('blam() v'+ blam.version, function(){

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

  it('should create hyphenated attributes from nested object literals', function(){

    expect(blam(function(){ return html(div({ data:{ role:'button', inset:'true' }}, 'Hello')) }))
      .to.equal('<html><div data-role="button" data-inset="true">Hello</div></html>')

    expect(blam(function(){ return html(div({ data:{ role:'button', inset:'true', really:{ good:'yes', bad:'no' } }}, 'Hello')) }))
      .to.equal('<html><div data-role="button" data-inset="true" data-really-good="yes" data-really-bad="no">Hello</div></html>')

  })

  it('should escape doublequotes in  attribute values', function(){
    expect(blam(function(){ return html(div({ title:'"Mr." Jones'}, 'Hello')) }))
      .to.equal('<html><div title="&quot;Mr.&quot; Jones">Hello</div></html>')
  })


  it('should pass through initial arguments to markup block', function(){
    expect(blam({ name:'Matt' }, function(user){ return html(div('Hello ', user.name)) }))
      .to.equal('<html><div>Hello Matt</div></html>')

    expect(blam({ name:'My App' }, { name:'Matt' }, function(app, user){ return html(h1(app.name), div('Hello ', user.name)) }))
      .to.equal('<html><h1>My App</h1><div>Hello Matt</div></html>')
  })
  
  it('should call inline functions when generating html', function(){
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

  it('should allow templates as a string', function(){
    expect(blam("function(){ return html(div('Hello')) }"))
      .to.equal('<html><div>Hello</div></html>')

  })
  
  it('should function wrap template strings if needed', function(){
    expect(blam("html(div('Hello'))"))
      .to.equal('<html><div>Hello</div></html>')
    expect(blam.scope({name:'Matt'})("html(div('Hello ', name))"))
      .to.equal('<html><div>Hello Matt</div></html>')


    blam.fancy(true)
    expect(blam("html(div.test('Hello'))"))
      .to.equal('<html><div class="test">Hello</div></html>')
    expect(blam.scope({name:'Matt'})("html(div.test('Hello ', name))"))
      .to.equal('<html><div class="test">Hello Matt</div></html>')
    blam.fancy(false)

    
  })
  
  
})
