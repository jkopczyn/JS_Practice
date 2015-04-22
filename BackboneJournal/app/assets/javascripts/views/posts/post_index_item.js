Journal.Views.PostsIndexItem = Backbone.View.extend({

  template: JST['posts/indexItem'],
  tagName: 'li',
  events: {'click .delete':'removeModel'},

  render: function() {
    this.$el.html(this.template({post: this.model}));
    return this;
  },

  removeModel: function(){
    this.model.destroy();
    this.remove();
  }

});
