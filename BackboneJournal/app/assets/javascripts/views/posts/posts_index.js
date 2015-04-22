Journal.Views.PostsIndex = Backbone.View.extend({

  template: JST['posts/index'],
  url: "/posts",

  initialize: function(){
    this.listenTo(this.collection, 'sync remove add', this.render);
    this.collection.fetch();
  },

  render: function() {
    this.$el.html(this.template());
    var $ul = this.$('ul.posts');
    var collection = this.collection;
    this.collection.each( function(model) {
      $ul.append(new window.Journal.Views.PostsIndexItem({
        model: model
      }).render().$el);
    });
    return this;
  }

});
