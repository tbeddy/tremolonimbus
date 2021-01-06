class Comment < ApplicationRecord
  validates :body, :author_id, :track_id, presence: true
  validates :body, length: { minimum: 1 }

  belongs_to :author,
    foreign_key: :author_id,
    class_name: :User

  belongs_to :track,
    foreign_key: :track_id,
    class_name: :Track
end