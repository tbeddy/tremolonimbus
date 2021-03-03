json.user do
  json.partial! "/api/users/user", user: @user
end

@user.tracks.each do |track|
  json.tracks do
    json.set! track.id do
      json.partial! "/api/tracks/track", track: track
    end
  end
end

@user.likes.each do |like|
  json.likes do
    json.set! like.id do
      json.partial! "/api/likes/like", like: like
    end
  end
end