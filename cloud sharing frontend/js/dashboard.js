// indexes movie data for searching. Could possibly be done within the movie data js file

var index = lunr(function () {
	this.ref('id')
	this.field('movieTitle', {boost: 10})
	this.field('uploader')
	this.field('format')
	this.field('director')
	this.field('releaseDate')
	this.field('size')
	this.field('tags')
});

$(document).ready(function() {
	$(".alert").addClass("in").fadeOut(4500);
	// swap open/close side menu icons
	$('[data-toggle=collapse]').click(function(){
	  	// toggle icon
	  	$(this).find("i").toggleClass("glyphicon-chevron-right glyphicon-chevron-down");
	});
	// search engine logic
	for (var i=0; i < movieData.length; i++) {
		index.add(movieData[i]);
	};
	console.log(movieData[0]);
	console.log(index[1]);
	console.log(index.search("spirited away wmv"));
	$("#custom-search-form").on("submit", function(e) {
		e.preventDefault();
		var searchString = $(".search-query");
		searchString.focus();
		var searchStringText = searchString.val();
		console.log(index.search(searchStringText));
		return index.search(searchStringText);
	});

	// Personal Dashboard logic

});