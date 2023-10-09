json.extract! video, :id, :user_id, :title, :description, :views, :category, :visibility, :tags, :created_at, :updated_at
json.extract! video.author, :username

json.file video.file.attached? ? url_for(video.file) : nil