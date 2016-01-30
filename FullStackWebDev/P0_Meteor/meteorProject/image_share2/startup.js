if (Meteor.isServer) {
	Meteor.startup(function(){
		if (Images.find().count() == 0) {

			for (var i=1;i<=8;i++) {
				Images.insert(
					{
					    image_src :"me"+i+".jpg",
					    image_alt :"me"+i
					}
				);
			} // end of for images
			// count the image
			console.log("startup.js says"+Images.find().count())
		} // end of if images==0
	});
}