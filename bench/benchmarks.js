if(old_blam.version != blam.version) {
	benchmark('Old Blam vs New Blam', function(b){
		var tmpl= function() {
						return article(section.main('content'), aside('sidebar'));
	  			},
				tmpl_b= blam.compile(tmpl),
				tmpl_k= old_blam.compile(tmpl);
		
		b.add('New Blam', function() {
			tmpl_b()
		})
		.add('Old Blam', function() {
			tmpl_k()
		})

	})	
}


benchmark('Blam vs Blam.fancy()', function(b){
	var tmplA= function() {
					return article(section({ 'class':'main' }, 'content'), aside('sidebar'));
  			},
  		tmplB= function() {
					return article(section.main('content'), aside('sidebar'));
  			};
  	blam.fancy(true);
		var ft= blam.compile(tmplB);
		blam.fancy(false)
		var pt= blam.compile(tmplA);
		blam.fancy(true)
	
	b.add('Blam.fancy()', function() {
		ft()
	})
	.add('Blam plain', function() {
		pt()
	})
})


benchmark('Blam.fancy() Compilation', function(b){
	blam.fancy(true);
	var tmpl= function(){
				return article.main({ id:'test' },
					section.content(
						p("Content")
					),
					aside(
						ul(
							li( a( {href:"#"}, "nav items") ),
							li( a( {href:"#"}, "nav items") )
						)
					)
				);	
			},
			ft= blam.compile(tmpl);
	b.add('Blam.fancy() plain', function() {
		blam(tmpl)
	})
	.add('Blam.fancy() precompiled', function() {
		ft()
	})
	.on('start', function(){
		blam.fancy(true)
	})
	.on('stop', function(){
		blam.fancy(false)
	})
})


benchmark('Blam Compilation', function(b){
	var src_template= function(){
				return article({ id:'test', 'class':'main' },
					section({'class':'content'},
						p("Content")
					),
					aside(
						ul(
							li( a( {href:"#"}, "nav items") ),
							li( a( {href:"#"}, "nav items") )
						)
					)
				);	
			},
			compiled_template= blam.compile(src_template);

	b.add('Blam plain', function() {
		blam(src_template)
	})
	.add('Blam precompiled', function() {
		compiled_template()
	})
});


benchmark('Blam vs Settee', function(b){

	var st= new Settee('(html (head (title "Hello " name'),
			bt= blam.compile(function(name){ return html( head( title("Hello ", name)))});

	b.add('blam compiled', function(){
		bt('Matt');
	})
	.add('settee compiled', function(){
		st.render({ name:'Matt' })
	})


})


benchmark('Blam vs Jade', function(b){

	var jt= jade.compile('html\n  head\n    title= name'),
			bt= blam.compile(function(name){ return html( head( title("Hello ", name)))}),
			obt= old_blam.compile(function(name){ return html( head( title("Hello ", name)))});

	b.add('blam compiled', function(){
		bt('Matt');
	})
	if(old_blam.version != blam.version) {
		b.add('old blam compiled', function(){
			obt('Matt');
		})
	}
	b.add('jade compiled', function(){
		jt({ name:'Matt' })
	})


})

benchmark('Blam vs Jade vs Settee', function(b){

	var jt= jade.compile('html\n  head\n    title= name'),
			st= new Settee('(html (head (title "Hello " name'),
			bt= blam.compile(function(name){ return html( head( title("Hello ", name)))});

	b.add('blam compiled', function(){
		bt('Matt');
	})
	.add('jade compiled', function(){
		jt({ name:'Matt' })
	})
	.add('settee compiled', function(){
		st.render({ name:'Matt' })
	})

})
