class PostsController < ApplicationController
  def create
    @post = Post.new(post_params)
    if @post.save
      render json: @post
    else
      render json: @post.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @post = Post.find(params[:id])
    render :show
  end

  def index
    @posts = Post.all
    render :index
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.destroy
      render :show
    else
      render json: @post.errors.full_messages
    end
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      render :show
    else
      render json: @post.errors.full_messages, status: :unprocessable_entity
    end
  end

  def post_params
    params.require('post').permit('title', 'body')
  end
end
