class Video < ApplicationRecord
    validates :title, :views, :category, :visibility, presence: true

    before_validation :ensure_video_details
    
    belongs_to :author,
      primary_key: :id,
      foreign_key: :user_id,
      class_name: :User

    has_one_attached :file

    def ensure_video_details
        self.views ||= 0
        self.title ||= "Untitled"
        self.visibility ||= "public"
    end
end