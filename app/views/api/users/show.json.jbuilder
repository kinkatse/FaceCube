json.user do
    json.extract! @user, :id, :email, :username, :firstname, :lastname, :created_at, :updated_at
end