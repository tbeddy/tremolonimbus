class Api::TracksController < ApplicationController
  def index
    @tracks = Track.all
    render :index
  end

  def show
  end

  def create
  end

  private
  
  def track_params
    params.require(:track).permit(:title)
  end
end