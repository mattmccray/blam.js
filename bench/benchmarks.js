benchmark('Blam vs Kablam', function(b){
	var tmpl= function() {
					return article(section({ 'class':'main' }, 'content'), aside('sidebar'));
  			},
			tmpl_b= blam.compile(tmpl),
			tmpl_k= kablam.compile(tmpl)
	
	b.add('Blam simple', function() {
		blam(tmpl)
	})
	.add('Kablam simple', function() {
		kablam(tmpl)
	})
	.add('Blam compiled', function() {
		tmpl_b()
	})
	.add('Kablam compiled', function() {
		tmpl_k()
	})
})


benchmark('Blam Compilation', function(b){
	var compiled_template= blam.compile(function(){
		return article({ id:'test' },
			section(
				p("Content")
			),
			aside(
				ul(
					li( a( {href:"#"}, "nav items") ),
					li( a( {href:"#"}, "nav items") )
				)
			)
		);	
	});

	b.add('Blam plain', function() {
		blam(function(){
			return article({ id:'test' },
				section(
					p("Content")
				),
				aside(
					ul(
						li( a( {href:"#"}, "nav items") ),
						li( a( {href:"#"}, "nav items") )
					)
				)
			);	
		})
	})
	.add('Blam precompiled', function() {
		compiled_template()
	})
});

benchmark('Kablam Compilation', function(b){
	var compiled_template= kablam.compile(function(){
		return article({ id:'test' },
			section(
				p("Content")
			),
			aside(
				ul(
					li( a( {href:"#"}, "nav items") ),
					li( a( {href:"#"}, "nav items") )
				)
			)
		);	
	});

	b.add('Kablam plain', function() {
		blam(function(){
			return article({ id:'test' },
				section(
					p("Content")
				),
				aside(
					ul(
						li( a( {href:"#"}, "nav items") ),
						li( a( {href:"#"}, "nav items") )
					)
				)
			);	
		})
	})
	.add('Kablam precompiled', function() {
		compiled_template()
	})
});
