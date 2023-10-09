# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require "open-uri"

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Video.destroy_all
    User.destroy_all

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('videos')
end

puts "Creating users..."
# Create one user with an easy to remember username, email, and password:
User.create!(
    username: 'Demo-lition', 
    email: 'demo@user.io', 
    password: 'password',
    firstname: 'Demo',
    lastname: 'User'
)

# More users
12.times do 
    User.create!({
    username: Faker::Internet.unique.username(specifier: 3),
    email: Faker::Internet.unique.email,
    password: 'password',
    firstname: Faker::Name.first_name,
    lastname: Faker::Name.last_name
    }) 
end

12.times do 
    Video.create!({
    title: Faker::Quote.yoda,
    views: rand(0..1000),
    user_id: rand(1...12),
    category: "Music",
    description: 'Im a game experiencer. Welcome to another "Pokemon Fire Red Version" with no commentary! I decided to record myself on "Pokemon Fire Red Version", and see how things turned out! I hope you guys find this relaxing and enjoyable. I will be making a lot more of these to help everyone sleep, relax, and study!'
    }) 
end

Video.first(12).each_with_index do |video, index|
    video.file.attach(
        io: URI.open("https://facecube-seeds.s3.amazonaws.com/#{index + 1}.mp4"),
        filename: "video_#{index + 1}.mp4"
    )
end

puts "Done!"