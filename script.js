var app = {

	NYTURL: "https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=",

	initialize: function() {
		$("#search").click(function(){
			console.log("Clicked search");
			$("#book_image").html("");
			$("#book_description").html("");
			$("#book_title").html("");
			var searchDate = $("#searchBox").val();
			console.log(searchDate);
			app.getNYTData(searchDate);
		}),

		$("body").keypress(function(e){
			//If enter key is pressed
			if (e.which == 13){
				$("#search").trigger('click');
			}
		});
	},

	displayResult: function(content) {
		// debugger;
		let bookImage = content[0].book_image;
		let bookTitle = content[0].title;
		let bookDescription = content[0].description;
		$("#book_image").html(`<img id="book_cover" src="${bookImage}"></img>`);
		$("#book_title").html(`<p>${bookTitle}</p>`);
		$("#book_description").html(`<p>${bookDescription}</p>`);
		// console.log ("success!");
	},

	getNYTData: function(searchDate) {
		var nyTimesCustomURL = app.NYTURL + searchDate + '&api-key=';
		var myNYKey = 'go8SWMPMiVtK1KFWaFoil9Vtb7d7s1FL';
		var nyTimesReqURL = nyTimesCustomURL + myNYKey;
		console.log(nyTimesReqURL);

		fetch (nyTimesReqURL)
		.then(response => response.json())
		.then(data => {console.log(data); let content = data.results.lists[0].books; app.displayResult(content); console.log (content);})
		.catch(error => console.log(error))
	},

};
