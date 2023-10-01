class User < ApplicationRecord
  has_secure_password

  validates :username,
    length: { in: 3..30 },
    uniqueness: true,
    format: { without: URI::MailTo::EMAIL_REGEXP, message: "cannot be an email" }
  validates :email,
    length: { in: 3..70 },
    uniqueness: true,
    format: { with: URI::MailTo::EMAIL_REGEXP, message: "must be in email format" }
  validates :session_token,
    uniqueness: true,
    presence: true
  validates :password,
    length: { in: 6..70 },
    allow_nil: true

  before_validation :ensure_session_token

  def self.find_by_credentials(credential, password)
    # If credential is of the URI::MailTo::EMAIL_REGEXP format,
    # then we set field to be :email, if not, then :username
    field = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :username
    # This is the way to preserve that the field is the symbol of :email
    # or :username and point it to the credential variable reference
    # which actually holds the value of email or name
    user = User.find_by(field => credential)
    # Syntactic sugar for user && user.authenticate(password)
    # the authenticate method comes from the has_secure_password macro that does
    # all the password=, is_password, and password validations for us
    user&.authenticate(password)
  end

  def reset_session_token!
    self.update!(session_token: generate_unique_session_token)
    self.session_token
  end

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
