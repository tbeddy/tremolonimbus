# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'

User.create([
  { username: "demo_user", email: "fake@email.com", password: "password",
    displayname: "Demo User", firstname: "Some", lastname: "One",
    city: "The Void", country: "Nowhere" },
  { username: "roald_dahl", email: "dahl@gmail.com", password: "g14ntp3ach",
    displayname: "Roald Dahl", city: "Cardiff", country: "Whales" },
  { username: "winner", email: "winner@gmail.com", password: "allidoiswin",
    displayname: "Number 1", firstname: "Smitty", lastname: "Werbenjagermanjensen",
    city: "Bikini Bottom", country: "Under the Sea" },
  { username: "pumpkin", email: "pumpkin@gmail.com", password: "iamspooky",
    displayname: "The Great Pumpkin", city: "Pumpkin Patch" },
  { username: "space", email: "space@gmail.com", password: "thegreatvoid",
    displayname: "Cosmos", firstname: "Carl", lastname: "Sagan",
    city: "Pale Blue Dot", country: "Universe" },
  { username: "santa", email: "santa@gmail.com", password: "hohoho",
    displayname: "Saint Nick", firstname: "Santa", lastname: "Claus",
    city: "North Pole", country: "The Arctic" },
  { username: "adventurer", email: "adventurer@email.com", password: "crystalskull",
    displayname: "Adventurer", firstname: "Indiana", lastname: "Jones",
    country: "Somewhere coded as exotic" },
  { username: "8bit", email: "8bit@email.com", password: "konamicode",
    displayname: "Mr. Peach", firstname: "Super", lastname: "Mario",
    city: "World 1-1", country: "Mushroom Kingdom" },
  { username: "bob", email: "bob@email.com", password: "marley",
    displayname: "4Jah", firstname: "King", lastname: "Tubby",
    city: "Kingston", country: "Jamaica" },
])

Track.create([
  { title: "Halloween Countdown (30 Seconds)", play_count: rand(200..1000),
    uploader_id: User.find_by(username: "pumpkin").id },
  { title: "Halloween Lobby", play_count: rand(200..1000),
    uploader_id: User.find_by(username: "pumpkin").id },
  { title: "Halloween Lobby 2017", play_count: rand(200..1000),
    uploader_id: User.find_by(username: "pumpkin").id },
  { title: "Holiday Lobby 2016", play_count: rand(200..1000),
    uploader_id: User.find_by(username: "santa").id },
  { title: "Space Lobby", play_count: rand(200..1000),
    description: "I'm floating...",
    uploader_id: User.find_by(username: "space").id },
  { title: "Holiday Lobby 2017", play_count: rand(200..1000),
    uploader_id: User.find_by(username: "santa").id },
  { title: "2 Space 2 Lobby", play_count: rand(200..1000),
    description: "Uhhh I think I'm ready to stop floating now...",
    uploader_id: User.find_by(username: "space").id },
  { title: "Ghost Lobby", play_count: rand(200..1000),
    uploader_id: User.find_by(username: "8bit").id },
  { title: "Holiday Lobby 2018", play_count: rand(200..1000),
    uploader_id: User.find_by(username: "santa").id },
  { title: "Halloween Lobby 2019", play_count: rand(200..1000),
    uploader_id: User.find_by(username: "pumpkin").id },
  { title: "Holiday Lobby Special", play_count: rand(200..1000),
    uploader_id: User.find_by(username: "santa").id },
  { title: "Jungle Lobby", play_count: rand(200..1000),
    description: "Colonial? Post-colonial? You be the judge.",
    uploader_id: User.find_by(username: "adventurer").id },
  { title: "Ghost Lobby 2: More Ghosts", play_count: rand(200..1000),
    uploader_id: User.find_by(username: "8bit").id },
  { title: "Back2Skool", play_count: rand(200..1000),
    description: "But moooooom, I don't wanna go back!",
    uploader_id: User.find_by(username: "demo_user").id },
  { title: "Beatbox Lobby", play_count: rand(200..1000),
    uploader_id: User.find_by(username: "bob").id },
  { title: "Reggae Lobby", play_count: rand(200..1000),
    uploader_id: User.find_by(username: "bob").id },
  { title: "Halloween Lobby 2020", play_count: rand(200..1000),
    uploader_id: User.find_by(username: "pumpkin").id },
  { title: "Roald Dahls 100th Birthday", play_count: rand(200..1000),
    description: "I may have been a prickly pear, but I'll share this little treat with you",
    uploader_id: User.find_by(username: "roald_dahl").id },
  { title: "Podium Theme Music", play_count: rand(200..1000),
    description: "It's my hat, Mr. Krabbs! I am number 1!",
    uploader_id: User.find_by(username: "winner").id },
  { title: "The Original", play_count: rand(200..1000),
    description: "Classic",
    uploader_id: User.find_by(username: "demo_user").id }
])

demo_audio_1 = open('https://tremolonimbus-seeds.s3.amazonaws.com/lobby_original.mp3')
Track.find_by(title: "The Original").audio.attach(
  io: demo_audio_1, filename: "lobby_original.mp3")
demo_audio_2 = open('https://tremolonimbus-seeds.s3.amazonaws.com/lobby_back_to_school.mp3')
Track.find_by(title: "Back2Skool").audio.attach(
  io: demo_audio_2, filename: "lobby_back_to_school.mp3")
roald_dahl_audio = open('https://tremolonimbus-seeds.s3.amazonaws.com/roald_dahl_lobby.mp3')
Track.find_by(title: "Roald Dahls 100th Birthday").audio.attach(
  io: roald_dahl_audio, filename: "roald_dahl_lobby.mp3")
podium_audio = open('https://tremolonimbus-seeds.s3.amazonaws.com/podium_music.mp3')
Track.find_by(title: "Podium Theme Music").audio.attach(
  io: podium_audio, filename: "podium_music.mp3")
pumpkin_audio_1 = open('https://tremolonimbus-seeds.s3.amazonaws.com/halloween_countdown_30_seconds.mp3')
Track.find_by(title: "Halloween Countdown (30 Seconds)").audio.attach(
  io: pumpkin_audio_1, filename: "halloween_countdown_30_seconds.mp3")
pumpkin_audio_2 = open('https://tremolonimbus-seeds.s3.amazonaws.com/halloween_lobby.mp3')
Track.find_by(title: "Halloween Lobby").audio.attach(
  io: pumpkin_audio_2, filename: "halloween_lobby.mp3")
pumpkin_audio_3 = open('https://tremolonimbus-seeds.s3.amazonaws.com/halloween_lobby_2017.mp3')
Track.find_by(title: "Halloween Lobby 2017").audio.attach(
  io: pumpkin_audio_3, filename: "halloween_lobby_2017.mp3")
pumpkin_audio_4 = open('https://tremolonimbus-seeds.s3.amazonaws.com/halloween_lobby_2019.mp3')
Track.find_by(title: "Halloween Lobby 2019").audio.attach(
  io: pumpkin_audio_4, filename: "halloween_lobby_2019.mp3")
pumpkin_audio_5 = open('https://tremolonimbus-seeds.s3.amazonaws.com/halloween_lobby_2020.mp3')
Track.find_by(title: "Halloween Lobby 2020").audio.attach(
  io: pumpkin_audio_5, filename: "halloween_lobby_2020.mp3")
space_audio_1 = open('https://tremolonimbus-seeds.s3.amazonaws.com/lobby_space.mp3')
Track.find_by(title: "Space Lobby").audio.attach(
  io: space_audio_1, filename: "lobby_space.mp3")
space_audio_2 = open('https://tremolonimbus-seeds.s3.amazonaws.com/lobby_space_2.mp3')
Track.find_by(title: "2 Space 2 Lobby").audio.attach(
  io: space_audio_2, filename: "lobby_space_2.mp3")
holiday_audio_1 = open('https://tremolonimbus-seeds.s3.amazonaws.com/lobby_holiday_2016.mp3')
Track.find_by(title: "Holiday Lobby 2016").audio.attach(
  io: holiday_audio_1, filename: "lobby_holiday_2016.mp3")
holiday_audio_2 = open('https://tremolonimbus-seeds.s3.amazonaws.com/lobby_holiday_2017.mp3')
Track.find_by(title: "Holiday Lobby 2017").audio.attach(
  io: holiday_audio_2, filename: "lobby_holiday_2017.mp3")
holiday_audio_3 = open('https://tremolonimbus-seeds.s3.amazonaws.com/lobby_holiday_2018.mp3')
Track.find_by(title: "Holiday Lobby 2018").audio.attach(
  io: holiday_audio_3, filename: "lobby_holiday_2018.mp3")
holiday_audio_4 = open('https://tremolonimbus-seeds.s3.amazonaws.com/lobby_holiday_special.mp3')
Track.find_by(title: "Holiday Lobby Special").audio.attach(
  io: holiday_audio_4, filename: "lobby_holiday_special.mp3")
adventurer_audio = open('https://tremolonimbus-seeds.s3.amazonaws.com/lobby_jungle.mp3')
Track.find_by(title: "Jungle Lobby").audio.attach(
  io: adventurer_audio, filename: "lobby_jungle.mp3")
eightbit_audio_1 = open('https://tremolonimbus-seeds.s3.amazonaws.com/lobby_ghost_1.mp3')
Track.find_by(title: "Ghost Lobby").audio.attach(
  io: eightbit_audio_1, filename: "lobby_ghost_1.mp3")
eightbit_audio_2 = open('https://tremolonimbus-seeds.s3.amazonaws.com/lobby_ghost_2.mp3')
Track.find_by(title: "Ghost Lobby 2: More Ghosts").audio.attach(
  io: eightbit_audio_2, filename: "lobby_ghost_2.mp3")
chill_audio_1 = open('https://tremolonimbus-seeds.s3.amazonaws.com/lobby_beatbox.mp3')
Track.find_by(title: "Beatbox Lobby").audio.attach(
  io: chill_audio_1, filename: "lobby_beatbox.mp3")
chill_audio_2 = open('https://tremolonimbus-seeds.s3.amazonaws.com/lobby_reggae.mp3')
Track.find_by(title: "Reggae Lobby").audio.attach(
  io: chill_audio_2, filename: "lobby_reggae.mp3")

Comment.create([
  { body: "*distant unsettling laughter*",
    author_id: User.find_by(username: "pumpkin").id,
    track_id: Track.find_by(title: "Holiday Lobby 2017").id },
  { body: "Look out for ghouls",
    author_id: User.find_by(username: "pumpkin").id,
    track_id: Track.find_by(title: "Ghost Lobby").id },
  { body: "There are monsters under your bed",
    author_id: User.find_by(username: "pumpkin").id,
    track_id: Track.find_by(title: "Roald Dahls 100th Birthday").id },
  { body: "ho ho ho!",
    author_id: User.find_by(username: "santa").id,
    track_id: Track.find_by(title: "Reggae Lobby").id },
  { body: "How jolly!",
    author_id: User.find_by(username: "santa").id,
    track_id: Track.find_by(title: "Back2Skool").id },
  { body: "This reminds me of my sleigh rides!",
    author_id: User.find_by(username: "santa").id,
    track_id: Track.find_by(title: "Roald Dahls 100th Birthday").id },
  { body: "I love the bleep bloops",
    author_id: User.find_by(username: "space").id,
    track_id: Track.find_by(title: "Ghost Lobby").id },
  { body: "I love these bleep bloops even more",
    author_id: User.find_by(username: "space").id,
    track_id: Track.find_by(title: "Ghost Lobby 2: More Ghosts").id },
  { body: "funky af",
    author_id: User.find_by(username: "winner").id,
    track_id: Track.find_by(title: "Beatbox Lobby").id },
  { body: "Nice!",
    author_id: User.find_by(username: "demo_user").id,
    track_id: Track.find_by(title: "Ghost Lobby").id },
  { body: "Wow!",
    author_id: User.find_by(username: "demo_user").id,
    track_id: Track.find_by(title: "Holiday Lobby 2016").id },
  { body: "Sounds great!",
    author_id: User.find_by(username: "demo_user").id,
    track_id: Track.find_by(title: "Podium Theme Music").id }
])