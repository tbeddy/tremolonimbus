json.extract! user, :id, :username, :displayname, :firstname, :lastname,
  :city, :country
pic = user.profile_image
json.profileImage pic.attached? ? pic.url : nil