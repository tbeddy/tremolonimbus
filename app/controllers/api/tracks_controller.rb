class Api::TracksController < ApplicationController
  def index
    @tracks = Track.order('created_at DESC')
    render :index
  end

  def show
  end

  def create
    @track = Track.new(track_params)
    if @track.save
      render "/api/tracks/show"
    else
      render json: @track.errors.full_messages, status: 422
    end
  end

  private
  
  def track_params
    params.require(:track).permit(:title, :uploader_id, :audio)
  end
end