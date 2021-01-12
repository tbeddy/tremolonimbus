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
    <form className="upload-form">
      <p>File: {!file ? "Nothing selected" : file.name}</p>
      <label
        htmlFor="title-input"
        className="title-label"
      >Title</label>
      <input
        id="title-input"
        type="text"
        value={title}
        onChange={e => setTitle(e.currentTarget.value)}
      />
      <label
        htmlFor="description-input"
        className="description-label"
      >Description</label>
      <textarea
        id="description-input"
        type="text"
        value={description}
        onChange={e => setDescription(e.currentTarget.value)}
      />
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
    </form>
  )
};