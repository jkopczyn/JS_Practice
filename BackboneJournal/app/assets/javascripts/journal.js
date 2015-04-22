var Journal = window.Journal = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // alert('Hello from Backbone!');
    this.posts = new Journal.Collections.Posts();
    this.router = new Journal.Routers.Posts({
      collection: this.posts,
      $el: $('.content')
    });
    this.sidebar = $('.sidebar');
    this.sidebar.append(new Journal.Views.PostsIndex({
      collection: this.posts
    }).render().$el);
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Journal.initialize();
});
