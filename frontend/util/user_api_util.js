export const fetchUser = userId => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userId}`
  })
}

export const updateUser = (user, id) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/users/${id}`,
    data: user,
    contentType: false,
    processData: false
  })
}