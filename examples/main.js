var menu = new Gamm({
	file : "menu.html",
	data : {
		links : [
			{
				name : "Introduction",
				url : "index.html"
			},
			{
				name : "HTML Render",
				url : "render.html"
			},
			{
				name : "Data And Models",
				url : "data-models.html"
			},
			{
				name : "Events Or Methods",
				url : "events-methods.html"
			},
			{
				name : "Loops",
				url : "loops.html"
			},
			{
				name : "Conditions",
				url : "conditions.html"
			},
			{
				name : "Styling",
				url : "styling.html"
			},
			{
				name : "Limitations",
				url : "limitations.html"
			},
		],
		page_views : 0
	},
	events : {

	},
	load : function(){
		
		
		this.data.page_views = this.read_template("counter.php");
		
	}
});


menu.insert_to("#menu");


