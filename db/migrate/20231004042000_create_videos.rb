class CreateVideos < ActiveRecord::Migration[7.0]
  def change
    create_table :videos do |t|
      t.references :users, null: false, foreign_key: true
      t.string :title, null: false
      t.text :description
      t.integer :views, null: false

      t.timestamps
    end
    add_column :users, :bio, :text
  end
end
