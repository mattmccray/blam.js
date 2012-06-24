


// benchmark('Blam vs Kablam', function(b){
// 	var tmpl= function() {
// 					return article(section({ 'class':'main' }, 'content'), aside('sidebar'));
//   			},
// 			tmpl_b= blam.compile(tmpl),
// 			tmpl_k= kablam.compile(tmpl)
	
// 	b.add('Blam simple', function() {
// 		blam(tmpl)
// 	})
// 	.add('Kablam simple', function() {
// 		kablam(tmpl)
// 	})
// 	.add('Blam compiled', function() {
// 		tmpl_b()
// 	})
// 	.add('Kablam compiled', function() {
// 		tmpl_k()
// 	})
// })

benchmark('Blam vs Blam.fancy()', function(b){
	var tmplA= function() {
					return article(section({ 'class':'main' }, 'content'), aside('sidebar'));
  			},
  		tmplB= function() {
					return article(section.main('content'), aside('sidebar'));
  			},
			ft= blam._compile_fancy(tmplB),
			pt= blam._compile_nonfancy(tmplA);
	
	b.add('Blam.fancy()', function() {
		ft()
	})
	.add('Blam plain', function() {
		pt()
	})
})

benchmark('Blam.fancy() Compilation', function(b){
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
			ft= blam._compile_fancy(tmpl);
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

// benchmark('Blam.fancy() Compilation', function(b){
// 	var src_template= function(){
// 				return article({ id:'test' },
// 					section/* home glass test #more */(
// 						p("Content")
// 					),
// 					aside(
// 						ul(
// 							li( a( {href:"#"}, "nav items") ),
// 							li( a( {href:"#"}, "nav items") )
// 						)
// 					)
// 				);	
// 			},
// 			compiled_template= blam.compile(src_template);

// 	b.add('Blam plain', function() {
// 		blam(src_template)
// 	})
// 	.add('Blam precompiled', function() {
// 		compiled_template()
// 	})
// });

// benchmark('Kablam Compilation', function(b){
// 	var src_template= function(){
// 		return article({ id:'test' },
// 			section(
// 				p("Content")
// 			),
// 			aside(
// 				ul(
// 					li( a( {href:"#"}, "nav items") ),
// 					li( a( {href:"#"}, "nav items") )
// 				)
// 			)
// 		);	
// 	},
// 		compiled_template= kablam.compile(src_template);

// 	b.add('Kablam plain', function() {
// 		kablam(src_template)
// 	})
// 	.add('Kablam precompiled', function() {
// 		compiled_template()
// 	})
// });




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


// benchmark('Blam vs _.template', function(b){

// 	var _t= _.template('<html><head><title><%= name %></title></head></html>'),
// 			bt= blam.compile(function(name){ return html( head( title("Hello ", name)))});

// 	b.add('blam compiled', function(){
// 		bt('Matt');
// 	})
// 	.add('_.template compiled', function(){
// 		_t({ name:'Matt' })
// 	})


// })


// benchmark('Blam vs Hogan', function(b){

// 	var ht= Hogan.compile('<html><head><title><{[ name }}</title></head></html>'),
// 			bt= blam.compile(function(name){ return html( head( title("Hello ", name)))});

// 	b.add('blam compiled', function(){
// 		bt('Matt');
// 	})
// 	.add('hogan compiled', function(){
// 		ht.render({ name:'Matt' })
// 	})


// })

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
