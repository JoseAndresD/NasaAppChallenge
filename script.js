$(document).ready(function(){

	$.post("http://quize-api.rollrodrig.com/adami?data=makeeeeeeeer", function(dato) {
		$("#prueba").html(dato);
	});



});

