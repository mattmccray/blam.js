describe('blam.define()', function(){

  it('should allow defining custom tags', function(){
    
    blam.define('userChip', function(){
      var args= Array.prototype.slice.call(arguments,0);
      return "<user>"+ args.join('') +"</user>"
    });
    
    expect(blam(function(){
      return aside( userChip( p("Welcome") ) )
    })).to.equal("<aside><user><p>Welcome</p></user></aside>")
  })

  it('should allow easy creation of nested tags', function(){
    
    // blam.define('userInfo', function(){
    //   var args= Array.prototype.slice.call(arguments,0),
    //       user= args.shift(),
    //       tmpl= blam.compile(function(user, extra){
    //         return div({'class':'user'}, 'User ', user.name, extra.join(''))
    //       });
    //   return tmpl(user, args);
    // });

    blam.define('userInfo', function(){
      var args= Array.prototype.slice.call(arguments,0),
          user= args.shift();
      return div({'class':'user'}, 'User ', user.name, args.join(''))
    });
    
    expect(blam({name:'Matt'}, function(user){
      return aside( userInfo( user, p("Welcome") ) )
    })).to.equal('<aside><div class="user">User Matt<p>Welcome</p></div></aside>')
  })

})