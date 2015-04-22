Pokedex.RootView.prototype.addToyToList = function (toy) {
  var $item = $("<li class='toy'"  +
                  "data-toy-id='"+toy.get("id")+
                  "' data-pokemon-id='"+ toy.get('pokemon_id') + "'>");
  $item.html("name: "+toy.get("name")+" happiness: "+
              toy.get("happiness")+" price: "+toy.get("price")+"");
  this.$el.find("ul.toys").append($item);
};

Pokedex.RootView.prototype.renderToyDetail = function (toy) {
  var $div = $("<div class='detail'>");
  $div.html("<img src='"+toy.get("image_url")+"'>");

  _.each(toy.attributes, function(val, key) {
    if (key === "image_url") { return; }

    $div.append("" + key + ": " + val + "<br>");
  }, this);

  var $menu = $("<select class='owner-selector' data-toy-id='"+toy.get("id")+
    "' data-pokemon-id='"+toy.get('pokemon_id')+"'>");
  this.pokes.each( function(val, key) {
    var $opt = $("<option value='"+val.id+"'>"+val.get("name")+"</option>");
    if (val.id === toy.get('pokemon_id')) {
      $opt.prop("selected", true);
    }
    $menu.append($opt);
  });

  $div.append($menu);
  this.$toyDetail.html($div);
};

Pokedex.RootView.prototype.selectToyFromList = function (event) {
  var $li = $(event.currentTarget);
  var $pk = this.pokes.get($li.data("pokemon-id"));
  var $toy = $pk.toys().get($li.data("toy-id"));

  this.renderToyDetail($toy);
};
