class Api::CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render "/api/comments/show"
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def destroy
    @comment = Comment.find_by(id: params[:id])
    @comment.destroy
    render json: {id: params[:id]}
  end

  private
  
  def comment_params
    params.require(:comment).permit(:body, :author_id, :track_id)
  end
end