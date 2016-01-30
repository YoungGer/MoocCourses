Images = new Mongo.Collection("images");
console.log("init mongo images is " + Images.find().count())

if (Meteor.isClient) { 

  Template.images.helpers({images:Images.find({}, {sort:{createdOn:-1,rating:-1}})});

  Template.images.events({
    'click .js-image':function(event){
      alert("hello");
    },
    'click .js-del-image': function(event){
      var image_id = this._id;
      $("#"+image_id).hide('slow', function(){
        Images.remove({"_id":image_id});
      });
    },
    'click .js-rate-image': function(event) {
      var rating = $(event.currentTarget).data("userrating");
      console.log(rating);
      var image_id = this.id;
      console.log(image_id);
      Images.update({_id:image_id},{$set: {rating:rating}});
    },
    'click .js-show-image-form': function(event){
      $('#image_add_form').modal('show');
    }
  });

  Template.image_add_form.events({
    'submit .js-add-image':function(event){
      //从form中获取数据
      var img_src, img_alt;
      img_src = event.target.img_src.value;
      img_alt = event.target.img_alt.value;
      console.log('src: '+img_src+'  alt: '+img_alt);
      //将获取的数据添加到数据库中
      Images.insert({
        image_src: img_src,
        image_alt: img_alt,
        createdOn: new Date()
      });
      $('image_add_form').modal('show');
      return false;
    }
  });


}

if (Meteor.isServer) {
  console.log("i am server");
}
