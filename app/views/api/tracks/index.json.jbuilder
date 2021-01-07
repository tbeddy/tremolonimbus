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

  json.comments do
    track.comments.each do |comment|
      json.set! comment.id do
        json.partial! "/api/comments/comment", comment: comment
      end
    end
  end
end