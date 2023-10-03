class ChangeUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :firstname, :string, null: false
    add_column :users, :lastname, :string, null: false
  end
end
