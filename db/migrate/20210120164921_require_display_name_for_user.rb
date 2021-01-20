class RequireDisplayNameForUser < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :displayname, :string, null: false
  end
end
