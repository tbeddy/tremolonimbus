@tracks.each do |track|
  @track.set! track.id do
    json.partial! "track", track: track
  end
end