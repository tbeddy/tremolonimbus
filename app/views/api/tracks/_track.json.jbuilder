json.extract! track, :id, :title, :uploader_id, :play_count, :description
json.url track.audio.service_url
pic = track.image
json.image pic.attached? ? pic.service_url : nil