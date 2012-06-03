blam.js
=======

**Simple, Tiny, Fast** (enough)

Example usage (in CoffeeScript):

```coffeescript
blam(->
  html(
    head(
      title("Hello")
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

In JavaScript:

```javascript
blam(function(){
  html(
    head(
      title("Hello"), 
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
