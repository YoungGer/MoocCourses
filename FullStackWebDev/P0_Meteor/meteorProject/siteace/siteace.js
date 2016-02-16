Websites = new Mongo.Collection("websites");
Comments = new Mongo.Collection("comments");

if (Meteor.isClient) {

    // routing
    Router.configure({
      layoutTemplate: 'ApplicationLayout'
    });

    Router.route('/', function () {
      this.render('navbar', {
        to:"navbar"
      });
      this.render('website_form', {
        to:"main1"
      });
      this.render('website_list', {
        to:"main2"
      });
    });

    // Router.route('/images', function () {
    //   this.render('navbar', {
    //     to:"navbar"
    //   });
    //   this.render('images', {
    //     to:"main"
    //   });
    // });

    Router.route('/web/:_id', function () {
      this.render('detail_item', {
        to:"navbar",
        data:function(){
            Session.set("userFilter", this.params._id);
            return Websites.findOne({_id:this.params._id});
        }
      });
      this.render('blank', {
        to:"main1"
      });
      this.render('blank', {
        to:"main2"
      });
    });


	/////
	// template helpers 
	/////

	// helper function that returns all available websites
	Template.website_list.helpers({
		websites:function(){
			return Websites.find({},{sort:{vote:-1, date:-1}});
		}
	});


	/////
	// template events 
	/////

	Template.website_item.events({
		"click .js-upvote":function(event){
			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
            var vote = Websites.findOne({_id:website_id}).vote;
            var up = Websites.findOne({_id:website_id}).up;
            var down = Websites.findOne({_id:website_id}).down;
			console.log("Up voting website with id "+website_id);
			// put the code in here to add a vote to a website!
            Websites.update({_id:website_id}, 
                {$set: {vote:vote+1,up:up+1}});
			return false;// prevent the button from reloading the page
		}, 
		"click .js-downvote":function(event){

			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
            var vote = Websites.findOne({_id:website_id}).vote;
            var up = Websites.findOne({_id:website_id}).up;
            var down = Websites.findOne({_id:website_id}).down;
			console.log("Down voting website with id "+website_id);

			// put the code in here to remove a vote from a website!
            Websites.update({_id:website_id}, 
                {$set: {vote:vote-1,down:down+1}});
			return false;// prevent the button from reloading the page
		}
	});

	Template.website_form.events({
		"click .js-toggle-website-form":function(event){
			$("#website_form").toggle('slow');
		}, 
		"submit .js-save-website-form":function(event){

			// here is an example of how to get the url out of the form:
			var url = event.target.url.value;
            var title = event.target.title.value;
            var description = event.target.description.value;
			console.log("The url they entered is: "+url);
            console.log("The title they entered is: "+title);
            console.log("The description they entered is: "+description);
			
			//  put your website saving code in here!	
            //  往collection中增加就行了呗
            if (Meteor.user()){
                console.log('login insert');
                if(url){
                    if(description){
                        Websites.insert({
                          url:url, 
                          title:title, 
                          description:description,
                          vote: 0,
                          date: new Date(),
                          comments: []
                        });
                    }
                }
                // Websites.insert({
                //   url:url, 
                //   title:title, 
                //   description:description,
                //   vote: 0,
                //   date: new Date(),
                //   comments: []
                // });


            }
            else {
                console.log('not login insert permit');
            }
			return false;// stop the form submit from reloading the page

		}
	});

    Template.detail_item.helpers({
        comments:function(){
            // var web = Websites.findOne({});
            // var id = Router.current().params._id;
            // return Websites.findOne({_id:id}).comments;
            if (Session.get("userFilter")){// they set a filter!
              return Comments.find({id:Session.get("userFilter")});         
            }
            else {
              return Comments.find({});         
            }

            return Comments.find({});
        }
    });


    Template.detail_item.events({
    'submit .js-add-comment':function(event){
      var comment, id;

        comment = event.target.comment.value;
        id = this._id;
        console.log("comment: "+comment);
        console.log("id: "+ id);
        Comments.insert({
            c:comment,
            id:id
        })


        //把comment加入到对应的数据库中的comments里面
        // var old_comments = Websites.findOne({_id:id}).comments;
        // console.log(old_comments);
        // old_comments.push({c:comment});
        // console.log(old_comments);

        // Websites.update({_id:id}, 
        //     {$set: {comments:old_comments}});
        // if (Meteor.user()){
          // Images.insert({
          //   img_src:img_src, 
          //   img_alt:img_alt, 
          //   createdOn:new Date(),
          //   createdBy:Meteor.user()._id,
          //   comments:[]
          // });

      // }
      //   $("#image_add_form").modal('hide');
     return false;
    }
    });
}


if (Meteor.isServer) {
	// start up function that creates entries in the Websites databases.
  Meteor.startup(function () {
    // code to run on server at startup
    if (!Websites.findOne()){
    	console.log("No websites yet. Creating starter data.");
    	  Websites.insert({
    		title:"Goldsmiths Computing Department", 
    		url:"http://www.gold.ac.uk/computing/", 
    		description:"This is where this course was developed.", 
    		createdOn:new Date(),
            vote: 0,
            up: 0,
            down: 0,
            date: new Date(),
            comments: []
    	});
    	 Websites.insert({
    		title:"University of London", 
    		url:"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route", 
    		description:"University of London International Programme.", 
    		createdOn:new Date(),
            vote: 0,
            up: 0,
            down: 0,
            date: new Date(),
            comments: []
    	});
    	 Websites.insert({
    		title:"Coursera", 
    		url:"http://www.coursera.org", 
    		description:"Universal access to the world’s best education.", 
    		createdOn:new Date(),
            vote: 0,
            up: 0,
            down: 0,
            date: new Date(),
            comments: []
    	});
    	Websites.insert({
    		title:"Google", 
    		url:"http://www.google.com", 
    		description:"Popular search engine.", 
    		createdOn:new Date(),
            vote: 0,
            up: 0,
            down: 0,
            date: new Date(),
            comments: []
    	});
    }
  });
}
