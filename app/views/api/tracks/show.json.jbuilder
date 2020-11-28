json.track do
  json.partial! "track", track: @track
end
json.user do
  json.set! @track.uploader_id do
    json.extract! @track.uploader, :id, :username
  end
end