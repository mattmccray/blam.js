
```javascript

var fn_comment= /(\w)\s*\/\*(.*)\*\/\s*\((\s*\{[^\}]*\})?(\s*\))?/

```

Would match:

```javascript

section/* home glass test #more */(
  p("Content")
),
section/* home glass test #more */( 
  { data-role:'sure' },
  p("Content")
),
section /* home glass test #more */( 
  { data-role:'sure' },
  p("Content")
),
section/* home glass test #more */ ( 
  { data-role:'sure' },
  p/* content-area */("Content"),
  p/* content-area */(),
  p/* content-area */({ id:'Nelly'})
),

```


Or...

```javascript

var inline= /(\.[|a-zA-Z0-9_-]*)*\s*\((\s*\{[^\}]*\})?(\s*\))?/gi

```

for matching:

```javascript

section.home.main(
  p("Content")
),
section.home.other-stuff( 
  { data-role:'sure' },
  p("Content")
),
section.maid_3( 
  { data-role:'sure' },
  p("Content")
),
section.stuff( 
  { data-role:'sure' },
  p.all ("Content"),
  p.other.more.and(),
  p.surround.id.crap({ id:'Nelly'})
),

```