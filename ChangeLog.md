# v0.5.3
- Internal refactoring.

# v0.5.2
- `h` tag for html escaping content.
- Nested attributes objects auto-hyphenate.
- Attribute values are quote escaped.
- Some code cleanup and optimizations.

# v0.5.1
- You can now send a string literal as a template.
- It will auto-wrap string templates in a function block, if necessary.

# v0.5
- Added experimental support for inserting a context object into the template scope. (using a second `with` -- the horror!)

# v0.4.2
- Added support for NPM

# v0.4.1
- Added "__" tag for easily stitching together function arguments to return (useful for custom tags).

# v0.4
- Fancy mode is enabled by default for platforms that support it.
- blam.noConflict() restores whatever global.blam was before now.

# v0.3
- Added 'fancy' mode to allow assign classnames via a dot syntax: `div.classname-here`

# v0.2
- Added test for (previously broken, *ahem*) _ helper tag.
- Added each tag.

# v0.1
- Initial release!