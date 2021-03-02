class Api::LikesController < ApplicationController
  def create
    @like = Like.new(like_params)
    if @like.save
      render "/api/likes/show"
    else
      render json: @like.errors.full_messages, status: 422
    end
  end

  def destroy
    @like = Like.find_by(id: params[:id])
    @like.destroy
    render json: {id: params[:id]}
  end

  private

  def like_params
    params.require(:like).permit(
      :liker_id, :track_id)
  end
end