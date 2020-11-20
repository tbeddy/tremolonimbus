# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'

roald_dahl_audio = open('https://tremolonimbus-seeds.us-east-1.amazonaws.com/roald_dahl_lobby.mp3')
podium_audio = open('https://tremolonimbus-seeds.us-east-1.amazonaws.com/podium_music.mp3')

User.create([
  { username: "demo user", email: "fake@email.com", password: "password" },
  { username: "bob", email: "bob@gmail.com", password: "password1" },
  { username: "kathy", email: "kathy@gmail.com", password: "password2" },
  { username: "roald_dahl", email: "dahl@gmail.com", password: "g14ntp3ach" },
  { username: "winner", email: "winner@gmail.com", password: "allidoiswin" }
])

Track.create([
  { title: "KAHOOT Lobby Music [Roald Dahls 100th Birthday]",
    uploader_id: User.find_by(username: "roald_dahl").id },
  { title: "Kahoot! Podium Theme Music",
    uploader_id: User.find_by(username: "winner").id }
])

Track.find_by(title: "KAHOOT Lobby Music [Roald Dahls 100th Birthday]").audio.attach(
  io: roald_dahl_audio, filename: "roald_dahl_lobby.mp3")
Track.find_by(title: "Kahoot! Podium Theme Music").audio.attach(
  io: podium_audio, filename: "podium_music.mp3")