blam.js
=======

**Simple, Tiny, Fast** (enough)

Example usage (in CoffeeScript):

```coffeescript
blam(->
  html(
    head(
      title( "Hello" )
      script( src:"/my-script.js" )
      link( rel:"stylesheet", type:"text/css", href:"/my-styles.css" )
    )
    body(
      article( id:"main",
        section.content(
          p("Loading...")
        )
        aside.sidebar( "Nav here" )
      )
    )
  )
)
```

You can use it in JavaScript too (but it's much prettier in CoffeeScript):

```javascript
blam(function(){
  return html(
    head(
      title( "Hello" ), 
      script({ src: "/my-script.js" }),
      link({ rel: "stylesheet", type: "text/css", href: "/my-styles.css" })), 
      body(
        article({ id: "main" }, 
          section.content(
            p("Loading...")
          ), 
        aside.sidebar( "Nav here")
      )
    )
  )
});
```
If you like, you can compile string templates as well (you'll need to use the javascript syntax):

```html
<script type="text/blam" id="my_template">
article.container(
  section.main(
    p("Hello!")
  ),
  aside.sidebar(
    ul(
      li("Navigation, mayhaps?")
    )
  )
)
</script>
<script>
var template_string= document.getElementById('my_template');
// Render it...
var html= blam( template_string );

// Or if you're gonna reuse the template, you should probably compile it:
var template= blam.compile( template_string );

// then however many times you want
var html= template();
</script>
```

## Notes

Clocks in at ~1K minified and gzipped.

MIT Licensed.

Unit tests can be found at: [darthapo.github.com/blam.js/test](http://darthapo.github.com/blam.js/test)

***Please* let me know if any of the tests break in your browser!**


If the first argument to a tag block is an object literal then its key/value pairs are used as tag attributes.

```coffeescript
blam ->
  div( id:"posts", 'data-role':"post",
    p("content here...")
  )
# => '<div id="posts" data-role="post"><p>content here...</p></div>'
```

Blam will pass initial arguments on to the markup block:

```coffeescript
blam name:'Matt', (user)->
  div( id:'user-block',
    p("Hello ", user.name)
  )
```

Markup blocks can be "compiled" into an executable function (good for often repeated bits of code):

```coffeescript
template= blam.compile (user)->
  div( id:'user-block',
    p("Hello ", user.name)
  )

html+= template(user) for user in all_users
```

For array elements you can use the `each` tag:

```coffeescript
template= blam.compile (users)->
  div( id:'user-block',
    each(users, (user)->
      p("Hello ", user.name)
    )
  )

html+= template(all_users)
```

You can create partials/custom tags:

```coffeescript
blam.define 'layout', ->
  article.container(
    header( h1( "My App" ) )
    section.body( __(arguments) )
    footer( p("&copy; me!") )
  )
```

You can then use it like a tag:

```coffeescript
blam @posts, (posts)->
  layout(
    div.posts(
      each(posts, (post)->
        div.entry( post.body )
      )
    )
  )
```

You can turn off the fancy auto css class support:

```coffeescript
blam.fancy(no)

# You have to use the attributes hash to add classnames now:
blam ->
  div( class:'my-class', "Content")
```

## Scopes

You can add a single object to a markup block's scope when pre-compiling templates:

```coffeescript
data=
  name: 'Me'
  age: 'Old Enough'

template= blam.scope(data).compile ->
  div( name, " is ", age )

html= template()
#=> "<div>Me is Old Enough</div>"
```

## Backbone Mini Example

```coffeescript

class TweetView extends Backbone.View
  @template: blam.compile (tweet)->
    div.tweet(
      img.avatar( 
        src: tweet.profile_image_url
        alt: tweet.from_user_name
      )
      div.status(
        tweet.status
      )
      div.footer(
        "@"
        tweet.from_user
        " said on "
        tweet.created_at
      )
    )

  render: ->
    @$el.html TweetView.template( @model.toJSON() )
```

## Node.js

Blam is available as an npm package as well. To install:

```npm install blam```

Or, use the `-g` option to install it globally:

```npm install blam -g```

Then `require` it as per usual in node:

```javascript
var blam= require('blam').blam;

blam.compile(function(){ return div("etc...") })
```


## Todo

- Need to cleanup this ReadMe and create some proper docs.

- Would like to support all the modern browsers and possibly as far back as IE8?

- Need to test AMD support.

- Extract and expose tag building helpers.

- Dasherize attributes? (dataRole:"page" would expand to 'data-role="page"')

## Aren't `eval` and `with` Evil?

**No!** They're just *misunderstood*. Blam.js is a good example of why they are useful as language features. They allow excellent DSL generation.

That having been said, it *is* a good rule of thumb that if you don't know when is best to use them; don't.
