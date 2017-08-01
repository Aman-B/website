(function ($)
{
	 // Initialize Firebase
	 var firebase = require("firebase");

	  // Initialize Firebase
	  var config = {
	    apiKey: "AIzaSyAmKeQlqDKE-1XYPLQtJfNHjdTmuv6huyE",
	    authDomain: "fitbeau-5606d.firebaseapp.com",
	    databaseURL: "https://fitbeau-5606d.firebaseio.com",
	    projectId: "fitbeau-5606d",
	    storageBucket: "fitbeau-5606d.appspot.com",
	    messagingSenderId: "987676980472"
	  };
	  firebase.initializeApp(config);

	var validate = require("validate.js");
	var click=false;
	
	// Business sign up form elements
	var b_name,b_email,b_password;

	var in_name,in_email,in_password;




	$(document).ready(function() {  

		console.log('Index page');
	
		$('#myCarousel').carousel({
			    interval: 3000,
			    cycle: true
		});


		$('#nav-signup-btn').click(function(){
			$('#signup-modal').modal('show'); 

		});

		$('#signup-free-btn').click(function(){
			$('#signup-modal').modal('show'); 

		});

		$('#nav-signin-btn').click(function(){
			$('#signin-modal').modal('show'); 

		});

		$('#business-btn').click(function(){
			$('#signup-modal').modal('hide'); 
			 $('#business-modal').modal('show'); 
		});

		$('#influencer-btn').click(function(){
			$('#signup-modal').modal('hide'); 
			 $('#influencer-signup-modal').modal('show'); 
		});

		

		$("#business-btn,#influencer-btn").each(function(){
			$(this).mouseover(function ()
				{
					
					$(this).css("filter","brightness(80%)");	


				});	

		});

		$("#business-btn,#influencer-btn").each(function(){
			$(this).click(function ()
				{
					
					$(this).css("filter","brightness(80%)");	
					

				});	

		});

		$("#business-btn,#influencer-btn").each(function(){
			$(this).mouseleave(function ()
				{

						$(this).css("filter","brightness(100%)");	

				});	

		});

		// console.log("here");

		$("#business-signup-form").submit(function(ev)
		{
			
			
			ev.preventDefault();	
		
			b_name=$("#business-name").val();

			b_email=$("#business-email").val();

			b_password=$("#business-password").val();

			if(b_name!= null && b_email!=null && b_password !=null)
			{
				$('#business-modal').modal('hide'); 
				$("#wait-modal").modal("show");

				firebase.auth().createUserWithEmailAndPassword(b_email, b_password).then(function(user) {
				    // [END createwithemail]
				    // callSomeFunction(); Optional
				    // var user = firebase.auth().currentUser;
				    //console.log('created user');
				    user.updateProfile({
					  displayName: b_name
					}).then(function() {
					  // Update successful.
					  //console.log('Name saved.');
					}).catch(function(error) {
					  // An error happened.
					  //console.log('Error in saving name : '+error);
					});

					user.sendEmailVerification().then(function() {
				  // Email sent.
  					$("#wait-modal").modal("hide");
				  	
					$("#email-sent-modal").modal("show");
					  console.log('email sent');
	  				$("#email-sent-message").html("Verification link has been sent to your email : <strong>"+b_email+"</strong>");
	  				console.log('uid '+user.uid);
	  			    firebase.database().ref("users/"+user.uid).set({
				         email: b_email,
				         name:  b_name,
				         type:  "business"
				    
				      });		


					}, function(error) {
					  // An error happened.
					  $('#business-modal').modal('hide'); 
					  $("#email-sent-modal").modal("show");
					  //console.log('email error : '+error);
	  				  $("#email-sent-message").html("Verification link can't be send. Try again, please.");

					});      
				}, function(error) {
				    // Handle Errors here.
				    var errorCode = error.code;
				    var errorMessage = error.message;
				    // [START_EXCLUDE]
				    if (errorCode == 'auth/weak-password') {
				        alert('The password is too weak.');
				    } else {
				        console.error(error);
				    }
				    // [END_EXCLUDE]
				});

				//console.log("Business name "+b_name +"email : "+b_email+" "+b_password);

				/*firebase.auth().createUserWithEmailAndPassword(b_email, b_password).catch(function(error) {
				  // Handle Errors here.
				  var errorCode = error.code;
				  var errorMessage = error.message;

				  console.log("errorCode : "+ errorCode + "errorMessage : "+ errorMessage);
				  // ...
				});*/

				/*firebase.auth().signInWithEmailAndPassword(b_email, b_password).catch(function(error) {
				  // Handle Errors here.
				  var errorCode = error.code;
				  var errorMessage = error.message;
  				  console.log(" Sign in errorCode : "+ errorCode + "errorMessage : "+ errorMessage);

				  // ...
				});*/

				

				

				/*firebase.auth().onAuthStateChanged(function(user) {
				  if (user) {
				    // User is signed in.
				    console.log('user signed in');


				  } else {
				    // No user is signed in.
				    console.log('user not signed in.');
				  }
				});

				var user = firebase.auth().currentUser;
				console.log("user "+user);*/

				

				//console.log('user '+user.name);

				// user.emailVerified

				

			}	

			




		});

		$("#influencer-signup-form").submit(function(ev)
		{
			
			
			ev.preventDefault();	
			
			$('#influencer-signup-modal').modal('hide'); 
			$("#wait-modal").modal("show");

			//console.log('here in signup influnecer.');

			in_name=$("#influencer-name").val();
			in_email=$("#influencer-email").val();

			in_password=$("#influencer-password").val();

			//console.log(' email ' + in_email + " password "+in_password);

			if(in_name!=null && in_email!=null && in_password !=null)
			{


				firebase.auth().createUserWithEmailAndPassword(in_email, in_password).then(function(user) {
				    // [END createwithemail]
				    // callSomeFunction(); Optional
				    // var user = firebase.auth().currentUser;
				    //console.log('created user');
				    

					user.sendEmailVerification().then(function() {
				  // Email sent.
	  				$("#wait-modal").modal("hide");
				  
					$("#email-sent-modal").modal("show");
					  //console.log('email sent');
		  			
		  			$("#email-sent-message").html("Verification link has been sent to your email : <strong>"+in_email+"</strong>");


		  			//console.log('uid '+user.uid);
		  			 firebase.database().ref("users/"+user.uid).set({
				         email: in_email,
				         name:in_name,
				         type:  "influencer"
				    
				      });	



					}, function(error) {
					  // An error happened.
					  $('#influencer-signup-modal').modal('hide'); 
					  $("#email-sent-modal").modal("show");
					 // console.log('email error : '+error);
	  				  $("#email-sent-message").html("Verification link can't be send. Try again, please.");

					});      
				}, function(error) {
				    // Handle Errors here.
				    var errorCode = error.code;
				    var errorMessage = error.message;
				    // [START_EXCLUDE]
				    if (errorCode == 'auth/weak-password') {
				        alert('The password is too weak.');
				    } else {
				        console.error(error);
				    }
				    // [END_EXCLUDE]
				});

				//console.log("Influencer email : "+in_email+" pass : "+in_password);

				

				

			}	

			




		});


		$("#signin-form").submit(function(event) {
			/* Act on the event */
			alert("Form Submitted!");
			/*Implement Firebase Sign In*/



			/*Hide modal after successful signin*/
			$('#signin-modal').modal('show'); 

		})

		/*$("#change-one").html("<p> Hello </p>");
		$("#change-two").html("<button type='button' class='btn navbar-btn blue-btn font-class-bold' id='nav-signout-btn' style='font-size :12px;''>SIGN OUT</button>")
		$("#nav-signout-btn").css({	'height': '32px','width':'98px', 'border-radius': '20px','padding-bottom':'10px'});
*/


		$("#learn-more").on("click",function(){
			window.location.href="about_us.html"
		})

	}); //Docuemnt ready end.
	



})(jQuery); //IIFE end.
