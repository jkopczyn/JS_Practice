var Pokedex = window.Pokedex;
Pokedex.RootView.prototype.createPokemon = function (attrs, callback) {
  var pokemon = new Pokedex.Models.Pokemon(attrs.pokemon);
  pokemon.save({}, {
    success: function(response) {
      // TODO: need to add or update
      // currently displays response pokemon but does not update it on the client side
      // and displays two copies on the page 
      this.pokes.add(pokemon);
      this.addPokemonToList(pokemon);
      callback(pokemon);
    }.bind(this)
  });
};

Pokedex.RootView.prototype.submitPokemonForm = function (event) {
  event.preventDefault();
  var $form = $(event.currentTarget);
  this.createPokemon($form.serializeJSON(), this.renderPokemonDetail.bind(this));
};
