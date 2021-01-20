json.track do
  json.partial! "track", track: @track
end
json.users do
  json.set! @track.uploader_id do
    json.partial! "/api/users/user", user: @track.uploader
  end
end
@track.comments.each do |comment|
  json.comments do
    json.set! comment.id do
      json.partial! "/api/comments/comment", comment: comment
    end
  end
  json.users do
    json.set! comment.author_id do
      json.extract! comment.author, :id, :username
    end
  end
end