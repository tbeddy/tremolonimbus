class User < ApplicationRecord
  attr_reader :password
  
  after_initialize :ensure_session_token

  validates :username, :email, :password_digest, presence: true
  validates :username, :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  
  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.is_password?(password) ? user : nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  private

  def self.generate_session_token
    token = SecureRandom::urlsafe_base64
    while (User.exists?(session_token: token)) do
      token = SecureRandom::urlsafe_base64
    end
    token
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end
end