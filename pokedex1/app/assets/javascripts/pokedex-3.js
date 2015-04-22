Pokedex.RootView.prototype.reassignToy = function (event) {
  var $select = $(event.currentTarget);
  var oldPokemonId = $select.data("pokemon-id");
  var toyId = $select.data("toy-id");
  var $oldPokemon = this.pokes.get(oldPokemonId);
  var newPokemonId = $select.val();

  var $toy = $oldPokemon.toys().get(toyId);

  var that = this;

  $toy.set("pokemon_id", newPokemonId);
  $toy.save({}, {
    success: function(response){

      $oldPokemon.toys().remove($toy);
      that.renderToysList($oldPokemon.toys());
      that.$toyDetail.empty();
    }
  });

};

Pokedex.RootView.prototype.renderToysList = function (toys) {
  var $toysList = this.$pokeDetail.find(".toys");
  $toysList.empty();

  toys.each(function(toy) {
    this.addToyToList(toy);
  }, this);
};
