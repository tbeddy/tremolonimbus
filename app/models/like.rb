class Like < ApplicationRecord
  validates :liker_id, :track_id, presence: true
  validates_uniqueness_of :liker_id, scope: :track_id

  belongs_to :liker,
    foreign_key: :liker_id,
    class_name: :User

  belongs_to :track,
    foreign_key: :track_id,
    class_name: :Track
end