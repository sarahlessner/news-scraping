$(document).ready(function() {

//on click for viewing comments

  $(".comment-section").hide();
  $(document).on('click', '.view-comments', function() {
    // slide toggle the comments associated with each article when the comment button is clicked
    // console.log($(this).data("id"));
    var articleTitle = $(this).data("id");
    articleTitle = articleTitle.trim();
    // console.log((articleTitle).trim());
    $($(this).parents().eq(1).children()[1]).slideToggle();
    getComments(articleTitle);
  });

  var getComments = function(title) {
    $(".existing-comments").empty();
    $.ajax({
    method: "GET",
    url: "/comments/" + title
    })
      .done(function(data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h2>" + data.title + "</h2>");



        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }

      });
  }

  //delete comments
  $(document).on('click', '.deletebtn', function(){

  });

  //submit comments
  $(document).on('click','.submitbtn', function(){
    event.preventDefault();

    var articleTitle = $(this).data("id");
    articleTitle = articleTitle.trim();
    console.log($('.comment-box').val());
    console.log($('.name-box').val());
		if($('.comment-box').val() != '') {
			// var name = $('.name-box').val();
      // if (name === '') {
      //   name = "Anonymous";
      // }
			// var comment = $('.comment-box').val();

      $.ajax({
        method: "POST",
        url: "/comments/" + articleTitle,
        data: {
          // Value taken from name input
          name: $('.name-box').val(),
          // Value taken from comment input
          comment: $('.comment-box').val()
        }
      })
      .done(function(data) {
        console.log("data from post comment articlesjs", data);
  			getComments(articleTitle);
      });

		}
    $('.name-box').val('');
    $('.comment-box').val('');
	});


//end doc ready
});
