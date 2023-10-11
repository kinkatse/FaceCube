json.videos do
    @videos.each do |video|
        json.set! video.id do
            json.partial! 'api/videos/video', video: video
            # json.thumbnail video.thumbnail.attached? ? video.preview(resize_to_limit: [100, 100]) : nil
        end
    end
end

# "2023-10-11 19:08:16 UTC"
# 2023-10-11T19:08:16.558Z