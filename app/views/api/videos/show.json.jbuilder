json.video do
    json.partial! 'api/videos/video', video: @video
    json.uploaded @video.created_at.strftime('%b %d, %Y')
    # json.file @video.file.attached? ? url_for(@video.file) : nil
    # json.thumbnail @video.thumbnail.attached? ? url_for(@video.thumbnail) : nil
end
