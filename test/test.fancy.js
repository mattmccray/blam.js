describe('blam.fancy()', function(){

  after(function(){
    blam.fancy(false)
  })

  it('update the internals appropriately', function(){
    // Oh no! Testing internals...

    blam.fancy(true);
    expect(blam.compile).to.equal(blam._compile_fancy)
    expect(blam.fancy()).to.be.true
    expect(blam.compile).to.equal(blam._compile_fancy)

    blam.fancy(false);
    expect(blam.compile).to.equal(blam._compile_nonfancy)
    expect(blam.fancy()).to.be.false
    expect(blam.compile).to.equal(blam._compile_nonfancy)
    
  })

  it('should add css class for named.tags', function(){
    blam.fancy(true);
    expect(blam(function(){
      return div.home();
    })).to.equal('<div class="home"></div>')

    expect(blam(function(){
      return div.home ();
    })).to.equal('<div class="home"></div>')
  })

  it('should add allow all valid css class names', function(){
    blam.fancy(true);
    expect(blam(function(){
      return div.home(div.page-one(), div.page_two(), div.page3());
    })).to.equal('<div class="home"><div class="page-one"></div><div class="page_two"></div><div class="page3"></div></div>')
  })

  it('should add css class for named.tags with hashes too', function(){
    blam.fancy(true);
    expect(blam(function(){
      return div.home({ id:'main' });
    })).to.equal('<div class="home" id="main"></div>')

    expect(blam(function(){
      return div.home( { id:'main' } );
    })).to.equal('<div class="home" id="main"></div>')

    expect(blam(function(){
      return div.home ( { id:'main' } );
    })).to.equal('<div class="home" id="main"></div>')
  })

  it('should add multiple css classes for named.tags.together', function(){
    blam.fancy(true);
    expect(blam(function(){
      return div.home.main();
    })).to.equal('<div class="home main"></div>')
  })

  it('should add css classes regardless of nesting', function(){
    blam.fancy(true);
    expect(blam(function(){
      return div.home({ id:'main' }, p('hello'), p.farewell( { 'data-role':'exit' }, 'goodbye'), aside.sidebar(footer.foot.body('Copyright')));
    })).to.equal('<div class="home" id="main"><p>hello</p><p class="farewell" data-role="exit">goodbye</p><aside class="sidebar"><footer class="foot body">Copyright</footer></aside></div>')
  })

})
