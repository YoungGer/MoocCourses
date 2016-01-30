if (Meteor.isClient) { 
  var image_data = [
  {
      image_src :"me.jpg",
      image_alt :"me"
    },
  {
      image_src :"me2.jpg",
      image_alt :"me2"
    },
  {
      image_src :"me3.jpg",
      image_alt :"me3"
    },
    ];
  Template.images.helpers({images:image_data});
  Template.images.events({
    'click .js-image':function(event){
      alert("hello");
    }
  });
}

if (Meteor.isServer) {
  console.log("i am server");
}

console.log("where si it")