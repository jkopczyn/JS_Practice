Pokedex.RootView.prototype.renderPokemonDetail = function (pokemon) {

  var template = JST["pokemon"];
  this.$pokeDetail.html(template({pokemon: pokemon}));

  var that = this;
  pokemon.fetch({
    success: function(){
      that.renderToysList(pokemon.toys());
    }
  });
};

Pokedex.RootView.prototype.selectPokemonFromList = function (event) {
  var $li = $(event.currentTarget);
  var $pokemon = this.pokes.get($li.data("id"));
  this.renderPokemonDetail($pokemon);
};
