$("#blog_submit").click(function() {
    event.preventDefault();
    $("#blog_wrapper").hide();
});

$("#user_submit").click(function() {
    event.preventDefault();
    $("#user_wrapper").remove();
});
