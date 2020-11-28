@tracks.each do |track|
  json.tracks do
    json.set! track.id do
      json.partial! "track", track: track
    end
  end

  json.users do
    json.set! track.uploader_id do
      json.extract! track.uploader, :id, :username
    end
  end
end