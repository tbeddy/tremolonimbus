import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { generateProfilePicture } from '../../util/pic_util';

export default props => {
  const [file, setFile] = useState(props.file);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [imageUrl, setImageUrl] = useState(props.image);
  const [imageFile, setImageFile] = useState(null);
  const history = useHistory();

  const handleImage = e => {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setImageUrl(fileReader.result);
      setImageFile(file);
    }
    if (file) fileReader.readAsDataURL(file);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const fileData = new FormData();
    fileData.append('track[id]', props.id);
    fileData.append('track[title]', title);
    fileData.append('track[uploader_id]', props.currentUserId);
    fileData.append('track[audio]', file);
    if (description !== "") {
      fileData.append('track[description]', description);
    }
    if ((imageUrl === null) || (!!imageFile)) {
      fileData.append('track[image]', imageFile);
    }
    props.createTrack(fileData)
      .then(({ track }) => {
        history.push(`/tracks/${track.id}`);
      })
  }

  return (
    <div className="track-form-container">
      <form className="track-form">
        <div className="form-fields">
          <div className="image-input-and-preview"
            style={{ "backgroundImage": generateProfilePicture(props.currentUserId) }}
          >
            {!imageUrl ? null : (
              <img
                className="preview-image"
                src={imageUrl}
              />
            )}
            <div className="upload-image-button">
              <label
                className="input-label"
                htmlFor="image-upload"
              >
                <img src={window.cameraURL} />
                <span>Upload image</span>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden-input"
                onChange={handleImage}
              />
            </div>
          </div>
          <div className="text-fields">
            <p>File: {!file ? "Nothing selected" : file.name}</p>
            <div className="form-item">
              <label
                htmlFor="title-input"
                className="title-label"
              >
                Title <span className="required-asterisk">*</span>
              </label>
              <input
                id="title-input"
                type="text"
                value={title}
                placeholder="Name your track"
                onChange={e => setTitle(e.currentTarget.value)}
              />
            </div>
            <div className="form-item">
              <label
                htmlFor="description-input"
                className="description-label"
              >Description</label>
              <textarea
                id="description-input"
                type="text"
                value={description}
                placeholder="Describe your track"
                onChange={e => setDescription(e.currentTarget.value)}
              />
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
            >Save</button>
          </div>
        </div>
      </form>
    </div>
  )
};