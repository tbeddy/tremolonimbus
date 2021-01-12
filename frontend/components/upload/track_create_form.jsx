import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default props => {
  const [file, setFile] = useState(props.file);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const history = useHistory();

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
    props.createTrack(fileData)
      .then(({ track }) => {
        history.push(`/tracks/${track.id}`);
      })
  }

  return (
    <div className="track-form-container">
      <form className="track-form">
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
        <div className="track-form-bottom">
          <p className="required-field-message">
            <span className="required-asterisk">*</span> Required fields
          </p>
          <div className="submit-buttons">
            <button
              onClick={props.cancelAction}
              className="cancel-button"
            >Cancel</button>
            <button
              onClick={handleSubmit}
              className="save-button"
            >Save</button>
          </div>
        </div>
      </form>
    </div>
  )
};