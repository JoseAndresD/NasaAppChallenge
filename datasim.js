function datasim(idsalida){
	$.post("http://quize-api.rollrodrig.com/adami?data=makerlab", function(data) {
		$("#" + "idsalida").html(data);
	});
}

