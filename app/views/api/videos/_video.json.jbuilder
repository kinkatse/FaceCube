json.extract! video, :id, :user_id, :title, :description, :views, :category, :visibility, :tags, :created_at, :updated_at
json.extract! video.author, :username

json.file video.file.attached? ? url_for(video.file) : nil
# json.thumbnail video.thumbnail.attached? ? url_for(video.thumbnail) : video.open(tmpdir: "/path/to/tmp") do |file|
#     debugger
# end
# json.thumbnail video.thumbnail.attached? ? url_for(video.thumbnail) : video.preview(resize_to_limit: [100, 100]).processed.url
value = ActiveStorage::Preview.new(video.file, resize_to_limit: [100, 100])
# value = value.preview(resize_to_limit: [100, 100])
# debugger
json.thumbnail video.thumbnail.attached? ? url_for(video.thumbnail) : url_for(value.blob)