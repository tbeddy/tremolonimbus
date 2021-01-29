class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      log_in!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.includes(:tracks).find_by(id: params[:id])
    if @user
      render :show
    else
      render json: ["Missing user"], status: 404
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    if @user.update_attributes(user_params)
      render :show
    else
      render json: ["Update failed"], status: 404
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :username, :password, :email, :displayname,
      :firstname, :lastname, :city, :country, :profile_image)
  end
end