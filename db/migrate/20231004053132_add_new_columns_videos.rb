class AddNewColumnsVideos < ActiveRecord::Migration[7.0]
  def change
    add_column :videos, :category, :string, null: false
    add_column :videos, :tags, :text, array: true, default: []
    add_column :videos, :visibility, :string, null: false
    add_index :videos, :category
    add_index :videos, :tags
  end
end
