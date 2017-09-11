$(document).ready(function() {

  //on click for toggling the comment section per each article
  $(".comment-section").hide();
  $(document).on('click', '.view-comments', function() {
    // $('#existing-comments').empty();
    // slide toggle the comments associated with each article when the comment button is clicked
    // console.log($(this).data("id"));
    var articleTitle = $(this).data("id");
    // console.log((articleTitle).trim());
    $($(this).parents().eq(1).children()[1]).slideToggle();
    getComments(articleTitle, $(this));
  });
  //function to get comments - called on initial comment box load and after submitting
  var getComments = function(title, thisbtn) {

    //get comments associated with 'this' article
    $.ajax({
    method: "GET",
    url: "/comments/" + title
    })
      .done(function(data) {

        var commentsDiv = "";
        if(thisbtn.hasClass("view-comments")) {

          commentsDiv = thisbtn.parents().eq(1).find("span");
        }
        else if (thisbtn.hasClass("submitbtn")) {
          console.log(thisbtn.parents());
          commentsDiv = thisbtn.parents().eq(2).find("span");

        }
        else {
          console.log("unrecognized button");
        }
        commentsDiv.empty();

        var comments = data.comments
        for (i = 0; i < comments.length; i++) {
          $comments = $('<div>')
          .addClass('comment-text')
          .append(comments[i].name+": ")
          .append(comments[i].comment);
          var $btn = $("<button>");
      		var $span = $("<span>");
      		$btn.addClass("remove-button btn");
      		$btn.attr("data-id", comments[i]._id);
      		$span.addClass("glyphicon glyphicon-minus-sign");
      		$span.attr("aria-hidden", "true");
      		$btn.append($span);
      		$comments.append($btn);
          // $('#existing-comments').append($comments);
          commentsDiv.append($comments);
        }

        // The title of the article

      });
  }

  //delete comments
  $(document).on('click', '.remove-button', function(){
    var commentId = $(this).data("id");
    // commentId = parseInt(commentId);
    $.ajax({
      method: "DELETE",
      url: "/comments/delete/" + commentId,
    }).done();
  });

  //submit comments
  $(document).on('click','.submitbtn', function(){
    event.preventDefault();
    var thisButton = $(this);
    console.log("asdf", thisButton);
    var nbName = "#name-box" + $(this).data("idnum");
    var cbName = "#comment-box" + $(this).data("idnum");

    var articleTitle = $(this).data("id");

		if($(cbName).val() != '') {

      $.ajax({
        method: "POST",
        url: "/comments/" + articleTitle,
        data: {
          // Value taken from name input
          name: $(nbName).val(),
          // Value taken from comment input
          comment: $(cbName).val()
        }
      })
      .done(function(data) {
        console.log("data from post comment articlesjs", data);
        console.log("zxcv", thisButton);
  			getComments(articleTitle, thisButton);
      });

		}
    $(nbName).val('');
    $(cbName).val('');
	});

  //selector for navbar links to change background
  $('.a-latest').on('click', function(){
    $('.a-archive').removeClass('active-nav');
    $('a-latest').addClass('active-nav');
  });
  $('.a-archive').on('click', function(){
    $('.a-latest').removeClass('active-nav');
    $('a-archive').addClass('active-nav');
  });
//end doc ready
});
