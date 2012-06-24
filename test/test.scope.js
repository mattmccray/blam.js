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

  // it('should not spill scope into custom tags', function(){
  //   blam.fancy(true);
  //   blam.define('custom_scope_tag', function(){
  //     return div.container(__(arguments));
  //   });
  //   blam.define('custom_scope_tag2', function(){
  //     return div.container(name);
  //   });

  //   var ctx= {
  //         name: 'Bob',
  //         show: 'This old house'
  //       },
  //       src= function(){
  //         return custom_scope_tag(
  //           h1(name),
  //           p(show)
  //         );
  //       },
  //       src2= function(){
  //         return custom_scope_tag2();
  //       },
  //       src3= function(){
  //         return div.container(
  //             function() {
  //               return p(name);
  //             }
  //           );
  //       },
  //       tmpl= blam.scope(ctx);

  //   expect(tmpl(src)).to.equal('<div class="container"><h1>Bob</h1><p>This old house</p></div>');

  //   expect(tmpl(src2)).to.not.equal('<div class="container">Bob</div>');

  //   expect(tmpl(src3)).to.equal('<div class="container"><p>Bob</p></div>');
  // })

})