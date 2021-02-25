class Like < ApplicationRecord
  validates :liker_id, :track_id, presence: true
  validates_uniqueness_of :liker_id, scope: :track_id
end