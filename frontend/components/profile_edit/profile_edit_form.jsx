import React, { useState } from 'react';

export default props => {
  const originalDisplayname = props.displayname;
  const originalFirstname = props.firstname;
  const originalLastname = props.lastname;
  const originalCity = props.city;
  const originalCountry = props.country;
  const [displayname, setDisplayname] = useState(props.displayname);
  const [firstname, setFirstname] = useState(props.firstname);
  const [lastname, setLastname] = useState(props.lastname);
  const [city, setCity] = useState(props.city);
  const [country, setCountry] = useState(props.country);

  const handleSubmit = e => {
    e.preventDefault();
    const fileData = new FormData();
    fileData.append('user[username]', props.username);
    if ((displayname !== "") || (!!originalDisplayname)) {
      fileData.append('user[displayname]', displayname);
    }
    if ((firstname !== "") || (!!originalFirstname)) {
      fileData.append('user[firstname]', firstname);
    }
    if ((lastname !== "") || (!!originalLastname)) {
      fileData.append('user[lastname]', lastname);
    }
    if ((city !== "") || (!!originalCity)) {
      fileData.append('user[city]', city);
    }
    if ((country !== "") || (!!originalCountry)) {
      fileData.append('user[country]', country);
    }
    props.updateUser(fileData, props.id)
      .then(props.disappearAndCloseModal);
  }

  return (
    <div className="track-form-container">
      <form className="track-form">
        <div className="form-fields">
          <div className="image-input-and-preview">
          </div>
          <div className="text-fields">
            <div className="form-item">
              <label
                htmlFor="title-input"
                className="title-label"
              >
                Display name <span className="required-asterisk">*</span>
              </label>
              <input
                id="title-input"
                type="text"
                value={displayname}
                onChange={e => setDisplayname(e.currentTarget.value)}
              />
            </div>
            <div className="form-line">
              <div className="form-item">
                <label
                  htmlFor="firstname-input"
                  className="firstname-label"
                >First name</label>
                <input
                  id="firstname-input"
                  type="text"
                  value={firstname}
                  onChange={e => setFirstname(e.currentTarget.value)}
                />
              </div>
              <div className="form-item">
                <label
                  htmlFor="lastname-input"
                  className="lastname-label"
                >Last name</label>
                <input
                  id="lastname-input"
                  type="text"
                  value={lastname}
                  onChange={e => setLastname(e.currentTarget.value)}
                />
              </div>
            </div>
            <div className="form-line">
              <div className="form-item">
                <label
                  htmlFor="city-input"
                  className="city-label"
                >City</label>
                <input
                  id="city-input"
                  type="text"
                  value={city}
                  onChange={e => setCity(e.currentTarget.value)}
                />
              </div>
              <div className="form-item">
                <label
                  htmlFor="country-input"
                  className="country-label"
                >Country</label>
                <input
                  id="country-input"
                  type="text"
                  value={country}
                  onChange={e => setCountry(e.currentTarget.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="track-form-bottom">
          <p className="required-field-message">
            <span className="required-asterisk">*</span> Required fields
          </p>
          <div className="submit-buttons">
            <button
              type="button"
              onClick={props.cancelAction}
              className="cancel-button"
            >Cancel</button>
            <button
              type="button"
              onClick={handleSubmit}
              className="save-button"
            >Save Changes</button>
          </div>
        </div>
      </form>
    </div>
  )
};