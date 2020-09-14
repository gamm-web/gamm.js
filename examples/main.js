
window.url = window.location.href;
window.url = window.url.split("/");
window.url = window.url[ window.url.length - 1];

var menu = new Gamm({
	file : "menu.html",
	data : {
		links : [
			{
				name : "Introduction",
				url : "index.html",
				selected : ""
			},
			{
				name : "HTML Render",
				url : "render.html",
				selected : ""
			},
			{
				name : "Data And Models",
				url : "data-models.html",
				selected : ""
			},
			{
				name : "Events Or Methods",
				url : "events-methods.html",
				selected : ""
			},
			{
				name : "Loops",
				url : "loops.html",
				selected : ""
			},
			{
				name : "Conditions",
				url : "conditions.html",
				selected : ""
			},
			{
				name : "Styling",
				url : "styling.html",
				selected : ""
			},
			{
				name : "Limitations",
				url : "limitations.html",
				selected : ""
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
menu.insert_to("#bottom-menu");


