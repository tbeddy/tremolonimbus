class Api::TracksController < ApplicationController
  def index
    @tracks = Track.includes(:uploader, comments: :author).order('created_at DESC')
    @tracks = @tracks.sample(3) if params["splash"]
    render :index
  end

  def show
    @track = Track.includes(:uploader, comments: :author).find_by(id: params[:id])
    if @track
      render "/api/tracks/show"
    else
      render json: ["Missing track"], status: 404
    end
  end

  def create
    @track = Track.new(track_params)
    if @track.save
      render "/api/tracks/show"
    else
      render json: @track.errors.full_messages, status: 422
    end
  end

  def destroy
    @track = Track.find_by(id: params[:id])
    @track.destroy
    render json: {id: params[:id]}
  end

  def update
    @track = Track.find_by(id: params[:id])
    if @track.update_attributes(track_params)
      render "/api/tracks/show"
    else
      render json: ["Update failed"], status: 404
    end
  end

  private
  
  def track_params
    params.require(:track).permit(
      :title, :uploader_id, :audio, :play_count, :description, :image)
  end
end