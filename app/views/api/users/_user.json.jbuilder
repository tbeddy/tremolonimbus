json.extract! user, :id, :username, :displayname, :firstname, :lastname,
  :city, :country
pic = user.profile_image
json.profile_image pic.attached? ? pic.service_url : nil