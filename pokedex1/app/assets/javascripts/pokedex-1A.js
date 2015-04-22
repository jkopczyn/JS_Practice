Pokedex.RootView.prototype.addPokemonToList = function (pokemon) {
  var $pokemon = $("<li class='poke-list-item' data-id='"+pokemon.get("id")+"'>");
  $pokemon.html("name: " + pokemon.get("name") +
                           ", type: " + pokemon.get("poke_type"));
  this.$pokeList.append($pokemon);
};

Pokedex.RootView.prototype.refreshPokemon = function () {
  var that = this;
  this.pokes.fetch({
    success: function() {
      that.pokes.each(function(pokemon) {
        that.addPokemonToList(pokemon);
      }, that);
    }
  });
};
