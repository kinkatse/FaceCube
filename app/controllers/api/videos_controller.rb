class Api::VideosController < ApplicationController
    wrap_parameters include: Video.attribute_names

    def index
      @videos = Video.includes(:author).all
      render :index
    end

    def show
      @video = Video.includes(:author).find(params[:id])
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

    def destroy
    end

    def video_params
      params.require(:video).permit(:id, :user_id, :title, :description, :views, :category, :visibility, :tags)
    end
end