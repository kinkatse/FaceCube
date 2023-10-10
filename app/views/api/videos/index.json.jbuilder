json.videos do
    @videos.each do |video|
        json.set! video.id do
            json.partial! 'api/videos/video', video: video
            # json.thumbnail video.thumbnail.attached? ? video.preview(resize_to_limit: [100, 100]) : nil
        end
    end
end