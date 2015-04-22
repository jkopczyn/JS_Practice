Journal.Views.PostForm = Backbone.View.extend({

  template: JST['posts/postForm'],
  urlRoot: "/posts/new",
  events: {'submit .post-form': 'submitForm'},

  initialize: function(){
  },

  render: function() {
    this.$el.html(this.template({post: this.model}));
    return this;
  },

  submitForm: function(event) {
    event.preventDefault();
    this.model.set($(event.currentTarget).serializeJSON());
    this.model.save({}, {
      success: function () {
        this.collection.add(this.model, { merge: true });
        Backbone.history.navigate("/posts/" + this.model.id, { trigger: true });
      }.bind(this),
      error: function (model, response) {
        this.$el.html(this.template({post: model}));
        var errorBlock = "<ul class='errors'>";
        $(response.responseJSON).each(function(index, message){
          errorBlock += "<li>"+message+"</li>";
        });
        errorBlock +="</ul>";
        this.$el.prepend(errorBlock);
      }.bind(this)
    });
  }

});
