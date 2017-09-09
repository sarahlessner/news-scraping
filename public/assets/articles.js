$(document).ready(function() {

//on click for viewing comments

  //scrape when the page loads
  $.getJSON('/scrape', function() {
  });
  //get latest articles on click
  $("#getlatestbtn").on('click', function() {
    window.location.reload();

  });

  $(".comment-section").hide();
  $(document).on('click', '.view-comments', function() {
    // slide toggle the comments associated with each article when the comment button is clicked
    $($(this).parents().eq(1).children()[1]).slideToggle();
    var articleId = $(this).attr("data-id");
    
    $.getJSON('/comments', function() {

    });


  });

  //delete comments
  $(document).on('click', '.deletebtn', function(){

  });

  //submit comments
  $(document).on('click','#submitbtn', function(){
		if($('#commentText').val() != '') {
			var name = $('#name').val();
			var comment = $('#commentText').val();
			$.post("/addcomment/" + articleId, {name: name, comment: comment}, function(e) {
				e.preventDefault();
			});
			$('#name').val('');
			$('#commentText').val('');
			showComments(articleId);
		}
	});


//end doc ready
});
