class User < ApplicationRecord
  has_secure_password

  validates :username,
    length: { in: 3..30 },
    uniqueness: true,
    format: { without: URI::MailTo::EMAIL_REGEXP, message: "Cannot be an email" }
  validates :email,
    length: { in: 3..70 },
    uniqueness: true,
    format: { with: URI::MailTo::EMAIL_REGEXP, message: "Must be in email format" }
  validates :session_token,
    uniqueness: true,
    presence: true
  validates :password,
    length: { in: 6..70 },
    allow_nil: true

  before_validation :ensure_session_token

  private

  def generate_unique_session_token
    loop do
      token = SecureRandom.base64
      return token unless User.exists?(session_token: token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
