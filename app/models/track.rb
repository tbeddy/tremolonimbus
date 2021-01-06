class Track < ApplicationRecord
  after_initialize :ensure_play_count

  validates :title, :uploader_id, presence: true

  has_one_attached :audio

  belongs_to :uploader,
    foreign_key: :uploader_id,
    class_name: :User

  has_many :comments,
    foreign_key: :track_id,
    class_name: :Comment

  private

  def ensure_play_count
    self.play_count ||= 0
  end
end