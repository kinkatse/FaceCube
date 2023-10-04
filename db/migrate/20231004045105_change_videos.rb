class ChangeVideos < ActiveRecord::Migration[7.0]
  def change
    remove_index :videos, column: ["users_id"], name: "index_videos_on_users_id"
    remove_column :videos, :users_id
    add_reference :videos, :user, null: false, foreign_key: true
  end
end
