class ToysController < ApplicationController
  def show
    @toy = Toy.find(params[:id])
  end

  def update
    @toy = Toy.find(params[:id])
    if @toy.update(toy_params)
      render :show
    else
      render @toy.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def toy_params
    params.require(:toy).permit(:pokemon_id, :name,
                :price, :happiness, :image_url)
  end
end
