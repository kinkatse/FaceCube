class Api::VideosController < ApplicationController
    wrap_parameters include: Video.attribute_names

    def index
      @videos = Video.all
      render :index
    end

    def show
      @video = Video.find(params[:id])
      render :show
    end
  
    def create
      @video = Video.new(video_params)
  
      if @video.save
        render :show
      else
        render json: { errors: @video.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def update
    end
  
    def video_params
      params.require(:video).permit(:user_id, :title, :description, :views)
    end
end