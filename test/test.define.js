describe('blam.define()', function(){

  it('should allow defining custom tags', function(){
    blam.fancy(false)
    blam.define('userChip', function(){
      var args= Array.prototype.slice.call(arguments,0);
      return "<user>"+ args.join('') +"</user>"
    });
    
    expect(blam(function(){
      return aside( userChip( p("Welcome") ) )
    })).to.equal("<aside><user><p>Welcome</p></user></aside>")
  })

  it('should allow easy creation of nested tags', function(){
    
    blam.fancy(false)

    blam.define('userInfo', function(){
      var args= Array.prototype.slice.call(arguments,0),
          user= args.shift();
      return div({'class':'user'}, 'User ', user.name, args.join(''))
    });
    
    expect(blam({name:'Matt'}, function(user){
      return aside( userInfo( user, p("Welcome") ) )
    })).to.equal('<aside><div class="user">User Matt<p>Welcome</p></div></aside>')
  })

  it('should work in fancy mode too', function(){
    
    blam.fancy(true)

    blam.define('userInfo', function(){
      var args= Array.prototype.slice.call(arguments,0),
          user= args.shift();
      return div.user('User ', user.name, args.join(''))
    });
    
    expect(blam({name:'Matt'}, function(user){
      return aside.misc( userInfo( user, p("Welcome") ) )
    })).to.equal('<aside class="><div class="user">User Matt<p>Welcome</p></div></aside>')
  })

})