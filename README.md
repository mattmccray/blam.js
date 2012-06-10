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
      link(
        rel:"stylesheet"
        type:"text/css"
        href:"/my-styles.css"
      )
    )
    body(
      article( id:"main",
        section( class:'content',
          p("Loading...")
        )
        aside( class:'sidebar' )
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
          section({ "class": 'content' }, 
            p("Loading...")
          ), 
        aside({ "class": 'sidebar'})
      )
    )
  )
});
```

## New "Fancy" Mode

If you enable fancy mode, during the compilation phase it adds support for assigning classnames via a dot syntax like slim or haml. Example:

```coffeescript
blam.fancy yes

html= blam ->
  div.container(
    div.header( 
      id:'my-header'
      h1("Header")
    )
    div.content(
      "Content"
    )
    div.footer.hidden (
      "Multiple classes too"
    )
  )
```

Will generate:

```html
<div class="container"><div class="header" id="my-header"><h1>Header</h1></div><div class="content">Content</div><div class="footer hidden">Multiple classes too</div></div>
```

Note: The lack of extra whitespace/indentation is intentional, blam generates html for the browser to read, humans not so much.


## Notes

Clocks in at ~1K minified and gzipped.

Supports adding custom tags:

```coffeescript
blam.define 'jqmpage', (args...)->
  div 'data-role':'page',
    div 'data-role':'header', args...
```

Passes initial arguments on to markup block:

```coffeescript
blam name:'Matt', (user)->
  div( id:'user-block',
    p("Hello ", user.name)
  )
```

Can be "compiled" into an executable function (good for often repeated bits of code):

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


## BackBone Example

```coffeescript
class TweetListView extends Backbone.View
  initialize: ->
    # bind to @collection changes to add/remove TweetViews
    
  render: ->
    @el.append blam(@, (view)->
      div( class:"tweet-list", -> 
        # probably wouldn't actually need a root node, good for example though
        view.collection.each (tweet)-> 
          tweetView= new TweetView( model:tweet )
          tweetView.render().el
      )
    )

class TweetView extends Backbone.View
  className: 'tweet'
  
  events:
    "click .reply": "doReply"
  
  doReply: (e)=>
    alert "Do reply code here..."
    
  render: ->
    @el.attr 'id', @model.get(id)
    @el.append blam(@model, (model)->
      div( class:"body",
        div( class:"actions",
          button( class:"reply", "Reply..." )
          button( class:"retweet", "Retweet..." )
        )
        model.get('body')
      )
    )
```

## Todo

- Dasherize attributes? (dataRole:"page" would expand to 'data-role="page"')

- Would like to support all the modern browsers and possibly as far back as IE8? (run tests!!!)

- Need to test AMD support.

- Extract and expose tag building helpers.


## Aren't `eval` and `with` Evil?

No! They're just misunderstood. This is exactly why they are useful as a language feature. They allow excellent DSL generation.

That said, it *is* a good rule of thumb that if you don't know when is best to use them; don't.
