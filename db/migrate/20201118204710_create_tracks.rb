class CreateTracks < ActiveRecord::Migration[5.2]
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.integer :uploader_id, null: false
      t.integer :play_count, null: false

      t.timestamps
    end
  end
end