if(!blam && require){
  var blam= require('../blam.js').blam;
  var expect= require('chai').expect;
}


describe('blam.fancy()', function(){

  after(function(){
    blam.fancy(false)
  })

  it('should update the internals appropriately', function(){
    blam.fancy(true);
    expect(blam.fancy()).to.be.true
    blam.fancy(false);
    expect(blam.fancy()).to.be.false
  })

  it('should add css classname for tag.classname', function(){
    blam.fancy(true);
    expect(blam(function(){
      return div.home();
    })).to.equal('<div class="home"></div>')

    expect(blam(function(){
      return div.home ();
    })).to.equal('<div class="home"></div>')
  })

  it('should allow all valid css class names', function(){
    blam.fancy(true);

    var tmpl=function(){
          return div.home(div.page-one(), div.page_two(), div.page3());
        },
        fn= blam.compile(tmpl)

    // console.log("Translated:", fn.toString())

    expect(fn()).to.equal('<div class="home"><div class="page-one"></div><div class="page_two"></div><div class="page3"></div></div>')
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

    var tmpl= function(){
      return div.home({ id:'main' }, p('hello'), p.farewell( { 'data-role':'exit' }, 'goodbye'), aside.sidebar(footer.foot.body('Copyright')));
    }
    var fn= blam.compile(tmpl)

    // console.log("Translated:", fn.toString())

    expect(fn()).to.equal('<div class="home" id="main"><p>hello</p><p class="farewell" data-role="exit">goodbye</p><aside class="sidebar"><footer class="foot body">Copyright</footer></aside></div>')
  })

})
