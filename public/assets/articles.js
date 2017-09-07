$(document).ready(function() {

//on click for viewing comments

  $(".comment-section").hide();
  $(document).on('click', '.view-comments', function() {

    // console.log("yo!");
    // // $($(this).find($(".news-body")).children()[8]).slideToggle();
    $($(this).parents().eq(3).children()[1]).slideToggle();

  });




//end doc ready
});
