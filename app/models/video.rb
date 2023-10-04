class Video < ApplicationRecord
    validates :title, :views, presence: true

    before_validation :ensure_video_views_and_title
    
    belongs_to :author,
      primary_key: :id,
      foreign_key: :user_id,
      class_name: :User

    def ensure_video_views_and_title
        self.views ||= 0
        self.title ||= "Untitled"
    end
end