import React, { useState } from 'react';

export default props => {
  const originalDescription = props.description;
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);

  const handleSubmit = e => {
    e.preventDefault();
    const fileData = new FormData();
    fileData.append('track[title]', title);
    fileData.append('track[uploader_id]', props.currentUserId);
    if ((description !== "") || (!!originalDescription)) {
      fileData.append('track[description]', description);
    }
    props.updateTrack(fileData, props.id)
      .then(props.disappearAndCloseModal);
  }

  return (
    <form className="upload-form">
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