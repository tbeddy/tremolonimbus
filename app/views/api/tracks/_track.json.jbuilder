json.extract! track, :id, :title, :uploader_id, :play_count, :description
json.url track.audio.url
pic = track.image
json.image pic.attached? ? pic.url : nil