json.video do
    json.partial! 'api/videos/video', video: @video
    # json.file @video.file.attached? ? url_for(@video.file) : nil
    # json.thumbnail @video.thumbnail.attached? ? url_for(@video.thumbnail) : nil
end
