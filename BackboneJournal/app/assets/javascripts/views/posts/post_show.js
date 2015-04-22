var Journal = window.Journal;
Journal.Views.PostShow = Backbone.View.extend({

  template: JST['posts/show'],
  urlRoot: "/posts",

  initialize: function() {
    this.bodyDiv = this.$(".post-body");
    this.titleDiv = this.$(".post-title");

  },

  events:{
    'dblclick h1.display-title': 'renderTitleForm',
    'submit .title-edit-form': 'renderTitleDisplay',
    'dblclick p.display-body': 'renderBodyForm',
    'submit .body-edit-form': 'renderBodyDisplay'
  },

  render: function() {
    this.$el.html(this.template({post: this.model}));

    this.bodyDiv = this.$(".post-body");
    this.titleDiv = this.$(".post-title");

    this.titleDiv.html(JST['posts/showPostTitle']({post: this.model}));
    this.bodyDiv.html(JST['posts/showPostBody']({post: this.model}));

    return this;
  },

  renderTitleDisplay: function(event) {
    this.submitForm(event);
    this.titleDiv.html(JST['posts/showPostTitle']({post: this.model}));
    return this;
  },

  renderTitleForm: function() {
    this.titleDiv.html(JST['posts/editPostTitle']({post: this.model}));
    return this;
  },

  renderBodyDisplay: function(event) {
    this.submitForm(event);
    this.bodyDiv.html(JST['posts/showPostBody']({post: this.model}));
    return this;
  },

  renderBodyForm: function() {
    this.bodyDiv.html(JST['posts/editPostBody']({post: this.model}));
    return this;
  },

  submitForm: function(event, callback) {
    event.preventDefault();
    this.model.set($(event.currentTarget).serializeJSON());
    this.model.save({}, {
      success: function () {
        this.collection.add(this.model, { merge: true });
        
      }.bind(this),
      // error: function (model, response) {
      //   this.$el.html(this.template({post: model}));
      //   var errorBlock = "<ul class='errors'>";
      //   $(response.responseJSON).each(function(index, message){
      //     errorBlock += "<li>"+message+"</li>";
      //   });
      //   errorBlock +="</ul>";
      //   this.$el.prepend(errorBlock);
      // }.bind(this)
    });
  }
});
//   return JST['posts/editPostBody'](options);
//   return JST['posts/showPostBody'](options);
//   return JST['posts/editPostTitle'](options);
//   return JST['posts/showPostTitle'](options);
