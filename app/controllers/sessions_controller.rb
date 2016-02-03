class SessionsController < ApplicationController
  before_action :require_logged_out!, only: [:new, :create]

  def new
    redirect_to new_user_url
  end

  def create
    @user = User.find_by_credentials(params[:user][:email],
                                     params[:user][:password])
    if @user
      login_user!(@user)
      render json: @user
    else
      render json: ["Invalid login info!"], status: 422
    end
  end

  def destroy
    logout_user!
    render json: "success", status: 200
  end
end
