$(document).ready(function() {
	$("#b1").click(function(){
	    if($("#b1").val()=="Good!"){
	   		$("#text").text("Good To hear that ! Do you want to spread a smile ?");
	        $("#b1").val("Yes");
	       	$("#b2").val("No");
	    }
	});

	$("#b2").click(function(){
	    if($("#b2").val()=="Bad!"){
			$("#text").text("Ohh Sad ! Do you want my help ?");
	        $("#b1").val("Yes");
	        $("#b2").val("No");
	    }
	});
});