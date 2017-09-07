$(document).ready(function() {

//on click for viewing comments

  $(".comment-section").hide();
  $(document).on('click', '.view-comments', function() {
    // slide toggle the comments associated with each article when the comment button is clicked
    $($(this).parents().eq(2).children()[1]).slideToggle();

  });




//end doc ready
});
