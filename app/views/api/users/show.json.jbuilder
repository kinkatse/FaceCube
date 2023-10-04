json.user do
    json.extract! @user, :id, :email, :username, :firstname, :lastname, :bio, :created_at, :updated_at
end