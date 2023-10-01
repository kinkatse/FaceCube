class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def index
  end

  def show
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render json: { user: @user }
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
  end

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
