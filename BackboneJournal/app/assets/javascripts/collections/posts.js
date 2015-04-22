Journal.Collections.Posts = Backbone.Collection.extend({

  model: Journal.Models.Post,
  url: "posts",

  getOrFetch: function(id) {
    var that = this;
    var model;
    if(this.get(id)) {
      model = this.get(id);
      model.fetch();
    } else {
      model = new this.model({id: id});
      model.fetch({success: function(){
          that.add(model);
        }
      });
    }
    return model;
  }

});
