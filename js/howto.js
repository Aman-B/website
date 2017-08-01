$("#slideshow > div:gt(0)").hide();

// setInterval(function() { 
//   $('#slideshow > div:first')
//     .fadeOut(1000)
//     .next()
//     .fadeIn(1000)
//     .end()
//     .appendTo('#slideshow');
// },  3000);

$("#next-btn").click(function (){
	 $('#slideshow > div:first')
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#slideshow');

})
$("#prev-btn").click(function (){
	 $('#slideshow > div:first')
    .fadeOut(1000)
    .end;

    $("#slideshow > div:last")
    .fadeIn(1000)
    .end();

    $("#slideshow > div:last").prependTo('#slideshow');

})