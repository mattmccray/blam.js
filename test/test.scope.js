if(!blam && require){
  var blam= require('../blam.js').blam;
  var expect= require('chai').expect;
}


describe('blam.scope()', function(){

  it('should insert the ctx object into template scope', function(){
    blam.fancy(true);

    var ctx= {
          name: 'Bob',
          show: 'This old house'
        },
        src= function(){
          return div.tv-show(
            h1(name),
            p(show)
          );
        },
        tmpl= blam.scope(ctx).compile(src),
        tmpl2= blam.compile(src, ctx);

    expect(tmpl()).to.equal('<div class="tv-show"><h1>Bob</h1><p>This old house</p></div>');
    expect(tmpl2()).to.equal('<div class="tv-show"><h1>Bob</h1><p>This old house</p></div>');

  })

  it('should insert the ctx object into template scope (non-fancy mode)', function(){
    blam.fancy(false);

    var ctx= {
          name: 'Bob',
          show: 'This old house'
        },
        src= function(){
          return div({ class:'tv-show'},
            h1(name),
            p(show)
          );
        },
        tmpl= blam.scope(ctx).compile(src),
        tmpl2= blam.compile(src, ctx);

    expect(tmpl()).to.equal('<div class="tv-show"><h1>Bob</h1><p>This old house</p></div>');

    expect(tmpl2()).to.equal('<div class="tv-show"><h1>Bob</h1><p>This old house</p></div>');

  })

  it('should do the same for inline (non-compiled) templates too', function(){
    blam.fancy(false);

    var ctx= {
          name: 'Bob',
          show: 'This old house'
        },
        src= function(){
          return div({ class:'tv-show'},
            h1(name),
            p(show)
          );
        },
        tmpl= blam.scope(ctx);

    expect(tmpl(src)).to.equal('<div class="tv-show"><h1>Bob</h1><p>This old house</p></div>');

  })

  // it('should work with templates of all types', function(){
  //   blam.fancy(false);

  //   var ctx= {
  //         name: 'Bob',
  //         show: 'This old house'
  //       },
  //       src= function(){
  //         user= typeof user == 'undefined' ? arguments[0] : user;
  //         return div({ class:'tv-show'},
  //           h1(user.name),
  //           p(user.show)
  //         );
  //       },
  //       tmpl= blam.scope({ user:ctx }).compile(src),
  //       tmpl2= blam.compile(src);

  //   expect(tmpl()).to.equal('<div class="tv-show"><h1>Bob</h1><p>This old house</p></div>');

  //   expect(tmpl2(ctx)).to.equal('<div class="tv-show"><h1>Bob</h1><p>This old house</p></div>');

  // })

})