var Journal = window.Journal;
Journal.Routers.Posts = Backbone.Router.extend({
  routes: {
    "posts/new": "displayForm",
    "posts/:id": "displayShow"
  },

  initialize: function(options) {
    this.collection = options.collection;
    this.$el = options.$el;
    this.model = Journal.Models.Post;
  },

  displayIndex: function() {
    var v = new Journal.Views.PostsIndex({collection: this.collection});
    this.$el.html(v.render().$el);
  },

  displayShow: function(id) {
    var v = new Journal.Views.PostShow({
      model: this.collection.getOrFetch(id),
      collection: this.collection
      });
    this.$el.html(v.render().$el);
  },

  displayForm: function() {
    var collection = this.collection;
    var v = new Journal.Views.PostForm({
      model: new this.model(),
      collection: collection });
    this.$el.html(v.render().$el);
  }
});
